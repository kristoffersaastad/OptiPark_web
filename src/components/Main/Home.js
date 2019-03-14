import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {Fade} from 'react-reveal'
import Hero from '../SubComponents/Hero';
import { changeHeaderBkg } from '../../actions/global';
import { Icon } from '@blueprintjs/core';


class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            divRef:1,
            scroll:0,
            radioColor:'white',
            above:true,
        }
    }

    componentWillMount(){
        this.props.changeHeaderBkg(true)
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('mousemove',this.handleMouseMove)
    }
    componentWillUnmount(){
        this.props.changeHeaderBkg(false)
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('mousemove',this.handleMouseMove)

    }

    handleMouseMove = () => {

    }

    handleScroll = () => {
        if (window.scrollY>200&&this.state.above) {
            this.setState({scroll:window.scrollY, radioColor:'rgb(57, 75, 89)',above:!this.state.above})
        }
        if (window.scrollY<200&&!this.state.above) {
            this.setState({scroll:window.scrollY, radioColor:'white', above:!this.state.above})            
        }
    }

    scrollToRef = (e) => {
        window.scrollTo(0, 1);
    }

    handleSetActive = (to) => {
        console.log("click");
        
        
    }

    render(){
        return(
        <div className="home-container">
            <Hero/>
            <div className="radio-selectors">
                <Link className="radio-selectors-item" style={{backgroundColor:this.state.radioColor}} smooth to={"div0"} offset={-150} duration={500} onSetActive={this.handleSetActive}></Link>
                <Link className="radio-selectors-item" style={{backgroundColor:this.state.radioColor}} smooth to={"div1"} offset={-150} duration={500} onSetActive={this.handleSetActive}></Link>
                <Link className="radio-selectors-item" style={{backgroundColor:this.state.radioColor}} smooth to={"div2"} offset={-150} duration={500} onSetActive={this.handleSetActive}></Link>
            </div>
            <div className="sub-container-home">
                <Element className="text-container-home" name="div0">Test</Element>
                <Element className="text-container-home" name="div1">Test</Element>
                <Element className="text-container-home" name="div2">Test</Element>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {    
    const { headerBkg } = state.global;
    return {
        headerBkg
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeHeaderBkg }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
