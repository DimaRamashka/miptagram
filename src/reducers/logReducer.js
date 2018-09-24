const logReducer = (state={loginState: 'Unlogged', reminder: 'close', loading: false, vk: false, avatar: ''}, action) => {
    switch (action.type){
        case 'SEND_LOGIN_DATA': state={
            ...state,
            loginState: action.payload,
            loginUserState: action.showUserData,
            loading: false,
            vk: action.vk,
            avatar: action.avatar
        };
            break;
            case 'Reminder': state={
                ...state,
                reminder: action.payload
            };
                break;   
                case 'ORDER_INFO': state={
                    ...state,
                    orderInfo: action.payload
                };
                    break;   
                    case 'LOG_lOADING': state={
                        ...state,
                        loading: true
                    };
                        break; 
                        case 'vk_log_in': state={
                            ...state,
                            vk: 'logged'
                        };
                            break;
                            default: null
                        
    }
    return state;
};

export default logReducer;