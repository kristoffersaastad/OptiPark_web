import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {Fade} from 'react-reveal'
import book from '../../images/homepage/book.png'
import laptopPhone from '../../images/homepage/laptop_phone.png'
import stats from '../../images/homepage/stats.png'
import contact from '../../images/homepage/contact.png'

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
                <Link className="radio-selectors-item" onClick={this.handleRadioSelected} id="div3" style={{backgroundColor:this.props.radioColor}} smooth to={"div3"} offset={-50} duration={500} onSetActive={this.handleSetActive}></Link>
            </div>
            <div className="sub-container-home">
                <Element className="text-container-home flex" name="div0">
                    <div style={{flex:0.5}}>
                        <Fade bottom><img src={laptopPhone} className="laptop"/></Fade>
                    </div>
                    <Fade><div className="text-right" style={{flex:0.5}}>
                        The simple usage of the map will direct you to the closest available parking spot.
                    </div></Fade>
                </Element>
                <Element className="text-container-home colored-text-container flex" name="div1">
                    <div style={{flex:0.5}}>
                        <Fade left><img src={book} className="book"/></Fade>
                    </div>
                    <Fade right><div className="text-left" style={{flex:0.5}}>To ensure a spot is available at your arrival, you can simply book a spot before hand.</div></Fade>
                </Element>
                <Element className="text-container-home flex" name="div2">
                    <Fade left><div style={{flex:0.5}} className="text-right">The web page also hands you the expected demand and availability for the parking lot.</div></Fade>
                    <div style={{flex:0.5}}><Fade right><img src={stats} className="laptop"/></Fade></div>
                </Element>
                <Element className="text-container-home colored-text-container flex" name="div3">
                    <div style={{flex:0.5}}><Fade left><img src={contact} className="book"/></Fade></div>
                    <Fade right><div style={{flex:0.5}} className="text-right">Feel free to contact us either through the contact form, or the live chat if you have questions or need to come in contact.</div></Fade>
                </Element>
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
