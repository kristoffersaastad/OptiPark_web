import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import { Colors } from '@blueprintjs/core';
import { changeToaster } from '../../actions/global';

class Footer extends Component{

    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.showToast!==this.props.showToast) {
            if (this.props.showToast) {
                let toastType = this.props.toastType;
                let obj = {
                    autoClose:1500,
                    position: toast.POSITION.BOTTOM_CENTER,
                }
                if (toastType==="success") {
                    obj.type = toast.TYPE.SUCCESS;
                }
                if (toastType==="error") {
                    obj.type = toast.TYPE.SUCCESS;
                }
                if(toastType==="default"){
                    obj.type = toast.TYPE.DEFAULT;
                }
                toast(this.props.toastMessage,obj)
                setTimeout(() => {
                    this.props.changeToaster("",false,"")
                }, 1500);
            }
        }
    }

    render(){
        return(
        <div className="footer" style={{backgroundColor:Colors.DARK_GRAY5, height:'50px'}}>
            <ToastContainer/>
        </div>
    )}
}

const mapStateToProps = (state) => {    
    const { showToast, toastMessage, toastType } = state.loaders;
    return {
        showToast,
        toastMessage,
        toastType,
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeToaster }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
