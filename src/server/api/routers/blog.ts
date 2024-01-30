import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const idSchema = z.object({ id: z.string() });

const blogUpdateSchema = z.object({
  id: z.string(),
  title: z.string().max(64),
  content: z.string(),
});
const blogCreateSchema = z.object({
  title: z.string().max(64),
  content: z.string(),
});

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.prisma.blog.findUnique({
      where: idSchema.parse(input),
    });
  }),
  createBlog: publicProcedure
    .input(blogCreateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.blog.create({
        data: blogCreateSchema.parse(input),
      });
    }),
  updateBlog: publicProcedure
    .input(blogUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.blog.update({
        where: {
          id: input.id.toString(),
        },
        data: blogUpdateSchema.parse(input),
      });
    }),
  deleteBlog: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.blog.delete({
      where: idSchema.parse(input),
    });
  }),
});
