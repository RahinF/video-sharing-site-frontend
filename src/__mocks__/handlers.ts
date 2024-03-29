import { rest } from 'msw';
import {
  mockAuthUser,
  mockComment,
  mockComments,
  mockUser,
  mockVideos
} from '../utils/mockData';

export const handlers = [
  rest.get(
    'http://localhost:8000/api/v1/videos/*',
    (request, response, context) => {
      return response(context.json(mockVideos), context.delay(150));
    }
  ),
  rest.get(
    'http://localhost:8000/api/v1/users/find/*',
    (request, response, context) => {
      return response(context.json(mockUser), context.delay(150));
    }
  ),
  rest.put(
    'http://localhost:8000/api/v1/users/*',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json(mockUser),
        context.delay(150)
      );
    }
  ),
  rest.delete(
    'http://localhost:8000/api/v1/users/*',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json('deleted user'),
        context.delay(150)
      );
    }
  ),
  rest.post(
    'http://localhost:8000/api/v1/auth/logout',
    (request, response, context) => {
      return response(context.status(204));
    }
  ),
  rest.post(
    'http://localhost:8000/api/v1/comments/',
    (request, response, context) => {
      return response(
        context.status(200),
        context.json(mockComment),
        context.delay(150)
      );
    }
  ),
  rest.get(
    'http://localhost:8000/api/v1/comments/*',
    (request, response, context) => {
      return response(context.json(mockComments), context.delay(150));
    }
  ),
  rest.put(
    `http://localhost:8000/api/v1/users/${mockAuthUser.id}/subscribe/*`,
    (request, response, context) => {
      return response(context.status(200));
    }
  ),
  rest.put(
    `http://localhost:8000/api/v1/users/${mockAuthUser.id}/unsubscribe/*`,
    (request, response, context) => {
      return response(context.status(200));
    }
  ),
];
