import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { nanoid } from "nanoid";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        let id = e.target.dataset.id;
        this.props.onChange(id);
    }
    handleToggle(index) {
        //上面这里内存指向好像也没有改变？为啥就可以？
        let array = this.props.todoLists;
        array[index].completed = !array[index].completed;
        this.setState({
            todoLists: array,
        });
        console.log(this.props);
        //为啥这里我想调用父组件的方法但是不可以？
        this.props.store('todoList', array)
    }
    render() {
        return this.props.todoLists.map((item, index) => {
            return (
                <React.Fragment key={item.id}>
                    <li className={item.completed ? "completed" : ""}>
                        <div className="view">
                            <input
                                className="toggle"
                                type="checkbox"
                                checked={item.completed}
                                onChange={this.handleToggle.bind(this, index)}
                            />
                            <label>{item.title}</label>
                            <button
                                className="destroy"
                                data-id={item.id}
                                onClick={this.handleDelete}
                            ></button>
                        </div>
                    </li>
                </React.Fragment>
            );
        });
    }
}

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.ENTER_KEY = 13;
        this.ALL_TODOS = 'all'
        this.ACTIVE_TODOS = 'active';
        this.COMPLETED_TODOS = 'completed';
        this.currentActive = ''
        this.handleClickSelectedAll = this.handleClickSelectedAll.bind(this);
        this.handleClickClearCompleted = this.handleClickClearCompleted.bind(this);
        this.handleClickActiveTodos = this.handleClickActiveTodos.bind(this);
        this.handleClickCompletedTodos = this.handleClickCompletedTodos.bind(this);
    }
    state = {
        newTodo: "",
        todoLists: [
            // {
            //     id: nanoid(),
            //     title: '黄老板',
            //     completed: false
            // },
            // {
            //     id: nanoid(),
            //     title: '李老板',
            //     completed: true
            // },
            // {
            //     id: nanoid(),
            //     title: '连老板',
            //     completed: false
            // },
        ],
    };

    deleteItem(id) {
        let array = this.state.todoLists;
        let index = array.findIndex((item) => item.id === id);
        if (index !== -1) array.splice(index, 1);
        this.setState({
            todoLists: array,
        });
        this.store('todoList', array)
    }
    getCount() {
        let activeTodoCount = this.state.todoLists.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
        // let completedCount = this.state.todoLists.length - activeTodoCount;
        return activeTodoCount;
    }
    handleClickSelectedAll() {
        let array = this.store('todoList')

        this.setState({ todoLists: array });
    }
    handleClickClearCompleted() {
        let array = this.state.todoLists.filter((item) => {
            return !item.completed;
        });
        this.setState({ todoLists: array });
        this.store('todoList', array)
    }
    handleInputScaning(e) {
        let value = e.target.value.trim();

        value && this.setState({ newTodo: value });
    }
    handleNewTodoKeyDown(event) {
        if (event.keyCode !== this.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        let val = event.target.value.trim();
        if (val) {
            //保存
            this.state.todoLists.push({
                id: nanoid(),
                title: val,
                completed: false,
            });
            this.store("todoList", this.state.todoLists);
        }
        this.setState({ newTodo: "" });
    }
    componentDidMount() {
        let array = this.store("todoList");
        if (array.length > 0) {
            this.setState({
                todoLists: array,
            });
        }
        //设置全部按钮高亮
        this.setState({
            currentActive: this.ALL_TODOS
        })
    }
    handleClickActiveTodos(name) {
        let array = this.store("todoList");
        array = array.filter((item) => !item.completed)
        this.setState({ todoLists: array });
        this.setState({
            currentActive: this.ACTIVE_TODOS
        })
    }
    handleClickCompletedTodos(name) {
        let array = this.store("todoList");
        array = array.filter((item) => {
            return item.completed;
        });
        this.setState({ todoLists: array });
        this.setState({
            currentActive: this.COMPLETED_TODOS
        })

    }
    store(key, data) {
        if (data) {
            return localStorage.setItem(key, JSON.stringify(data));
        }

        var store = localStorage.getItem(key);
        return (store && JSON.parse(store)) || [];
    }
    render() {
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input
                            className="new-todo"
                            placeholder="What needs to be done?"
                            autoFocus
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
                                store={this.store}
                            ></List>
                        </ul>
                    </section>
                    <footer className="footer">
                        <span className="todo-count">
                            <strong>{this.getCount()}</strong> item left
                        </span>
                        <ul className="filters">
                            <li onClick={this.handleClickSelectedAll}>
                                <a className={this.state.currentActive === this.state.ALL_TODOS ? 'selected' : ''} href="#/">
                                    All
                                </a>
                            </li>
                            <li onClick={this.handleClickActiveTodos.bind(this, "active")}>
                                <a className={this.state.currentActive === this.state.ACTIVE_TODOS ? 'selected' : ''} href="#/">Active</a>
                            </li>
                            <li
                                onClick={this.handleClickCompletedTodos.bind(this, "completed")}
                            >
                                <a className={this.state.currentActive === this.state.COMPLETED_TODOS ? 'selected' : ''} href="#/">Completed</a>
                            </li>
                        </ul>
                        <button
                            className="clear-completed"
                            onClick={this.handleClickClearCompleted}
                        >
                            Clear completed
                        </button>
                    </footer>
                </section>
            </div>
        );
    }
}
ReactDOM.render(<Todos />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
