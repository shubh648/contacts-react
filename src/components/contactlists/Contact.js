import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPhone, faUserEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


export const GetContact = (props)=>{
    var contact = props.contact;
    var index = props.index;
    var imageStyles = {
        backgroundImage: 'url(' + contact.image + ')',
       };
      var contactStyles = {
        backgroundColor: contact === props.person ? '#46733E' : '',
        color: contact === props.person ? 'wheat' : '',
      }
      var name ='"'+contact.name.charAt(0).toUpperCase()+'"'
      const css = `
                    .no-image`+contact.id+`::before {
                        content: `+name+`;
                    }
                `               
    return (
        <div className="contact" onClick={props.handleContactClick.bind(this, contact)} style={contactStyles} key={index}>
            <style>{css}</style>
            <div className="contact_s" onClick={()=>props.handleCollapsibleClick(index)}>
                <span className={"image "+((contact.image)? "": ("no-image "+"no-image"+contact.id))} style={imageStyles}></span>
                <span className="name">{contact.name}</span>
            </div>
            {
                (props.currentWidth && props.currentWidth<461)?( <div className={(props.collapsible === index)?"contact_m":"hide" }>
                <section>
                <p className="phone">Phone: {contact.phone}</p>
                <p className="email">Email: {contact.email}</p>
                <div className="awesome_icon">
                    <FontAwesomeIcon className="awesome_icon_phone" icon={faPhone} />
                    <div className="space"></div>
                    <FontAwesomeIcon className="awesome_icon_edit" icon={faUserEdit} onClick={()=>props.editContact(contact)} />
                    <div className="space"></div>
                    <FontAwesomeIcon className="awesome_icon_delete" icon={faTrashAlt} onClick={()=>props.deleteContact(contact.id)} />
                </div>
                </section>
            </div>):""
            }
        </div>
    )             
}

export const GetHeader = (props)=>{
    return(
        <div className="left_header">
            <div className={(props.searchBarOpen)?"left_header_open":"left_header_close"}>
                <h2>Contacts</h2>
                <div className="space"></div>
                <FontAwesomeIcon className="search_icon_fa" onClick={props.searchOpen} icon={faSearch} />
            </div>
            <div className={(props.searchBarOpen)?"search_show":"search_hide"} onClick={props.handleSearchClick}>
                <input type="search" className="search" placeholder="Search..." onChange={props.searchInput} autoFocus={props.searchBarOpen}></input>
            </div>
        </div>
    )
}