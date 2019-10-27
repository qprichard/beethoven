import {
  GET_MENUS_REQUEST,
  GET_MENUS_ERROR,
  GET_MENUS_SUCCESS,
  DELETE_MENU_ERROR,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  UPDATE_NAVINDEX,
  GET_LIST_ERROR,
  GET_LIST_SUCCESS,
  GET_LIST_REQUEST,
  GET_TOSERVE_ERROR,
  GET_TOSERVE_SUCCESS,
  GET_TOSERVE_REQUEST,
  VALIDATE_MENU_ERROR,
  VALIDATE_MENU_REQUEST,
  VALIDATE_MENU_SUCCESS,
  SET_STAFF_REQUEST,
  SET_STAFF_SUCCESS,
  SET_STAFF_ERROR,
  ADD_ALERT,
  DELETE_ERROR,
  DELETE_ALERT,
  REDIRECT_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_RIGHTS_SUCCESS,
  GET_RIGHTS_REQUEST,
  GET_RIGHTS_ERROR,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  UPDATE_CATEGORIE,
  GET_CHOSEN_ARTICLE,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_ERROR,
  DELETE_ARTICLE,
  DELETE_ALL_ARTICLES,
  BADGEUSE_IS_PRESENT,
  SET_USER_CONNECTED,
  GET_USER_PIN,
  GET_USER_UID,
  LOGIN_BADGE_REQUEST,
  LOGIN_BADGE_SUCCESS,
  LOGIN_BADGE_ERROR,
  DISCONNECT,
  GET_TVLINK_ERROR,
  GET_TVLINK_REQUEST,
  GET_TVLINK_SUCCESS,
  SET_TVLINK_ERROR,
  SET_TVLINK_REQUEST,
  SET_TVLINK_SUCCESS,
  GET_MESSAGES_LIST_ERROR,
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS,
  ADD_MESSAGE_REQUEST,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_ERROR,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_ERROR,
  GET_DEFAULT_URL_REQUEST,
  GET_DEFAULT_URL_SUCCESS,
  GET_DEFAULT_URL_ERROR,
  SET_TRANSACTION_REQUEST,
  SET_TRANSACTION_SUCCESS,
  SET_TRANSACTION_ERROR,
  GET_CLIENT_UID,
  SET_TRANSACTION_STATE,
  GET_CLIENT_INFO_REQUEST,
  GET_CLIENT_INFO_SUCCESS,
  GET_CLIENT_INFO_ERROR,
  SET_CLIENT_STATE,
  CANCEL_ARTICLE_REQUEST,
  CANCEL_ARTICLE_SUCCESS,
  CANCEL_ARTICLE_ERROR,
  DELETE_ARTICLE_CANCELED,
  GET_EVENT_ARTICLES,
  GET_SALES_LOCATION_REQUEST,
  GET_SALES_LOCATION_SUCCESS,
  GET_SALES_LOCATION_ERROR,
  RESTART,
  UPDATE_ADMIN_NAV,
  GET_GOODIES_REQUEST,
  GET_GOODIES_SUCCESS,
  GET_GOODIES_ERROR,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_ERROR,
  SET_BLOCKED_STATE,
  CHANGE_PANEL,
  GINGER_REQUEST,
  GINGER_SUCCESS,
  GINGER_ERROR,
  GET_BLOCKED_USERS_SUCCESS,
  GET_BLOCKED_USERS_ERROR,
  GET_BLOCKED_USERS_REQUEST,
  SEND_LOST_REQUEST,
  SEND_LOST_SUCCESS,
  SEND_LOST_ERROR,
  RESET_LOST
} from '../constants';

import {
  fetchMenus,
  onTrashClick,
  fetchMenuList,
  fetchServed,
  loginBadge2,
  loginCas,
  getCategories,
  getArticles,
  setUserTransaction,
  getUserInformation,
  cancelUserTransaction,
  getLocations,
  getTvUrl,
  setTvUrl,
  fetchMessagesList,
  addMessageToList,
  deleteMessageFromList,
  fetchToServe,
  changeStaff,
  getUsersRights,
  getUrls,
  getGoodiesList,
  blockUser,
  gingerApiRequest,
  getAllBlockedUsers,
  sendLostCard,
} from '../Utils/apiCalls.js';

