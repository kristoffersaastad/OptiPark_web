import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { InputGroup, Button, Intent, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
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
            this.props.createUser(this.state.email,this.state.password)
        }
    }

    handleChange = (e) => {        
        this.setState({[e.target.id]:e.target.value})
    }

    render(){
        return(
            <Popover
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="bp3-popover-content-sizing"
                position={Position.BOTTOM}
                target={<button className="bp3-button bp3-minimal bp3-icon-new-person">Sign Up</button>}
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
                        />
                    <InputGroup
                        id={'password'}
                        className="popover-input"
                        type={'password'}
                        leftIcon={"lock"}
                        placeholder={"Password"}
                        intent={Intent.PRIMARY}
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <InputGroup
                        id={'veripassword'}
                        className="popover-input"
                        type={'password'}
                        leftIcon={"lock"}
                        placeholder={"Verify password"}
                        intent={Intent.PRIMARY}
                        onChange={this.handleChange}
                        value={this.state.veripassword}
                    />
                    <InputGroup
                        id={'lp'}
                        className="popover-input"
                        type={'text'}
                        leftIcon={"drive-time"}
                        placeholder={"License plate"}
                        intent={Intent.PRIMARY}
                        onChange={this.handleChange}
                        value={this.state.lp}
                    />
                <Button type="submit" role="button">Create</Button>
                {this.state.notify?<Notify value="Password does not match"/>:null}
                </form>
                }
            />
        )}
}

const mapStateToProps = (state) => {    
    const { login } = state.data;
    return {
        login
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createUser }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
