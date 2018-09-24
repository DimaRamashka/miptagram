import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {change_photo_type} from './actions/photoActions'

class RightMenu extends Component {


  

 
  
  render() {
    let style_Photos_Or_Stickers={backgroundColor: 'rgba(76, 104, 215, 0.32)', borderLeft: '4px solid #4c68d7', width: '238px'}
    return (
      
        <RightPart>
        { this.props.photoType === 'photos' ?
        <div>
        <SpanInBut style={style_Photos_Or_Stickers}>
          <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'8px'}} border={'0px'} height={'30px'} src={'https://cdn3.iconfinder.com/data/icons/audiovisual-production-outlined-pixel-perfect/64/vp-07-512.png'}/> 
          {'   '} Фото 100 x 117 
        </SpanInBut>
        <SpanInBut onClick={() => {this.props.change_photo_type('stickers')}}> 
        <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'8px'}} border={'0px'} height={'30px'} src={'https://cdn3.iconfinder.com/data/icons/e-commerce-trading/512/stickers-512.png'}/> 
         {'   '} Стикеры 6 x 6
        </SpanInBut>
        </div>
        :
        <div>
          <SpanInBut onClick={() => {this.props.change_photo_type('photos')}}>
            <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'8px'}} border={'0px'} height={'30px'} src={'https://cdn3.iconfinder.com/data/icons/audiovisual-production-outlined-pixel-perfect/64/vp-07-512.png'}/> 
            {'   '} Фото 100 x 117 
          </SpanInBut>
          <SpanInBut style={style_Photos_Or_Stickers}> 
            <img alt=' ' style={{verticalAlign: 'middle', display: 'inline-block', marginTop: '2px', marginRight:'8px'}} border={'0px'} height={'30px'} src={'https://cdn3.iconfinder.com/data/icons/e-commerce-trading/512/stickers-512.png'}/> 
            {'   '} Стикеры 6 x 6
          </SpanInBut>
        </div>
        }
      </RightPart>
     
   
    );
  }
}



const RightPart = styled.div`
  width: 250px;
  height: 200px;
  position: fixed;
  font-size: 13px;
  display: inline-block;
  z-index: 3;
  top: 70px;
  background-color: white;
  box-shadow: 0 0 3px rgba(0,0,0, 0.4);
`;



const SpanInBut = styled.div`
  position: relative; 
  text-align: left;
  vertical-align: middle;
  opacity: 0.9;
  margin: 0 auto;
  color: black	;
  width: 242px;
  height: 40px;
  padding-left: 8px;
  padding-top: 5px;
  font-size: 15px;
  font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif  ;
  margin-top: 6px;
  margin-bottom: 6px;
  z-index: 82;
  :hover{
    cursor: pointer;
    background-color: rgba(76, 104, 215, 0.32);
  }
  `;



  const mapStateToProps = (state) => {
    return{
      photoType: state.PhotosInfo.photoType
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
  
    return{
      change_photo_type: (type) => {
        dispatch(change_photo_type(type))
      }
    }
  };
  



 
export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);