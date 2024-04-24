import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";


export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
        //const todos = await this.todoRepository.getAll();
        //console.log({ todos })
        //return res.json(todos);
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
        //const todo = await this.todoRepository.create(createTodoDto!);
        //return res.json(todo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updatedTodoDto] = UpdateTodoDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });
        new UpdateTodo(this.todoRepository)
            .execute(updatedTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
        //const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);
        //return res.json(updatedTodo);
    }

    public deleteTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' });
        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
        //const deletedTodo = await this.todoRepository.deleteById(id);
        //return res.json(deletedTodo);
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
        //try {
        //    const todo = await this.todoRepository.findById(id);
        //    res.json(todo);
        //} catch (error) {
        //    res.status(400).json({ error });
        //}
    }
}