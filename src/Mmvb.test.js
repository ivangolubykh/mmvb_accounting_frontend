import React from 'react';
import ReactDOM from 'react-dom';
import Mmvb from './Mmvb';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Mmvb />, div);
  ReactDOM.unmountComponentAtNode(div);
});
