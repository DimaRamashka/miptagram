import React, { Component } from 'react';
import styled from 'styled-components';


class MiptogramPhoto10x15 extends Component {


  render() {
      let url=this.props.url;
      let rotation = this.props.orientation % 2 !== 0 ? 0 : 270;
      let width = this.props.orientation % 2 === 0 ? 100 : 100;
      let height = this.props.orientation % 2 === 0 ? 66.666 : 150;
    return (
        <MainDiv style={{width: `${X*width}px`, height: `${X*height}px`}}>
            <PhotoDiv style={{width: `${X*width}px`, height: `${X*height}px`, backgroundImage: `url(${url})`,backgroundRepeat: 'no-repeat' ,
            backgroundSize: `${this.props.width*width*X}px`, backgroundPosition: `-${this.props.x*width*X}px -${this.props.y*height*X}px`}}>
            </PhotoDiv>   
            
        </MainDiv>
        
        
    );
  }
}
const X = 4.5;

const PhotoDiv = styled.div`
  position: relative;
`;

const MainDiv = styled.div`
  display: block;
  background-color: white;
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

export default MiptogramPhoto10x15;