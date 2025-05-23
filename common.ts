import type { Method } from "jsr:@std/http/unstable-method";
import { type ErrorStatus, STATUS_TEXT } from "jsr:@std/http/status";

export interface Route {
  pattern: URLPattern;
  method: Method;
  handler: Deno.ServeHandler;
}

export interface Paper {
  title: string;
  url: string;
  author: string;
  subject: string;
  year: number;
}

export const SITE_NAME = "HSC Archive";
export const SITE_DESCRIPTION =
  "The online library for past HSC papers and resources.";

export class HttpError extends Error {
  status: ErrorStatus;

  constructor(
    status: ErrorStatus,
    message: string = STATUS_TEXT[status],
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export function route(
  routes: Route[],
): Deno.ServeHandler {
  return (request, info) => {
    const route = routes.find((route) => route.pattern.test(request.url));
    if (!route) {
      throw new HttpError(404);
    }
    if (request.method !== route.method) {
      throw new HttpError(405);
    }
    return route.handler(request, info);
  };
}

export type ErrorHandler = (
  error: HttpError,
  ...args: Parameters<Deno.ServeHandler>
) => ReturnType<Deno.ServeHandler>;

export function error(
  handler: Deno.ServeHandler,
  errorHandler: ErrorHandler,
): Deno.ServeHandler {
  return async (request, info) => {
    try {
      return await handler(request, info);
    } catch (error) {
      if (!Error.isError(error)) {
        throw error;
      }
      const httpError = error instanceof HttpError
        ? error
        : new HttpError(500, error.message);
      return errorHandler(httpError, request, info);
    }
  };
}

export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  return String.raw({ raw: strings }, ...values);
}
