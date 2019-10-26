import React from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import AddCard from './AddCard';
import SecuritiesTypesCard from './SecuritiesTypesCard';


class BodySecuritiesTypes extends React.Component {
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
    fetch("api/securities_types.json").then((response) => {
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
      "titleCard": "Добавить тип ценных бумаг",
      "titleForm": "Добавить новый тип ценных бумаг",
      "url": "api/securities_types.json",
      "fields": [
        {
          "name": "name",
          "label": "Название типа ценных бумаг",
          "placeholder": "Облигации",
          "required": true,
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

    const allCards = this.state.cards.map((account) => <SecuritiesTypesCard key={account.url} data={account} mainParent={me.mainParent} parent={me}/>);

    return (
      <>
        <CardDeck><AddCard key="add" addCardData={addCardData} parent={me} mainParent={me.mainParent}/>{allCards}</CardDeck>
      </>
    );
  }

}


export default BodySecuritiesTypes;
