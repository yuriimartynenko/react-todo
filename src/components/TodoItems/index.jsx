import React, { Component, Fragment } from 'react'
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import './index.css';

class TodoItems extends Component {
    listItems() {
        return this.props.items
            .map(item => {
                return (
                    <Fragment key={item.id}>
                        <ListGroupItem action className={
                            'd-flex justify-content-between '
                            + (item.active ? 'item-active' : '')}
                            onClick={() => this.props.toggleActive(item.id)}
                        >
                            <span className='item-title my-auto font-weight-bold'>
                                {item.title}
                                <Badge color="info" className=' ml-2 font-weight-normal' pill>{item.comments.length}</Badge>
                            </span>
                            <Button outline color="danger" onClick={() => this.props.deleteItem(item.id)}>Delete</Button>
                        </ListGroupItem >
                    </Fragment>
                )
            })
    }
    render() {
        return <ListGroup className='list__items' flush>{this.listItems()}</ListGroup>
    }
}

export default TodoItems;