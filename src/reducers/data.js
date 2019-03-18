const INITIAL_STATE = {
      login:window.localStorage.getItem("LOGIN")!==null,
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'USER-INFO':
      return Object.assign({}, state, {
        userInfo:action.payload
      })
    case 'SIGNLE-USER':
      return Object.assign({}, state, {
        singleUser:action.payload
      })
    case 'USER-CARS':
      return Object.assign({}, state, {
        userCars:action.payload
      })
    case 'USER-BOOKINGS':
      return Object.assign({}, state, {
        userBookings:action.payload
      })
    case 'LOGIN':
      return Object.assign({}, state, {
        login:action.payload
      })
    case 'GET-GEO':
      return Object.assign({}, state, {
        json:action.payload,
        geometry:action.payload.geometry,
        corners:action.payload.corners,
        support:action.payload.support,
        sensors:action.payload.sensors,
        entrance:action.payload.entrance,
      })
    default:
      return state;
    }
};