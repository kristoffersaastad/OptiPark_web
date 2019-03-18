import {fsRef, auth} from '../firebase'

export const changeHeaderBkg = (status) => dispatch => {
    dispatch({
        type:'SET-HEADER-BKG',
        payload:status,
    })
}

export const submitContactForm = (email, topic, text, date) =>async  dispatch=>{
    fsRef.collection("contactForms").doc(topic).collection("forms").doc(date+"-"+email).set({
        text, email, date,
    }).then(()=>{
        dispatch(changeToaster("Thank you for your request",true, "success", 1500))
        
    })
    .catch(err=>{
        console.log("CONTACT-FORM-ERROR",err);
        dispatch(changeToaster("Error submitting your contact request",true, "error", 1500))
       
    })
}

export const addCar = (lp, carName) => async dispatch => {
    fsRef.collection("users").doc(auth.currentUser.uid).collection("cars").doc(lp).set({
        lp,carName,
    })
    dispatch({
        type:'TOASTER',
        message:"Car added",
        show:true,
        toastType:"success",
        time:1500,
    })
}

export const deleteCar = (lp) => async dispatch => {
    fsRef.collection("users").doc(auth.currentUser.uid).collection("cars").doc(lp).delete()
    .then(()=>{
        dispatch(changeToaster("Car deleted",true, "success", 1500))
    })
    .catch(()=>{
        dispatch(changeToaster("Error deleting the car",true, "error", 1500))
    })
}

export const bookSpot = (car, date) => async dispatch => {
    fsRef.collection("users").doc(auth.currentUser.uid).collection("bookings").doc(""+date).set({
        car, date
    })
    dispatch({
        type:'TOASTER',
        message:"Booked a spot",
        show:true,
        toastType:"success",
        time:1500,
    })
}

export const deleteBooking = (id) => async dispatch =>{
    fsRef.collection("users").doc(auth.currentUser.uid).collection("bookings").doc(""+id).delete()
    .then(()=>{
        dispatch(changeToaster("Booking deleted",true, "success", 1500))
    })
    .catch(()=>{
        dispatch(changeToaster("Error deleting booking",true, "error", 1500))
    })
}

export const changeToaster = (message, show, toastType, time) => dispatch =>{
    dispatch({
        type:'TOASTER',
        message, show, toastType, time
    })
}