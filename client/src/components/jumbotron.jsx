import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

const Maintron = (props) => {
  return (
    <Jumbotron >
      <div className="mainText">
        <h1>Support your community today.</h1>
        <p>
         Kindly is an online platform where users can either list their unwanted goods or connect to claim those of others. Reach out & pass the kindness!
        </p>
        <p>
          <Button onClick={() => props.scrollTo()}bsStyle="primary">Help Your Community</Button>
        </p>
      </div>
    </Jumbotron>
  )

}

export default Maintron
