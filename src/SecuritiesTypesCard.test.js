import React from 'react';
import ReactDOM from 'react-dom';
import SecuritiesTypesCard from './SecuritiesTypesCard';

const initialState = {
  currentPage: "#home",
};

const account = [
  {
    "url":"http://mmvb.localhost/api/brokerage_accounts/1.json",
    "comment":"",
    "name":"SecuritiesTypesCard",
  }
]

class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return (
      <div>
        src/SecuritiesTypesCard.test.js
      </div>
    );
  }
}

const div = document.createElement('div');
const mainParent = ReactDOM.render(<MainParent />, div);
it('renders without crashing', () => {
  // const div = document.createElement('div');
  ReactDOM.render(<SecuritiesTypesCard key={account.url} data={account} mainParent={mainParent} parent={mainParent}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
