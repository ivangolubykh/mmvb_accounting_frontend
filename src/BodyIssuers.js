import React from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import AddCard from './AddCard';
import IssuersCard from './IssuersCard';


class BodyIssuers extends React.Component {
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
    fetch("api/issuers.json").then((response) => {
      if (response.status !== 200) {
        me.resetState();
        return;
      }
      return response.json()
    }).then((response) => {
      if (response) {
        me.setState({cards: []});
        me.setState({cards: response});
      }
    }).then((error) => {
      if (error) {
        me.resetState();
        this.setState({error});
      }
    }).catch(function(ex) {
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
      "titleCard": "Добавить эмитента",
      "titleForm": "Добавить нового эмитента",
      "url": "api/issuers.json",
      "fields": [
        {
          "name": "name",
          "label": "Название компании",
          "placeholder": 'ООО "Компания"',
          "required": true,
          "type": "text",
          "value": "",
        },
        {
          "name": "regions",
          "label": "Регион",
          "fields": {"id": "url", "name": "munitipal_name"},
          "required": false,
          "type": "select",
          "url": "api/region_fias.json?only_name=true",
          "value": "",
        },
        {
          "name": "ogrn",
          "label": "ОГРН",
          "placeholder": '1234567890123',
          "required": false,
          "type": "text",
          "value": "",
        },
        {
          "name": "site",
          "label": "Сайт эмитента",
          "required": false,
          "type": "url",
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

    const allCards = this.state.cards.map((issuer) => <IssuersCard key={issuer.url} data={issuer} mainParent={me.mainParent} parent={me}/>);

    return (
      <>
        <CardDeck><AddCard key="add" addCardData={addCardData} parent={me} mainParent={me.mainParent}/>{allCards}</CardDeck>
      </>
    );
  }

}


export default BodyIssuers;