import halloween from '../Utils/halloween.json';

// **************************************************************************
// Gestion Menus
// **************************************************************************

// Reccupération de la liste de Menus
export function getMenusRequest() {
  return {
    type: GET_MENUS_REQUEST,
  };
}

export function getMenusSuccess(MenuList) {
  return {
    type: GET_MENUS_SUCCESS,
    MenuList,
  };
}

export function getMenusError(error) {
  return {
    type: GET_MENUS_ERROR,
    error,
  };
}


export function getMenus() {
  return (dispatch) => {
    dispatch(getMenusRequest());
    fetchMenus(
      (data) => {
        dispatch(getMenusSuccess(data));
      },
      (err) => {
        dispatch(getMenusError('Erreur : Liste de Menu'));
      },
    );
  };
}


// Supprimer un Menu de la Liste
export function deleteMenuRequest(idMenu, MenuList) {
  return {
    type: DELETE_MENU_REQUEST,
    idMenu,
    MenuList,
  };
}

export function deleteMenuSuccess(idMenu, MenuList) {
  return {
    type: DELETE_MENU_SUCCESS,
    idMenu,
    MenuList,
  };
}

export function deleteMenuError(error) {
  return {
    type: DELETE_MENU_ERROR,
    error,
  };
}

export function deleteMenus(idMenu, MenuList) {
  return (dispatch) => {
    dispatch(deleteMenuRequest(idMenu, MenuList));
    onTrashClick(idMenu,
      (data) => {
        dispatch(deleteMenuSuccess(idMenu, MenuList));
      },
      (err) => {
        dispatch(deleteMenuError('Erreur : Supression Menu'));
      });
  };
}


// Mise à jour du menu sélectionné
export function updateNavIndex(index) {
  return {
    type: UPDATE_NAVINDEX,
    index,
  };
}


// reccupérer l'ensemble des commandes d'un menu donné
export function getListRequest(idMenu) {
  return {
    type: GET_LIST_REQUEST,
    idMenu,
  };
}

export function getListSuccess(listSales) {
  return {
    type: GET_LIST_SUCCESS,
    listSales,
  };
}

export function getListError(error) {
  return {
    type: GET_LIST_ERROR,
    error,
  };
}

export function getList(idMenu) {
  return (dispatch) => {
    dispatch(getListRequest(idMenu));
    if (idMenu !== null) {
      fetchMenuList(
        idMenu,
        (data) => {
          dispatch(getListSuccess(data));
        },
        (err) => {
          dispatch(getListError('Erreur : Liste Servis'));
        },
      );
    }
  };
}


// reccupérer l'ensemble des commandes d'un menu donné
export function getToServeRequest() {
  return {
    type: GET_TOSERVE_REQUEST,
  };
}

export function getToServeSuccess(listToServe) {
  return {
    type: GET_TOSERVE_SUCCESS,
    listToServe,
  };
}

export function getToServeError(error) {
  return {
    type: GET_TOSERVE_ERROR,
    error,
  };
}


export function getToServe() {
  return (dispatch) => {
    dispatch(getToServeRequest());
    fetchToServe(
      (data) => {
        dispatch(getToServeSuccess(data));
      },
      (err) => {
        dispatch(getToServeError('Erreur : menus web TV'));
      },
    );
  };
}


// valider menu servi
export function validateMenuRequest(idMenu, listSales) {
  return {
    type: VALIDATE_MENU_REQUEST,
    idMenu,
    listSales,
  };
}

export function validateMenuSuccess(idMenu, listSales) {
  return {
    type: VALIDATE_MENU_SUCCESS,
    idMenu,
    listSales,
  };
}

export function validateMenuError(error) {
  return {
    type: VALIDATE_MENU_ERROR,
    error,
  };
}

export function validateMenu(idMenu, listSales) {
  return (dispatch) => {
    dispatch(validateMenuRequest(idMenu, listSales));
    fetchServed(
      idMenu,
      (data) => {
        dispatch(validateMenuSuccess(idMenu, listSales));
      },
      (err) => {
        dispatch(validateMenuError('Erreur : Validation Menu'));
      },
    );
  };
}


