import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TodosService } from './todos.service.js';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { Todo } from './entities/todo.entity.js';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un todo' })
  @ApiCreatedResponse({ description: 'Todo créé', type: Todo })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les todos' })
  @ApiOkResponse({ description: 'Liste des todos', type: [Todo] })
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un todo par id' })
  @ApiParam({ name: 'id', type: Number, description: 'Identifiant du todo' })
  @ApiOkResponse({ description: 'Todo trouvé', type: Todo })
  @ApiNotFoundResponse({ description: 'Todo introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un todo' })
  @ApiParam({ name: 'id', type: Number, description: 'Identifiant du todo' })
  @ApiOkResponse({ description: 'Todo mis à jour', type: Todo })
  @ApiNotFoundResponse({ description: 'Todo introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un todo' })
  @ApiParam({ name: 'id', type: Number, description: 'Identifiant du todo' })
  @ApiNoContentResponse({ description: 'Todo supprimé' })
  @ApiNotFoundResponse({ description: 'Todo introuvable' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
