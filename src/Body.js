import React from 'react';
import BodyIssuers from './BodyIssuers';
import BodyRegions from './BodyRegions';


function Body( {mainParent} ) {
  if (mainParent.state.currentPage === "#issuers") {
    return <main className="container-fluid flex-grow-1"><BodyIssuers mainParent={mainParent} /></main>;
  }
  if (mainParent.state.currentPage === "#region") {
    return <main className="container-fluid flex-grow-1"><BodyRegions mainParent={mainParent} /></main>;
  }

  return <main className="container-fluid flex-grow-1"><BodyIssuers mainParent={mainParent} /></main>;
}


export default Body;
