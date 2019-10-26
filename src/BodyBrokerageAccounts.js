import React from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import AddCard from './AddCard';
import BrokerageAccountsCard from './BrokerageAccountsCard';


class BodyBrokerageAccounts extends React.Component {
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
    fetch("api/brokerage_accounts.json").then((response) => {
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
      "titleCard": "Добавить брокерский счёт",
      "titleForm": "Добавить новый брокерский счёт",
      "url": "api/brokerage_accounts.json",
      "fields": [
        {
          "name": "name",
          "label": "Название брокерского счёта",
          "placeholder": "ИИС",
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

    const allCards = this.state.cards.map((issuer) => <BrokerageAccountsCard key={issuer.url} data={issuer} mainParent={me.mainParent} parent={me}/>);

    return (
      <>
        <CardDeck><AddCard key="add" addCardData={addCardData} parent={me} mainParent={me.mainParent}/>{allCards}</CardDeck>
      </>
    );
  }

}


export default BodyBrokerageAccounts;
