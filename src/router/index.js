import { Route, withRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import React, { Component } from 'react'
import ContactList from '../components/contactlists/ContactList';

 class AppRoute extends Component {
     render(){
         
         return(
            <Switch>
                <Route path='/' component={ContactList}/>                
            </Switch>
         )
     }
  
}


export default withRouter(AppRoute);



