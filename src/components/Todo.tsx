import type { Todo } from "~/types";
type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  const { id, title, done } = todo;

  return <>{title}</>;
}
