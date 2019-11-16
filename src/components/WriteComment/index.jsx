import React from 'react';
import { Row, Col } from 'reactstrap';

const WriteComment = (props) => (
    <Row className='m-0 p-3'>
        <Col xs={2}>
            <img className='img-fluid' src="https://picsum.photos/200" alt="" />
        </Col>
        <Col xs={10}>
            <textarea
                onKeyUp={props.addComment}
                onChange={props.changeInput}
                value={props.commentInput}
                rows={4}
                type="text"
                placeholder='CTRL + Enter to Send'
                className='form-control comment-input'
            />
        </Col>
    </Row>
);

export default WriteComment;