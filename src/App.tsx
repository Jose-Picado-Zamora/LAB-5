import { useState } from "react";
import "./App.css";

interface Todo {
  description: string;
}

function App() {

  const [todoDescription, setTodoDescription] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value);

  } ;

  const handleClick = () => {
    const tempTodoList = [...todoList];
    const newTodo = { description: todoDescription }

    tempTodoList.unshift(newTodo)
  
    setTodoList(tempTodoList)
  } ;


  return (
    <div style={{ border: "1px solid red", padding: 10 }}>
      <div>
        <input
        type ="text"
        value = {todoDescription}
        onChange={handleChange}
        style={{marginRight: 10}}/>
        <button onClick={handleClick}>Add Item</button>
      </div>

      <div>TODOs Here:</div>
      <ul>
      {todoList.map((todo, index) => {
        return <li key ={index}>
          <input type="checkbox"></input>
           {todo.description}</li>
      })}
      </ul>
      
    </div>
  );

}
export default App;

//1. post / save the Todo Item (in a native state) (create Itema, Read Item, Update Item, Delete Item)
//2. Last item will be kept on top
//3. Add a checkbox to each item
//4. When the users clicks on the checkbox, the item will sink to the bottom of the list and 
//5. When the users clicks on the checkbox, it will show the date the task was completed
//6. Make sure when you refresh the page, the list is still there (use local storage) 
