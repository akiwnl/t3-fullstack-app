"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { todoInput } from "~/types";

export default function CreateTodo() {
  const [newTodo, setNewTodo] = useState("");
  const { mutate } = api.todo.create.useMutation();
  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = todoInput.safeParse(newTodo);
          if (!result.success) {
            alert("Tarefa inválida");
            return;
          }
          console.log(newTodo);
          mutate(newTodo);
          setNewTodo("");
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nova tarefa"
          className="w-full max-w-md rounded-full bg-white px-4 py-2 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="rounded-full bg-blue-600 px-10 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Adicionar
        </button>
      </form>
    </div>
  );
}
