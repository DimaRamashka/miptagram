import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import MiptagramPhoto from './containers/MiptagramPhotoForCropper.js';
import MiptagramSticker from './containers/MiptagramStickerForCropper.js';
import {connect} from 'react-redux';
import {onSavePhoto, onCancelPhoto, onDeletePhoto} from './actions/photoActions'

class PhotoChanger extends Component {

state={
    url: this.props.photos[this.props.photoNumber].url,
    text: this.props.photos[this.props.photoNumber].text,
    x: this.props.photos[this.props.photoNumber].x,
    y: this.props.photos[this.props.photoNumber].y,
    quant: this.props.photos[this.props.photoNumber].quant,
    width: this.props.photos[this.props.photoNumber].width,
    font: this.props.photos[this.props.photoNumber].font
}    

  render() {
      let photos = this.props.photos;
      let url = this.state.url;
      let text = this.state.text;
      let x = this.state.x;
      let y = this.state.y;
      let quant = this.state.quant;
      let width = this.state.width;
      let font = this.state.font;
      let photoNumber = this.props.photoNumber;
    return (
        
        <div>
            <LeftPart>
                 <h1 style={{left: '30%', position: 'fixed',fontWeight: 'bold', fontSize: '30px', top: 0, marginTop: '7px'}}> Выберите область </h1>
                  <Cropper 
                    ref={r => this.cropper = r }                   
                    src={url} 
                    aspectRatio={1/ 1} 
                    guides={false}
                    zoomable={false} 
                    viewMode={1}   
                    movable={false}
                    style={{width: '96%', height: '88%', margin: 'auto', top: '6%', position: 'relative'}}
                    crop={(e) => {
                        let data = this.cropper.getCropBoxData();
                        let data2 = this.cropper.getCanvasData();
                        let canv = this.cropper.getImageData();
                        this.setState(
                        {
                            x: (data.left-data2.left)/data.width ,
                            y: (data.top-data2.top)/data.width ,
                            width: canv.width/data.width
                        });
                        
                    }}           
                  />
                  
         </LeftPart>
        <RightPart>
            <h2 style={{ margin: 'auto',marginTop: '15px', backgroundColor: 'whitesmoke', borderRadius: '6px', width: '200px', padding: '3px'}}> Preview </h2>
            <ForText> <ForButton> <Button appearance={'primary'} 
            onClick={() => {
                let newPhoto = {
                    url: this.state.url,
                    x: this.state.x,
                    y: this.state.y,
                    width: this.state.width,
                    text: this.state.text,
                    quant: this.state.quant,
                    font: this.state.font
                }
                let newPhotos = photos.filter((p,k) => (k !== photoNumber)).reverse().concat(newPhoto);
                this.props.onSavePhoto(newPhotos.reverse())
                }
             }
             > Save </Button>  </ForButton>
             <ForButton><Button appearance={'warning'} onClick={() => this.props.onCancelPhoto()}> Cancel </Button> </ForButton>
             <ForButton><Button appearance={'danger'} onClick={() => {
                 let newPhotos = photos.filter((p,k) => (k !== photoNumber));
                 this.props.onSavePhoto(newPhotos)}
                 }> Delete </Button> </ForButton>
             </ForText>
            { this.props.photoType === 'photos' ?
             <MiptagramPhoto url={url} x={x} y={y} width={width} text={text} font={font} quant={quant}/>
             : <MiptagramSticker url={url} x={x} y={y} width={width} text={text} font={font} quant={quant}/>
            }
            
             
             <ForText>
                 Текст под фото:
            <div><textarea  style={{fontFamily: `${this.state.font}`, boxShadow: '0.4px 0.8px  0.1em grey', borderRadius: '4px'}} maxLength="120" cols='30' wrap="soft" rows={4} value={this.state.text} 
                    onBlur={(e) => this.placeholder = "Your text"}  onChange={e => {
                        this.setState({
                            text: e.target.value
                        });
                    }}  ></textarea></div>
            </ForText> 
            <ForText>
             Шрифт :<ForButton> <Button onClick={() => {this.setState({font: "Helvetica "})}} > <span > M </span> </Button> </ForButton>
             <ForButton> <Button onClick={() => {this.setState({font: "Arial Black"})}} ><span style={{fontFamily: 'Arial Black'}}> M</span></Button> </ForButton>
             <ForButton> <Button onClick={() => {this.setState({font: "Cursive "})}} ><span style={{fontFamily: 'Cursive'}}> M</span></Button> </ForButton>
             <ForButton> <Button onClick={() => {this.setState({font: 'Mistral '})}}><span style={{fontFamily: 'Mistral'}}> M </span ></Button></ForButton>
             <ForButton> <Button onClick={() => {this.setState({font: 'Comic Sans Ms '})}}><span style={{fontFamily: 'Comic Sans'}}> M</span></Button></ForButton>
             <ForButton> <Button onClick={() => {this.setState({font: 'algerian'})}}><span style={{fontFamily: 'algerian'}}> M</span></Button></ForButton>
             </ForText>
            <ForText>
                Количество : 
                <Button onClick={() => {
                    this.setState({
                        quant: this.state.quant > 1 ? this.state.quant - 1 : this.state.quant
                    })
                }}> - </Button>
                {' '}{  this.state.quant }{' '}
                <Button onClick={() => {
                    this.setState({
                        quant: this.state.quant + 1 
                    })
                }}> + </Button>
            </ForText>    
            
        </RightPart>        
      
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
      photoType: state.PhotosInfo.photoType 
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return{
        onSavePhoto: (data) => {
            dispatch(
                onSavePhoto(data)
            )
        },
        onCancelPhoto: () => {
            dispatch(
                onCancelPhoto()
            )
        },
        onDeletePhoto: () => {
            dispatch(
                onDeletePhoto()
            )
        }
     
    }
  };


const ForButton = styled.div`
    margin: 8px;
    position: relative;
    display: inline-block;
`;
const ForText = styled.div`
    margin: auto;
    padding: 5px;
    vertical-align: top;
    padding-top: 15px;
    position: relative;
    width: 90%;
`;
const LeftPart = styled.div`
    text-align: center;
    width: 75%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    position: fixed;
    left: 0px;
    background-color: white;
`;
const RightPart = styled.div`

border-left: 2px solid rgba(10,10,10, 0.6);
    text-align: center;
    width: 25%;
    height: 100%;
    right: 0px;
    display: inline-block;
    vertical-align: top;
    position: fixed;
    overflow: auto;
`;



export default connect(mapStateToProps, mapDispatchToProps)(PhotoChanger);