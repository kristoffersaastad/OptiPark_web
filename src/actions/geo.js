import {fsRef} from '../firebase';

export const getGeo = (lot) => async dispatch =>{
    fsRef.collection("parkinglots").doc(lot).get()
    .then((doc)=>{
        
        let json = JSON.parse(doc.data().json);
        if (doc.exists) {
            dispatch({            
                type:'GET-GEO',
                payload:json
            })    
        }else{
            console.log("no such document");
            
        }
    }).catch(()=>console.log("getgeo error"))
}

export const writeGeo = (json,name) => async =>{
    fsRef.collection("parkinglots").doc(name).set({
        json:JSON.stringify(json),
        name:name,
    })
    .catch(()=>{
        console.log("error");
        
    })   
}

export const changeUserPos = (lat, lng) => dispatch => {
    dispatch({
        type:'USER-POS',
        payload: [lat, lng],
    })
}

export const assignSpot = (spot, path) => dispatch => {
    dispatch({
        type:'ASSIGN-SPOT',
        payload: {
            spot:spot,
            path:path,
        }
    })
}
