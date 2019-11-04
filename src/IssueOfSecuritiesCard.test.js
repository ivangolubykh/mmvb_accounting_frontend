import React from 'react';
import ReactDOM from 'react-dom';
import IssueOfSecuritiesCard from './IssueOfSecuritiesCard';

const initialState = {
  currentPage: "#home",
};

const issuer = [
  {
    "url":"http://mmvb.localhost/api/issue_of_securities/1.json",
    "comment":"",
    "name":"qeqew",
    "ogrn":"",
    "regions":"http://mmvb.localhost/api/issue_of_securities/regions_id.json",
    "region_name":null,
    "site":"",
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
        src/IssueOfSecuritiesCard.test.js
      </div>
    );
  }
}

const div = document.createElement('div');
const mainParent = ReactDOM.render(<MainParent />, div);
it('renders without crashing', () => {
  // const div = document.createElement('div');
  ReactDOM.render(<IssueOfSecuritiesCard key={issuer.url} data={issuer} mainParent={mainParent} parent={mainParent}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
