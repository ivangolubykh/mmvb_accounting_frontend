import React from 'react';
import BodyIssuers from './BodyIssuers';


function Body( {mainParent} ) {
  if (mainParent.state.currentPage === "issuers") {
    return <main className="container-fluid flex-grow-1"><BodyIssuers mainParent={mainParent} /></main>;
  }

  return <main className="container-fluid flex-grow-1"><BodyIssuers mainParent={mainParent} /></main>;
}


export default Body;
