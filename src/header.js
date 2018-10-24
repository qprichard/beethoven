import React, { Component } from 'react';
import './App.css';

import MenuBody from './containers/Menu/menu'
import Vente from './containers/Vente/vente'
import {connect} from 'react-redux'

import {login, redirectLogin, deleteError, restart} from './actions'
import {printError} from './Utils/utils'
import {CAS_LINK} from './Utils/config'
import BadgeConnexion from './Utils/badgeConnexion'
import WebSocketConnexion from './Utils/websocket'
import TypeEvents from './Utils/typeEvents.js'



class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      load : 'Menu'
    }
    this.setMenuPage = this.setMenuPage.bind(this)
    this.setVentePage = this.setVentePage.bind(this)
  }

  setMenuPage(){
    this.setState({
      load:'Menu'
    })
  }

  setVentePage(){
    this.setState({
      load:'Vente'
    })
  }


  render() {
    const {errorsList, badgeuse, redirected} = this.props;
    const {deleteError, redirectLogin, login, restart} = this.props;
    const{sessionId, connected, username} = this.props;
    const {event_id, picked} = this.props

    //affichage de l'ensemble des erreurs du programme
    let ListErrors = []
    if(errorsList.length > 0)
    {
      errorsList.forEach((element)=>{
        ListErrors.push(printError(element))
      })
    }



    let affichage;
    switch(this.state.load){
      case 'Vente':
        if(sessionId!==null)
        {
          affichage = <Vente></Vente>
        }
        break;
      case 'Menu':
        if(sessionId!==null)
        {
          affichage = <MenuBody></MenuBody>
        }
        break;
      default:
        break;
    }

    //tester si il est necessaire d'enregistrer les infos
    let ticketRegex = /(\?|&)ticket=([^&=]+)/;
    if(redirected===false && ticketRegex.test(window.location.href))
    {
      login();
      redirectLogin();
    }

    return (

      <div>
        <WebSocketConnexion></WebSocketConnexion>
        {badgeuse===true && connected===false &&<BadgeConnexion></BadgeConnexion>}

        {connected===true && picked===false && <TypeEvents></TypeEvents>}
        <div className="Header">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="" onClick={()=> restart()}>Beethoven</a>
              <span className="input-group-btn">
                {username===null ?<a href={CAS_LINK}>Click to login</a> :

                  <span style={{color:'black'}}> {username}</span>}
              </span>" "
              <span className="input-group-btn">
                <a href="https://cas.utc.fr/cas/logout">LOGOUT</a>
              </span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              </ul>
              <button class="btn btn-outline-secondary my-2 my-sm-0" onClick={this.setMenuPage}>Menu</button>" "
              <button class="btn btn-outline-secondary my-2 my-sm-0" onClick={this.setVentePage}>Vente</button>" "
              <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Admin</button>
            </div>
          </nav>
        </div>
        <div
          style={
            {
              position:'fixed',
              top :'20px',
              right:'10px',
              width:'auto',
              zIndex:'999',
              borderRadius:'0px'
            }
          }
          >{ListErrors}</div>
        {affichage}
      </div>

    );
  }
}

/*<WebSocketConnexion></WebSocketConnexion>
{badgeuse===true && connected===false &&<BadgeConnexion></BadgeConnexion>}
*/
let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    connected : state.cas.connected || false,
    sessionId : state.cas.sessionId || null,
    redirected : state.cas.redirected || false,
    errorsList : state.errors.errorsList || [],
    badgeuse : state.cas.badgeuse || false,
    username : state.cas.username || null,
    event_id : state.vente.event_id || null,
    picked : state.vente.picked || false
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    redirectLogin : ()=>dispatch(redirectLogin()),
    login : ()=>dispatch(login()),
    deleteError : ()=> dispatch(deleteError()),
    restart : ()=> dispatch(restart())
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
