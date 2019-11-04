import React from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import AddCard from './AddCard';
import IssueOfSecuritiesCard from './IssueOfSecuritiesCard';


class BodyIssueOfSecurities extends React.Component {
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
    fetch("api/issue_of_securities.json").then((response) => {
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
      "titleCard": "Добавить выпуск ценных бумаг",
      "titleForm": "Добавить новый выпуск ценных бумаг",
      "url": "api/issue_of_securities.json",
      "fields": [
        {
          "name": "securities_types",
          "label": "Тип ценных бумаг",
          "fields": {"id": "url", "name": "name"},
          "required": true,
          "type": "select",
          "url": "api/securities_types.json?only_name=true",
          "value": "",
        },
        {
          "name": "name",
          "label": "Название выпуска ценных бумаг",
          "placeholder": 'Торговый дом "Мясничий", БО-П03',
          "required": true,
          "type": "text",
          "value": "",
        },
        {
          "name": "isin_code",
          "label": "ISIN код",
          "placeholder": 'RU000A1006B5',
          "required": true,
          "type": "text",
          "value": "",
        },
        {
          "name": "issuers",
          "label": "Эмитент",
          "fields": {"id": "url", "name": "name"},
          "required": true,
          "type": "select",
          "url": "api/issuers.json?only_name=true",
          "value": "",
        },
        {
          "name": "site",
          "label": "Сайт о выпуске ценной бумаги",
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
    const allCards = this.state.cards.map((issuer) => <IssueOfSecuritiesCard key={issuer.url} data={issuer} mainParent={me.mainParent} parent={me}/>);

    return (
      <>
        <CardDeck><AddCard key="add" addCardData={addCardData} parent={me} mainParent={me.mainParent}/>{allCards}</CardDeck>
      </>
    );
  }

}


export default BodyIssueOfSecurities;
