import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Icon , InputGroup, Spinner } from '@blueprintjs/core';
import { newChat, addPost, closeChat } from '../../actions/chat';
import $ from 'jquery'
import Fade from 'react-reveal'

class Chat extends Component{

    constructor(props){
        super(props);

        this.state = {
            show:false,
            text:"",
        }
    }


    componentDidUpdate(prevProps){
        if(prevProps.chatMessages!==this.props.chatMessages){
            this.scrollSmoothToBottom();
        }
    }

    handleShow = () => {
        this.setState({show:!this.state.show})
    }

    startChat = () => {
        if(!this.state.show)this.props.newChat(this.props.userInfo.uid)
        this.setState({show:!this.state.show})
    }

    addMessage = (e) => {
        e.preventDefault();

        if (this.state.text!=="") {
            this.props.addPost(this.props.chatInfo.initDate, this.state.text, this.props.userInfo.uid)
            this.setState({text:""})
        }
    }

    handleText = (e) => {
        this.setState({
            text:e.target.value,
        })
    }

    scrollSmoothToBottom = () => {
        if (this.props.chatMessages) {
            var div = document.getElementById("chat-window");
            $('#chat-window').animate({
            scrollTop: div.scrollHeight - div.clientHeight
            }, 50);
        }  
    }

    closeChat = () => {
        this.setState({show:!this.state.show, text:""})
        this.props.closeChat();
    }

    render(){   
        return(
            // LAG EGEN POPOVER
            <React.Fragment>
                {this.props.userInfo?<Icon icon="chat" onClick={this.state.show?this.closeChat:this.startChat} intent="primary" iconSize="22" className="chat-icon"/>:null}
                {this.state.show?<Fade right><div className="chat-container">
                    <div style={{textAlign:'end', color:'white', cursor:'pointer', marginBottom:'5pxw'}} onClick={this.closeChat}><Icon icon="cross" /></div>
                    <div className="chat-window" id="chat-window">
                        {this.props.chatMessages?
                            Object.keys(this.props.chatMessages).map((item)=>
                                this.props.chatMessages[item].createdBy===this.props.userInfo.uid?
                                <div className="chat-message-wrapper" key={"m-"+item}>
                                <div className="chat-message you">
                                    <div>{this.props.chatMessages[item].post}</div>
                                </div>
                                <div className="message-date-you">{"Sent: " + this.props.chatMessages[item].date}</div>
                                </div>
                                :
                                <div className="chat-message-wrapper" key={"m-"+item}>
                                <div className="chat-message receiver">
                                    <div>{this.props.chatMessages[item].post}</div>
                                </div> 
                                <div className="message-date-receiver">{"Sent: " + this.props.chatMessages[item].date}</div>
                                </div>
                            )
                        :<Spinner size={25}/>}
                    </div>
                    <form onSubmit={this.addMessage}>
                        <InputGroup placeholder="Start say something" value={this.state.text} onChange={this.handleText}/>
                    </form>
                </div></Fade>:null}
            </React.Fragment>
        )}
}

const mapStateToProps = (state) => {    
    const { userInfo } = state.data;
    const { chatInfo, chatMessages } = state.global;
    
    return {
        userInfo,
        chatInfo,
        chatMessages,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ newChat, addPost, closeChat }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat);

