import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TextArea, InputGroup, Radio, RadioGroup, Button} from '@blueprintjs/core'
import { submitContactForm } from '../../actions/global';

class Contact extends Component{

    constructor(props){
        super(props);

        this.state = {
            text : "",
            topic:1,
            topicText:"Bug",
            email:"",
        }
    }
    componentWillMount(){
        if (this.props.userInfo) {
            this.setState({email:this.props.userInfo.email})
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.userInfo!==this.props.userInfo) {
            this.setState({email:this.props.userInfo.email})
        }
    }

    submitContactForm = () => {
        if(!this.props.showToast){
            this.props.submitContactForm(this.state.email, this.state.topicText, this.state.text, new Date().getTime())        
            this.setState({
                text : "",
                topic:1,
                topicText:"Bug",
                email:"",
            })
        }
    }

    handleTopicChange = (e) => {             
        this.setState({topic:parseInt(e.target.value),topicText:e.target.label})
    }

    handleText = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    render(){
        return(
        <div className="container contact-container flex">
            <div className="info-container equal-child">
                <h4>Contact info</h4>
                {/* <hr/> */}
                <div>Address:</div>
                <i className="">Univercity of California, Santa Barbara, 93117 Goleta</i>
                <div>Mobile:</div>
                <i>+1 111 222 3344</i>
                <hr/>
                <div className="">Opening Hours:</div>
                <div className="opening-hours flex"><div className="oh-day">Mon: </div><div className="oh-hour">10:00am-5:00pm</div></div>
                <div className="opening-hours flex"><div className="oh-day">Tue: </div><div className="oh-hour">10:00am-5:00pm</div></div>
                <div className="opening-hours flex"><div className="oh-day">Wed: </div><div className="oh-hour">10:00am-5:00pm</div></div>
                <div className="opening-hours flex"><div className="oh-day">Thu: </div><div className="oh-hour">10:00am-5:00pm</div></div>
                <div className="opening-hours flex"><div className="oh-day">Fri: </div><div className="oh-hour">10:00am-5:00pm</div></div>
                <div className="opening-hours flex"><div className="oh-day">Sat: </div><div className="oh-hour" style={{color:'red'}}>Closed</div></div>
                <div className="opening-hours flex"><div className="oh-day">Sun: </div><div className="oh-hour" style={{color:'red'}}>Closed</div></div>
                <hr/>
            </div>
            <span className="bp3-navbar-divider"></span>
            <div className="contact-form-container">
                <h3>Contact Form</h3>
                <RadioGroup
                    name="Choose topic"
                    onChange={this.handleTopicChange}
                    selectedValue={this.state.topic}
                    inline
                >
                    <Radio label="Bug" value={1}/>
                    <Radio label="Question" value={2} />
                    <Radio label="Other.." value={3} />
                </RadioGroup>
                <InputGroup
                    id={"email"}
                    className="contact-email-input"
                    value = {this.state.email}
                    onChange = {this.handleText}
                    placeholder="Enter email"
                />
                <TextArea
                    id={"text"}
                    className="contact-text"
                    onChange={this.handleText}
                    value={this.state.text}
                    fill={true}
                    large
                />
                <Button type="" onClick={this.submitContactForm}>Submit form</Button>
            </div>
        </div>
    )}
}

const mapStateToProps = (state) => {    
    const { userInfo } = state.data;
    const { showToast } = state.loaders
    return {
        userInfo,
        showToast,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ submitContactForm }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
