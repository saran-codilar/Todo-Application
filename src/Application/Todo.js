import React, { useEffect, useState } from 'react';
import Sun from './icon-sun.svg';
import Moon from './icon-moon.svg';
import Dark from './bg-desktop-dark.jpg'
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
        if (image.src.match("images/bg-desktop-light")) {
            image.src = "images/bg-desktop-dark.jpg";
        }
        else {
            image.src = "images/bg-desktop-light.jpg";
        }

        var image = document.getElementById('themechange');
        if (image.src.match("images/icon-sun")) {
            image.src = "images/icon-moon.svg";
        }
        else {
            image.src = "images/icon-sun.svg";
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

    const DeleteList = (id) => {
        const updatedItems=items.filter((elem,del)=>{
            return del !== id;
            });
            setItems(updatedItems);  
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

                    {items.map((itemVal,del) => {
                        return <li key={del}><input type="checkbox" value="" onClick={checkBox} id="check"/>{itemVal}
                        <span><img src="images/icon-cross.svg" alt="Close" onClick={()=>DeleteList(del)} /></span>
                        </li>
                    })}
                                      
                     
                </ol>

            </div>
            <div className="function">
                <span className="hover">Items Left</span>
                <span className="hover">All</span>
                <span className="hover">Active</span>
                <span className="hover">Completed</span>
                <span className="hover">Clear Completed</span>
            </div>

        </div>
    )
}

export default Todo