// gestion des staff
export function setStaffRequest(idMenu) {
  return {
    type: SET_STAFF_REQUEST,
    idMenu,
  };
}


export function setStaffSuccess() {
  return {
    type: SET_STAFF_SUCCESS,
  };
}

export function setStaffError(error) {
  return {
    type: SET_STAFF_ERROR,
    error,
  };
}

export function setStaff(idMenu) {
  return (dispatch) => {
    dispatch(setStaffRequest(idMenu));
    changeStaff(
      idMenu,
      (data) => {
        dispatch(setStaffSuccess());
      },
      (err) => {
        dispatch(setStaffError('Erreur : Changement d etat Staff'));
      },
    );
  };
}


// Gestion des erreurs

// données de la forme addAlert('danger', 'Erreur : blabla')
export function addAlert(status, information) {
  return {
    type: ADD_ALERT,
    status,
    information,
  };
}

export function deleteError() {
  return {
    type: DELETE_ERROR,
  };
}


// Gestion des Alertes
export function deleteAlert() {
  return {
    type: DELETE_ALERT,
  };
}


// **************************************************************************
// Gestion Vente
// **************************************************************************
export function getEventArticles(event_id) {
  return {
    type: GET_EVENT_ARTICLES,
    event_id,
  };
}

// Récupérer les points de vente d'une fondation
export function getSalesLocationRequest(sessionid) {
  return {
    type: GET_SALES_LOCATION_REQUEST,
    sessionid,
  };
}
export function getSalesLocationSuccess(listLocation) {
  return {
    type: GET_SALES_LOCATION_SUCCESS,
    listLocation,
  };
}
export function getSalesLocationError(sessionid) {
  return {
    type: GET_SALES_LOCATION_ERROR,
  };
}

export function getSalesLocations(sessionid) {
  return (dispatch) => {
    dispatch(getSalesLocationRequest(sessionid));
    getLocations(
      sessionid,
      (data) => {
        dispatch(getSalesLocationSuccess(data));
      },
      (err) => {
        dispatch(getSalesLocationError());
      },
    );
  };
}


// Récupérer les catégories
export function getCategoriesRequest(sessionid, location) {
  return {
    type: GET_CATEGORIES_REQUEST,
    sessionid,
    location,
  };
}

export function getCategoriesSuccess(listCateg) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    listCateg,
    id_Categ: listCateg[0].id,
  };
}

export function getCategoriesError() {
  return {
    type: GET_CATEGORIES_ERROR,
  };
}

export function getListCateg(sessionid, location) {
  return (dispatch) => {
    dispatch(getCategoriesRequest(sessionid, location));
    getCategories(
      sessionid,
      location,
      (data) => {
        dispatch(getCategoriesSuccess(data));
      },
      (err) => {
        dispatch(getCategoriesError());
      },
    );
  };
}

// Mise a jour de la catégorie selectionnée
export function updateCategorie(id_Categ) {
  return {
    type: UPDATE_CATEGORIE,
    id_Categ,
  };
}

// Récupérer l'article selectionné
export function getChosenArticle(newID, newNAME, newPRICE, selectedArticles) {
  return {
    type: GET_CHOSEN_ARTICLE,
    newID,
    newNAME,
    newPRICE,
    selectedArticles,
  };
}

// Récupérer l'ensemble des Articles
export function getArticlesRequest(sessionid) {
  return {
    type: GET_ARTICLES_REQUEST,
    sessionid,
  };
}

export function getArticlesSuccess(listArticles) {
  return {
    type: GET_ARTICLES_SUCCESS,
    listArticles,
  };
}

export function getArticlesError() {
  return {
    type: GET_ARTICLES_ERROR,
  };
}

export function getListArticles(sessionid) {
  return (dispatch) => {
    dispatch(getArticlesRequest(sessionid));
    getArticles(
      sessionid,
      (data) => {
        dispatch(getArticlesSuccess(data));
      },
      (err) => {
        dispatch(getArticlesError());
      },
    );
  };
}


// Delete un article du panier
export function deleteArticle(newID, selectedArticles) {
  return {
    type: DELETE_ARTICLE,
    newID,
    selectedArticles,
  };
}
export function deleteAllArticles(selectedArticles) {
  return {
    type: DELETE_ALL_ARTICLES,
    selectedArticles,
  };
}

