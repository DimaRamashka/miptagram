import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Parse from 'parse'
import {connect} from 'react-redux';
import {reminder, onMakeOrder} from './actions/logActions';
import {orderInfo, goodbye, loading_order} from './actions/photoActions';
import loading from './images/loading.gif';

class OrderInfoPanel extends Component {

  state={
      k: undefined,
      tel: ''
  }

  
componentDidMount(){
    Parse.initialize('ts5Lq50Tr1zgRATMC3hbjezDA3uDyi0b9fJf3ijV', 'ruLlVEq1J54FpxJBbkSOlfl9Nk220c6PT6YHCQZp')
    Parse.serverURL = 'https://parseapi.back4app.com/';
}

  handleChangeTel(event) {
        
        event.target.value[event.target.value.length-1] === '1' || event.target.value[event.target.value.length-1] === '2' || 
        event.target.value[event.target.value.length-1] === '3' || event.target.value[event.target.value.length-1] === '4' || 
        event.target.value[event.target.value.length-1] === '5' || event.target.value[event.target.value.length-1] === '6' ||
        event.target.value[event.target.value.length-1] === '7' || event.target.value[event.target.value.length-1] === '8' || 
        event.target.value[event.target.value.length-1] === '9' || event.target.value[event.target.value.length-1] === '0' ||
        event.target.value[event.target.value.length-1] === undefined ? 
        this.setState({
            tel: event.target.value
        }) : null
    
  }

  updateOrderTable(data) {
      
    return new Promise 
    ( 
        (resolve, reject) => { 
            Parse.Cloud.run('createOrder', {data: data},{
            success:
                (res) => {  
                    console.log('sha udaly')              
                    localStorage.removeItem('miptagramOrder');
                    resolve()
                },
                error: 
                (err) => {
                    console.log('err');
                    reject()
                }
            })
        }
    )    
    
  }

  render() {
      let styleFor_Input = {fontSize: '20px',width: '60%',borderRadius: '4px', height: '22px', border: '1px solid rgba(0,0,0, 0.2)'}
    let styleForHostel = {backgroundColor: '#87CEFA'};
    let hostels = ['1', '2', '3', '4', 'профилак', '6', '7', '8', '9', '10', '11', '12'];
    return (
        <BlackWrapper >
        <MainDiv>
       
        <InfoBlock style={{margin: '7px'}}>
           <ForString> {'Ваше имя:   '} </ForString>
            <input style={styleFor_Input} id='name' type='text'/>
        </InfoBlock>
        <InfoBlock  > 
         {'Общежитие:    '}
        </InfoBlock> 
        <div style={{display: 'inline', width: '150px',position: 'relative'}} >  
        {
            hostels.map((hostel, k) => {
                let styleButton=(k === this.state.k) ?  styleForHostel :{};
                return(
                <Hostel style={styleButton} key={k} onClick={() => {this.setState({k: k})}}>
                    {hostel}
                </Hostel>
                )    
            })
        }   
        </div>
        <InfoBlock >
            <ForString>   {'Комната:   '} </ForString>
            <input style={styleFor_Input} id='room' type='text'/>
        </InfoBlock>
        <InfoBlock >
            <ForString> {'Телефон:'}</ForString>
            <InfoBlock style={{fontSize: '20px'}} >   +7{' '} <input style={{fontSize: '20px',width: '150px',borderRadius: '4px', height: '22px', border: '1px solid rgba(0,0,0, 0.2)'}} id='tel' type='text' maxLength="10" value={this.state.tel} onChange={(event) => {this.handleChangeTel(event)}}/></InfoBlock >
        </InfoBlock>    
        <InfoBlock>
            <ForString> {'Комментарий:'}</ForString>
            <textarea style={{width: '60%', height: '100px', borderRadius: '4px', border: '1px solid rgba(0,0,0, 0.2)'}} id='comment'  cols='20'  />
        </InfoBlock> 
        <InfoBlock>
                <ForString>
                {this.props.creating_order === 'none' ?     
                <span>     
                <Button appearance='primary' onClick={() => {
                    this.props.loading_order('load');
                    window.VK.Auth.getLoginStatus((e) => {
                        if(e.status === 'connected'){
                        let vk_id = e.session.mid ? e.session.mid : undefined;
                        let hostel = hostels.filter((hostel, k) => k === this.state.k)[0];
                        let data = {                                  
                                    vk_id: vk_id,
                                    photos: this.props.photos,
                                    name: document.getElementById("name").value,
                                    hostel: hostel,
                                    room: document.getElementById("room").value,
                                    tel: this.state.tel,
                                    comment: document.getElementById("comment").value,
                                    photoType: this.props.photoType,
                                    status: 'new'
                                    }
                        
                        
                        
                        if(data.tel.length < 10 || data.name === undefined || data.hostel === undefined){
                            this.props.reminder('Данные введены не корректно');
                            this.props.loading_order('none');
                        }
                         else{
                                           
                        
                            Parse.Cloud.run('createOrder', {data: data}).then(
                                (res) => {
                                    
                                    localStorage.removeItem('miptagramState');
                                    
                                    this.props.orderInfo();
                                    this.props.reminder('Заказ успешно создан');
                                    this.props.goodbye();
                                    this.props.loading_order('none');
                                    
                                    
                                }
                            )} 
                         
                         
                        }  else{


                            let vk_id = undefined;
                            let hostel = hostels.filter((hostel, k) => k === this.state.k)[0];
                            let data = {                                  
                                        vk_id: vk_id,
                                        photos: this.props.photos,
                                        name: document.getElementById("name").value,
                                        hostel: hostel,
                                        room: document.getElementById("room").value,
                                        tel: this.state.tel,
                                        comment: document.getElementById("comment").value,
                                        photoType: this.props.photoType,
                                        status: 'new'
                                        }
                            
                            
                            
                            if(data.tel.length < 10 || data.name === undefined || data.hostel === undefined){
                                this.props.reminder('Данные введены не корректно');
                                this.props.loading_order('none');
                            }
                             else{
                                               
                            
                                Parse.Cloud.run('createOrder', {data: data}).then(
                                    (res) => {
                                        
                                        localStorage.removeItem('miptagramState');
                                        
                                        this.props.orderInfo();
                                        this.props.reminder('Заказ успешно создан');
                                        this.props.goodbye();
                                        this.props.loading_order('none');
                                        
                                        
                                    }
                                )} 

                            
                        }
                        
                        }) 
                                             
                    }}> Подтвердить </Button>
                
                 </span> :
                <p> <img src={loading} height='50px'/> </p> }
                   <span> <Button appearance='danger' onClick={() => {this.props.onBack()}}> Вернуться  </Button> </span>
                </ForString>
            </InfoBlock>    
        </MainDiv>
        </BlackWrapper>
    );
  }
}

