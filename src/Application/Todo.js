import React, { useEffect, useState } from 'react';
import Sun from './Images/icon-sun.svg';
import Moon from './Images/icon-moon.svg';
import Dark from './Images/bg-desktop-dark.jpg'
import './Header.css';

const getLocalItems = () => {
    let lists = localStorage.getItem('list');
    if (lists) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

function Todo() {


    const [inputList, setinputList] = useState("");
    console.log(inputList);
    const [items, setItems] = useState(getLocalItems());
    console.log(items);


    document.body.style.background = "black";
    const Theme = () => {

        var image = document.getElementById('Backgroundchange');
        if (image.src.match("Images/bg-desktop-light")) {
            image.src = "Images/bg-desktop-dark.jpg";
        }
        else {
            image.src = "Images/bg-desktop-light.jpg";
        }

        var image = document.getElementById('themechange');
        if (image.src.match("Images/icon-sun")) {
            image.src = "Images/icon-moon.svg";
        }
        else {
            image.src = "Images/icon-sun.svg";
        }

        if (document.body.style.background === "black") {
            document.body.style.background = "white";
        } else {
            document.body.style.background = "black";
        }

        // document.getElementsById('changecolor').style.background="red";
        // if (document.input.style.background === "black") {
        //     document.input.style.background = "white";
        // } else {
        //     document.input.style.background = "black";',m,m
        // }
    }


    const itemEvents = (event) => {
        setinputList(event.target.value);
    }
    const addList = () => {
        setItems((oldItems) => {
            return [...oldItems, inputList]
        })
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))
    }, [items])



    const checkBox = () => {

        // const defaultt = document.getElementById('scratch').style.textDecoration = "none";
        // if (defaultt === "none") {
        // document.getElementById('scratch').style.textDecoration = "line-through";
        // } else {
        // document.getElementById('scratch').style.textDecoration = "none";
        // }


        const defaultt = document.getElementById('check');
        if (defaultt.click) {
            document.getElementById('scratch').style.textDecoration = "line-through";
        }else{
            document.getElementById('scratch').style.textDecoration = "underline";
        }
        
       



    }

    const deletee = (id) => {
        const updatedItems=items.filter((elem,ind)=>{
            return ind !== id;
            });
            setItems(updatedItems);  
    }

    const completed=()=>{
    
  
    }
    

    return (
        <div>
            <div className="Background">
                <img onClick={Theme} src={Dark} id="Backgroundchange" alt="image" />
            </div>
            <div className="Todocontainer">
                <div className="Header">
                    <h1>TODO</h1>
                    <img onClick={Theme} src={Moon} id="themechange" alt="image" className="Sun" />
                </div>
                <form>
                    <label className="Inputbox">
                        <input type="text" placeholder="Create a new to do" className="Input" id="colorchange" onChange={itemEvents}/>
                        <input onClick={addList} className="Submit" type="submit" />
                    </label>
                </form>
            </div>

            <div className="entry">
                <ol className='list'>

                    {items.map((itemVal,ind) => {
                        return <li key={ind}><input type="checkbox" value="" onClick={checkBox} id="check"/>{itemVal}
                        <span><img src="Images/icon-cross.svg" onClick={()=>deletee(ind)} alt="" /></span>
                        </li>
                    })}
                                      
                     
                </ol>

            </div>
            <div className="function">
                <span className="hover">Items Left</span>
                <span className="hover">All</span>
                <span className="hover">Active</span>
                <span className="hover" onClick={completed}>Completed</span>
                <span className="hover">Clear Completed</span>
            </div>

        </div>
    )
}

export default Todo
