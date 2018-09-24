


export function sendDataForSign(log, photo){
    return{
        type: 'SEND_LOGIN_DATA',
        payload: log
    }
};

export function reminder(message){
    return{
        type: 'Reminder', 
        payload: message
    }
};

export function load_gif(){
    return{
        type: 'LOG_lOADING'
    }
};

export function vk_log_in(){
    return{
        type: 'vk_log_in'
    }
};

export function closeReminder(){
    return{
        type: 'Reminder',
        payload: 'close'
    }
};
export function sendDataForLogin(name, photo) {
        return{
            type: 'SEND_LOGIN_DATA',
            payload: name, 
            avatar: photo
        }
};

export function sendLogged(data){
    return{
        type: 'SEND_LOGIN_DATA',
        payload: data,
        vk: true
    }
};

