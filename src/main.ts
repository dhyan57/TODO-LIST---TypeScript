import './style.css'


const inputElement=document.getElementById("todo-input") as HTMLInputElement
const buttonClick= document.getElementById("add-btn") as HTMLButtonElement
const listing =document.getElementById("todo-list") as HTMLUListElement

buttonClick.addEventListener("click",buttonclicked)

function buttonclicked(){  
  let value: string=inputElement.value
  let list= document.createElement("li")
  list.innerHTML=value
  listing.appendChild(list);

  inputElement.value= ''
}

