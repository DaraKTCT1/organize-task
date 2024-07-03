"use client";

import { ChangeEvent, FC, useState } from "react";
import { todoType } from "@/types/todoType ";
import Todo from "@/components/Todo";
import AddTodo from "@/components/AddTodo";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todoActions";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  todos: todoType[];
  user: {
    id: number;
    email: string;
  };
}

const Todos: FC<Props> = ({ todos, user }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);
  const [query, setQuery] = useState<string>("");

  // Function to create a new todo item
  const createTodo = (text: string) => {
    if (text === "") return;

    const id = new Date().getTime();
    addTodo(id, text, user?.id);
    setTodoItems((prev) => [
      ...prev,
      { id: id, text, done: false, userId: user?.id },
    ]);
  };

  // Function to change the text of a todo item
  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editTodo(id, text);
  };

  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    toggleTodo(id);
  };

  // Function to delete a todo item
  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const router = useRouter();
  // const param = searchParams.get("query");
  // console.log("this is searchParams", searchParams.get("query"));
  // const handleChange = (queryInput: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (queryInput) {
  //     params.set("query", queryInput);
  //   } else {
  //     params.delete("query");
  //   }

  //   router.replace(`${pathName}?${params.toString()}`);
  // };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Rendering the Todo List component
  return (
    <div className="flex mx-auto max-w-5xl w-full min-h-screen flex-col items-center md:p-16 p-2">
      <div className="py-1 w-full">
        <div className="input-container w-full">
          <input
            onChange={handleInputChange}
            value={query}
            type="text"
            className="input"
            placeholder="Search..."
          />
          <button>
            <span className="icon">
              <svg
                width="19px"
                height="19px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    opacity="1"
                    d="M14 5H20"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M14 8H17"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                    stroke="#000"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    opacity="1"
                    d="M22 22L20 20"
                    stroke="#000"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="w-full p-2 md:p-4 rounded-md bg-[#EFEFEF] max-h-[90vh] overflow-y-scroll scroll-hidden flex flex-col mt-4 md:mt-8 gap-2">
        {query
          ? todoItems
              .filter((todo) =>
                todo.text.toLowerCase().includes(query.toLowerCase())
              )
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  changeTodoText={changeTodoText}
                  toggleIsTodoDone={toggleIsTodoDone}
                  deleteTodoItem={deleteTodoItem}
                />
              ))
          : todoItems.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                changeTodoText={changeTodoText}
                toggleIsTodoDone={toggleIsTodoDone}
                deleteTodoItem={deleteTodoItem}
              />
            ))}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
    </div>
  );
};

export default Todos;
