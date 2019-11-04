import React from 'react';
import ReactDOM from 'react-dom';

import BodyIssueOfSecurities from './BodyIssueOfSecurities';
import initialState from './initialState';


class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return <BodyIssueOfSecurities mainParent={this} />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
