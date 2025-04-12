import { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  description: string;
  completed: boolean;
  completedDate?: string;
}

function App() {
  const [todoDescription, setTodoDescription] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {  
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos)) {
          console.log("Loaded from Local Storage:", parsedTodos);
          setTodoList(parsedTodos);
        } else {
          console.warn("Parsed data is not an array:", parsedTodos);
        }
      } catch (error) {
        console.error("Error parsing Local Storage data:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) { 
      console.log("Saving to Local Storage:", todoList);
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoaded]);

  const handleChange = (e: any) => {
    setTodoDescription(e.target.value);
  };

  const handleClick = () => {
    if (todoDescription.trim() === "") return;
  
    const newTodo: Todo = { description: todoDescription.trim(), completed: false };
    const tempTodoList = [newTodo, ...todoList];
    setTodoList(tempTodoList);
    setTodoDescription("");
  };

  const handleDelete = (index: number) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  const handleUpdate = (index: number) => {
    const updatedList = [...todoList];
    const todoToUpdate = updatedList[index];

    const newDescription = prompt(
      "Edit the task description:",
      todoToUpdate.description
    );

    if (newDescription) {
      todoToUpdate.description = newDescription;
      setTodoList(updatedList);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updatedList = todoList.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed,  
          completedDate: !todo.completed ? new Date().toLocaleString() : undefined,
        };
      }
      return todo;
    });

    const reorderedList = updatedList
      .filter((todo) => !todo.completed)
      .concat(updatedList.filter((todo) => todo.completed));

    setTodoList(reorderedList);
  };

  return (
    <div style={{ border: "1px solid red", padding: 10 }}>
      <div>
        <input
          type="text"
          value={todoDescription}
          onChange={handleChange}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleClick}>Add Item</button>
      </div>

      <div>TODOs Here:</div>
      <ul>
        {todoList.map((todo, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              {todo.description}
              {todo.completed && todo.completedDate && (
                <span style={{ marginLeft: 10, color: "gray" }}>
                  Completed on: {todo.completedDate}
                </span>
              )}
              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: 10 }}
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(index)}
                style={{ marginLeft: 5 }}
              >
                Edit
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default App;


//1. post / save the Todo Item (in a native state) (create Itema, Read Item, Update Item, Delete Item)//*Done
//2. Last item will be kept on top //*Done
//3. Add a checkbox to each item  //*Done
//4. When the users clicks on the checkbox, the item will sink to the bottom of the list //*Done
//5. When the users clicks on the checkbox, it will show the date the task was completed //*Done 
//6. Make sure when you refresh the page, the list is still there (use local storage) //*Done
