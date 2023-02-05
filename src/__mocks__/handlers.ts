import { rest } from 'msw';
import {
  mockAuthUser,
  mockComment,
  mockComments,
  mockUser
} from '../utils/mockData';

export const handlers = [
  rest.get(
    'http://localhost:8000/api/v1/users/find/*',
    (request, response, context) => {
      return response(context.json(mockUser), context.delay(150));
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
