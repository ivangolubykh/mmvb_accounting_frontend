import React from 'react';

import Alert from 'react-bootstrap/Alert';

import BodyBrokerageAccounts from './BodyBrokerageAccounts';
import BodyIssuers from './BodyIssuers';
import BodyRegions from './BodyRegions';
import BodySecuritiesTypes from './BodySecuritiesTypes';


function Body( {mainParent} ) {
  if (mainParent.state.isLogin === true) {
    if (mainParent.state.currentPage === "#brokerage_accounts") {
      return <main className="container-fluid flex-grow-1"><BodyBrokerageAccounts mainParent={mainParent} /></main>;
    }
    if (mainParent.state.currentPage === "#issuers") {
      return <main className="container-fluid flex-grow-1"><BodyIssuers mainParent={mainParent} /></main>;
    }
    if (mainParent.state.currentPage === "#regions") {
      return <main className="container-fluid flex-grow-1"><BodyRegions mainParent={mainParent} /></main>;
    }
    if (mainParent.state.currentPage === "#securities_types") {
      return <main className="container-fluid flex-grow-1"><BodySecuritiesTypes mainParent={mainParent} /></main>;
    }
  }

  if ((mainParent.state.currentPage === "#home")  || (mainParent.state.currentPage === "")) {
    return <main className="container-fluid flex-grow-1"><BodyRegions mainParent={mainParent} /></main>;
  }

  return (<main className="container-fluid flex-grow-1">
      <Alert variant='danger'>Страница не найдена или не доступна. Возможно вы не авторизованы.</Alert>
    </main>
  );
}


export default Body;
