import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {show_All_orders} from './actions/orderActions';
import Parse from 'parse';

class Users_Photos extends Component {


state={
    orders: []
}


componentDidMount(){
    window.VK.Auth.getLoginStatus((e) => {
        Parse.Cloud.run('getUsersOrders', {id: e.session.mid})
        .then((res) => {
            this.setState({
                orders: res
            })
        })
    }) 
}

    
    render(){
            console.log(this.state.orders)
        
        
        return(
            <Shadow>
                <Main>

                    {this.state.orders.map((order,k) => {
                        return(
                            <div key={k} style={{margin: 'auto'}}>
                              <h4> {order.createdAt.getUTCDate()}.{order.createdAt.getUTCMonth()}.{order.createdAt.getUTCFullYear()}  --- {order.attributes.status}</h4>
                                
                             
                                </div>
                        )
                    })}
                  <Close onClick={() => {
                      this.props.show_All_orders();
                      this.props.personData(this.props.name, this.props.avatar)}}> <img alt='x' height={'20px'} src='https://dharmamerchantservices.com/wp-content/uploads/2015/04/close.png' /> </Close>    
                </Main>
                
            </Shadow>
        );
    
    }
}

const Main = styled.div`
    position: relative;
    text-align: center;
    width: 400px;
    top: 200px;
    height: 600px; 
    background-color: white;
    border: 1px solid rgba(0,0,0, 0.5);
    border-radius: 4px;
    padding: 15px;
    margin: auto;
    z-index: 121;
`;

const Shadow = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0, 0.55);
    z-index: 120;
`;


const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    :hover{
        cursor: pointer
        box-shadow: 0 0 2px grey;
    }
`;


const mapStateToProps = (state) => {
    return{
      name: state.logInfo.loginState,
      load: state.logInfo.loading,
      vk: state.logInfo.vk,
      avatar: state.logInfo.avatar
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
      
        show_All_orders: () => {
        dispatch(show_All_orders(false))
      },
      personData: (name, ava) => {
        dispatch({
            type: 'SEND_LOGIN_DATA',
            payload: name,
            showUserData: true,
            avatar: ava
        })
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Users_Photos);