import { rest } from 'msw';
import { mockUser } from '../utils/mockData';

export const handlers = [
  rest.get(
    'http://localhost:8000/api/v1/users/find/*',
    (request, response, context) => {
      return response(
        context.json({
          _id: '1',
          name: 'John Smith',
          bio: 'bio',
          subscribers: 3,
          subscriptions: ['1', '2', '3'],
          image: 'https://via.placeholder.com/150',
        }),
        context.delay(150)
      );
    }
  ),
  rest.put(
    `http://localhost:8000/api/v1/users/${mockUser.id}/subscribe/*`,
    (request, response, context) => {
      return response(context.status(200))
    }
  ),

  rest.put(
    `http://localhost:8000/api/v1/users/${mockUser.id}/unsubscribe/*`,
    (request, response, context) => {
      return response(context.status(200))
    }
  ),
];
