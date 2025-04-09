import { useState } from "react";
import "./App.css";

interface Todo {
  description: string;
}

function App() {

  const [todoDescription, setTodoDescription] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value)
  }

  const handleClick = () => {

  }

  return (
    <div style={{ border: "1px solid red", padding: 10 }}>
      <div>
        <input
        value = {todoDescription}
        onChange={handleChange}
        style={{marginRight: 10}}/>
        <button onClick={handleClick}>Add Item</button>
      </div>

      <div>TODOs Here:</div>
    </div>
  );
}

export default App;

//1. post / save the Todo Item (in a native state)
//2. Last item will be kept on top

