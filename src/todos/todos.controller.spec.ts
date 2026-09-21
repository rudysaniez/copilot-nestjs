import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller.js';
import { TodosService } from './todos.service.js';
import { Todo } from './entities/todo.entity.js';

describe('TodosController', () => {
  let controller: TodosController;
  let service: {
    create: ReturnType<typeof vi.fn>;
    findAll: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    service = {
      create: vi.fn(),
      findAll: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: service }],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should create a todo defaulting complete to false', async () => {
    const created: Todo = { id: 1, todo: 'Acheter du pain', complete: false };
    service.create.mockResolvedValue(created);

    const result = await controller.create({ todo: 'Acheter du pain' });

    expect(result).toEqual(created);
    expect(result.complete).toBe(false);
  });

  it('should list all todos with their complete status', async () => {
    const todos: Todo[] = [
      { id: 1, todo: 'A', complete: false },
      { id: 2, todo: 'B', complete: true },
    ];
    service.findAll.mockResolvedValue(todos);

    const result = await controller.findAll();

    expect(result).toEqual(todos);
  });

  it('should return a single todo by id', async () => {
    const todo: Todo = { id: 1, todo: 'A', complete: true };
    service.findOne.mockResolvedValue(todo);

    const result = await controller.findOne(1);

    expect(result).toEqual(todo);
  });

  it('should update the complete field of a todo', async () => {
    const updated: Todo = { id: 1, todo: 'A', complete: true };
    service.update.mockResolvedValue(updated);

    const result = await controller.update(1, { complete: true });

    expect(service.update).toHaveBeenCalledWith(1, { complete: true });
    expect(result.complete).toBe(true);
  });

  it('should remove a todo', async () => {
    service.remove.mockResolvedValue(undefined);

    await controller.remove(1);

    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
