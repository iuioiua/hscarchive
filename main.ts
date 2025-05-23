import { error, route } from "./common.ts";
import getIndex from "./routes/index.ts";
import getStatic from "./routes/static.ts";
import { errorHandler } from "./error_handler.ts";

const handler = error(route([getIndex, getStatic]), errorHandler);

Deno.serve(handler);
