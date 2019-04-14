import React from 'react';

import Card from 'react-bootstrap/Card';


function IssuersAddCard( {mainParent} ) {
  return (
    <Card border="primary" style={{ maxWidth: '640px', minWidth: '290px', marginBottom: '10px' }}>
      <Card.Body className="text-center">
        <Card.Link href="#">
          <Card.Header>Добавить Элемент</Card.Header>
          <Card.Img variant="null" src="static/images/plus_01.gif" />
        </Card.Link>
      </Card.Body>
    </Card>
  )
}


export default IssuersAddCard;
