import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Fade} from 'react-reveal'


class Hero extends React.Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div>
                <div className="hero"></div>
                <Fade cascade>
                    <div className="hero-text">
                        <div className="title-text"><b><span style={{color:'#4580E6'}}>Opti</span>Park</b></div>
                        <div className="title-subtext">Parking made easy</div>
                    </div>
                </Fade>
            </div>
        );
    }
}

const mapStateToProps = (reducer) => {    
    const {login} = reducer.data;
      return {
          login:login
      }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Hero);
  

