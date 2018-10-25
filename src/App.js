import React from 'react';
import {connect} from 'react-redux';
import {sendDataForLogin} from './components/actions/logActions';
import TopChiesel from './components/TopChiesel';
import styled from 'styled-components';
import Parse from 'parse';
import LoginForm from './components/LoginForm';
import LeftMenu from './components/LeftMenu';
import RightMenu from './components/RightMenu';
import UserDataPage from './components/UserDataPage';
import PhotoList from './components/PhotoList';
import PhotoChanger from './components/PhotoChanger';
import Reminder from './components/Reminder';
import OrderInfoPanel from './components/OrderInfoPanel';
import VkPhotosPicker from './components/VkPhotosPicker';
import Users_Orders from './components/Users_Orders';


class App extends React.Component {

  
componentWillMount(){
  Parse.initialize('ts5Lq50Tr1zgRATMC3hbjezDA3uDyi0b9fJf3ijV', 'ruLlVEq1J54FpxJBbkSOlfl9Nk220c6PT6YHCQZp');
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  window.VK.Auth.getLoginStatus((e) => {
    e.status === 'connected' ?
      window.VK.Api.call('users.get', {user_ids: e.session.mid, v:"5.84", fields: 'photo_100'}, (r) => {
        console.log(r)
        this.props.sendDataForLogin(r.response[0].first_name, r.response[0].photo_100);  
      })
    : null
  }, )
  
}
    
          
        
  




componentWillUpdate(nextProps, nextState) {
  if(nextProps.photos !== undefined && nextProps.photos !== null && nextProps.photos !== [] && nextProps.photos !== this.props.photos){
    localStorage.setItem('miptagramState', JSON.stringify(nextProps.photos))  
  }
}

  render() {
    if(this.props.photoNumber !== undefined){
      return(
        <PhotoChanger />
      )
    }
    else

    return (
      <div className="App" >
      
      {this.props.loginState === 'Log in with' || this.props.loginState === 'Sign up with' ? 
        <LoginForm/>: 
      this.props.loginUserState === true ?
      <UserDataPage /> : this.props.reminder !== 'close' ?
      <Reminder />: this.props.orderInfo === 'show'  ? 
      <OrderInfoPanel/>:  this.props.vk !== false ?
      <VkPhotosPicker /> : this.props.show_All_orders === true ? 
      <Users_Orders/>: null }
      
         <TopChiesel />
         <Wrapper>
           <ForLeft>
              <LeftMenu/>
            </ForLeft>  
            <ForCenter>
            <PhotoList/>  
            </ForCenter>  
            <ForRight>
              <RightMenu/>
              
            </ForRight> 
            
           </Wrapper>
           
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    loginState: state.logInfo.loginState,
    loginUserState: state.logInfo.loginUserState,
    photos: state.PhotosInfo.photos,
    photoNumber: state.PhotosInfo.photoNumber,
    reminder: state.logInfo.reminder,
    orderInfo: state.order.orderInfo,
    vk: state.PhotosInfo.showVk,
    show_All_orders: state.order.show_All_orders
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    
    sendDataForLogin: (name, photo) => {
      dispatch(sendDataForLogin(name, photo))
    }
  }
};

const Wrapper = styled.div`
  position: relative;
  width: 1100px;
  height: 100px;
  margin: auto;
  vertical-align: top;
`;

const ForLeft = styled.div`
  position: relative;
  display: inline-block;
  width: 210px;
  height: 100px;
  z-index: 4;
`;

const ForCenter = styled.div`
  position: relative;
  display: inline-block;
  width: 600px;
  padding-top: 25px;
  text-align: center;
  height: 100px;
`;
const ForRight = styled.div`
  position: relative;
  display: inline-block;
  width: 240px;
  height: 100px;
  z-index: 1;
`;
export default connect(mapStateToProps, mapDispatchToProps)(App);







