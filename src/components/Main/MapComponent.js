import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import { Map, TileLayer, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import { calcBBox, createGraph } from '../../functions/DirectFunctions';
import { ProgressBar } from '@blueprintjs/core'

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
        }
    }

    componentWillMount(){
        if(this.props.sensors&&this.props.support&&this.props.corners)this.setState({g:createGraph(this.props.sensors, this.props.support),bbox: calcBBox(this.props.corners), loadingMap:!this.state.loadingMap})        
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.sensors!==this.props.sensors) {
            if(this.props.sensors&&this.props.support&&this.props.corners)this.setState({g:createGraph(this.props.sensors, this.props.support),bbox: calcBBox(this.props.corners), loadingMap:!this.state.loadingMap})        
        }
    }

    render(){
        if (!this.props.login) {
            return <Redirect to="/"/>
        }
        return(
        <div className="map-container">
            {this.state.loadingMap?
            <div className="progressBar">Loading map<ProgressBar/></div>
            :<Map bounds={this.state.bbox} style={{width:"100%", height:'100%'}}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.keys(this.props.sensors).map((item)=>
                    <Marker onMouseOver={this.hoverMarker} id={this.props.sensors[item].properties.name} key={item} onClick={this.selectSpot} position={[this.props.sensors[item].geometry.coordinates[0],this.props.sensors[item].geometry.coordinates[1]]} icon={this.props.sensors[item].properties.status===0?sensorIconAvaliable:sensorIconTaken}></Marker>
                )}
            </Map>}
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
    return bindActionCreators({ }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
