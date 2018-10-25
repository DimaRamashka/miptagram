import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import styled from 'styled-components';
import {connect} from 'react-redux';
import {uploadPhoto_PC, showLoading, uploadPhoto_Inst, orderInfo, addPhotofromVK} from './actions/photoActions'
import {sendLogged} from './actions/logActions'
import {reminder} from './actions/logActions'
import axios from 'axios';
import instIcon from './images/Inst.png'
import VkIcon from './images/Vk.png';
import PCIcon from './images/PC.png';
import InstagramPhotoPicker from 'react-instagram-photo-picker';


class RightMenu extends Component {

  

  fileUploadHandler = (files) => {
    const fd = new FormData();
    let photos = this.props.photos ? this.props.photos : [];
    fd.append('file',files[0], files[0].name); 
    axios.post('https://www.englishpatient.org/api/upload',fd, {
        onUploadProgress: ProgressEvent => {
            this.props.showLoading();
        }
    })
      .then(res => {
        let reversePhotos = photos.reverse();
        let newOrder = reversePhotos.concat([{
            x: 0,
            y: 0,
            url: res.data.url,
            quant: 1
          }])                
          this.props.uploadPhoto_PC(
            newOrder.reverse())
      })
    }


  
  
  priceAndQuantity(photos){
    let quantity = photos ? photos.reduce((sum, p) => (+sum + +p.quant), 0) : 0;
    let photoblock = quantity < 5 ? 4: quantity < 10 ? 9: quantity < 13 ? 12: quantity < 17 ? 16: quantity < 21 ? 20: quantity;
    let price =(quantity === 0 ? 0 :quantity < 5 ? 100: quantity < 10 ? 180: quantity < 13 ? 250: quantity < 17? 300: quantity < 21? 400: `${quantity*17}`); 
    return(
        [quantity, price, photoblock]
    )
  }
  
  render() {
    let [quantity, price, photoblock] = this.priceAndQuantity(this.props.photos);
    let dropzonestyle={display: 'inline', fontSize: '15px', verticalAlign: 'middle', width: '140px', height: '30px'}
    return (
      
    <LeftPart>
<div style={{zIndex: 10, position: 'fixed', width: '10vw', height: '100vh', top: 0, left: 0}}>
        <InstagramPhotoPicker
          ref={ref => this.instaDialog = ref}
          clientId='af2ceaf5ec5a4d13b185a02a0b17d8aa'
          onPhotosPicked={urls => {
            let photos = this.props.photos ? this.props.photos.reverse(): [];
            let newPhotos = photos.concat(urls.map((url) => {return {url: url, quant: 1, width: 2}})).reverse();
            this.props.uploadPhoto_Inst(newPhotos)
        
          }}
        />
        </div>
      
    <div style={{fontWeight: 'bold',  position: 'relative', margin: 'auto', top: '10px', backgroundColor: 'white', borderRadius: '4px', width: '100%', padding: '0.05px 0', boxShadow : '0 0 2px rgba(0,0,0,0.5)'}}>
      <InternalDiv><span> Количество: {quantity}</span> <div style={{color: 'grey', display: 'inline-block', Position: 'relative'}}>/ {photoblock} </div> </InternalDiv>
      <InternalDiv> Цена: {price} руб </InternalDiv>
    </div>   
      
        <div style={{top: '30px', paddingTop: '30px', position: 'relative', borderTop: '1px solid grey ', borderBottom: '1px solid grey ', zIndex: 5}}>
          
          <SpanInBut>
            <Dropzone onClick={() => {this.instaDialog.hideDialog();}} style={dropzonestyle} onDrop={this.fileUploadHandler}>
              <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'10px'}} border={'0px'} height={'30px'} src={PCIcon}/>              
              {'    '} Фото с компьютера
            </Dropzone>

          </SpanInBut>
          <SpanInBut  onClick={() => {this.instaDialog.showDialog();}} > 
            <img alt=' ' style={{verticalAlign: 'middle',display: 'inline-block', marginTop: '2px', marginRight:'10px'}} border={'0px'} height={'32px'} src={instIcon}/>             
            {'    '} Фото из Instagram
          </SpanInBut>

