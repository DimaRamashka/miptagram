export function load_localstorage(order){
    return{
        type: 'load_order_from_LS',
        payload: order
    }
};approve_choice

export function approve_choice(photos){
    return{
        type: 'approve_choice',
        payload: photos
    }
};


export function addPhotofromVK(data){
    return{
        type: 'Vk_photos',
        photos: data
    }
};

export function cancel_VK_add(){
    return{
        type: 'cancel_VK_add'
    }
};

export function Login_with_vk(){
    return{
        type: 'Vk_login'
    }
};

export function loading_order(data){
    return{
        type: 'loading_order',
        payload: data
    }
};
export function uploadPhoto_PC(order){
    return{
        type: 'load_order',
        payload: order
    }
};
export function change_photo_type(type){
    return{
        type: 'change_photo_type',
        payload: type
    }
};

export function uploadPhoto_Inst(order){
    return{
        type: 'uploadPhoto_Inst',
        payload: order
    }
};

export function goodbye(){
    return{
        type: 'goodbye'
    }
};

export function orderInfo(action){
    return{
        type: 'order_Info_Panel',
        payload: action
    }
};

export function show_Cropper(number){
    return{
        type: 'show_Cropper',
        payload: number
    }
};

export function onSavePhoto(data){
    return{
        type: 'save_changed_PHOTO',
        payload: data
    }
};

export function onDeletePhoto(data){
    return{
        type: 'save_changed_PHOTO',
        payload: data
    }
};

export function onCancelPhoto(data){
    return{
        type: 'close_CROPPER'
    }
};

export function showLoading(){
    return{
        type: 'show_LOADING'
    }
};