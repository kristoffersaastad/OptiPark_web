import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Spinner, InputGroup } from '@blueprintjs/core'
import { getAllChats, getChat, addPost } from '../../actions/chat';
import { getUser } from '../../actions/login';
import $ from 'jquery'

class Admin extends Component{

    constructor(props){
        super(props);

        this.state = {
            text:"",
            currInit:0,
        }
    }

    componentWillMount(){
        this.props.getAllChats();
    }

    componentDidUpdate(prevProps){
        if(prevProps.chatMessages!==this.props.chatMessages){
            this.scrollSmoothToBottom();
        }
    }

    getCurrChat = (e) => {
        this.props.getChat(e.target.id);
        this.setState({currInit:e.target.id})
    }

    addMessage = (e) => {
        e.preventDefault();
        this.props.addPost(this.state.currInit, this.state.text, this.props.userInfo.uid)
        this.setState({text:""})
    }

    handleText = (e) => {
        this.setState({
            text:e.target.value,
        })
    }

    scrollSmoothToBottom = () => {
        var div = document.getElementById("admin-chat");
        $('#admin-chat').animate({
           scrollTop: div.scrollHeight - div.clientHeight
        }, 50);
    }

    render(){
        return(
            <div className="admin-container flex">
                {this.props.allChats?
                <React.Fragment>
                <div className="display-chats" style={{flex:1}}>
                    {Object.keys(this.props.allChats).map(item=>
                        <div key={"chat-"+item} id={this.props.allChats[item].initDate} className="chat-field" onClick={this.getCurrChat}>{new Date(this.props.allChats[item].initDate).toLocaleString().slice(0,new Date(this.props.allChats[item].initDate).toLocaleString().length-3)+"  "+this.props.allChats[item].users.name}</div>
                    )}
                </div>
                <div className="admin-chat-container"  style={{flex:1}}>
                <div className="admin-chat" id="admin-chat">
                {this.props.chatMessages?
                    Object.keys(this.props.chatMessages).map((item)=>
                        this.props.chatMessages[item].createdBy===this.props.userInfo.uid?
                        <React.Fragment>
                        <div className="chat-message you">
                            <div>{this.props.chatMessages[item].post}</div>
                        </div>
                        <div className="message-date-you">{"Sent: " + this.props.chatMessages[item].date}</div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <div className="chat-message receiver">
                            <div>{this.props.chatMessages[item].post}</div>
                        </div> 
                        <div className="message-date-receiver">{"Sent: " + this.props.chatMessages[item].date}</div>
                        </React.Fragment>
                    )
                    :<div>Choose a chat</div>}
                </div>
                    <form onSubmit={this.addMessage}>
                        <InputGroup placeholder="Start say something" value={this.state.text} onChange={this.handleText}/>
                    </form>
                </div>
                </React.Fragment>
                :<Spinner size={25}/>}
                {/* <div className="chat-window" id="chat-window">
                    
                </div>
                 */}
            </div>   
        )}
}

const mapStateToProps = (state) => {    
    const { userInfo, singleUser } = state.data;
    const { chatMessages, chatInfo, allChats } = state.global;
    
    return {
        chatMessages,
        chatInfo,
        userInfo,
        allChats,
        singleUser
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAllChats, getChat, getUser, addPost }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
