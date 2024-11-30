import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finish, setFinish] = useState(true);

  useEffect(() => {
    let checkTodos = localStorage.getItem("todos");
    if (checkTodos) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])

  const toggleFinish = ()=>{
    setFinish(!finish);
  }

  const saveTodos = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const handleEdit = (e, id) => {
    let task = todos.filter((item) => {
      return item.id == id;
    });
    console.log(task);
    setTodo(task[0].todo);
    let tasks = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(tasks);
    saveTodos();
  };

  const handleDelete = (e, id) => {
    let con = confirm("Are you sure want to delete this todo ?");
    if (con == false) return;
    let tasks = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(tasks);
    saveTodos();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isDone: false }]);
    setTodo("");
    saveTodos();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDone = (e) => {
    let id = e.target.name;
    let tasks = [...todos];
    tasks.filter((item) => {
      if (item.id == id) {
        item.isDone == false ? (item.isDone = true) : (item.isDone = false);
      }
    });
    setTodos(tasks);
    saveTodos();
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto m-4 md:mt-4 md:w-[50rem] h-[80vh] bg-cyan-100 rounded-2xl p-2 overflow-auto">
        <div className="text-cyan-900 text-center text-2xl font-bold">
          <h1>Add Todo</h1>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            
            className="w-[28rem] rounded-[2rem] outline-none p-2"
            name="todo"
            id="todo"
            placeholder="Write a todo..."
          />
          <button
            disabled={todo.length < 5}
            onClick={handleAdd}
            className="p-2 bg-cyan-500 rounded-lg text-white font-bold disabled:opacity-50 disabled:hover:bg-cyan-500 hover:bg-cyan-900"
          >
            Add
          </button>
        </div>
        <div className="w-[50%] flex justify-center my-4 gap-2">
          <input type="checkbox" onChange={toggleFinish} checked={finish} />
          <div>Show Finished</div>
        </div>

        <div >
          <h2 className="text-center text-lg  text-cyan-900 font-semibold">
            Your todos
          </h2>
          <div className="border-b-2 w-[85%] border-[white] mx-auto mt-2"></div>
          <div className="todos flex justify-center items-center flex-col gap-2 mt-4 overflow-auto h-full">
            {todos.length == 0 ? (
              <div className="text-2xl text-cyan-900 font-bold">
                No Todos Yet :/
              </div>
            ) : (
              todos.map((item) => {
                return (finish || !item.isDone) && (
                  <div
                    key={item.id}
                    className="todo flex sm:w-[65%] w-full justify-between items-center gap-4 p-2 bg-cyan-200 rounded-lg"
                  >
                    <div className="flex gap-2 items-center">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={item.isDone}
                        name={item.id}
                        id="complete"
                        onChange={handleDone}
                      />
                      <div
                        className={
                          item.isDone
                            ? "line-through decoration-2 decoration-white task text-cyan-900 font-semibold text-lg"
                            : "task text-cyan-900 font-semibold text-lg"
                        }
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="p-2 bg-cyan-500 rounded-lg text-white font-bold"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="p-2 bg-cyan-500 rounded-lg text-white font-bold"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
