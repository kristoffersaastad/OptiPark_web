let defaultState = {
    headerBkg:false,
    parkinglot:"Library",
}

const global = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET-SELECTED':
            return{
                ...state,
                selected:action.payload,
            }
        case 'USER-POS':
            return{
                ...state,
                userPos:action.payload,
            }
        
        case 'ASSIGN-SPOT':
            return{
                ...state,
                path:action.payload.path,
                sensor:action.payload.spot,
            }
        case 'LOAD-USERPAGE':
            return{
                ...state,
                loadUserPage:action.payload.load,
                userPageSuccess:action.payload.success,
            }
        case 'SET-POLYLINE':
            return{
                ...state,
                latlngs:action.payload
            }
        case 'SET-HEADER-BKG':
            return{
                ...state,
                headerBkg:action.payload
            }
        case 'GET-CHAT':
            return{
                ...state,
                chatInfo:action.payload,
            }
        case 'CURRENT-CHAT':
            return{
                ...state,
                chatMessages:action.payload,
            }
        case 'ALL-CHATS':
            return{
                ...state,
                allChats:action.payload,
            }
        case 'SHOW-JOIN':
            return{
                ...state,
                showJoin:action.payload,
            }
        default:        
            return state;
    }
}

export default global;