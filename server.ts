import { STATUS_CODE, STATUS_TEXT, StatusCode } from "@std/http/status";
import { serveFile } from "@std/http/file-server";
import { renderToString } from "preact-render-to-string";
import { HomePage } from "./index.tsx";

type Handler = (req: Request) => Response | Promise<Response>;

const HOME_PAGE = `<!DOCTYPE html>${renderToString(HomePage())}`;

const ROUTES = new Map<string, Handler>([
  [
    "/",
    () => new Response(HOME_PAGE, { headers: { "Content-Type": "text/html" } }),
  ],
  ["/favicon.ico", (req) => serveFile(req, "./favicon.ico")],
]);

function createResponse(status: StatusCode): Response {
  const statusText = STATUS_TEXT[status];
  return new Response(statusText, { status, statusText });
}

function handler(req: Request): ReturnType<Handler> {
  if (req.method !== "GET") {
    return createResponse(STATUS_CODE.MethodNotAllowed);
  }

  const { pathname } = new URL(req.url);
  const handler = ROUTES.get(pathname);
  return handler?.(req) ?? createResponse(STATUS_CODE.NotFound);
}

Deno.serve(handler);
