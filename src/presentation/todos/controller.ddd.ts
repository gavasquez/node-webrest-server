import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {
    //* DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        console.log({ todos })
        return res.json(todos);
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!);

        return res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updatedTodoDto] = UpdateTodoDto.create({ id, ...req.body });

        if (error) return res.status(400).json({ error });

        const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);
        return res.json(updatedTodo);
    }

    public deleteTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'Id argument is not a number' });
        
        const deletedTodo = await this.todoRepository.deleteById(id);
        return res.json(deletedTodo);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}