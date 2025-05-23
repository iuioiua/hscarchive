import { html, Paper, type Route } from "../common.ts";
import { BaseLayout } from "../components/BaseLayout.ts";
import papers from "../papers.json" with { type: "json" };

function inner(papers: Paper[]): string {
  return html`
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="-mx-4 mt-8 sm:-mx-0">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr class="sticky top-0 bg-stone-50">
              <th
                scope="col"
                class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Title
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Subject
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Year
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${papers.map((paper) =>
      html`
        <tr>
          <td class="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
            <a
              href="${paper.url}"
              class="text-emerald-600 hover:underline after:content-['_↗']"
              target="_blank"
              rel="noopener noreferrer"
            >${paper.title}</a>
            <dl class="font-normal lg:hidden">
              <dt class="sr-only">Subject</dt>
              <dd class="mt-1 truncate text-gray-700">${paper.subject}</dd>
              <dt class="sr-only sm:hidden">Year</dt>
              <dd class="mt-1 truncate text-gray-500 sm:hidden">
                ${paper.year}
              </dd>
            </dl>
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
            ${paper.subject}
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
            ${paper.year}
          </td>
        </tr>
      `
    ).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function handler(): Response {
  const content = BaseLayout({
    title: "Hello, world!",
    description: "Hello, world!",
    content: inner(papers as Paper[]),
  });
  return new Response(content, {
    headers: { "Content-Type": "text/html" },
  });
}

export default {
  method: "GET",
  pattern: new URLPattern({ pathname: "/" }),
  handler,
} satisfies Route;
