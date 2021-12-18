import React, { useState, useEffect } from 'react'
import "./Todo.css"

export default function Form() {

    const getLocalItems = () => {
        const List = localStorage.getItem('List');
        if (List) {
            return JSON.parse(localStorage.getItem('List'));
        }
        else {
            return [];
        }
    }

    const [InputData, setInputData] = useState();
    const [Items, setItems] = useState(getLocalItems());
    const [Status, setStatus] = useState('All');
    const [FilterTodos, setFilterTodos] = useState([]);


    const Filter = () => {
        switch (Status) {
            case 'Completed':
                setFilterTodos(Items.filter(el => el.completed === true));
                break;
            case 'Active':
                setFilterTodos(Items.filter(el => el.completed === false));
                break;
            default:
                setFilterTodos(Items);
                break;

        }
    }

    const AddTask = (e) => {

        e.preventDefault();
        if (!InputData) {
            alert('All Todos are completed...');
        }
        else {
            setItems([...Items, { text: InputData, completed: false, id: new Date().getTime() }]);
            setInputData('');
        }
    }

    const DeleteItem = (id) => {
        const updatedItems = Items.filter((el, ind) => {
            return ind != id;
        })
        setItems(updatedItems);
    }


    const CompleteHandler = (id) => {

        const newId = Items.map((el) => {
            if (el.id === id) {
                return {
                    ...el, completed: !el.completed
                };
            }
            else {
                return el;
            }
        })

        setItems(newId);
    }


    const Action = (e) => {
        setStatus(e.target.textContent)


    }


    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(Items));
        Filter();


    }, [Items, Status])


    const Completed = () => {
        const updatedTodos = Items.filter((val) => {
            if (val.completed == false) {
                return val;
            }
        });
        setItems(updatedTodos);
    };

    return (
        <div>
            <form onSubmit={AddTask}>

                <div className="Todocontainer"  >
                    <input type="text" placeholder="Create a new todo..." value={InputData}
                        onChange={(e) => {
                            setInputData(e.target.value)
                        }}
                    ></input>
                </div>
            </form>

            <div className="Wrapper">
                <ul className="List">

                    {
                        FilterTodos.map((el, i) => {
                            return (
                                <li key={i} className="List">
                                    <input type="checkbox" className="CheckItem" checked={el.completed} onClick={() => CompleteHandler(el.id)} />
                                    <span>{el.text}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg" width="18" height="18" onClick={() => DeleteItem(i)}><path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path></svg>
                                </li>
                            )

                        })
                    }

                    <div className="Footer">
                        <button onClick={Action} >All</button>
                        <button onClick={Action}>Active</button>
                        <button onClick={Action}>Completed</button>
                        <button onClick={Completed}>Clear Completed</button>
                    </div>

                </ul>
            </div>
        </div>
    )
}
