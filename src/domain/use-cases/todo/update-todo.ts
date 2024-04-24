import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";


export interface UpdateTodosUseCase {
    execute(updateDto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodosUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute(updateDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById(updateDto);
    }

}