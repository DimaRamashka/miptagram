import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import {connect} from 'react-redux';
import {sendDataForSign, sendDataForLogin ,load_gif, sendLogged} from './actions/logActions'
import Parse from 'parse'  
import loading from './images/loading.gif';
import { View, Panel, PanelHeader, Group, List, ListItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import VKConnect from '@vkontakte/vkui-connect-mock';
import VkIcon from './images/Vk.png';


class LoginForm extends Component {
   
  


  render() {
    let styleforfields = { margin: '20px', borderRadius: '4px', height: '3vh', width: '340px', fontSize: '2vh'}

    return (
      <Shadow2>
      <Main >
      <div style={{marginTop: '15%', overflow: 'hidden', fontStyle: 'italic', fontSize: '25px'}}>
        <p> {this.props.message} </p>
        
          <SpanVK  onClick={() => {   
            window.VK.Auth.login((res) => {
              if(res.session){
                this.props.sendLogged(res.session.user.first_name);
              }
            }, window.VK.access.PHOTOS)
          }}>
            <img height='50px' src={VkIcon}/>
          </SpanVK>
        
          
          <span> <p> ИЛИ </p> </span> 

        <input id='login' type='text' style={styleforfields}/>
        <input id='pass' style={styleforfields} type='password'/>
       <div style={{textAlign: 'center'}} >
       {this.props.load === false ? 
       <div>
          <Button appearance='primary' onClick={() => 
          {
            let log = document.getElementById('login').value;
            let pass = document.getElementById('pass').value;
            this.props.message === 'Log in with' ?
              this.props.sendDataForLogin(log, pass)
            :  
            this.props.sendDataForSign(log, pass)
            
          }}> Submit  </Button>
          
          
          </div>
          :<img src={loading} height={'60px'}/>}
        </div>
      </div>  
      <Close onClick={() => {this.props.closeLogWind()}}> <img height={'20px'} src='https://dharmamerchantservices.com/wp-content/uploads/2015/04/close.png' /> </Close>
      </Main>
      </Shadow2>
    );
  }
}
const SpanVK= styled.div`
  position: relative;
  display: block;
  width: 50px;
  margin: auto;
  :hover{
    cursor: pointer;
  }
`;


const Shadow2 = styled.div`
    top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.7);
  z-index: 5;
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
const Main = styled.div`
  animation-name:expand;
  animation-duration: 0.4s;
  z-index: 6;
  position: fixed;
  width: 400px;
  height: 560px;
  top: 20vh;
  left: 39%;
  font-weight: bold;
  text-align: center;
  background: rgba(256,256,256,1);
  border-radius: 3px;
  box-shadow: 0 0 2px grey;
  min-width: 400px;
  min-height: 400px;
  @keyframes  expand {
    from { top: -50vh; }
    to { top: 20vh; }
  }
`;

const mapStateToProps = (state) => {
    return{
      message: state.logInfo.loginState,
      load: state.logInfo.loading
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
        sendDataForSign: (log, pass) => {
          dispatch(load_gif())
        Parse.User.signUp(log, pass).then((res) => {
          dispatch(sendDataForSign(log))
        })
        
      },
      sendLogged: (data) => {
            dispatch(sendLogged(data))
      },
      sendDataForLogin: (log, pass) => {
        dispatch(load_gif())
        Parse.User.logIn(log, pass).then( (res) =>{
            dispatch(sendDataForLogin(log))
        })
      },
      loading: () => {
        dispatch({
          type: 'LOG_LOADING'
        })
      },
      closeLogWind: () => {
        dispatch({
            type: 'SEND_LOGIN_DATA',
            payload: "Unlogged"
        })
      },
      logOut: () => {
          Parse.User.logOut().then((res) => {
          dispatch({
              type: 'SEND_LOGIN_DATA',
              payload: "Unlogged"
          })
        })
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);