import React, { Component } from 'react';
import styled from 'styled-components';


class MiptogramSticker extends Component {


  render() {
      let url=this.props.url;
    return (
        <MainDiv >
            <PhotoDiv style={{backgroundImage: `url(${url})`,backgroundRepeat: 'no-repeat',
            backgroundSize: `${this.props.width*98*X}px`, backgroundPosition: `-${this.props.x*98*X}px -${this.props.y*98*X}px`}}>
            </PhotoDiv>  
             
            
        </MainDiv>
        
        
    );
  }
}
const X = 5;

const PhotoDiv = styled.div`
  position: relative;
  margin: ${X*1}px
  width: ${X*98}px;
  height: ${X*98}px;
`;




const MainDiv = styled.div`
  display: block;
  background-color: white;
  width: ${X*100}px;
  height: ${X*100}px;
  margin: auto;
  margin-top: 45px;
  margin-bottom: 45px;
  border: 1px solid #DCDCDC;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1); 
  :hover{
    box-shadow: 0 0 8px rgba(0,0,0,0.3); 
    cursor: pointer;
  }
`;

export default MiptogramSticker;