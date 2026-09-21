import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

describe('TodosController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /todos creates a todo defaulting complete to false', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({ todo: 'Acheter du pain (e2e)' })
      .expect(201);

    expect(response.body).toMatchObject({
      todo: 'Acheter du pain (e2e)',
      complete: false,
    });
    expect(response.body.id).toBeDefined();
    createdId = response.body.id;
  });

  it('POST /todos creates a todo with complete explicitly set to true', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .send({ todo: 'Todo déjà terminé (e2e)', complete: true })
      .expect(201);

    expect(response.body).toMatchObject({
      todo: 'Todo déjà terminé (e2e)',
      complete: true,
    });

    await request(app.getHttpServer())
      .delete(`/todos/${response.body.id}`)
      .expect(204);
  });

  it('GET /todos lists todos including the complete field', async () => {
    const response = await request(app.getHttpServer())
      .get('/todos')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const found = response.body.find(
      (t: { id: number }) => t.id === createdId,
    );
    expect(found).toMatchObject({ todo: 'Acheter du pain (e2e)', complete: false });
  });

  it('GET /todos/:id returns a todo with the complete field', async () => {
    const response = await request(app.getHttpServer())
      .get(`/todos/${createdId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: createdId,
      todo: 'Acheter du pain (e2e)',
      complete: false,
    });
  });

  it('PATCH /todos/:id updates the complete field', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/todos/${createdId}`)
      .send({ complete: true })
      .expect(200);

    expect(response.body).toMatchObject({
      id: createdId,
      todo: 'Acheter du pain (e2e)',
      complete: true,
    });
  });

  it('DELETE /todos/:id removes the todo', async () => {
    await request(app.getHttpServer())
      .delete(`/todos/${createdId}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/todos/${createdId}`)
      .expect(404);
  });
});
