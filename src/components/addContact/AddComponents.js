import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


export const GetForm = (props)=>{
    return (
        <form className="form" onSubmit={props.addContact}>
            <div className="field">
                <FontAwesomeIcon className="awesome_icon_fa" icon={faUser} />
                <input id='name' name='name' type="text" defaultValue={(props.item)?(""+props.item.name+""):null} placeholder="Name" autoFocus/>
            </div>
            <div className="field">
                <FontAwesomeIcon className="awesome_icon_fa phone-icon" icon={faPhone} />
                <input id='phone' name='phone' type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" defaultValue={(props.item)?props.item.phone:null} placeholder="Phone"/>
            </div>
            <div className="field">
                <FontAwesomeIcon className="awesome_icon_fa" icon={faEnvelope} />
                <input id='email' name='email' type="email" defaultValue={(props.item)?props.item.email:null} placeholder="Email"/>
            </div>
            <div className="add-awesome_logo">
                <FontAwesomeIcon className="close-icon" onClick={props.closeClick} icon={faTimes} />
                <div className="space"></div>
                <button className="submit-button" type="submit">
                <FontAwesomeIcon className="check-icon" icon={faCheck} />
                </button>
            </div>
        </form>
    )
}