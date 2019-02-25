import React, { Component } from 'react';
import './ContactList.css'
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { GetHeader, GetContact } from './Contact';

class ContactList extends Component {

 componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
}

 componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
}

 updateWindowDimensions = () => {
    this.props.addToState({currentWidth:window.innerWidth});
  };

  handleContactClick = (contact) =>{
    this.props.addToState({person: contact});
    if(this.props.currentWidth<461){
      return
    }
     this.props.history.push("/")
   }

   addContact = ()=>{
     this.props.addToState({addContactClicked:true});
     this.props.history.push("/add") 
   }

   editContact=(item)=>{
    this.props.addToState({addContactClicked:true});
    this.props.history.push({pathname:'/edit', item});
  }

   searchOpen = ()=>{
    this.props.addToState({searchBarOpen:true})
   }
    handleSearchClick =(e)=>{
      e.stopPropagation();
    }

    handleSearchBar = ()=>{
      this.props.addToState({searchBarOpen:false});
    }

    handleCollapsibleClick = (i)=>{
      if(this.props.collapsible===i){
        return this.props.addToState({collapsible:""})
      }
      return this.props.addToState({collapsible:i})
    }

  render() {
     return (
       (this.props.currentWidth<461 && this.props.addContactClicked)?"":
        <div className="left" onClick={(this.props.searchBarOpen)?this.handleSearchBar:null}>
          <GetHeader {...this.props} searchOpen={this.searchOpen} handleSearchClick={this.handleSearchClick}/>
          <FontAwesomeIcon className="add_icon_fa" onClick={this.addContact} icon={faPlusCircle} />
          <div className="contacts-container">
            {(this.props.contacts && this.props.contacts.length>0)?(this.props.contacts.map((contact, index)=>{
              return <GetContact 
                        contact={contact} 
                        index={index} 
                        person={this.props.person} 
                        handleContactClick={this.handleContactClick} 
                        handleCollapsibleClick={this.handleCollapsibleClick}
                        collapsible = {this.props.collapsible}
                        editContact = {this.editContact}
                        deleteContact = {this.props.deleteContact} 
                        currentWidth = {this.props.currentWidth}
                        key = {index}
                      />  
            })):(
              <div className="no-contact"><h2>No Contacts, please add first</h2></div>
            )}
            
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
    searchInput:(e)=>  dispatch({type : "SEARCH_INPUT", pass:e.target.value}),
    deleteContact:(id)=>  dispatch({type : "DELETE_CONTACT", pass:id})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
