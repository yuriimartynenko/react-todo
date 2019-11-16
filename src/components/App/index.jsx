import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TodoInput from '../TodoInput';
import TodoItems from '../TodoItems';
import Comments from '../Comments';
import './index.css';

class Todo extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            itemInput: '',
            commentInput: '',
            selectedItem: '',
            selectedIdx: '',
            errorTextItem: '',
            errorTextComment: '',
        };
    }

    componentDidMount() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        this.setState({ items });
    }

    handleInput = e => this.setState({ itemInput: e.target.value });
    handleCommentInput = e => this.setState({ commentInput: e.target.value });

    addItem = async (e) => {
        e.preventDefault();
        const { items, itemInput } = this.state;
        const uniqueId = new Date().getTime();
        if (itemInput.trim().length < 3) {
            this.setState({ errorTextItem: 'Min 3 symbols...' })
            return;
        }
        await this.setState({
            items: [...items, {
                id: uniqueId,
                title: itemInput,
                comments: [],
                active: false,
            }],
            itemInput: '',
            errorTextItem: '',
        });
        localStorage.setItem('items', JSON.stringify(this.state.items));
        this.toggleActive(uniqueId);
    };

    deleteItem = async (id) => {
        await this.setState({ items: this.state.items.filter((item) => item.id !== id) });
        localStorage.setItem('items', JSON.stringify(this.state.items));
    };

    toggleActive = async (id) => {
        await this.setState((state) => {
            const items = state.items.map((item) => {
                if (item.id === id) {
                    return { ...item, active: true }
                } else {
                    return { ...item, active: false }
                }
            }
            );
            return { items };
        });
        localStorage.setItem('items', JSON.stringify(this.state.items));
        const selectedItem = this.state.items.find((item) => item.id === id);
        let selectedIdx = this.state.items.findIndex(idx => idx.id === id);
        selectedIdx++;
        this.setState({ selectedItem, selectedIdx });
    };

    addComment = async (e) => {
        const { selectedItem: { id, comments }, commentInput } = this.state;
        if (e.ctrlKey && e.keyCode === 13) {
            if (commentInput.trim().length < 3) {
                this.setState({ errorTextComment: 'Min 3 symbols...'})
                return;
            }
            await this.setState((state) => {
                const uniqueId = new Date().getTime();
                const items = state.items.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            comments: [...comments, { id: uniqueId, title: commentInput }]
                        }
                    } else {
                        return { ...item }
                    }
                }
                );
                return { items };
            });
            localStorage.setItem('items', JSON.stringify(this.state.items));
            const selectedItem = this.state.items.find((item) => item.id === this.state.selectedItem.id);
            this.setState({ selectedItem, commentInput: '', errorTextComment: '' });
        };
    };

    render() {
        const { itemInput, items, selectedItem, selectedIdx, commentInput, errorTextItem, errorTextComment } = this.state;
        return (
            <div className="App">
                <Container fluid>
                    <Row>
                        <Col className='mb-6' sm="6">
                            <div className='wrapper__box shadow mb-5 bg-white'>
                                <div className='px-4 pt-3'>
                                    <h2 className='font-weight-light'>Items</h2>
                                    <p className='text-danger'>{errorTextItem}</p>
                                    <TodoInput
                                        items={items}
                                        value={itemInput}
                                        handleInput={this.handleInput}
                                        toggleActive={this.toggleActive}
                                        addItem={this.addItem}
                                    />
                                </div>
                                <TodoItems
                                    items={items}
                                    deleteItem={this.deleteItem}
                                    toggleActive={this.toggleActive}
                                />
                            </div>
                        </Col>
                        <Col sm='6'>
                            <div className='wrapper__box shadow mb-5 bg-white'>
                                <div className='px-4 pt-3'>
                                    <h2 className='font-weight-light'>Comments #{selectedIdx}</h2>
                                    <p className='text-danger'>{errorTextComment}</p>
                                    {
                                        selectedItem ? (
                                            <Comments
                                                selectedItem={selectedItem}
                                                addComment={this.addComment}
                                                handleCommentInput={this.handleCommentInput}
                                                commentInput={commentInput}
                                            />) : (
                                                <p>Please select an item</p>
                                            )
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Todo;