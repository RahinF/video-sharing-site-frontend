import { z } from "zod";

const types = z.enum(['random', 'trending', 'subscriptions']);
type TypeEnum = z.infer<typeof types>;

export interface Props {
  type: TypeEnum;
}
