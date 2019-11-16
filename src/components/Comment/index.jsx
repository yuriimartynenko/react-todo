import React from 'react';
import { Row, Col } from 'reactstrap';

const Comment = ({ comment: { title } }) => (
    <Row className='m-0 p-3 px-1 comment border-bottom' >
        <Col xs={2}>
            <img className='img-fluid' src='https://picsum.photos/200' alt='' />
        </Col>
        <Col xs={10}>
            {title}
        </Col>
    </Row>
);

export default Comment;