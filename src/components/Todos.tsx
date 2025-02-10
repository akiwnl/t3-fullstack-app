import { api } from "~/trpc/server";
import Todo from "./Todo";

export default async function Todos() {
  const todos = await api.todo.getAll();

  return (
    <div>
      {todos.length ? (
        todos.map((todo) => (
          <div key={todo.id}>
            <Todo todo={todo} />
          </div>
        ))
      ) : (
        <div>Não há tarefas</div>
      )}
    </div>
  );
}
