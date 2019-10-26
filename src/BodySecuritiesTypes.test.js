import React from 'react';
import ReactDOM from 'react-dom';
import BodySecuritiesTypes from './BodySecuritiesTypes';

const initialState = {
  currentPage: "#home",
};

const account = [
  {
    "url":"http://mmvb.localhost/api/securities_types/1.json",
    "comment":"",
    "name":"BodySecuritiesTypes Test Name",
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
        src/BodySecuritiesTypes.test.js
      </div>
    );
  }
}

const div = document.createElement('div');
const mainParent = ReactDOM.render(<MainParent />, div);
it('renders without crashing', () => {
  // const div = document.createElement('div');
  ReactDOM.render(<BodySecuritiesTypes key={account.url} data={account} mainParent={mainParent} parent={mainParent}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
