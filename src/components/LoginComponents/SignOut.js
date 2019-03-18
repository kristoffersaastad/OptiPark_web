import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StyledLink from '../SubComponents/StyledLink';

import {signOutUser} from '../../actions/login'

class SignOut extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    signout = () => {
        this.props.signOutUser();
    }

    render(){
        return(
            <StyledLink onClick={this.signout} to="/" content={<button className="bp3-button bp3-minimal bp3-icon-log-out" onClick={this.signout}>Logout</button>}/>
        )}
}

const mapStateToProps = (state) => {    
    return {
        
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ signOutUser }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
