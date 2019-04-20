import React from 'react';
import ReactDOM from 'react-dom';
import IssuersAddCard from './IssuersAddCard';

const addCardData = {
  "title": "Добавить нового эмитента",
  "url": "api/get_session_data/current.json",
  "fields": [
    {
      "name": "textField",
      "label": "Текстовое поле формы",
      "required": true,
      "type": "text",
    },
    {
      "name": "urlField",
      "label": "URL-поле формы",
      "required": true,
      "type": "url",
    },
    {
      "name": "textareaField",
      "label": "Textarea-поле формы",
      "required": false,
      "type": "textarea",
      "rows": "3",  // only for textarea type
    },
  ],
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssuersAddCard addCardData={addCardData} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
