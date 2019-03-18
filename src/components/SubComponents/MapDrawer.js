import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Drawer, Icon, Classes, Button, Menu, MenuItem, Divider } from '@blueprintjs/core'
import { DatePicker } from '@blueprintjs/datetime'
import { Link } from 'react-router-dom'
import { bookSpot } from '../../actions/global';

class MapDrawer extends Component{

    constructor(props){
        super(props);

        this.state = {
            showDrawer:false,
            selectedDate:new Date,
            selectedCar:"",
        }
    }

    checkTarget = (e) => {
        let type = e.target.tagName;    
        console.log(type);
            
        if (type==="path") {
            return e.target.parentElement.parentElement.parentElement
        }
        else if (type==="svg") {
            return e.target.parentElement.parentElement
        }else if(type==="A"){
            return e.target
        }else{
            return e.target.parentElement
        }
    }

    showDrawer = () => {
        this.setState({showDrawer:!this.state.showDrawer})
    }

    selectCar = (e) => {
        e.preventDefault();
        let target = this.checkTarget(e);
        this.setState({selectedCar:target.id})
    }

    handleDate = (date) => {
        this.setState({selectedDate: date})
    }

    bookSpot = () =>{     
        this.props.bookSpot(this.state.selectedCar, this.state.selectedDate.getTime())
    }

    render(){
        return(
            <React.Fragment>
            <Drawer
                transitionDuration={3000}
                onClose={this.showDrawer}
                title="Book a spot!"
                isOpen={this.state.showDrawer}

            >
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                    {this.props.userCars?
                    <React.Fragment>
                    <div>Choose a car</div>
                    <Menu className={Classes.ELEVATION_1 + " car-menu"}>
                    {Object.keys(this.props.userCars).map((item)=>
                        <MenuItem icon="drive-time" id={this.props.userCars[item].lp} key={this.props.userCars[item].lp} onClick={this.selectCar} text={this.props.userCars[item].carName+" "+this.props.userCars[item].lp}/>
                    )}
                    </Menu></React.Fragment>:<div><i>You dont have any cars </i><Link to="/profile"><Icon icon="insert"/></Link></div>}
                    <Divider/>
                    <div>Select a date</div>
                    <DatePicker
                        onChange={this.handleDate}
                        value={this.state.selectedDate}
                        timePrecision="minute"
                    />
                    <Button intent="primary" onClick={this.bookSpot}>Book</Button>
                    
                    </div>
                </div>
                <div className={Classes.DRAWER_FOOTER}></div>
            </Drawer>
            {this.state.showDrawer?null:<div className="drawer-teaser" onClick={this.showDrawer}><Icon className="draw-icon" icon="drag-handle-vertical"/></div>}
            </React.Fragment>
        )}
}

const mapStateToProps = (state) => {    
    const { userCars } = state.data;
    return {
        userCars
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ bookSpot }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MapDrawer);
