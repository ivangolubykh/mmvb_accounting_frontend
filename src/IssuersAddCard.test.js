import React from 'react';
import ReactDOM from 'react-dom';
import IssuersAddCard from './IssuersAddCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssuersAddCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
