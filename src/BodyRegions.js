import React from 'react';

import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import AddCard from './AddCard';
import RegionsCard from './RegionsCard';


class BodyRegions extends React.Component {
  constructor(props) {
    super(props);
    this.mainParent = props.mainParent;
    this.initialState = {cards: []};
    this.state = this.initialState;
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    const me = this;
    fetch("api/region_fias.json")
      .then((response) => {
        if (response.status !== 200) {
          me.resetState();
          return;
        }
        return response.json()
      })
      .then((response) => {
        if (response) {
          me.setState({cards: []});
          me.setState({cards: response});
        }
      })
      .then((error) => {
        if (error) {
          me.resetState();
          this.setState({error});
        }
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
        me.resetState();
      });
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    const me = this;

    const addCardData = {
      "titleCard": "Добавить Регион",
      "titleForm": "Добавить новый регион (субъект РФ)",
      "url": "api/region_fias.json",
      "fields": [
        {
          "name": "munitipal_name",
          "label": "Муниципальное название",
          "placeholder": "Город Санкт-Петербург",
          "required": true,
          "type": "text",
          "value": "",
        },
        {
          "name": "administrative_name",
          "label": "Административное название",
          "placeholder": "Санкт-Петербург город",
          "required": false,
          "type": "text",
          "value": "",
        },
        {
          "name": "okato_code",
          "label": "Код ОКАТО",
          "placeholder": "40000000000",
          "required": false,
          "type": "text",
          "value": "",
        },
        {
          "name": "oktmo_code",
          "label": "Код ОКТМО",
          "placeholder": "40000000",
          "required": false,
          "type": "text",
          "value": "",
        },
        {
          "name": "postcode",
          "label": "Почтовый индекс",
          "placeholder": "190000",
          "required": false,
          "type": "text",
          "value": "",
        },
        {
          "name": "state_uuid",
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
        Архив полной базы адресов <a target="_blank" rel="noopener noreferrer" href="https://fias.nalog.ru/"><strong>ФИАС</strong></a> весит 6 Гб,
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
    const allCards = this.state.cards.map((region) => <RegionsCard key={region.url} data={region} mainParent={me.mainParent} parent={me}/>);

    return (
      <>
        <HelpAddRegion />
        <CardDeck><AddCard key="add" addCardData={addCardData} parent={me} mainParent={me.mainParent}/>{allCards}</CardDeck>
      </>
    );
  }

}


export default BodyRegions;
