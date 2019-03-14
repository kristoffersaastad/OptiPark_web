import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default class Notify extends Component{
    render(){
        console.log(this.props.value);
        
        toast(this.props.value,{
            position: toast.POSITION.BOTTOM_CENTER,
            type:toast.TYPE.ERROR,
            autoClose:1000
        });
        return(<ToastContainer className="toastUp"/>)
    }
}
