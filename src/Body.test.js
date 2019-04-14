import React from 'react';
import ReactDOM from 'react-dom';

import Body from './Body';
import initialState from './initialState';


class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return <Body mainParent={this} />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
