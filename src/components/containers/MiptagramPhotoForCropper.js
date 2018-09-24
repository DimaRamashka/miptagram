import React, { Component } from 'react';
import styled from 'styled-components';



class MiptogramPhoto extends Component {


 state={
    url: '',
    text: '',
    quant: this.props.quant, 
    x: this.props.x,
    y: this.props.y
 }   



  render() {
      let url=this.props.url;
    return (
      
        <MainDiv>
            <PhotoDiv style={{backgroundImage: `url(${url})`,backgroundRepeat: 'no-repeat',
            backgroundSize: `${this.props.width*87*X}px`, backgroundPosition: `-${this.props.x*87*X}px -${this.props.y*87*X}px`}}>
            </PhotoDiv>  
            <ForText style={{fontFamily: `${this.props.font}`}}>
                {this.props.text}
            </ForText> 
            <Watermark> 
                miptagram.ru    
            </Watermark> 
               
        </MainDiv>
        
        
    );
  }
}
const X = 3;
const PhotoDiv = styled.div`
  position: relative;
  margin: auto;
  margin-top: ${X*6.5}px;
  margin-bottom: ${X*2.5}px;
  width: ${X*87}px;
  height: ${X*87}px;
`;
const ForText = styled.div`
  position: relative;
  margin: auto;
  text-align: left;
  margin-bottom: ${X*2}px;
  width: ${X*87}px;
  height: ${X*10}px;
  font-size: ${X*3.5}px
`;
const Watermark = styled.div`
  position: relative;
  margin: auto;
  text-align: right;
  width: ${X*87}px;
  font-size:${X*2.5}px;
  color: #DCDCDC;
`;

// const ForQuantity = styled.div`
//   position: absolute;
//   top: ${X*15}px;
//   right: ${X*5}px;
//   width: ${X*10}px;
//   height: ${X*8}px;
//   color: #DCDCDC;
//   background-color: whitesmoke;
//   border-radius: ${X*3.5}px;
// `;

const MainDiv = styled.div`
  display: block;
  top: 50px;
  width: ${X*100}px;
  height: ${X*117}px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #DCDCDC;
  border-radius: 2px;
  background-color: white;
`;

export default MiptogramPhoto;