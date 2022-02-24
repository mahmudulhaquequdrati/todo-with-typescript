import { useEffect, useState } from "react";
import "./App.css";

type setTodo = (string | number | boolean)[];

function App() {
  const getTodos = () => {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  };
  const [list, setlist] = useState<string>("");
  const [todos, setTodos] = useState<setTodo>(getTodos());
  const inputData = (e: any): void => {
    setlist(e.target.value);
  };
  const getValue = (): void => {
    if (!list) {
      alert("input something");
    } else {
      setTodos([...todos, list]);
      const field = ((
        document.getElementById("task") as HTMLInputElement
      ).value = "");
      setlist(field);
    }
  };
  const deleteList = (id: number): void => {
    const remaining = todos.filter(
      (todo: string | number | boolean, index: number) => index !== id
    );
    setTodos(remaining);
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h2 className="mt-12 text-2xl text-red-400">Welcome to todo app.</h2>
      <div className="mt-6">
        <input
          className="outline-none mb-4 mr-2 rounded-md p-1 placeholder:text-gray-800 text-gray-900"
          onBlur={inputData}
          type="text"
          name="task"
          id="task"
          placeholder="write"
        />
        <button className="bg-blue-600 rounded-lg px-4 py-1" onClick={getValue}>
          submit
        </button>
      </div>
      {todos.map((todo: string | number | boolean, index: number) => (
        <div
          key={index}
          className="flex justify-between items-baseline w-[30%] my-4 mx-auto border-2 p-4 rounded-lg"
        >
          <p>{todo}</p>
          <button
            className="bg-red-600 rounded-lg px-4 py-1"
            onClick={() => deleteList(index)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
