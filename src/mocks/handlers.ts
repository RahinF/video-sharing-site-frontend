import { rest } from "msw";

export const handlers = [
  rest.get(
    "http://localhost:8000/api/v1/users/find/1",
    (request, response, context) => {
      return response(context.json({ name: "John Smith" }), context.delay(150));
    }
  ),
];
