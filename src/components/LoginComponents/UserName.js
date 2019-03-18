import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StyledLink from '../SubComponents/StyledLink';
import { Popover, PopoverInteractionKind, Position , Button, Spinner} from '@blueprintjs/core';
import SignOut from './SignOut';

class UserName extends Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){
        return(
            this.props.loadUserName?
            <Spinner size={25}/>:
            this.props.userInfo.uid==="7EtQI6poyZaTq4kuFqfibmVzI5F3"?
            <Popover
                    className="profile-options"
                    interactionKind={PopoverInteractionKind.HOVER}
                    popoverClassName="bp3-popover-content-sizing"                
                    position={Position.BOTTOM}
                    target={<StyledLink to="/admin" content={<button className="bp3-button bp3-minimal bp3-icon-helper-management">Admin</button>}/> }
                    content={
                        <div className="flex flex-column">
                            <SignOut/>
                        </div>
                    }
                />          
            :<React.Fragment>
                <StyledLink to="/map" content={<button className="bp3-button bp3-minimal bp3-icon-map">Map</button>}/>
                <Popover
                    className="profile-options"
                    interactionKind={PopoverInteractionKind.HOVER}
                    popoverClassName="bp3-popover-content-sizing"                
                    position={Position.BOTTOM}
                    target={<Button rightIcon={"cog"} className="bp3-button bp3-minimal">{this.props.userInfo.username}</Button>}
                    content={
                        <div className="flex flex-column">
                            <StyledLink to="/profile" content={<div className="bp3-button bp3-minimal bp3-icon-user">Profile</div>}/>
                            <SignOut/>
                        </div>
                    }
                />
            </React.Fragment>
        )}
}

const mapStateToProps = (state) => {    
    const { userInfo } = state.data;
    const { loadUserName } = state.loaders;
    return {
        userInfo,
        loadUserName,

    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserName);
