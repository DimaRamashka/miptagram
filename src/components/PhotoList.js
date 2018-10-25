import React, { Component } from 'react';
import MiptagramPhoto from './containers/MiptagramPhoto.js';
import MiptagramSticker from './containers/MiptagramSticker.js';
import {connect} from 'react-redux';
import {load_localstorage, show_Cropper} from './actions/photoActions'
import loading from './images/loading.gif';
import styled from 'styled-components';
import Guide from './containers/Guide';

class PhotoList extends Component {
    
componentDidMount(){
    let photos = JSON.parse(localStorage.getItem('miptagramState'));
    photos !== undefined && photos !== []  ? 
        this.props.load_localstorage()  
    : 
    null 
}

  render() {
    if(this.props.photos !== null && this.props.photos.length !== 0 && this.props.photos !== undefined){  
        console.log(this.props.photos)
    return (
        <div style={{zIndex: 3}}>

            {this.props.loading === true ?
                <Loading>
                    <img src={loading} alt="Loading..."/>
                </Loading>   : null
            }
            {
            this.props.photos.map((photo, k) => {
                let key = photo.url + k;
                if( this.props.photoType === 'photos'){
                return(
                    
                    <div  key={key} onClick={() => {
                        this.props.show_Cropper(k)}}> 
                        <MiptagramPhoto 
                            url={photo.url} x={photo.x} y={photo.y} 
                            width={photo.width} text={photo.text} 
                            quant={photo.quant} font={photo.font}
                        />
                    </div>
                )} else
                return(
                    <div  key={key} onClick={() => {
                        this.props.show_Cropper(k)}}> 
                        <MiptagramSticker 
                            url={photo.url} x={photo.x} y={photo.y} 
                            width={photo.width} text={photo.text} 
                            quant={photo.quant} font={photo.font}
                        />
                    </div>
                )
            })
            }
            
        </div>
    )} else if(this.props.loading === true)
        {
            return(
                <Loading>
                    <img src={loading} alt="Loading..."/>
                </Loading>  
            )
        } else
    return(<Guide/>)
  }
}


const mapStateToProps = (state) => {
    return{
      photos: state.PhotosInfo.photos,
      photoNumber: state.PhotosInfo.photoNumber,
      loading: state.PhotosInfo.loading,
      photoType: state.PhotosInfo.photoType
    }
  };
  
const mapDispatchToProps = (dispatch) => {
    
    return{
        load_localstorage: () => {
            let order = localStorage.getItem('miptagramState');
            var photos = JSON.parse(order);
        dispatch(load_localstorage(photos))
      },
      make_empty: () =>{
        dispatch(load_localstorage([]))
      },
      show_Cropper: (k) => {
        dispatch(show_Cropper(k))
      }
    }
  };

const Loading = styled.div`
    animation-name: grouth;
  animation-duration: 1s;
  position: relative;
  z-index: 3;
  padding-top:10px;
  height: 100%;
  
  @keyframes  grouth {
    from { height: 0 }
    to { height: 100%; }
  }
`;


export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);