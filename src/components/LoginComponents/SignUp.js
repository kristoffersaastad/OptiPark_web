import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { InputGroup, Button, Intent, Popover, PopoverInteractionKind, Position, Classes } from '@blueprintjs/core';
import { createUser } from '../../actions/login';
import {toast} from 'react-toastify'
import Notify from '../SubComponents/Notify';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            email:"",
            password:"",
            veripassword:"",
            lp:"",
            carName:"",
            open:false,
        }
    }

    

    createUser = (e) =>{
        e.preventDefault();
        
        if(this.state.password!==this.state.veripassword){
            toast("Passwords doesn't match",{
                position: toast.POSITION.BOTTOM_CENTER,
                type:toast.TYPE.ERROR,
                autoClose:1500
            });
        }else if (this.state.email===""||this.state.password===""||this.state.veripassword===""||this.state.lp==="") {
            toast("Fields are empty",{
                position: toast.POSITION.BOTTOM_CENTER,
                type:toast.TYPE.ERROR,
                autoClose:1500
            });
        }else{
            this.props.createUser(this.state.email,this.state.password, this.state.lp, this.state.carName)
            this.setState({open:false})
        }
    }

    handleChange = (e) => {        
        this.setState({[e.target.id]:e.target.value})
    }

    openPopover = () =>{
        if (window.scrollY!==0) {
            window.scrollTo({top:0, left:0, behavior:'smooth'});
            setTimeout(() => {
                this.setState({open:!this.state.open})                    
            }, 830);
        }else{
            this.setState({open:!this.state.open})    
        }
    }
    
    closePopover = (e) => {
        this.setState({open:false})
    }

    render(){
        console.log(this.props.showJoin);
        
        
        
        return(
            <React.Fragment>
            <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp3-popover-content-sizing"
                position={Position.BOTTOM}
                target={<Button style={{marginLeft:'10px'}} onClick={this.openPopover} intent="primary">Sign Up</Button>}
                isOpen={this.state.open}
                onClose={this.closePopover}
                content={
                <form
                onSubmit={this.createUser}
                >
                    <label className="bp3-label">Sign Up</label>
                    <InputGroup
                        id={'email'}
                        className="popover-input"
                        type={'email'}
                        placeholder={'Email'}
                        leftIcon={"user"}
                        style={{color:'white'}}
                        intent={Intent.PRIMARY}
                        onChange={this.handleChange}
                        value={this.state.email}
                        autoFocus
                        />
                    <InputGroup
                        id={'password'}
                        className="popover-input"
                        type={'password'}
                        leftIcon={"lock"}
                        placeholder={"Password"}
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <InputGroup
                        id={'veripassword'}
                        className="popover-input"
                        type={'password'}
                        leftIcon={"lock"}
                        placeholder={"Verify password"}
                        onChange={this.handleChange}
                        value={this.state.veripassword}
                    />
                    <InputGroup
                        id={'lp'}
                        className="popover-input"
                        type={'text'}
                        leftIcon={"drive-time"}
                        placeholder={"License plate"}
                        onChange={this.handleChange}
                        value={this.state.lp}
                    />
                    <InputGroup
                        id={'carName'}
                        className="popover-input"
                        type={'text'}
                        leftIcon={"plus"}
                        placeholder={"Car name (optional)"}
                        onChange={this.handleChange}
                        value={this.state.carName}
                    />
                <Button type="submit" role="button">Create</Button>
                {this.state.notify?<Notify value="Password does not match"/>:null}
                </form>
                }
                />
                {this.props.showJoin&&!this.props.login?<Button className="join-btn" intent="success" onClick={this.openPopover}>Join now!</Button>:null}
            </React.Fragment>
        )}
}

const mapStateToProps = (state) => {    
    const { login } = state.data;
    const { showJoin } = state.global;
    return {
        login,
        showJoin
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createUser }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
