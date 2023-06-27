"use client";

import { useRedirect } from "@/hooks/useRedirect";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [metaData, setMetadata] = useState({ owner: "J.Doe", count: 0 });

  const user = useUser();

  if (!user.loggedIn) {
    useRedirect();
  }

  const addTodo = () => {
    setTodos([...todos, { key: uuid(), name: newTodo, completed: false }]);
    setNewTodo("");
    metaData.count++;
  };

  const completeTodo = (key: string) => {
    const newTodos = [...todos];
    console.log(key);
    const todo = newTodos.find((t) => (t.key = key));
    console.log(todo);
    todo.completed = true;
    setTodos(newTodos);
  };

  return (
    <div>
      <div>
        <h2>{metaData.owner}'s todo list</h2>
        <h3>{metaData.count} items</h3>
        <input
          placeholder="New Item"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <div key={todo.key}>
              <div>
                <span>{todo.name}</span>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => completeTodo(todo.key)}
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
