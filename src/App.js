import React from 'react'
import './App.css';

import Form from './Todomain/Todo';

function App() {

const Mode = () =>{
  var Image1=document.getElementById('image');
  
  if (Image1.src.match("images/icon-moon.svg")  ) {
    Image1.src = "images/icon-sun.svg";
    document.body.style.backgroundColor= '#25273c';
    document.body.querySelector('.Wrapper').style.boxShadow = "0 35px 50px rgb(0 0 0 / 50%)";
    var x= document.getElementsByClassName('List');
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "#25273c";
      x[i].style.borderBottom = "1px solid #393a4c";
    } 
    document.querySelector('.Footer').style.backgroundColor="#25273c";
    document.querySelector('.TodoContainer').style.backgroundColor="#25273c";
    var y= document.getElementsByClassName('svg');
    var j;
    for (j = 0; j < y.length; j++) {
      y[j].style.fill="#cacde8";
    
    } 


}
else {
    Image1.src = "images/icon-moon.svg";
    document.body.style.backgroundColor='white';
    document.body.querySelector('.Wrapper').style.boxShadow = "0 35px 50px rgb(194 195 214 / 50%)";
    var x= document.getElementsByClassName('List');
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "white";
      x[i].style.borderBottom = "1px solid #e4e5f1";
    } 
    document.querySelector('.Footer').style.backgroundColor="white";
    document.querySelector('.TodoContainer').style.backgroundColor="white";

    var y= document.getElementsByClassName('svg');
    var j;
    for (j = 0; j < y.length; j++) {
      y[j].style.fill="black";
    
    } 
}

}
  
  return (
   <>
   
   <div className="Container">
     <div className="MainContainer" >
     
      <div className="header">
            <h1>TODO</h1>
          
            <img src="images/icon-moon.svg" id="image" onClick={Mode}/>
            
        </div>
      <Form/>

     </div>
   </div>
   </>
  );
}

export default App;
