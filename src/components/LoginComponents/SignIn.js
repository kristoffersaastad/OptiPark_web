import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { InputGroup, Button, Intent, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

import { signInUser } from '../../actions/login';

class SignIn extends Component{

    constructor(props){
        super(props);

        this.state = {
            isOpen:false,
            email:"",
            password:"",
        }
    }

    signIn = (e) => {
        e.preventDefault();
        this.props.signInUser(this.state.email, this.state.password);
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
                target={<button className="bp3-button bp3-minimal bp3-icon-log-in">Log In</button>}
                content={
                <form onSubmit={this.signIn}>
                    <label className="bp3-label">Sign In</label>
                    <InputGroup
                        id={'email'}
                        className="popover-input"
                        type={'email'}
                        placeholder={'Email'}
                        leftIcon={"user"}
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
                    <Button type="submit" role="button">Sign in</Button>
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
    return bindActionCreators({ signInUser }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
