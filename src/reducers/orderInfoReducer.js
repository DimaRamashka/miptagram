const orderChangeReducer = (
    state={orderInfo: 'hide', show_All_orders: false}, action) => {
    switch (action.type){
        case 'order_Info_Panel': state={
            ...state,
            orderInfo: action.payload
        };
        break;
        case 'show_All_orders': state={
            ...state,
            show_All_orders: action.payload
        }
        
    }
    return state;
};

export default orderChangeReducer;