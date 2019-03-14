import {auth, fsRef} from '../firebase';

export const fetchInfo = () => dispatch =>{
    fsRef.collection("users").doc(auth.currentUser.uid).get()
        .then((doc)=>{
            dispatch({
                type:'USER-INFO',
                payload:doc.data()
            })
        })
        .catch(err=>{
            console.log("fetch error",err);
            
        })
}

export const changeLogin = (status) => dispatch =>{
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

export const createUser = (email,password) => {  
    auth.createUserWithEmailAndPassword(email,password)
    // .then(()=>{
    //     auth.signInWithEmailAndPassword(email,password)
    // })
    .then(()=>{ 
        fsRef.collection("users").doc(auth.currentUser.uid).set({
            email:email,
            username:email.split("@")[0],
            uid:auth.currentUser.uid,
        })
    })
    .catch((err) =>{
        console.log('create error',err);
    });
}

export const signInUser = (email,password) => async dispatch => {
    auth.signInWithEmailAndPassword(email, password)
    .catch((err) =>{
        console.log('Signin error',err);
    });
  
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
    .catch(() =>{
        console.log('Signout Error');
    });
}