import React, { Component } from 'react'
import './ContactInfo.css'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'

class ContactInfo extends Component {
  handleSearchBar = ()=>{
    this.props.addToState({searchBarOpen:false});
  }

  editContact=(item)=>{
    this.props.history.push({pathname:'/edit', item});
  }
  
  render() {
    var name ='"'+(this.props.person && this.props.person.name.charAt(0).toUpperCase())+'"'
    const css = `
                  .info-no-image::before {
                      content: `+name+`;
                  }
              `
    
    var styles = {
        backgroundImage: 'url(' + (this.props.person && this.props.person.image) + ')'
      }
    return (
      (this.props.currentWidth<461)?"":
      (this.props.person)?(
      <div className="right">
        <div className="contact-info" onClick={(this.props.searchBarOpen)?this.handleSearchBar:null}>
          <style>{css}</style>
          <header>
            <div className={"image "+((this.props.person.image)? "": "info-no-image")} style={styles}></div>
            <h3 className="name">{this.props.person.name}</h3>
          </header>
          <section>
            <p className="phone">Phone: {this.props.person.phone}</p>
            <p className="email">Email: {this.props.person.email}</p>
          </section>
          <div className="awesome_logo">
            <FontAwesomeIcon className="awesome_icon_fa info_icon_phone" icon={faPhone} />
            <div className="space"></div>
            <FontAwesomeIcon className="awesome_icon_fa" icon={faUserEdit} onClick={()=>this.editContact(this.props.person)} />
            <div className="space"></div>
            <FontAwesomeIcon className="awesome_icon_fa info_del_icon" icon={faTrashAlt} onClick={()=>this.props.deleteContact(this.props.person.id)} />
          </div>
        </div>
      </div>)
      :(
        <div className="right"><div className="no-contact"><h2>No Contacts, please add first</h2></div></div>
      )
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
    deleteContact:(id)=>  dispatch({type : "DELETE_CONTACT", pass:id})
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