export function restart() {
  return {
    type: RESTART,
    picked: false,
    event_id: null,
  };
}

// **************************************************************************
// Gestion Connexion
// **************************************************************************

// gestion du websocket de badgeuse
export function badgeuseIsPresent(badgeuse) {
  return {
    type: BADGEUSE_IS_PRESENT,
    badgeuse,
  };
}

// rendre l'utilisateur actuel connecté
// faire passer son login en parametre
// TODO: autre choses à mettre?
export function setUserConnected() {
  return {
    type: SET_USER_CONNECTED,
  };
}
// reccupération de l'uid du user
export function getUserUid(userUid) {
  return {
    type: GET_USER_UID,
    userUid,
  };
}

// reccupération du pin du user
export function getUserPin(userPin) {
  return {
    type: GET_USER_PIN,
    userPin,
  };
}


// requete de connexion par badge
export function loginBadgeRequest(userUid, userPin) {
  return {
    type: LOGIN_BADGE_REQUEST,
    userUid,
    userPin,
  };
}

export function loginBadgeSuccess(sessionId) {
  return {
    type: LOGIN_BADGE_SUCCESS,
    sessionId,
  };
}

export function loginBadgeError(error) {
  return {
    type: LOGIN_BADGE_ERROR,
    error,
  };
}

export function loginBadge(userUid, userPin) {
  return (dispatch) => {
    dispatch(loginBadgeRequest(userUid, userPin));
    loginBadge2(
      userUid,
      userPin,
      (data) => {
        dispatch(loginBadgeSuccess(data));
      },
      (err) => {
        dispatch(loginBadgeError('Erreur : Connexion échouée'));
      },
    );
  };
}

// COnnection au CAS
export function redirectLogin() {
  return {
    type: REDIRECT_LOGIN,
  };
}
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    sessionId: data.sessionid,
    username: data.username,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,

  };
}

export function login() {
  return (dispatch) => {
    dispatch(loginRequest());
    loginCas(
      (data) => {
        dispatch(loginSuccess(data));
      },
      (err) => {
        dispatch(loginError('Erreur :Connexion CAS'));
      },
    );
  };
}


export function disconnect() {
  return {
    type: DISCONNECT,
  };
}


export function getRightsRequest() {
  return {
    type: GET_RIGHTS_REQUEST,
  };
}

export function getRightsSuccess(rightsList) {
  return {
    type: GET_RIGHTS_SUCCESS,
    rightsList,
  };
}

export function getRightsError(error) {
  return {
    type: GET_RIGHTS_ERROR,
    error,
  };
}

export function getRights(sessionid) {
  return (dispatch) => {
    dispatch(getRightsRequest());
    getUsersRights(
      sessionid,
      (data) => {
        dispatch(getRightsSuccess(data));
      },
      (err) => {
        dispatch(getRightsError('Erreur : Reccupération des Droits'));
      },
    );
  };
}
// **************************************************************************
// Gestion User
// **************************************************************************
// Achat du panier
export function setTransactionRequest(sessionId, selectedArticles) {
  return {
    type: SET_TRANSACTION_REQUEST,
    sessionId : sessionId,
    state_transaction : 'loading'
  }
}

export function setTransactionSuccess(data) {
  return {
    type: SET_TRANSACTION_SUCCESS,
    info_transaction: data,
    state_transaction: 'success',
  };
}

export function setTransactionError(error) {
  return {
    type: SET_TRANSACTION_ERROR,
    error,
  };
}

