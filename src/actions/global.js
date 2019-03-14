import {fsRef} from '../firebase'

export const changeHeaderBkg = (status) => dispatch => {
    dispatch({
        type:'SET-HEADER-BKG',
        payload:status,
    })
}

export const submitContactForm = (email, topic, text, date) =>async  dispatch=>{
    fsRef.collection("contactForms").doc(topic).update({
        [date+"-"+email]:{
            email:email,
            text:text,
            date:date,
        }
    }).then(()=>{
        dispatch(changeToaster("Thank you for your request",true, "success"))
        
    })
    .catch(err=>{
        console.log("CONTACT-FORM-ERROR",err);
        dispatch(changeToaster("Error submitting your contact request",true, "error"))
       
    })
}

export const changeToaster = (message, show, toastType) => dispatch =>{
    dispatch({
        type:'TOASTER',
        message, show, toastType
    })
}