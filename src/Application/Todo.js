import React, { useEffect, useState } from 'react';
import Sun from './icon-sun.svg';
import Moon from './icon-moon.svg';
import Dark from './bg-desktop-dark.jpg'
import Light from './bg-desktop-light.jpg'
import './Header.css';

function Todo() {

    // document.body.style.background = "black";
    const Theme = () => {

        var image = document.getElementById('Backgroundchange');
        if (image.src.match("images/bg-desktop-dark")) {
            image.src = "images/bg-desktop-light.jpg";
        }
        else {
            image.src = "images/bg-desktop-dark.jpg";
        }

        var image = document.getElementById('MediaBackgroundchange');
        if (image.src.match("images/bg-mobile-dark")) {
            image.src = "images/bg-mobile-light.jpg";
        }
        else {
            image.src = "images/bg-mobile-dark.jpg";
        }

        var image = document.getElementById('themechange');
        if (image.src.match("images/icon-sun.svg")) {
            image.src = "images/icon-moon.svg";
            document.body.style.background = "white";
        }
        else {
            image.src = "images/icon-sun.svg";
            document.body.style.background = "black";
        }

        // if (document.body.style.background === "white") {
        //     document.body.style.background = "black";
        // } else {
        //     document.body.style.background = "white";
        // }
    }

    const getLocalItems = () => {
        const List = localStorage.getItem('List');
        if (List) {
            return JSON.parse(localStorage.getItem('List'));
        }
        else {
            return [];
        }
    }

    const [InputTodo, setInputTodo] = useState();
    const [Items, setItems] = useState(getLocalItems());
    const [TodoFilter, setTodoFilter] = useState('All');
    const [FilterTodo, setFilterTodo] = useState([]);

    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(Items));
        Filter();
    }, [Items, TodoFilter])

    const Filter = () => {
        switch (TodoFilter) {
            case 'Completed':
                setFilterTodo(Items.filter(el => el.completed === true));
                break;
            case 'Active':
                setFilterTodo(Items.filter(el => el.completed === false));
                break;
            default:
                setFilterTodo(Items);
                break;
        }
    }

    const AddTodo = (Todo) => {

        Todo.preventDefault();
        if (!InputTodo) {
            alert('Entered value is Empty')
        }
        else {
            setItems([...Items, { text: InputTodo, completed: false, id: new Date().getTime() }]);
            setInputTodo();
        }
    }

    const Action = (Todo) => {
        setTodoFilter(Todo.target.textContent)
    }

    const DeleteTask = (id) => {
        const UpdatedTaskList = Items.filter((elements, Index) => {
            return Index != id;
        })
        setItems(UpdatedTaskList);
    }

    const CompletedTask = (id) => {

        const Completed = Items.map((elements) => {
            if (elements.id === id) {

                return {
                    ...elements, completed: !elements.completed
                };
            }
            else {
                return elements;
            }
        })

        setItems(Completed);
    }

    const ClearCompleted = () => {
        const updatedTodos = Items.filter((val) => {
            if (val.completed == false) {
                return val;
            }
        });
        setItems(updatedTodos);
    };

    const a = () => {
        a=Items++;
    }
    

    return (
        <div >
            <div className="Background">
                <img src={Light} id="Backgroundchange" alt="image" className="Desktop"/>
                <img src="images/bg-mobile-light.jpg" className="Media" id="MediaBackgroundchange"/>
            </div>
                <div className="main-form">
            <div className="Todocontainer">
                <div className="Header">
                    <h1>TODO</h1>
                    <img onClick={Theme} src={Moon} id="themechange" alt="image" className="Sun" />
                </div>
            </div>

            <form onSubmit={AddTodo}>
                <lable className="Inputbox"  >
                    <input type="text" placeholder="Create a new todo..." className="Input" value={InputTodo}
                        onChange={(Todo) => {
                            setInputTodo(Todo.target.value)
                        }}
                    ></input>
                </lable>
            </form>

            <div className="Todolist">
                <ol className='list'>

                {
                        FilterTodo.map((elements, i) => {
                            return (
                                <li key={i} className="List">
                                    <input type="checkbox" className="CheckItem" checked={elements.completed} onClick={() => CompletedTask(elements.id)} />
                                    <span className="Inputholder">{elements.text}</span>
                                    <span><img src="images/icon-cross.svg" alt="Close" onClick={() => DeleteTask(i)}/></span>
                                </li>
                            )

                        })
                    }
            
                    <div className="Function">
                        <span className="Hover" >Items Left</span>
                        <span className="Hover" onClick={Action}>All</span>
                        <span className="Hover" onClick={Action}>Active</span>
                        <span className="Hover" onClick={Action}>Completed</span>
                        <span className="Hover" onClick={ClearCompleted}>Clear Completed</span>
                    </div>

                </ol>

            </div>
            </div>
        </div>
    )
}

export default Todo
