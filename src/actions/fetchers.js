import {fsRef, auth} from '../firebase'

export const fetchInfo = () => async dispatch =>{
    fsRef.collection("users").doc(auth.currentUser.uid).onSnapshot((doc)=>{
        dispatch({
            type:'USER-INFO',
            payload:doc.data()
        })
    })
}

export const fetchCars = () => async dispatch => {
    fsRef.collection("users").doc(auth.currentUser.uid).collection("cars").onSnapshot((docs)=>{
        let cars = [];
        docs.forEach(doc=>{
            cars.push(doc.data())
        })
        if(cars.length>0){
            dispatch({
                type:'USER-CARS',
                payload:cars,
            })
        }
    })
}

export const fetchBookings = () => async dispatch=> {
    fsRef.collection("users").doc(auth.currentUser.uid).collection("bookings").onSnapshot((docs)=>{
        let bookings = []
        docs.forEach(doc=>{
            let data = doc.data();
            data.niceDate = new Date(data.date).toLocaleString();
            data.niceDate = data.niceDate.slice(0,data.niceDate.length-3)
            bookings.push(data)
        })
        if (bookings.length>0) {
            dispatch({
                type:'USER-BOOKINGS',
                payload:bookings,
            })
        }
    })
}