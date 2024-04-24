import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/respositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {
        const router = Router();

        const dataSource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodoById);
        router.get('/:id', todoController.getTodoById);
        return router;
    }
}