export function setTransaction(sessionId, selectedArticles, badge_id) {
  return (dispatch) => {
    dispatch(setTransactionRequest(sessionId, selectedArticles));

    // Vérification, s'il y a un article faisant parti du json ! 

    const current_date = new Date();
    const current_hour = current_date.getHours();
    const current_minute = current_date.getMinutes();
    const articles = halloween.articles;

    // Recherche de l'article_id correspondant à l'heure actuelle
    let article_id = null;
    for (let index = 0; index < articles.length; index++) {
      if(articles[index].start_hour == current_hour && (articles[index].start_minute <= current_minute && articles[index].end_minute >= current_minute)){
        article_id = articles[index].article_id;
      }
    }

    let found = false;
    // Si l'article existe on cherche s'il est dans la commande
    if (article_id){
      for (let index = 0; index < selectedArticles.length; index++) {
        if(selectedArticles[index].newID == article_id){
          found = true;
        }
      }
    }

    if (found) {
      fetch('https://kraken.picasso-utc.fr/api/perms/count/halloween?article_id=' + article_id, {
        method: 'GET'
      }).then(res => res.json()).then((result) => {
        if (result.count < 5) {
          fetch('https://kraken.picasso-utc.fr/api/perm/halloween/', {
            method: 'POST',
            body: JSON.stringify({ article_id: article_id, login: badge_id.toString()}),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
            dispatch(setTransactionState('halloween'));
          })
        } else {
          setUserTransaction(
            sessionId,
            badge_id,
            selectedArticles,
            (data) => {
              dispatch(setTransactionSuccess(data));
            },
            (err) => {
              dispatch(setTransactionError('Erreur : Transaction avortée'));
            },
          );
        }
        dispatch(deleteAllArticles(selectedArticles))
      })   
    } else {
      setUserTransaction(
        sessionId,
        badge_id,
        selectedArticles,
        (data) => {
          dispatch(setTransactionSuccess(data));
        },
        (err) => {
          dispatch(setTransactionError('Erreur : Transaction avortée'));
        },
      );
      dispatch(deleteAllArticles(selectedArticles))
    }

    
  };
}

// **************************************************************************
// Gestion WebTV
// **************************************************************************


export function getTvLinkRequest() {
  return {
    type: GET_TVLINK_REQUEST,
  };
}

export function getTvLinkSuccess(idTv, data) {
  return {
    type: GET_TVLINK_SUCCESS,
    data: data,
    idTv : idTv,
  };
}

export function getTvLinkError(error) {
  return {
    type: GET_TVLINK_ERROR,
    error,
  };
}

export function getTvLink(idTv) {
  return (dispatch) => {
    dispatch(getTvLinkRequest());
    getTvUrl(idTv,
      (data) => {
        dispatch(getTvLinkSuccess(idTv, data));
      },
      (err) => {
        dispatch(getTvLinkError('Erreur : Reccupération du lien WebTV'));
      });
  };
}


export function setTvLinkRequest() {
  return {
    type: SET_TVLINK_REQUEST,
  };
}

export function setTvLinkSuccess(idTv, tvLink, message) {
  return {
    type: SET_TVLINK_SUCCESS,
    tvLink,
    idTv,
    message,
  };
}

export function setTvLinkError(error) {
  return {
    type: SET_TVLINK_ERROR,
    error,
  };
}

export function setTvLink(idTv, url, photo, messages,is_new) {
  return (dispatch) => {
    dispatch(setTvLinkRequest());
    setTvUrl(idTv, url, photo, messages, is_new,
      (data) => {
        dispatch(setTvLinkSuccess(idTv, url, 'Lien de Télé Changé'));
      },
      (err) => {
        dispatch(setTvLinkError('Erreur : Changement de lien WebTV'));
      });
  };
}


export function getMessagesListRequest() {
  return {
    type: GET_MESSAGES_LIST_REQUEST,
  };
}

export function getMessagesListSuccess(messages) {
  return {
    type: GET_MESSAGES_LIST_SUCCESS,
    messages,
  };
}

export function getMessagesListError(error) {
  return {
    type: GET_MESSAGES_LIST_ERROR,
    error,
  };
}

export function getMessagesList() {
  return (dispatch) => {
    dispatch(getMessagesListRequest());
    fetchMessagesList(
      (data) => { dispatch(getMessagesListSuccess(data)); },
      (err) => { dispatch(getMessagesListError('Erreur : Chargement liste Messages')); },
    );
  };
}

export function addMessageRequest() {
  return {
    type: ADD_MESSAGE_REQUEST,
  };
}

export function addMessageSuccess(data) {
  return {
    type: ADD_MESSAGE_SUCCESS,
    data,

  };
}

export function addMessageError(error) {
  return {
    type: ADD_MESSAGE_ERROR,
    error,
  };
}

