import React from 'react';

import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import IssuersCard from './IssuersCard';
import AddCard from './AddCard';



import Card from 'react-bootstrap/Card';

function BodyIssuers( {mainParent} ) {


  const numbers = [1, 2, 3, 4, 5];


  const addCardData = {
    "titleCard": "Добавить эмитента",
    "titleForm": "Добавить нового эмитента",
    "url": "api/get_session_data/current.json",
    "fields": [
      {
        "name": "longNameIssuer",
        "label": "Полное название эмитента",
        "required": true,
        "type": "text",
        "value": "",
      },
      {
        "name": "shortNameIssuer",
        "label": "Короткое название эмитента",
        "required": true,
        "type": "text",
        "value": "",
      },
      {
        "name": "urlIssuer",
        "label": "Сайт эмитента",
        "required": true,
        "type": "url",
        "value": "",
      },
      {
        "name": "region",
        "label": "Регион (субъект РФ)",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "address",
        "label": "Адрес",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "comment",
        "label": "Комментарий",
        "required": false,
        "type": "textarea",
        "rows": "3",  // only for textarea type
        "value": "",
      },
    ],
  }

  const allCards = numbers.map((number) => <IssuersCard key={number} mainParent={number} />);
  return <CardDeck><AddCard key="add" addCardData={addCardData} mainParent={mainParent}/>{allCards}</CardDeck>;

}


export default BodyIssuers;
