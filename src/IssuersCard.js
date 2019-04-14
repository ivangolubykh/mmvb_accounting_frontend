import React from 'react';

import Card from 'react-bootstrap/Card';


function IssuersCard( {mainParent} ) {
  return (
    <Card border="secondary" style={{ maxWidth: '640px', minWidth: '290px', marginBottom: '10px' }}>
      <Card.Body>
        <Card.Title>Card Title2</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  )
}


export default IssuersCard;
