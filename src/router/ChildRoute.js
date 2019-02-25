import { Route, withRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import React, { Component } from 'react'
import ContactInfo from '../components/contactinfo/ContactInfo';
import AddContact from '../components/addContact/AddContact';

 class ChildRoute extends Component {
     render(){
         
         return(
            <Switch>
                <Route exact path='/' component={ContactInfo}/>
                <Route exact path='/add' component={AddContact}/>
                <Route exact path='/edit' 
                    render = {({location: {item}})=><AddContact item={item}/>}
                />
            </Switch>
         )
     }
  
}


export default withRouter(ChildRoute);