const mapStateToProps = (state) => {
    return{
      photos: state.PhotosInfo.photos,
      photoNumber: state.PhotosInfo.photoNumber,
      loading: state.PhotosInfo.loading,
      photoType: state.PhotosInfo.photoType,
      creating_order: state.PhotosInfo.creating_order
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    
    return{
        onBack: () => {
            dispatch(orderInfo('hide'))
      },
      reminder: (message) => {
        dispatch(reminder(message))
      },
      orderInfo: () =>{
        dispatch(orderInfo('hide'));
      },
      goodbye: () =>{
        dispatch(goodbye('hide'))
      },
      loading_order: (loading) => {
          dispatch(loading_order(loading))
      }

    }
  };

const InfoBlock = styled.div`
    margin: auto;
    margin-top: 15px;
    vertical-align: top;
`;

const BlackWrapper = styled.div`
    animation-name: blacking;
    animation-duration: 0.4s;
    position: fixed; 
    left: 0px; 
    top: 0px; 
    width: 100%; 
    height: 100%; 
    z-index: 100;
    background: rgba(0,0,0, 0.4);
    @keyframes  blacking {
        from { rgba(0,0,0, 0); }
        to { rgba(0,0,0, 0.4); }
      }
`;

const ForString = styled.div`
    margin: 5px;
    width: 90%;
    display: inline-block;
    vertical-align: top;
`;
const Hostel = styled.div`
    position: relative;
    display: inline-block;
    padding: 7px;
    margin: 3px;
    margin-top: 7px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid #DCDCDC;
    cursor: pointer;
    :hover{
        background: rgba(10,10,10, 0.2);
    }
`;

const MainDiv = styled.div`
    position: relative;
    width: 450px;
    margin: auto;
    margin-top: 10vh;
    padding-top: 50px;
    animation-name:expand;
    animation-duration: 0.4s;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    font-family: Lobster;
    height: 700px; 
    border-radius: 3px;
    overflow: auto;
    background: rgba(250,250,250, 1);
    @keyframes  expand {
      from { margin-top: -50vh; }
      to { margin-top: 10vh; }
    }
`;
 
export default connect(mapStateToProps, mapDispatchToProps)(OrderInfoPanel);