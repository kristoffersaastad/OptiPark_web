import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Map, TileLayer, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import {createGraph,assignSensor, getPolyline, findNodeCoord, angleBetweenPoints, getDirection, determimeDirection, findNodeIndex, distance, calcBBox} from '../../functions/DirectFunctions';
import { ProgressBar, Drawer } from '@blueprintjs/core'
import { toast } from 'react-toastify'
import MapDrawer from '../SubComponents/MapDrawer';
import rightIcon from '../../images/rightIcon.png';
import leftIcon from '../../images/leftIcon.png';
import Charts from '../SubComponents/Charts';
import { changeSpotStatus } from '../../actions/geo';

const userIcon = new L.Icon({
    iconUrl:require('../../images/carIcon2.png'),
    iconSize:[30,30],
})

const nodeIcon = new L.Icon({
    iconUrl:require('../../images/node.png'),
    iconSize:[10,10],
})

const sensorIconSize = [15,15];

const sensorIconAvaliable = new L.Icon({
    iconUrl:require('../../images/avaliable.png'),
    iconSize:sensorIconSize,
});

const sensorIconTaken = new L.Icon({
    iconUrl:require('../../images/taken.png'),
    iconSize:sensorIconSize,
});

class MapComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            loadingMap:true,
            currPos:{lat:0,lng:0},
            direction:'straight',
            showDrawer:false,

        }
    }

    componentWillMount(){
        if(this.props.sensors&&this.props.support&&this.props.corners)this.setState({g:createGraph(this.props.sensors, this.props.support),bbox: calcBBox(this.props.corners), loadingMap:!this.state.loadingMap})        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.sensors!==this.props.sensors) {            
            if(this.props.sensors&&this.props.support&&this.props.corners&&this.state.loadingMap)this.setState({g:createGraph(this.props.sensors, this.props.support),bbox: calcBBox(this.props.corners), loadingMap:!this.state.loadingMap})        
        }
        if (prevState.currPos!=this.state.currPos) {
            this.assignSensor();    
       }
    }


    assignSensor = () =>{
        const assigned = assignSensor(this.state.g,this.props.sensors,this.props.support,[this.state.currPos.lat,this.state.currPos.lng])
        const spot = assigned[0];
        const path  = assigned[1];
        
        if(spot.length===0&& path.length===0){
            toast("The parking lot is full",{
                type: toast.TYPE.ERROR,
                autoClose: 1500,
            })
        }
        
        if (distance([this.state.currPos.lat, this.state.currPos.lng],findNodeCoord(this.props.sensors,spot))<4) {
            console.log("CHANGESPOT");
            
            this.props.changeSpotStatus("Library", findNodeIndex(this.props.sensors,spot),1);
            this.setState({path:null, direction:null, currDistance:null, spot, totDistance:null,showDistance:false, latlngs:null})
            return null;
        }
        

        //Finding point coordinates to find angle between first->second, and second-> third
        let p1 = this.getNodeCoord(path[1][0]);
        let p2 = this.getNodeCoord(path[2][0]);
        let dir1 = getDirection(angleBetweenPoints(this.state.currPos,p1));
        let dir2 = getDirection(angleBetweenPoints(p1,p2));
        
        let direction = determimeDirection(dir1,dir2); 
        
        if (direction==="delete") {
            path.splice(1,1);
        }
        
        let dist = 0;
        for (let i = 1; i < path.length-1; i++) {
            p1 = this.getNodeCoord(path[i][0]);
            p2 = this.getNodeCoord(path[i+1][0]);
            dir1 = getDirection(angleBetweenPoints(this.state.currPos,p1));
            dir2 = getDirection(angleBetweenPoints(p1,p2));
            direction = determimeDirection(dir1,dir2); 
            dist = path[i][1];            
            if (direction==="Right"||direction==="Left") {
                break
            }
        }
        
        this.setState({
            path,
            spot,
            show:this.state.showDistance?false:true,
            showDistance:true,
            totDistance:path[path.length-1][1],
            currDistance:dist,
            direction,
            directionIcon:direction==="Right"?rightIcon:leftIcon,
            latlngs:getPolyline(this.state.currPos,assigned[1], this.props.sensors, this.props.support),
                    
        },
        )
    }

    getNodeCoord = (nodeName) => {
        let coord = {}
        if (nodeName.split("")[0]==="h") {
            coord = findNodeCoord(this.props.support,nodeName)
            coord = {lat:coord[0],lng:coord[1]}
        }
        if (nodeName.split("")[0]==="s") {
            coord = findNodeCoord(this.props.sensors,nodeName)
            coord = {lat:coord[0],lng:coord[1]}
        }
        return coord
    }

    changeUserPos = (map) => {
        const lat = map.latlng.lat;
        const lng = map.latlng.lng;  
              
        this.setState({currPos:{lat, lng}})
    }

    showNode = (e) => {
        console.log(e.target.options.id);
        
    }

    render(){
        if (!this.props.login) {
            return <Redirect to="/"/>
        }
        return(
        <div className="map-container flex">
            <div className="chart-container">
                <Charts/>
            </div>
            {this.state.loadingMap?
            <div className="progressBar">Loading map<ProgressBar/></div>
            :<Map bounds={this.state.bbox} style={{width:"100%", height:'100%', zIndex:2,flex:0.7, minWidth:'70%'}} onClick={this.changeUserPos}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.path&&this.state.latlngs?
                    <Polyline
                    positions={this.state.latlngs}
                    weight={5}
                    />
                :null}
                {Object.keys(this.props.sensors).map((item)=>
                    <Marker id={this.props.sensors[item].properties.name} onClick={this.showNode} key={item} position={[this.props.sensors[item].geometry.coordinates[0],this.props.sensors[item].geometry.coordinates[1]]} icon={this.props.sensors[item].properties.status===0?sensorIconAvaliable:sensorIconTaken}></Marker>
                )}
                {this.state.path&&this.state.latlngs?
                    Object.keys(this.state.path).map((key)=>{
                        let coord = []                        
                        if (this.state.path[key][0].split("")[0]==="h") {
                            coord = findNodeCoord(this.props.support,this.state.path[key][0])
                            let index = findNodeIndex(this.props.support,this.state.path[key][0])
                            let name = this.props.support[index].properties.name;
                            
                            return(
                            <Marker id={name} onClick={this.showNode} key={"supp"+key} position={{lat:coord[0],lng:coord[1]}} icon={nodeIcon}/>
                            )
                        }
                    })
                :null}
                <Marker icon={userIcon} position={this.state.currPos}/>
            </Map>}
            {this.state.totDistance?<div className="total-distance"></div>:null}
            {this.state.directionIcon&&this.state.totDistance&&this.state.currDistance?
            <div className="direction-container">
                <img className="direction-icon" src={this.state.directionIcon}/>
                <div className="distance-curr">{"in "+this.state.currDistance.toFixed(0)+" meters"}</div>
                <div className="distance-tot">{"Distance to goal: "+this.state.totDistance.toFixed(0)+"m"}</div>
            </div>:null}
            <MapDrawer/>
        </div>
    )}
}

const mapStateToProps = (state) => {    
    const { login, userInfo, support, sensors, corners } = state.data;
    return {
        login,
        userInfo,
        support,
        sensors,
        corners
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeSpotStatus }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
