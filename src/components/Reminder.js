import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import {connect}  from 'react-redux';
import {closeReminder, reminder, sendDataForLogin} from  './actions/logActions';
import {orderInfoRem} from './actions/photoActions';

class Reminder extends Component {


componentDidMount() {
}

componentWillUpdate(nextProps, nextState) {
}





  render() {
    
    let message =this.props.message;
    message[0] === 'З' ? setTimeout(() => {this.props.closeReminder()}, 1500) : null
    return (
      <Shadow2>
      <Main className="App" >
        <h2>  {message} </h2> 
        {message[0] === 'В' ? 
        <Button onClick={() => {
          window.VK.Auth.getLoginStatus((res) => {
            if(res.status === 'connected'){ 
            this.props.closeReminder()
              this.props.orderInfo('show')
            }
              else 
              this.props.reminder('Привяжите VK, чтобы отслеживать заказ',this.props.price);
          })
          
          
        }} appearance='primary'> 
          Все равно заказать 
        </Button>
          
           : message[0] === 'П' ? 
          <span>
            <p>
            <Button appearance='primary' onClick={() => {
              window.VK.Auth.login((res) => {
                res.session ?
                window.VK.Api.call('users.get', {user_ids: res.session.mid, v:"5.84", fields: 'photo_100'}, (r) => {
                  this.props.sendDataForLogin(r.response[0].first_name, r.response[0].photo_100); 
                  this.props.closeReminder()
                  this.props.orderInfo('show')
                })
                :
                null
             }, window.VK.access.PHOTOS)
            }}>
              Привязать 
            </Button> 
            </p>
            <Button onClick={() => {
              this.props.closeReminder()
              this.props.orderInfo('show')
            }} appearance='warning'> 
              Мне это не нужно 
            </Button>
          </span>
            : null}
        <Close onClick={() => {
          if( message[0] === 'Д'){
          this.props.closeReminder();
          this.props.orderInfo('show')
          } else if(message[0] === 'П' || message[0] === 'Ч'|| message[0] === 'В') {
            this.props.closeReminder()
          } else {
            this.props.closeReminder()
            this.props.orderInfo('show')
          
          }
        }}> 
          <img alt='x' height={'20px'} src='https://dharmamerchantservices.com/wp-content/uploads/2015/04/close.png' /> </Close>
      </Main>
      </Shadow2>
    );
  }
}

const Shadow2 = styled.div`
  animation-name:dark;
  animation-duration: 0.4s;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.4);
  z-index: 5;
  @keyframes  drop {
    from { background: rgba(0,0,0, 0); }
    to { background: rgba(0,0,0, 0.4); }
  }
`;

const Main = styled.div`
  animation-name:drop;
  animation-duration: 0.4s;
  font-style: italic;
  position: fixed;
  text-align: center;
  width: 36%;
  height: 40vh;
  top: 20vh;
  left: 32%;
  padding: 20px;
  padding-top: 35px;
  background: rgba(256,256,256,1);
  border-radius: 3px;
  box-shadow: 0 0 2px grey;
  z-index: 5;
  @keyframes  drop {
    from { top: -50vh; }
    to { top: 20vh; }
  }
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
      message: state.logInfo.reminder,
      price: state.order.price
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
      closeReminder: () => {
          dispatch(closeReminder())
        
      },
      orderInfo: (data) => {
        dispatch(orderInfoRem(data))
      },
      reminder: (message) => {
        dispatch(reminder(message))
      },
      sendDataForLogin: (name, ava) => {
        dispatch(sendDataForLogin(name, ava))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
