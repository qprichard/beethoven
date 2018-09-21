import React, { Component } from 'react';
import '../App.css';
import {Nav, NavItem, NavLink} from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';
import {Table, Button } from 'reactstrap';

// TODO:  VOIR AXIOS POUR REQUETES


// Mise à jour de index dans state pour connaitre le bouton selectionné
function updateNavIndex(NavIndex){
  this.setState({NavIndex})
}

function updateMenuInformation(MenuInformation){
  this.setState({MenuInformation})
}

function updateMenuList(MenuList){
  this.setState({MenuList})
}

let fetchMenuList = (idMenu)=>{
  fetch("http://37.139.25.111/getorders/"+idMenu+"?random="+Math.random(), {
    method : 'GET',
    mode:'cors',
    headers:{
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

  }
  })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
          updateMenuInformation(result.menu)
          updateMenuList(result.orders)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.

      (error) => {
          updateMenuInformation(null)
          updateMenuList([])
          console.log(error)
      }
    )

}




//Classe de navigation entre les différents menus disponibles à la vente
//le bouton cliqué  changera la valeur de index dans les state
class MenuNav extends Component {

  constructor(props){
    super(props);
    this.state = {
      index: null,
      Menus: [],
       //changement de couleur pour un menu selectionné
      navStyleSelected : {
        color : 'white',
        background :  '#B22132'
      },

      //changement de couleur pour un menu selectionné
      navStyle : {
        color : 'white',
        background :  'none'
      }
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

  }
    // s'effectue au montage du composant
    //Envoie dans le state l'info des différents menus présents
    componentDidMount(){
      this.FetchMenus();
    }

    //gestion du clique bouton
    // La liaison est effectuée avec la classe Menu
    onRadioBtnClick(rSelected){
      this.setState({index : rSelected});
      updateNavIndex(rSelected);
      fetchMenuList(rSelected)
    }

    //ajout d'un nouveau bouton pour chaque menu présent
     addButton = (bName, bId)=>{
      return(
           <NavItem>
             <NavLink
               href="#"
               focus = {this.state.index === bId}
               style = { this.state.index === bId ? this.state.navStyleSelected : this.state.navStyle}
               active = {this.state.index === bId}
               onClick = {() => this.onRadioBtnClick(bId)}
               >
               {bName}
             </NavLink>
           </NavItem>
         );
    }




//fonction de reccupération de la liste des menus à vendre
    FetchMenus(){
      fetch("http://37.139.25.111/getMenu/?random="+Math.random(), {
        method : 'GET',
        mode:'cors',
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',

      }
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              Menus : result
            })
          },
          (error) => {
            console.log(error)
          })
    }






  render() {
    let List = []
    if(this.state.Menus[0] != undefined){
      console.log(this.state.Menus)


      this.state.Menus.forEach((item)=>{
        List.push(<NavItem>{this.addButton(item.article.nom, item.article.id_payutc)}</NavItem>)
      })

    }
    return (
      <div className="MenuNav">

        <Nav vertical>
          {List}
        </Nav>


      </div>
    );
  }
}



//CLASSE Menu qui affiche l'ensemble des menus commandés sur le type de menu selectionné
class Menu extends Component {

  constructor(props){
    super(props)
    this.state={
      NavIndex:null,
      MenuList: [],
      MenuInformation : null
    }
    //reccupération des informations de la nav
    updateMenuInformation = updateMenuInformation.bind(this)
    updateNavIndex = updateNavIndex.bind(this)
    updateMenuList = updateMenuList.bind(this)
  }

  //Boucle Update data toutes les 15 secondes
  componentDidMount(){
      this.interval = setInterval(()=>{
        console.log('update data')
        fetchMenuList(this.state.NavIndex)
      }, 15000)

  }

  componentWillUnmount() {
  clearInterval(this.interval);
}

//changement de l'état du bouton
// TODO: envoyer info au back pour changer la valeur de served
  onButtonClick(index){
    this.state.MenuList[index].served = !this.state.MenuList[index].served
    this.forceUpdate()
    this.fetchServed(this.state.MenuList[index].id_transaction, index)
  }

  fetchServed(id, index){
    fetch("http://37.139.25.111/setMenuServed/"+id, {
      method : 'POST',
      mode:'cors',
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    })
      .then((result)=>{
        if(result.ok){
          console.log("ok");
          fetchMenuList(this.state.NavIndex)

        } else{
          console.log("nope")
        }



      })

  }




//Liste des Menus commandés identifiés par
// Nom
// prenom
// Qte
// served?

  printAllMenu(){
    let MenuList = []


    let printMenu = (menu, index)=>{
      return(
          <tr>
            <td>{menu.last_name}</td>
            <td>{menu.first_name}</td>
            <td>{menu.quantity}</td>
            <td><Button
              color={this.state.MenuList[index].served === false ? 'success' : 'danger'}
              onClick = {() =>this.onButtonClick(index)}
              >{this.state.MenuList[index].served===false ? 'Valider' : 'Annuler'}</Button></td>
          </tr>
        )

      }
// TODO: Mettre la liste de personnes dans les props ou dans les states?

    this.state.MenuList.forEach(function(menu, index){
      MenuList.push(printMenu(menu,index))
    })

    return MenuList;
  }

  returnTab(){
    return(
      <Table>
        <thead>
          <tr>
            <th> Nom </th>
            <th> Prénom </th>
            <th> Qte </th>
            <th> Servi </th>
          </tr>
        </thead>
        <tbody>
    {this.printAllMenu()}
        </tbody>
      </Table>

    )
  }


  render() {

    return (
      <div className="Menu">
        <h2>
          {this.state.NavIndex && this.state.MenuInformation ? ''+
            this.state.MenuInformation.name+' - '+
            this.state.MenuInformation.total_quantity + ' / '+ this.state.MenuInformation.quantity+
            ' - Servis : ' + this.state.MenuInformation.served_quantity
             : ''}
        </h2>
        {this.state.NavIndex && this.state.MenuInformation ? this.returnTab() : <h3> Veuillez choisir un Menu de la liste</h3>}
      </div>
    );
  }
}



class MenuBody extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return (
      <div className="MenuBody">
        <Container fluid>
          <Row>
          <Col md="3"> <MenuNav></MenuNav> </Col>
          <Col md="9"> <Menu ></Menu> </Col>


          </Row>

        </Container>
      </div>
    );
  }
}








export default MenuBody;
