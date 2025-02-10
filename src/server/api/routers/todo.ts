import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
    return todos.map(({ id, title, done }) => ({ id, title, done }));

    // return [
    //   {
    //     id: "fake",
    //     title: "fake title",
    //     done: false,
    //   },
    //   {
    //     id: "fake2",
    //     title: "fake title2",
    //     done: false,
    //   },
    // ];
  }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.create({
        data: {
          title: input,
          done: false,
          userId: ctx.session.user.id,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.delete({
        where: {
          id: input,
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input: { id, done } }) => {
      return ctx.db.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});
