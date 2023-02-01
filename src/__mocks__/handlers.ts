import { rest } from 'msw';

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
];
