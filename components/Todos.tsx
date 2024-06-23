"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoType ";
import Todo from "@/components/Todo";
import AddTodo from "@/components/AddTodo";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todoActions";

interface Props {
  todos: todoType[];
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const Todos: FC<Props> = ({ todos, user }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);

  // Function to create a new todo item
  const createTodo = (text: string) => {
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

  // Rendering the Todo List component
  return (
    <div className="flex mx-auto max-w-5xl w-full min-h-screen flex-col items-center md:p-16 p-2">
      <div className="w-full flex flex-col mt-4 md:mt-8 gap-2">
        {todoItems.map((todo) => (
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
