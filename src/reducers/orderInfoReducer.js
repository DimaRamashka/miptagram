const orderChangeReducer = (
    state={orderInfo: 'hide', show_All_orders: false, price: 0}, action) => {
    switch (action.type){
        case 'order_Info_Panel': state={
            ...state,
            orderInfo: action.payload,
            price: action.price
        };
        break;
        case 'Rem_order_Info_Panel': state={
            ...state,
            orderInfo: action.payload
        };
        break;
        case 'show_All_orders': state={
            ...state,
            show_All_orders: action.payload
        };
        break;
        
        
    }
    return state;
};

export default orderChangeReducer;