import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDatasourceImpl implements TodoDataSource {

    async create(crateTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: crateTodoDto
        });
        return TodoEntity.fromObject(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        if (!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto?.values!
        });
        return TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted = await prisma.todo.delete({
            where: {
                id
            }
        });
        return TodoEntity.fromObject(deleted);
    }

}