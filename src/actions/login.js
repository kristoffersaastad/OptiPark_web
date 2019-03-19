import {auth, fsRef} from '../firebase';



export const changeLogin = (status) => async dispatch =>{
    dispatch({
        type:'LOGIN',
        payload:status,
    })
    setTimeout(() => {
        dispatch({
            type:'LOGIN-FIELD-LOADER',
            payload:null
        })    
    }, 1000);
    
}

export const createUser = (email,password, lp, carName) => async dispatch=>{  
    auth.createUserWithEmailAndPassword(email,password)
    .then(()=>{ 
        fsRef.collection("users").doc(auth.currentUser.uid).set({
            email:email,
            username:email.split("@")[0],
            uid:auth.currentUser.uid,
        })
        fsRef.collection("users").doc(auth.currentUser.uid).collection("cars").doc(lp).set({
            lp,carName,
        })
    })
    .catch((err) =>{
        console.log('create error',err);
        dispatch({
            type:'TOASTER',
            message:err.message,
            show:true,
            toastType:"error",
            time:3000,
        })
    });
}

export const getUser = (uid) => async dispatch =>{
    fsRef.collection("users").doc(uid).get()
    .then((doc)=>{
        console.log(doc.data());
        dispatch({
            type:'SINGLE-USER',
            payload:doc.data()
        })
    })
}

export const signInUser = (email,password) => async dispatch => {
    auth.signInWithEmailAndPassword(email, password)
    .catch((err) =>{
        console.log('Signin error',err);
        dispatch({
            type:'TOASTER',
            message:err.message,
            show:true,
            toastType:"error",
            time:3000,
        })
    });
  
}

export const updateUserInfo = (email, username) => async dispatch => {

    fsRef.collection("users").doc(auth.currentUser.uid).update({
        email,
        username,
    })
    auth.currentUser.updateEmail(email)
}


export const signOutUser = () => async dispatch => {
    auth.signOut().then(()=>{
        dispatch({
            type:'USER-INFO',
            payload:null,
        })
        dispatch({
            type:'LOGIN-FIELD-LOADER',
            payload:true
        })
    })
    .catch((err) =>{
        console.log('Signout Error',err);
        dispatch({
            type:'TOASTER',
            message:err.message,
            show:true,
            toastType:"error",
            time:3000,
        })
    });
}