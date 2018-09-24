const photoChangeReducer = (
    state={photos: [], photoNumber: undefined, photoType: 'photos', showVk: false, creating_order: 'none'}, action) => {
    switch (action.type){
        case 'load_order': state={
            ...state,
            photos: action.payload,
            loading: false,
            photoNumber: 0
        };
        break;
        case 'uploadPhoto_Inst': state={
            ...state,
            photos: action.payload,
            loading: false,
            photoNumber: undefined
        };
            break;
            
            case 'change_photo_type': state={
                ...state,
                photoType: action.payload
            };
            break;
        case 'load_order_from_LS': state={
            ...state,
            photos: action.payload,
            photoNumber: undefined
        };
        break;
        case 'show_Cropper': state={
            ...state,
            photoNumber: action.payload
        };
            break;
        case 'save_changed_PHOTO': state={
            ...state,
            photos: action.payload,
            photoNumber: undefined
        };
            break;
            
        case 'close_CROPPER': state={
            ...state,
            photoNumber: undefined
        };
            break;
        case 'show_LOADING': state={
            ...state,
            loading: true
        };
            break;
            case 'goodbye': state={
                ...state,
                photos: []
            };
                break;  
                case 'Vk_photos': state={
                    ...state,
                    showVk: action.photos
                };
                    break;
                    case 'cancel_VK_add': state={
                        ...state,
                        showVk: false
                    };
                        break;
                        case 'approve_choice': state={
                            ...state,
                            photos: action.payload,
                            showVk: false
                        };
                            break;
                            case 'loading_order': state={
                                ...state,
                                creating_order: action.payload
                            };
                                break;
                            
                     
                    default: null
    }
    return state;
};

export default photoChangeReducer;
