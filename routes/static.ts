import type { Route } from "../common.ts";
import { serveDir } from "@std/http/file-server";

export default {
  method: "GET",
  pattern: new URLPattern({ pathname: "/static/*" }),
  handler: (request) => serveDir(request),
} satisfies Route;
