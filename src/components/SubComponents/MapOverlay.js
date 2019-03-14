import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// For selection of parking lot and booking of spots
class MapOverlay extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){
        return(null)
    }
}

const mapStateToProps = (state) => {    
    const { } = state;
    return {
        
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MapOverlay);
