import { html, type HttpError } from "./common.ts";

function errorPage(error: HttpError): string {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="description" content="${error.message}">
        <title>${error.message}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <!--<link rel="stylesheet" href="/static/styles.css">-->
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
      </head>
      <body>
        <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">${error
      .status}</p>
            <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              ${error.message}
            </h1>
            <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Go back home</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  `;
}

export function errorHandler(error: HttpError): Response {
  return new Response(
    errorPage(error),
    { status: error.status, headers: { "Content-Type": "text/html" } },
  );
}