          <SpanInBut  onClick={() => {
            window.VK.Auth.login((e) => {
              if (e.session) {
                window.VK.Api.call('photos.getAll', {v:"5.73"}, (photos) => {
                  this.props.addPhotofromVK(photos.response.items)
                })          
              } else {
                /* Пользователь нажал кнопку Отмена в окне авторизации */
              }
            }, window.VK.access.PHOTOS)  
          }}> 
            <img alt=' ' style={{verticalAlign: 'middle',display: 'inline-block', marginTop: '2px', marginRight:'10px'}} border={'0px'} height={'32px'} src={VkIcon}/>             
            {'              '} Фото из Vk
          </SpanInBut>
          
        </div>
        <Mk_Order  onClick={() => {
            this.props.photos.length === 0 ?
            this.props.reminder(
              'Чтобы сделать заказ, нужно добавить фото',
              this.props.price
            ) :
            window.VK.Auth.getLoginStatus(
              (e) => {
              if(e.status !== 'connected'){
                this.props.reminder('Привяжите VK, чтобы отслеживать заказ', this.props.price);
                this.props.orderInfo('hide', price)
              } else {
                if(quantity < photoblock) { 
                  this.props.reminder('Вы можете добавить еще '+ `${photoblock-quantity}` +' фото, за те же деньги',this.props.price);
                  this.props.orderInfo('hide', price);
                } else {
                  this.props.orderInfo('show', price)
                }
              }})}}> 
          
          <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'10px'}} border={'0px'} height={'30px'} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/600px-Green_check.svg.png'}/>              
            {'    '}Создать заказ 
            
          </Mk_Order> 
        
    </LeftPart>
     
   
    );
  }
}


const mapStateToProps = (state) => {
  return{
    photos: state.PhotosInfo.photos ? state.PhotosInfo.photos : [],
    price: state.order.price
  }
};

const mapDispatchToProps = (dispatch) => {

  return{
    uploadPhoto_PC: (photos) => { 
      dispatch(uploadPhoto_PC(photos) )
    },
    uploadPhoto_Inst: (photos) => { 
      dispatch(uploadPhoto_Inst(photos) )
    },
    showLoading: () => {
      dispatch(showLoading())
    },
    reminder: (message, price) => {
      dispatch(reminder(message, price))
    },
    addPhotofromVK: (photos) => {
      dispatch(addPhotofromVK(photos))
    },
    orderInfo: (action, price) => {
      dispatch(orderInfo(action, price ))
    },
    sendLogged: (data) => {
      dispatch(sendLogged(data))
    }
  }
};


const LeftPart = styled.div`
  width: 220px;
  height: 600px;
  position: fixed;
  font-size: 13px;
  display: inline-block;
  margin-left: 10px;
  top: 60px;
`;

const InternalDiv = styled.div`
  position: relative;
  margin-top: 12.5px;
  margin-bottom: 12.5px;
  text-align: center;
  font-family: Lobster;
  font-size: 18px;
`;

const Mk_Order = styled.div`
  line-height: 36px;
  position: relative; 
  text-align: left;
  vertical-align: middle;
  opacity: 0.9;
  margin: 0 auto;
  color: black	;
  font-weight: bold;
  width: 98%;
  height: 40px;
  border-radius: 8px;
  border: 2px solid rgba(80, 220, 80, 0.7);
  padding-left: 6px;
  padding-top: 5px;
  font-size: 19px;
  font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif  ;
  margin-top: 65px;
  margin-bottom: 6px;
  background: rgba(100, 200, 100, 0.4);
  z-index: 5;
  :hover{
    cursor: pointer;
    background: rgba(100, 200, 100, 0.8);
  }

`;

const SpanInBut = styled.div`
  position: relative; 
  text-align: left;
  vertical-align: middle;
  opacity: 0.9;
  margin: 0 auto;
  color: black	;
  font-weight: bold;
  width: 98%;
  height: 40px;
  border-radius: 2px;
  padding-left: 6px;
  padding-top: 5px;
  font-size: 15px;
  font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif  ;
  margin-top: 6px;
  margin-bottom: 6px;
  z-index: 82;
  :hover{
    cursor: pointer;
    background-color: rgba(200, 200, 250, 0.8);
  }
  `;


export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);