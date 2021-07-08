import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { nanoid } from 'nanoid'
class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e) {
        let id = e.target.dataset.id
        this.props.onChange(id)
    }
    handleToggle(index) {
        //上面这里内存指向好像也没有改变？为啥就可以？
        let array = this.props.todoLists
        array[index].completed = !array[index].completed
        this.setState({
            todoLists: array
        })
        //这样不行？
        // this.props.todoLists[index].completed = !this.props.todoLists[index].completed
    }
    render() {
        return this.props.todoLists.map((item, index) => {
            return <React.Fragment key={item.id}>
                <li className={item.completed ? "completed" : ""} key={item.id}>
                    <div className="view">
                        <input className="toggle" type="checkbox"
                            defaultChecked={item.completed}
                            onChange={this.handleToggle.bind(this, index)} />
                        <label>{item.title}</label>
                        <button className="destroy" data-id={item.id} onClick={this.handleDelete}></button>
                    </div>
                </li>
            </React.Fragment>
        });
    }
}

class Todos extends React.Component {
    constructor(props) {
        super(props)
        this.ENTER_KEY = 13
        this.handleClickSelectedAll = this.handleClickSelectedAll.bind(this)
        this.handleClickCanccelAll = this.handleClickCanccelAll.bind(this)
    }
    state = {
        newTodo: '',
        todoLists: [
            {
                id: nanoid(),
                title: '黄老板',
                completed: false
            },
            {
                id: nanoid(),
                title: '李老板',
                completed: true
            },
            {
                id: nanoid(),
                title: '连老板',
                completed: false
            },
        ],
    }

    deleteItem(id) {
        let array = this.state.todoLists
        let index = array.findIndex((item) => item.id === id)
        if (index !== -1) array.splice(index, 1)
        this.setState({
            todoLists: array
        })
    }
    handleClickSelectedAll() {
        let array = this.state.todoLists

        array.map((item) => {
            return item.completed = true
        })
        this.setState({ todoLists: array })
    }
    handleClickCanccelAll() {
        let array = this.state.todoLists

        array.map((item) => {
            return item.completed = false
        })
        this.setState({ todoLists: array })
    }
    handleInputScaning(e) {
        let value = e.target.value.trim()

        value && this.setState({ newTodo: value })
    }
    handleNewTodoKeyDown(event) {
        if (event.keyCode !== this.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        let val = event.target.value.trim();
        if (val) {
            this.state.todoLists.push(
                {
                    id: nanoid(),
                    title: val,
                    completed: false
                }
            );
        }
        this.setState({ newTodo: '' });
    }

    render() {
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?" autoFocus
                            value={this.state.newTodo}
                            onChange={this.handleInputScaning.bind(this)}

                            onKeyUp={this.handleNewTodoKeyDown.bind(this)}
                        />
                    </header>
                    <section className="main">

                        <ul className="todo-list">
                            <List
                                todoLists={this.state.todoLists}
                                // onToggle={this.handleToggleChecked.bind(this)}
                                onChange={this.deleteItem.bind(this)}
                            >
                            </List>
                        </ul>
                    </section>
                    <footer className="footer">
                        <span className="todo-count"><strong>0</strong> item left</span>
                        <ul className="filters">
                            <li onClick={this.handleClickSelectedAll}>
                                <a className="selected" href="#/">All</a>
                            </li>
                            <li onClick={this.handleClickSelectedAll}>
                                <a href="#/">selectedAll</a>
                            </li>
                            <li onClick={this.handleClickCanccelAll}>
                                <a href="#/">cancelAll</a>
                            </li>
                            <li>
                                <a href="#/active">Active</a>
                            </li>
                            <li>
                                <a href="#/completed">Completed</a>
                            </li>
                        </ul>
                        <button className="clear-completed">Clear completed</button>
                    </footer>
                </section>
            </div>
        )
    }
}
ReactDOM.render(<Todos />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
