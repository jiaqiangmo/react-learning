import React from "react";
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
export default List