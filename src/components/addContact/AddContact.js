import React, { Component } from 'react'
import './AddContact.css'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faUser, faCheck, faTimes, faCamera } from '@fortawesome/free-solid-svg-icons'

class AddContact extends Component {
  handleSearchBar = ()=>{
    this.props.addToState({searchBarOpen:false});
  }

  closeClick = ()=>{
    this.props.addToState({addContactClicked:false});     
    this.props.history.push("/");
  }

  getImage = ()=>{
    let image = localStorage.getItem('image')
    return (image)?image:null
  }

  addContact = (e)=>{
    e.preventDefault();
    if(e.target.name.value && e.target.phone.value && e.target.email.value)
    {
      let contacts= {
        name:e.target.name.value,
        phone:e.target.phone.value,
        email:e.target.email.value,
      }
      if(this.getImage){
        contacts.image=this.getImage();
        localStorage.removeItem('image')
      }
      if(this.props.item){
        if(this.props.item.image){
          contacts.image = this.props.item.image;
        }
        contacts.id = this.props.item.id;
      }
      this.props.addToContact(contacts);  
      this.props.addToState({addContactClicked:false});      

      e.target.name.value = ""
      e.target.phone.value = ""
      e.target.email.value = ""
      this.props.history.push("/");
    } 
  }

  handleCameraClick = ()=>{
    this.props.addToState({cameraClicked:true});

    if (this.hasGetUserMedia) {
      // Good to go!
      const constraints = {
        video: true
        };
      navigator.mediaDevices.getUserMedia(constraints).
		then(this.handleSuccess).catch(this.handleError);
	
    }else {
      alert('getUserMedia() is not supported by your browser');
    }
  }

  hasGetUserMedia = ()=> {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  handleError=(err)=>{
		console.log(err);
  }
  
  handleSuccess=(stream)=> {
    this.screenshotButton.disabled = false;
    this.video.style.display = 'block'
	  this.video.srcObject = stream;
  }
  
  takeScreenShot = ()=>{
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    this.video.style.display = 'none'
	  canvas.getContext('2d').drawImage(this.video, 0, 0);
	  // Other browsers will fall back to image/png
		console.log(canvas.toDataURL());
    let src = canvas.toDataURL('image/webp');
    this.img.className="image video-container"
    this.img.style.backgroundImage = 'url(' +src+ ')';
    this.addImg.style.backgroundImage = 'url(' +src+ ')';
    localStorage.setItem("image", src);    
    this.props.addToState({cameraClicked:false});
  }

  render() {
    var styles = {
      backgroundImage: 'url(' + (this.props.item && this.props.item.image) + ')'
    }
    return (
      <div className="right">
        <div className="add-contact" onClick={(this.props.searchBarOpen || this.props.cameraClicked)?this.handleSearchBar:null}>
          <header>
            <div ref={addImg => {this.addImg = addImg}} style={(this.props.item && this.props.item.image)?styles:null} className="image">
              <FontAwesomeIcon className="camera-icon" icon={faCamera} onClick={this.handleCameraClick} />
            </div>
          </header>
          {(this.props.cameraClicked)?
            (
            <div className="overlay">
              <div id="screenshot" className="screenshot" style={{textAlign:"center"}}>
                <div ref={img => {this.img = img}} className="video-container">
                  <video ref={video => {this.video = video}} className="videostream" autoPlay={true} onClick={this.takeScreenShot}></video>
                </div>
              
                <div className="camera-button-container">

                  <button ref={screenshotButton => {this.screenshotButton = screenshotButton}} id="screenshot-button" className="screenshot-button" disabled="" onClick={this.takeScreenShot}>
                    <FontAwesomeIcon className="camera-click" icon={faCamera} onClick={this.takeScreenShot} />                  
                  </button>
                </div>
              </div>
            </div>
            ):""
            }
          <form className="form" onSubmit={this.addContact}>
            <div className="field">
              <FontAwesomeIcon className="awesome_icon_fa" icon={faUser} />
              <input id='name' name='name' type="text" defaultValue={(this.props.item)?(""+this.props.item.name+""):null} placeholder="Name" autoFocus/>
            </div>
            <div className="field">
              <FontAwesomeIcon className="awesome_icon_fa phone-icon" icon={faPhone} />
              <input id='phone' name='phone' type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" defaultValue={(this.props.item)?this.props.item.phone:null} placeholder="Phone"/>
            </div>
            <div className="field">
              <FontAwesomeIcon className="awesome_icon_fa" icon={faEnvelope} />
              <input id='email' name='email' type="email" defaultValue={(this.props.item)?this.props.item.email:null} placeholder="Email"/>
            </div>
            <div className="add-awesome_logo">
              <FontAwesomeIcon className="close-icon" onClick={this.closeClick} icon={faTimes} />
              <div className="space"></div>
              <button className="submit-button" type="submit">
                <FontAwesomeIcon className="check-icon" icon={faCheck} />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addToState:(value)=> dispatch({type : "ADD_TO_STATE", value}),
    addToContact:(value)=> dispatch({type : "ADD_TO_CONTACT", value}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddContact))