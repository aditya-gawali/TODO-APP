import { Router } from "express";
import { createTodo, deleteTodo, getSingleTodo, getTodo, updateTodo } from "../controllers/todo.controllers.js";

const todoRouter = Router();


todoRouter.get('/api/todo', getTodo);

todoRouter.get('/api/todo/:id', getSingleTodo);

todoRouter.post('/api/todo', createTodo);

todoRouter.put('/api/todo/:id', updateTodo)

todoRouter.delete('/api/todo/:id', deleteTodo)

export default todoRouter;