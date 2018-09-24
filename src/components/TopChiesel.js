import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {sendDataForLogin} from './actions/logActions';

class TopChiesel extends React.Component {

  

componentDidMount(){
    
}

render(){
    
    return (
        
        <MainWrapper>
            <Divv>
            <DivForhref>
            <a href="http://miptagram.ru" style={{textDecoration:'none', color: 'white', height: '100%', position: 'relative'}}> 
            <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', borderRadius: '7px', marginBottom: '5px', marginRight: '5px'}} border={'0px'} height={'30px'} src={'http://miptagram.ru/img/vk_share_green.jpg'}/>  
             MIPTAGRAM 
            </a>
            </DivForhref>
            {this.props.loginState === "Unlogged" || this.props.loginState === 'Log in with' || this.props.loginState === 'Sign up with'?
            <DivForLogInfo >
                 
                 <Button onClick={() => {
                     window.VK.Auth.login((res) => {
                        res.session ?
                        this.props.sendDataForLogin(res.session.user.first_name):
                        null
                     }, window.VK.access.PHOTOS)
                 }}>Привязать VK</Button> 
            </DivForLogInfo> 
            :
            <DivForLogInfo > 
                
                <Button onClick={() => {this.props.personData(this.props.loginState, this.props.avatar)}}>
                    <img alt=' '  style={{verticalAlign: 'middle', display: 'inline-block', marginBottom: '5px',marginRight: '5px', borderRadius: '15px'}} border={'0px'} height={'30px'} 
                    src={this.props.avatar}/> 
                    {this.props.loginState} 
                </Button>
            </DivForLogInfo>                 
            }
                
            </Divv>
        </MainWrapper>
    );
}
}
const Divv = styled.div`
    position: relative;
    display: inline-block;
    height: 30px;
    margin: 10px 15px;
    width: 100%;
    verticel-align: middle;
    text-align: right;
`;

const DivForhref = styled.div`
    display: inline;
    position: absolute;
    width: 210px;
    height: 20px;
    text-align: left;
    left: 16%;
`;
const Button = styled.div`
    position: relative;
    display: inline;
    padding: 12px 7px ;
    height: 30px;
    color: whitesmoke;
    :hover{
        background: rgba(1,1,1, 0.2);
        cursor: pointer;
    }
`;

const DivForLogInfo = styled.div`
    display: inline;
    position: relative;
    height: 100%;
    padding: 10px;
    text-align: right;
    margin-right: 20%;
`;

const MainWrapper=styled.div`
    position: fixed;
    display: inline-block;
    vertical-align: middle;
    width: 100vw;
    top: 0;
    height: 50px;
    min-width: 1100px;
    background-color: #4c68d7;
    font-size: 25px;
    font-weight: bold;
    left: 0;
    border-radius: 2px;
    font-family: Lobster;
    box-shadow: 0 0 4px rgba(0,0,0, 0.8);

    z-index: 3;
`;



const mapStateToProps = (state) => {
    return{
      loginState: state.logInfo.loginState,
      photos: state.PhotosInfo.photos,
      avatar: state.logInfo.avatar
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
        loginStart: () => {
        dispatch({
            type: 'SEND_LOGIN_DATA',
            payload: 'Log in with'
        })
      },
      sendDataForLogin: (name) => {
        dispatch(sendDataForLogin(name))
      },
      signupStart: () => {
        dispatch({
            type: 'SEND_LOGIN_DATA',
            payload: 'Sign up with'
        })
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

  export default connect(mapStateToProps, mapDispatchToProps)(TopChiesel);