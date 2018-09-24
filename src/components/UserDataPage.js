import React, { Component } from 'react';
import Parse from 'parse'
import styled from 'styled-components';
import Button from '@atlaskit/button';
import {connect}  from 'react-redux';
import loading from './images/loading.gif';
import {load_gif} from './actions/logActions';
import {Login_with_vk} from './actions/photoActions';
import {show_All_orders} from './actions/orderActions';


class PersonDataPage extends Component {


componentDidMount() {
}

componentWillUpdate(nextProps, nextState) {
}





  render() {
    let UserName =this.props.name;
    return (
      <Shadow2>
      <Main className="App" >
        <h1>  {UserName} </h1>
        <p> <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginBottom: '5px', borderRadius: '30px'}} border={'0px'} height={'60px'} src={this.props.avatar}/>  </p>
        <p>
          <Button appearance='primary' onClick={() => {
          this.props.closeLogWind(UserName, this.props.avatar);  
          this.props.show_All_orders(true);
        }}>
          Мои заказы
        </Button>
       </p> 
        { this.props.load === false ?
        <Button appearance='warning' onClick={() => {
          this.props.logOut()
        }} > Выйти </Button>
      :  <img alt='Loding...' src={loading} height='60px'/>}
        
        <Close onClick={() => {this.props.closeLogWind(UserName, this.props.avatar)}}> <img alt='x' height={'20px'} src='https://dharmamerchantservices.com/wp-content/uploads/2015/04/close.png' /> </Close>
      </Main>
      </Shadow2>
    );
  }
}

const Shadow2 = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.7);
  z-index: 110;
`;

const Main = styled.div`
  animation-name: down;
  animation-duration: 0.4s;
  font-style: italic;
  position: fixed;
  text-align: center;
  width: 26vw;
  height: 40vh;
  top: 20vh;
  left: 39vw;
  background: rgba(256,256,256,1);
  border-radius: 3px;
  box-shadow: 0 0 2px grey;
  z-index: 5;
  @keyframes  down {
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
      name: state.logInfo.loginState,
      load: state.logInfo.loading,
      vk: state.logInfo.vk,
      avatar: state.logInfo.avatar
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
      logOut: () => {
          dispatch(load_gif());
          window.VK.Auth.getLoginStatus((e) => {
            e.status === 'connected' ?
            window.VK.Auth.logout( function(r) {
              console.log(r)
            }): null
          })
          Parse.User.logOut().then((res) => {
          dispatch({
              type: 'SEND_LOGIN_DATA',
              payload: "Unlogged"
          })
        })
      },
      closeLogWind: (name, avatar) => {
        dispatch({
            type: 'SEND_LOGIN_DATA',
            payload: name,
            avatar: avatar
        })
      },
      Login_with_vk: () => {
        dispatch(Login_with_vk())
      },
      show_All_orders: (data) => {
        dispatch(show_All_orders(data))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(PersonDataPage);