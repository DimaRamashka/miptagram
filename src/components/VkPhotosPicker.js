import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import cancel from './images/cancel.svg';
import more from './images/more.svg';
import add from './images/select.svg';
import chosen from './images/select_transparent.svg';
import {cancel_VK_add, approve_choice} from './actions/photoActions';

class VkPhotos extends Component{
  state={
    selectedPhotos: [],
    quantity: 6
  }

    render(){
      let old_photos = this.props.old_photos;
        return(
            <Shadow> 
      <Main>
        <PhotoPart>
          {this.props.photos.map((photo, k)=>{
              if(k < this.state.quantity){
                let ph = this.state.selectedPhotos.filter((photoNum, l) => (k === photoNum)); 
                if(ph.length === 0){
              return(
                
                <Photo key={k} style={{backgroundImage: `url(${photo.photo_1280})`,backgroundRepeat: 'no-repeat',
                  backgroundSize: '200px 200px'}} onClick={() => {
                  this.setState({
                    selectedPhotos: this.state.selectedPhotos.concat(k)
                  })
                }}>
                
                </Photo>
                
              )} else {
              return(
                
                <Photo key={k} style={{backgroundImage: `url(${photo.photo_1280})`,backgroundRepeat: 'no-repeat',
                backgroundSize: '200px 200px'}} onClick={() => {
                  this.setState({
                    selectedPhotos: this.state.selectedPhotos.filter((photoNum, l) => (k !== photoNum))
                  })
                }}>
                <SelectedPhoto>
                  <img src={chosen} alt=''/>
                </SelectedPhoto>
                </Photo>
                
              )}
            }
          })}
        </PhotoPart>  
        <ButtonsPart>
          
            <Cancel onClick={() => {
              this.props.cancel_VK_add();
            }}>
                <img src={cancel}/>
            </Cancel>
         
            <More onClick={() => {
              this.setState({
                quantity: this.state.quantity + 3
              })
            }}>
                <img src={more}/>
            </More>
            {this.state.selectedPhotos.length === 0 ? 
            <Add >
                <img src={add}/>
            </Add> :
            <Select onClick={() => {
              let old = this.props.old_photos.reverse();
              
                 
                   this.state.selectedPhotos.map((photoNumber) => {
                    return(
                      old = old.concat({
                        url: this.props.photos[photoNumber].photo_1280,
                        x: 0,
                        y: 0,
                        quant: 1,
                        width: 2
                      })
                    )
                  })
                  
                
              
              
              this.props.approve_choice(old.reverse())
            }}>
              <img src={add}/>
            </Select> }
        </ButtonsPart>
       </Main> 
            </Shadow>
        );
    }
} 

const ButtonsPart = styled.div`
  padding: 5px;
`;

const SelectedPhoto = styled.div`
position: relative;
z-index: 2;
    display: inline-flex;
    justify-content: center !important;
    width: 200px;
    height: 200px;
    border-radius: 3px;
    background: rgba(0,0,0, 0.4);
    :hover{
      cursor: pointer;
    }
`;

const Select = styled.button`
margin-right: 10px;
  margin-left: 110px;
-webkit-box-pack: center !important;
-webkit-box-align: center !important;
display: inline-flex !important;
align-items: center !important;
justify-content: center !important;
background-color: rgb(102, 187, 106) !important;
cursor: pointer !important;
border-width: 2px !important;
border-style: solid !important;
border-color: rgb(129, 199, 132) !important;
border-image: initial !important;
border-radius: 5em !important;
`;
const Cancel = styled.button`
  margin-right: 110px;
  margin-left: 10px;
  cursor: pointer !important;
  padding: 1px 6px;
  display: inline-flex !important;
  background-color: rgb(229, 115, 115) !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: rgb(239, 154, 154) !important;
  border-image: initial !important;
  border-radius: 5em !important;
`;
const More = styled.button`
margin-right: 122px;
margin-left: 122px;
-webkit-box-pack: center !important;
display: inline-flex !important;
justify-content: center !important;
cursor: pointer !important;
background-color: rgb(66, 165, 245) !important;
border-width: 2px !important;
border-style: solid !important;
border-color: rgb(100, 181, 246) !important;
border-image: initial !important;
border-radius: 5em !important;
padding: 1px 6px;
`;

const Add = styled.button`
  margin-right: 10px;
  margin-left: 110px;
  padding: 1px 6px;
  
  display: inline-flex !important;
  background-color: rgb(189, 189, 189) !important;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: rgb(224, 224, 224) !important;
  border-image: initial !important;
  border-radius: 5em !important;
`;
const PhotoPart = styled.div`
  position: relative;
  
  height: 458px;
  overflow-y: scroll;
`;

const Shadow = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0, 0.4);
  z-index: 120;
`;

const Photo = styled.div`
    position: relative;
    display: inline-flex;
    width: 200px;
    height: 200px;
    margin: 14px;
    border-radius: 3px;
    background-color: whitesmoke;
    :hover{
      cursor: pointer;
    }
    z-index: 1;
`;



const Main = styled.div`
position: relative;
width: 710px;
height: 540px;
top: 200px;
padding: 10px;
margin: auto;

    border-bottom-left-radius: 1em !important;
    border-bottom-right-radius: 1em !important;
    border-top-left-radius: 0.5em !important;
    border-top-right-radius: 0.5em !important;
    background-color: rgb(246, 248, 250) !important;
`;    
const mapStateToProps = (state) => {
    return{
      photos: state.PhotosInfo.showVk,
      old_photos: state.PhotosInfo.photos
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
  
    return{
      cancel_VK_add: () => { 
        dispatch(cancel_VK_add() )
      },
      approve_choice: (photos) => { 
        dispatch(approve_choice(photos) )
      },
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(VkPhotos);