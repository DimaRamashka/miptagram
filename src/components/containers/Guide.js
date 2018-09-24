import React, { Component } from 'react';
import styled from 'styled-components'

class Guide extends Component {
    


  render() {
    return (
        <Main >
        <p> Добавьте фото </p>
        <p> Они отобразяться здесь </p>  
        
       
          
        </Main>
    );
  }
}



const Main = styled.div`
display: inline-block;
   position: relative;
   width: 500px;
   height: 200px;
   z-index: 3;
   top: 45px;
   font-family: Lobster;
   font-weight: bold;
   font-size: 30px;
   background-color: white;
   border-radius: 4px;
   box-shadow: 0 0 5px rgba(10,10,10, 0.5)

`;


export default Guide;