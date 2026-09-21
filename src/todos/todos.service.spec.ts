import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodosService } from './todos.service.js';
import { Todo } from './entities/todo.entity.js';

describe('TodosService', () => {
  let service: TodosService;
  let repository: {
    create: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    find: ReturnType<typeof vi.fn>;
    findOneBy: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      create: vi.fn(),
      save: vi.fn(),
      find: vi.fn(),
      findOneBy: vi.fn(),
      remove: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: getRepositoryToken(Todo), useValue: repository },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should create a todo with a default complete value of false', async () => {
    const createDto = { todo: 'Acheter du pain' };
    const created = { id: 1, todo: 'Acheter du pain', complete: false };
    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    const result = await service.create(createDto);

    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
    expect(result.complete).toBe(false);
  });

  it('should create a todo with complete explicitly set to true', async () => {
    const createDto = { todo: 'Acheter du pain', complete: true };
    const created = { id: 2, todo: 'Acheter du pain', complete: true };
    repository.create.mockReturnValue(created);
    repository.save.mockResolvedValue(created);

    const result = await service.create(createDto);

    expect(result.complete).toBe(true);
  });

  it('should return all todos including their complete status', async () => {
    const todos: Todo[] = [
      { id: 1, todo: 'A', complete: false },
      { id: 2, todo: 'B', complete: true },
    ];
    repository.find.mockResolvedValue(todos);

    const result = await service.findAll();

    expect(result).toEqual(todos);
  });

  it('should return one todo by id', async () => {
    const todo: Todo = { id: 1, todo: 'A', complete: false };
    repository.findOneBy.mockResolvedValue(todo);

    const result = await service.findOne(1);

    expect(result).toEqual(todo);
  });

  it('should throw NotFoundException when the todo does not exist', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update the complete field of an existing todo', async () => {
    const todo: Todo = { id: 1, todo: 'A', complete: false };
    repository.findOneBy.mockResolvedValue(todo);
    repository.save.mockImplementation((t: Todo) => Promise.resolve(t));

    const result = await service.update(1, { complete: true });

    expect(result.complete).toBe(true);
    expect(result.todo).toBe('A');
  });

  it('should remove an existing todo', async () => {
    const todo: Todo = { id: 1, todo: 'A', complete: false };
    repository.findOneBy.mockResolvedValue(todo);
    repository.remove.mockResolvedValue(todo);

    await service.remove(1);

    expect(repository.remove).toHaveBeenCalledWith(todo);
  });
});
