import React from 'react';
import ReactDOM from 'react-dom';
import IssuersCard from './IssuersCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssuersCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
