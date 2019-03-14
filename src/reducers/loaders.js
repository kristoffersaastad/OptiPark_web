let defaultState = {
    loadUserName:true,
}

const global = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN-FIELD-LOADER':
            return{
                ...state,
                loadUserName:action.payload,
            }
        case 'TOASTER':        
            return{
                ...state,
                toastMessage:action.message,
                showToast:action.show,
                toastType:action.toastType,
            }
        default:        
            return state;
    }
}

export default global;