import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {Fade} from 'react-reveal'


class HomeText extends Component{

    constructor(props){
        super(props);

        this.state = {
            currDiv:0,
        }
    }

    handleSetActive = (to) => {
        console.log("click");        
    }
    handleRadioSelected = (e) => {
        console.log(e.target.id.replace("div",""));
        this.setState({currDiv:e.target.id.replace("div","")})
    }

    render(){
        return(
        <React.Fragment>
            <div className="radio-selectors">
                <Link className="radio-selectors-item" onClick={this.handleRadioSelected} id="div0" style={{backgroundColor:this.props.radioColor}} smooth to={"div0"} offset={-50} duration={500} onSetActive={this.handleSetActive}></Link>
                <Link className="radio-selectors-item" onClick={this.handleRadioSelected} id="div1" style={{backgroundColor:this.props.radioColor}} smooth to={"div1"} offset={-50} duration={500} onSetActive={this.handleSetActive}></Link>
                <Link className="radio-selectors-item" onClick={this.handleRadioSelected} id="div2" style={{backgroundColor:this.props.radioColor}} smooth to={"div2"} offset={-50} duration={500} onSetActive={this.handleSetActive}></Link>
            </div>
            <div className="sub-container-home">
                <Element className="text-container-home" name="div0"><Fade bottom>Test</Fade></Element>
                <Element className="text-container-home colored-text-container" name="div1"><Fade right>Test</Fade></Element>
                <Element className="text-container-home" name="div2"><Fade left>Test</Fade></Element>
            </div>
        </React.Fragment>
        )}
}

const mapStateToProps = (state) => {    
    const { } = state;
    return {
        
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeText);
