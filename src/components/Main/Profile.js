import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Icon, Divider, Button, InputGroup, ProgressBar, Spinner } from '@blueprintjs/core'
import { Col } from 'react-bootstrap'
import { addCar, deleteCar, deleteBooking } from '../../actions/global';
import { Link } from 'react-router-dom'
import { Fade } from 'react-reveal'
import { updateUserInfo } from '../../actions/login';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state = {
            carName:"",
            regNr:"",
            email:"",
            username:"",
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.userInfo!==this.props.userInfo) {
            this.setState({
                email:this.props.userInfo.email,
                username: this.props.userInfo.username,
            })
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    checkTarget = (e) => {
        let type = e.target.tagName;        
        if (type==="path") {
            return e.target.parentElement.parentElement.parentElement
        }
        else if (type==="svg") {
            return e.target.parentElement.parentElement
        }else if(type==="DIV"){
            return e.target
        }
    }

    addCar = (e) => {
        e.preventDefault();
        if (this.state.regNr!=="") {
            console.log("ADD CAR");   
            this.props.addCar(this.state.regNr,this.state.carName)
            this.setState({carName:"",regNr:""}) 
        }
    }

    deleteCar = (e) => {
        let target = this.checkTarget(e);
        this.props.deleteCar(target.id)
        
    }

    deleteBooking = (e) => {
        let target = this.checkTarget(e);
        this.props.deleteBooking(target.id);   
    }

    updateUserInfo = (e) => {
        e.preventDefault();        
        this.props.updateUserInfo(this.state.email, this.state.username);
    }

    render(){
        return(
            
            <div className="profile-container flex">
            {this.props.userInfo?
                <React.Fragment>            
                <div className="profile-child">
                    <Icon icon="user"/> User info
                    <Divider/>
                    <form className="user-info" onSubmit={this.updateUserInfo}>
                        <label to="email" className="user-info-label">Email:</label>
                        <InputGroup
                            id={'email'}
                            type={'email'}
                            className="user-info-field"
                            placeholder={'Email'}
                            leftIcon={"user"}
                            onChange={this.handleInput}
                            value={this.state.email}
                            autoFocus
                        />
                        <label to="usename" className="user-info-label">Username:</label>
                        <InputGroup
                            id={'username'}
                            type={'text'}
                            className="user-info-field"
                            placeholder={'Username'}
                            leftIcon={"id-number"}
                            onChange={this.handleInput}
                            value={this.state.username}
                            autoFocus
                        />
                        <Button type="submit" intent="primary">Update info</Button>
                    </form>
                </div>
                <div className="profile-child">
                    <Icon icon="timeline-events"/>Bookings
                    <Divider/>
                    {this.props.userBookings?Object.keys(this.props.userBookings).map(item=>
                        <Fade bottom>
                            <div className="booking-item flex" key={"book-"+item}>
                                <div className="book-info" style={{flex:0.9}}>
                                    <Col><Icon icon="calendar"/>{" "+this.props.userBookings[item].niceDate}</Col>
                                    <Col><Icon icon="drive-time"/>{" "+this.props.userBookings[item].car}</Col>
                                </div>
                                <div className="book-item-hover" onClick={this.deleteBooking} id={this.props.userBookings[item].date} style={{flex:0.1}}>
                                    <Icon icon="trash" className="book-icon"/>
                                </div>
                            </div>
                        </Fade>
                    ):<div>You haven't booked any spots <Link to="/map"><Icon icon="send-to-map"/></Link></div>}
                </div>
                
                <div className="profile-child">
                    <Icon icon="drive-time"/>Cars
                    <Divider/>
                    <form onSubmit={this.addCar}>
                        <InputGroup
                            id={'regNr'}
                            className="regNr-input"
                            type={'text'}
                            placeholder={'License plate number'}
                            leftIcon={"unknown-vehicle"}
                            onChange={this.handleInput}
                            value={this.state.regNr}
                            autoFocus
                        />
                        <InputGroup
                            id={'carName'}
                            className="carName-input"
                            type={'text'}
                            placeholder={'Car name (optional)'}
                            leftIcon={"manually-entered-data"}
                            onChange={this.handleInput}
                            value={this.state.carName}
                        />
                        <Button type="submit" role="button" intent="primary" style={{marginTop:'5px',justifyContent:'end'}}>Add car</Button>
                    </form>
                    {this.props.userCars?Object.keys(this.props.userCars).map(item=>
                        <Fade bottom><div className="car-item flex" key={"car-"+this.props.userCars[item].lp} >
                            <Icon icon="drive-time" iconSize={20} style={{flex:0.2}}/>
                            <div style={{flex:0.7}}>
                                <div>{"License: "+this.props.userCars[item].lp}</div>
                                {this.props.userCars[item].carName?<div>{"Name: "+this.props.userCars[item].carName}</div>:null}
                            </div>
                            <div className="delete-car" id={this.props.userCars[item].lp} onClick={this.deleteCar} style={{flex:0.1}}><Icon icon="trash"/></div>
                        </div>
                        </Fade>
                    ):<div>You don't have any cars</div>}
                </div>
                </React.Fragment>
                :<ProgressBar/>}
            </div>
        )}
}

const mapStateToProps = (state) => {    
    const { userBookings, userCars, userInfo } = state.data;
    return {
        userBookings,
        userCars,
        userInfo
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateUserInfo, addCar, deleteCar, deleteBooking }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
