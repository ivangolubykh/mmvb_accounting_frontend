import React from 'react';

import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import IssuersCard from './IssuersCard';
import AddCard from './AddCard';

function aaa( {mainParent} ) {
  console.log('ddd')
}

function BodyIssuers( {mainParent} ) {


  const numbers = [1, 2, 3, 4, 5];


  const addCardData = {
    "titleCard": "Добавить Регион",
    "titleForm": "Добавить новый регион (субъект РФ)",
    "url": "api/region_fias/add.json",
    "fields": [
      {
        "name": "adminDivisionName",
        "label": "Муниципальное название",
        "placeholder": "Город Санкт-Петербург",
        "required": true,
        "type": "text",
        "value": "",
      },
      {
        "name": "shortNameIssuer",
        "label": "Административное название",
        "placeholder": "Санкт-Петербург город",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "codeOkato",
        "label": "Код ОКАТО",
        "placeholder": "40000000000",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "codeOktmo",
        "label": "Код ОКТМО",
        "placeholder": "40000000",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "codePostal",
        "label": "Почтовый индекс",
        "placeholder": "190000",
        "required": false,
        "type": "text",
        "value": "",
      },
      {
        "name": "stateAddressRegister",
        "label": "Уникальный номер в государственном адресном реестре",
        "placeholder": "C2DEB16A-0330-4F05-821F-1D09C93331E6",
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

  const popoverAddRegionHelp = (
    <Popover id="popover-basic" title="Полезная информация" style={{ maxWidth: '75%' }}>
      Данные о регионах необходимо брать на официальном сайте ФИАС.
      Архив полной базы адресов <a target="_blank" href="https://fias.nalog.ru/"><strong>ФИАС</strong></a> весит 6 Гб,
      поэтому её полная интеграция для домашнего использования признана нецелесообразной.
    </Popover>
  );
  const HelpAddRegion = () => (
    <div  className="row justify-content-end" style={{ margin: '5px' }}>
    <OverlayTrigger trigger="click" placement="left" overlay={popoverAddRegionHelp}>
      <Button variant="light"><Image src="static/images/icons/info_16x16.gif" /></Button>
    </OverlayTrigger>
    </div>
  );
  const allCards = numbers.map((number) => <IssuersCard key={number} mainParent={number} />);

  return (
    <>
      <HelpAddRegion />
      <CardDeck><AddCard key="add" addCardData={addCardData} mainParent={mainParent}/>{allCards}</CardDeck>
    </>
  );

}


export default BodyIssuers;
