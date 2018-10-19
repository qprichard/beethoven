import React, { Component } from 'react';

import {connect} from 'react-redux';

import '../../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import {deleteMenus, getMenus, getList, updateNavIndex} from '../../actions'
import ModalDelete from './modalDelete'

class MenuNavButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal : false
    }
  }
  render(){
    const {NavIndex} = this.props;
    const {deleteMenus, updateNavIndex, getMenus, getList} = this.props;
    return(
      <tr style = {
        this.props.index === NavIndex ?
        {height : '2.5em', background:'#B22132'} :
        {height : '2.5em', background:'#f9f9f9'}
        }>
        <td>
        <NavItem
          href="#"
          focus = {this.props.index === NavIndex}
          style = {
            this.props.index === NavIndex ?
            {color:'white'} :
            {color:'black'}
          }
          active = {this.props.index === NavIndex}
          onClick = {()=> {
            updateNavIndex(this.props.index)
            getList(NavIndex)
          }}
        >
        {this.props.nom}
        </NavItem>

        </td>
        <td><Button
          size="sm"
          onClick = {()=>{
            console.log(this.state.modal)
            if(this.state.modal === true) this.setState({modal : !this.state.modal})
            this.setState({modal : !this.state.modal})

          }}
          ><FaTrash size='1em'/></Button>
        { this.state.modal === true ? <ModalDelete
            index = {this.props.index}
            menu = {this.props.nom}
            visible = {true}
            setFalse = {()=>this.setState({modal : false})}
            ></ModalDelete> : ""}
        </td>
      </tr>
    );
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    NavIndex : state.menus.NavIndex || null,
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    getMenus : ()=> dispatch(getMenus()),
    getList : (index)=> dispatch(getList(index)),
    updateNavIndex : (index)=>dispatch(updateNavIndex(index)),
    deleteMenus : (index)=>dispatch(deleteMenus(index)),
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (MenuNavButton);