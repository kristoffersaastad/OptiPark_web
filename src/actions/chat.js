import {fsRef, auth} from '../firebase'

export const newChat = () => async dispatch=>{
    let admin = "7EtQI6poyZaTq4kuFqfibmVzI5F3";
    let initDate = new Date().getTime();
    fsRef.collection("chats").doc(""+initDate).set({
        users:{uid:auth.currentUser.uid, name:auth.currentUser.email.split("@")[0], admin}, initDate
    })
    .then(()=>{
        let format_date = new Date(initDate).toLocaleString();
        format_date = format_date.slice(0,format_date.length-3)
        fsRef.collection("chats").doc(""+initDate).collection("chat").doc(""+initDate).set({
            post:"Welcome. Feel free to ask about the website",date:format_date, uid:admin
        })
    })
    .then(()=>{
        fsRef.collection("chats").doc(""+initDate).onSnapshot((doc)=>{
            dispatch({
                type:'GET-CHAT',
                payload:doc.data(),
            })
        })
    })
    .then(()=>{
        fsRef.collection("chats").doc(""+initDate).collection("chat").onSnapshot((docs)=>{
            let messages = []
            docs.forEach((doc)=>{
                messages.push(doc.data())
            })
            if (messages.length>0) {
                
                dispatch({
                    type:'CURRENT-CHAT',
                    payload:messages,
                })       
            }
        })
    })
}

export const addPost = (initDate, post, uid) => async dispatch => {
    let date = new Date().getTime();
    let format_date = new Date(date).toLocaleString();
    format_date = format_date.slice(0,format_date.length-3)    
    fsRef.collection("chats").doc(""+initDate).collection("chat").doc(""+date).set({
        post, date:format_date, createdBy:uid
    })
}

export const getAllChats = () => async dispatch =>{
    fsRef.collection("chats").onSnapshot((docs)=>{
        let chats = []
        docs.forEach(doc=>{
            chats.push(doc.data())
        })
        if (chats.length>0) {
            dispatch({
                type:'ALL-CHATS',
                payload:chats,
            })
        }
    })
}

export const getChat = (initDate) => async dispatch => {
    fsRef.collection("chats").doc(""+ initDate).collection("chat").onSnapshot((docs)=>{
        let messages = []
        docs.forEach(doc=>{
            messages.push(doc.data())
        })
        if (messages.length>0) {
            dispatch({
                type:'CURRENT-CHAT',
                payload:messages,
            })
        }
    })
}

export const closeChat = () => async dispatch => {
    dispatch({
        type:'CURRENT-CHAT',
        payload:null,
    })
}