export function addMessage(title, text) {
  return (dispatch) => {
    dispatch(addMessageRequest());
    addMessageToList(
      title,
      text,
      (data) => { dispatch(addMessageSuccess(data)); },
      (err) => { dispatch(addMessageError('Erreur : Ajout de Message')); },
    );
  };
}


export function deleteMessageRequest() {
  return {
    type: DELETE_MESSAGE_REQUEST,
  };
}

export function deleteMessageSuccess(idMessage) {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    idMessage,
  };
}

export function deleteMessageError(error) {
  return {
    type: DELETE_MESSAGE_ERROR,
    error,
  };
}

export function deleteMessage(idMessage) {
  return (dispatch) => {
    dispatch(deleteMessageRequest());
    deleteMessageFromList(
      idMessage,
      (data) => {
        dispatch(deleteMessageSuccess(idMessage));
      },
      (err) => {
        dispatch(deleteMessageError('Erreur : Supression de Message'));
      },
    );
  };
}


export function getDefaultUrlRequest() {
  return {
    type: GET_DEFAULT_URL_REQUEST,
  };
}

export function getDefaultUrlSuccess(urls) {
  return {
    type: GET_DEFAULT_URL_SUCCESS,
    urls,
  };
}

export function getDefaultUrlError(error) {
  return {
    type: GET_DEFAULT_URL_ERROR,
    error,
  };
}

export function getDefaultUrl() {
  return (dispatch) => {
    dispatch(getDefaultUrlRequest());
    getUrls(
      (data) => { dispatch(getDefaultUrlSuccess(data)); },
      (err) => { dispatch(getDefaultUrlError('Erreur : Reccupération des liens')); },
    );
  };
}


// **************************************************************************
// Gestion Transactions
// **************************************************************************

export function setTransactionState(state_transaction) {
  return {
    type: SET_TRANSACTION_STATE,
    state_transaction,
  };
}

// Récupérer l'id du client
export function getClientUid(clientUid) {
  return {
    type: GET_CLIENT_UID,
    clientUid,
  };
}

// Récuperation des infos d'un user
export function getInformationRequest(sessionId) {
  return {
    type: GET_CLIENT_INFO_REQUEST,
    sessionId,
  };
}

export function getInformationSuccess(info_client) {
  return {
    type: GET_CLIENT_INFO_SUCCESS,
    info_client,
  };
}

export function getInformationError(error) {
  return {
    type: GET_CLIENT_INFO_ERROR,
    error,
  };
}

export function getInformation(sessionId, badge_id) {
  return (dispatch) => {
    dispatch(getInformationRequest(sessionId));
    getUserInformation(
      sessionId,
      badge_id,
      (data) => {
        dispatch(getInformationSuccess(data));
      },
      (err) => {
        dispatch(getInformationError('Erreur : Probleme dans la récupération des infos'));
      },
    );
  };
}

export function setClientState() {
  return {
    type: SET_CLIENT_STATE,
    info_client: null,
  };
}


// cancel la transaction d'un achat
export function cancelTransactionRequest(sessionId) {
  return {
    type: CANCEL_ARTICLE_REQUEST,
    sessionId,
  };
}

export function cancelTransactionSuccess(cancel,pur_id)
{
  return{
    type: CANCEL_ARTICLE_SUCCESS,
    cancel : cancel,
    deleted_id: pur_id
  }
}

export function cancelTransactionError(error) {
  return {
    type: CANCEL_ARTICLE_ERROR,
    error,
  };
}

export function cancelTransaction(sessionId, pur_id) {
  return (dispatch) => {
    dispatch(cancelTransactionRequest(sessionId, pur_id));
    cancelUserTransaction(
      sessionId,
      pur_id,
      (data)=> {
        dispatch(cancelTransactionSuccess(data,pur_id))
      },
      (err) => {
        dispatch(cancelTransactionError('Erreur : Impossible de cancel la transaction'));
      },
    );
    dispatch(deleteArticleCanceled(pur_id));
  };
}


// supprimer affichage d'un article canceled en attendant pOSS4
export function deleteArticleCanceled(pur_id) {
  return {
    type: DELETE_ARTICLE_CANCELED,
    pur_id,
  };
}


// **************************************************************************
// Gestion Admin
// **************************************************************************

export function updateAdminNav(AdminNav) {
  return {
    type: UPDATE_ADMIN_NAV,
    AdminNav,
  };
}

