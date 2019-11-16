import React from 'react';
import { Button, Form, Input } from 'reactstrap';

const TodoInput = props => (
    <Form onSubmit={props.addItem} className='d-inline-flex justify-content-between w-100 mb-3'>
        <Input
            className='w-75 mr-2'
            value={props.value}
            onChange={props.handleInput}
            type="text"
            placeholder='Type name here...'
        />
        <Button color='info' disabled={!props.value} className='w-25'>Add new</Button>
    </Form>
)

export default TodoInput;