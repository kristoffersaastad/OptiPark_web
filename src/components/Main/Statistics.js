import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Charts from '../SubComponents/Charts';

class Statistics extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render(){
        return(
        <div className="stat-container">
            <Charts/>
        </div>
    )}
}

const mapStateToProps = (state) => {    
    return {
        
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
