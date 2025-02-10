import Link from "next/link";
import CreateTodo from "~/components/CreateTodo";
import Todos from "~/components/Todos";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session && (
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-center text-4xl font-bold">
                Suas tarefas do dia
              </h1>
              <Todos />
              <CreateTodo />
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Seu email é: {session.user?.email}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sair" : "Entrar"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
