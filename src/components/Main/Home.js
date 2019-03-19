import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Fade} from 'react-reveal'
import { changeHeaderBkg } from '../../actions/global';
import HomeText from '../SubComponents/HomeText';
import {Icon, Button} from '@blueprintjs/core'
import { showJoin } from '../../actions/global';


class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            divRef:1,
            scroll:0,
            radioColor:'white',
            above:true,
            show:false,
            currDiv:0,
        }
    }

    componentWillMount(){
        this.props.changeHeaderBkg(true)
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('mousemove',this.handleMouseMove)
        this.props.showJoin(true);
    }
    componentWillUnmount(){
        this.props.changeHeaderBkg(false)
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('mousemove',this.handleMouseMove)

    }

    handleMouseMove = (e) => {
        if (e.screenY>window.innerHeight&&!this.state.showUp) {
            this.setState({showUp:!this.state.showUp})
        }
        if (e.screenY<window.innerHeight&&this.state.showUp) {
            this.setState({showUp:!this.state.showUp})
        }
        
    }

    handleScroll = () => {
        if (window.scrollY>200&&this.state.above) {
            this.setState({scroll:window.scrollY, radioColor:'rgb(57, 75, 89)',above:!this.state.above})
        }
        if (window.scrollY<200&&!this.state.above) {
            this.setState({scroll:window.scrollY, radioColor:'white', above:!this.state.above})            
        }
    }

    handleSetActive = (to) => {
        console.log("click");        
    }
    handleRadioSelected = (e) => {
        console.log(e.target.id.replace("div",""));
        this.setState({currDiv:e.target.id.replace("div","")})
    }

    scrollTop = () => {
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }

    render(){
        
        return(
        <div className="home-container">
            <div className="hero"></div>
            <Fade cascade>
                <div className="hero-text">
                    <div className="title-text"><b><span style={{color:'#4580E6'}}>Opti</span>Park</b></div>
                    <div className="title-subtext">Parking made easy</div>
                </div>
            </Fade>
            <HomeText radioColor={this.state.radioColor}/>
            {this.state.showUp?<Icon style={{color:""}} onClick={this.scrollTop} icon="upload" iconSize={18} className="scrollTopIcon showUp"/>:null}
        </div>
    )}
}

const mapStateToProps = (state) => {    
    const { headerBkg } = state.global;
    const { login } = state.data;
    return {
        headerBkg,
        login
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeHeaderBkg, showJoin }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
