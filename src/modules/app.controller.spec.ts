// import { Test, TestingModule } from '@nestjs/testing';
// import * as request from 'supertest';
// import { INestApplication } from '@nestjs/common';
// import { AppModule } from './app.module';

// describe('AppController', () => {
//   let app: INestApplication;
//   let appService = { getHello: () => 'Hello World' };
//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule],
//     })
//       .overrideProvider(AppService)
//       .useValue(appService)
//       .compile();
//     app = moduleRef.createNestApplication();
//     await app.init();
//   });
//   it(`should return "Hello World"`, () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect(appService.getHello);
//   });
//   afterAll(async () => {
//     await app.close();
//   });
// });