export function changePanel(panel) {
  return {
    type: CHANGE_PANEL,
    activePanel: panel,
  };
}


export function getGoodiesRequest(message) {
  return {
    type: GET_GOODIES_REQUEST,
    message,
  };
}

export function getGoodiesSuccess(goodiesList) {
  return {
    type: GET_GOODIES_SUCCESS,
    goodiesList,
  };
}

export function getGoodiesError(error) {
  return {
    type: GET_GOODIES_ERROR,
    error,
  };
}

export function gingerRequest() {
  return {
    type: GINGER_REQUEST,
  };
}

export function gingerSuccess(userInfo) {
  return {
    type: GINGER_SUCCESS,
    userInfo,
  };
}

export function gingerError(error) {
  return {
    type: GINGER_ERROR,
    error,
  };
}

export function ginger(login) {
  return (dispatch) => {
    dispatch(gingerRequest());
    gingerApiRequest(
      login,
      (data) => {
        dispatch(gingerSuccess(data));
      },
      (err) => {
        dispatch(gingerError('Erreur : Connexion Ginger'));
      },
    );
  };
}


export function getGoodies(dateDebut, dateFin, quantite) {
  return (dispatch) => {
    dispatch(getGoodiesRequest('Recherche des Gagnants lancée'));
    getGoodiesList(dateDebut, dateFin, quantite,
      (data) => {
        dispatch(getGoodiesSuccess(data));
      },
      (err) => {
        dispatch(getGoodiesError('Erreur : Reccupération des gagnants'));
      });
  };
}


export function blockUserRequest(sessionId)
{
  return{
    type: BLOCK_USER_REQUEST,
    sessionId : sessionId
  }
}

export function blockUserSuccess(blocage)
{
  return{
    type : BLOCK_USER_SUCCESS,
    blocage : blocage,
    blocked: 'effective'
  }
}

export function blockUserError(error){
  return{
    type: BLOCK_USER_ERROR,
    error:error
  }
}

export function blockAUser(sessionId,clientUid,date_fin)
{
  return (dispatch)=>{
    dispatch(blockUserRequest(sessionId));
    blockUser(sessionId,clientUid,date_fin,
      (data)=>{
        dispatch(blockUserSuccess(data))
      },
      (err)=>{
        dispatch(blockUserError('Erreur : Bloquage non effectif'))
      }
    )
  }
}

export function setBloquageState(blocked){
  return{
    type: SET_BLOCKED_STATE,
    blocked : blocked
  }
}

//get all users BLOCKED
export function getAllBlockedUsersRequest()
{
  return{
    type : GET_BLOCKED_USERS_REQUEST
  }
}

export function getAllBlockedUsersSuccess(list_blockedUsers)
{
  return{
    type: GET_BLOCKED_USERS_SUCCESS,
    list_blockedUsers : list_blockedUsers
  }
}

export function getAllBlockedUsersError()
{
  return{
    type : GET_BLOCKED_USERS_ERROR
  }
}

export function getBlockedUsers(sessionId)
{
  return (dispatch)=>{
    dispatch(getAllBlockedUsersRequest());
    getAllBlockedUsers(sessionId,
      (data)=>{
        dispatch(getAllBlockedUsersSuccess(data))
      },
      (err)=>{
        dispatch(blockUserError('Erreur : Impossible de récuperer les users boqués'))
      }
    )
  }
}

//Envoie carte etu perdu mail
export function sendMailRequest()
{
  return{
    type : SEND_LOST_REQUEST
  }
}

export function sendMailSuccess(sended)
{
  return{
    type: SEND_LOST_SUCCESS,
    sended : 'sended'
  }
}

export function sendMailError(sended)
{
  return{
    type : SEND_LOST_ERROR,
    sended: sended
  }
}

export function sendMail(login)
{
  return (dispatch)=>{
    dispatch(sendMailRequest());
    sendLostCard(login,
      (data)=>{
        dispatch(sendMailSuccess(data))
      },
      (err)=>{
        dispatch(sendMailError('Erreur : Envoie du mail a échoué'))
      }
    )
  }
}

export function setMailState() {
  return {
    type: RESET_LOST,
    sended: 'listen',
  };
}
