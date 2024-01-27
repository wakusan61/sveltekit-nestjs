import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TodoService } from './../src/todo/todo.service';
import { TodoFixture } from './util/todo-fixture';
import { Todo } from './../src/todo/schma/todo-schema';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    //TODO:後で消すこと
    todoService = app.get(TodoService);
    TodoFixture.removeAll(todoService);
  });
  describe('GET /:no', () => {
    it('正常系', () => {
      // テストデータ
      // TODO: テストデータの構築方法は別途検討すること
      const data = TodoFixture.add({ no: 11 }, todoService);

      return request(app.getHttpServer())
        .get('/todo/11')
        .expect(200)
        .expect(data);
    });
    it('NotFound', () => {
      return request(app.getHttpServer()).get('/todo/11111').expect(404);
    });
    it('クエリパラメータが数字じゃないため、BadRequest', () => {
      return request(app.getHttpServer()).get('/todo/t').expect(400);
    });
  });

  describe('GET /todo/all', () => {
    it('正常系', () => {
      const todos = [
        TodoFixture.add({ no: 21 }, todoService),
        TodoFixture.add({ no: 22 }, todoService),
        TodoFixture.add({ no: 23 }, todoService),
      ];
      return request(app.getHttpServer())
        .get('/todo/all')
        .expect(200)
        .expect({ todos });
    });

    it('0件', () => {
      TodoFixture.removeAll(todoService);
      return request(app.getHttpServer())
        .get('/todo/all')
        .expect(200)
        .expect({ todos: [] });
    });
  });

  describe('POST /todo/update', () => {
    it('正常系', async () => {
      const before = TodoFixture.add({ no: 31 }, todoService);
      const updated: Todo = {
        no: before.no,
        title: `title update`,
        detail: `detail update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(201);
      const after = TodoFixture.get(before.no, app.get(TodoService));
      expect(after).toEqual(updated);
    });

    it('Not Found', () => {
      return request(app.getHttpServer())
        .post(`/todo/update/99999`)
        .expect(404);
    });

    it('タイトルが空文字', async () => {
      const before = TodoFixture.add({ no: 32 }, todoService);
      const updated: Todo = {
        no: before.no,
        title: '',
        detail: `detail update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });

    it('タイトルが20文字より大きい', async () => {
      const before = TodoFixture.add({ no: 33 }, todoService);
      const updated: Todo = {
        no: before.no,
        title: '123456789012345678901',
        detail: `detail update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('タイトルが指定されていない。', async () => {
      const before = TodoFixture.add({ no: 34 }, todoService);
      const updated: Todo = {
        no: before.no,
        detail: `detail update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('詳細が指定なしでエラーにならない', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated: Todo = {
        no: before.no,
        title: `title update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(201);
    });
    it('詳細が100文字より大きい', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated: Todo = {
        no: before.no,
        detail:
          '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
        title: `title update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('カテゴリーが指定されていない', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated: Todo = {
        no: before.no,
        detail: 'detail updated',
        title: `title update`,
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('カテゴリーにない文字列が指定されている', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated = {
        no: before.no,
        detail: 'detail updated',
        title: `title update`,
        category: 'ほげほげ',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('noが指定されていない', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated: Todo = {
        detail: 'detail updated',
        title: `title update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
    it('noに0以下を指定している', async () => {
      const before = TodoFixture.add({ no: 35 }, todoService);
      const updated: Todo = {
        no: 0,
        detail: 'detail updated',
        title: `title update`,
        category: '仕事',
      };
      await request(app.getHttpServer())
        .post(`/todo/update`)
        .send(updated)
        .expect(400);
    });
  });
});
