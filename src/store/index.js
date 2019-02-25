import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';



const contacts = getContact();

const initialState={
  contacts : (contacts)?contacts.sort(compare):'',
  person: (contacts)? contacts[0]:'',
  searchBarOpen : false,
  cameraClicked : false
}

function getContact(){
  return JSON.parse(localStorage.getItem('contacts'));
}

 function compare(a,b){
  if(a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if(a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
} 

const getSearchContact = (action) =>{
  let primary_search = [];
  let contacts = getContact()

  if(contacts){
    for(let i= 0; i < contacts.length; i++){
      if(action.pass === ""){
        primary_search = [...contacts];
      }
      else if((contacts[i].name.toLowerCase().includes(action.pass.toLowerCase()))){
        primary_search.push(contacts[i])
      }
    }
    return primary_search
  }
  return
}


const SaveContactToLocalStorage = (contact) =>{
  const newContacts = [];
  let contacts = getContact();
  let person ="";

  if(contact && contact.id >= 0){
    let index = contacts.findIndex((item)=> item.id===contact.id);
    contacts.splice(index,1,contact);
    newContacts.push(...contacts);
    person = contact;
  }
  else{
    if(contacts){
      newContacts.push(...contacts);
    }
    
    contact.id = (newContacts.length>0)?
          newContacts[newContacts.length-1].id + 1
          :0
    newContacts.push(contact);
    person = newContacts[newContacts.length-1];
  }
  
  localStorage.setItem('contacts', JSON.stringify(newContacts));
  return {newContacts,person}
}

const deleteContact=(id)=>{
  let contacts = getContact()
  let newContacts = contacts.filter((i)=>i.id !== id)
  localStorage.setItem('contacts', JSON.stringify(newContacts));
  return newContacts;
}


const reducer = (state = initialState, action)=>{
  switch (action.type){

    case 'ADD_TO_STATE':
      return Object.assign({}, state, {...action.value})
    
    case 'ADD_TO_CONTACT':
      const result = SaveContactToLocalStorage(action.value)
      return Object.assign({}, state, {person:result.person , contacts:result.newContacts.sort(compare)}) ;
      

    case 'SEARCH_INPUT':
        let searchContacts = getSearchContact(action)
        return searchContacts && Object.assign({}, state, {contacts : [...searchContacts].sort(compare)})
    
    case 'DELETE_CONTACT':
        let newContact = deleteContact(action.pass);
        return Object.assign({}, state, {person:newContact[newContact.length-1], contacts : newContact.sort(compare)})
             
        
    default:
      return state
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));

export default store;