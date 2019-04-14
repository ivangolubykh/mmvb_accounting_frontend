import React from 'react';

import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import IssuersCard from './IssuersCard';
import IssuersAddCard from './IssuersAddCard';



import Card from 'react-bootstrap/Card';

function BodyIssuers( {mainParent} ) {

  const numbers = [1, 2, 3, 4, 5];
  
  const allCards = numbers.map((number) => <IssuersCard key={number} mainParent={number} />);
  return <CardDeck><IssuersAddCard />{allCards}</CardDeck>;

}


export default BodyIssuers;
