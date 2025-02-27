import data from "./data.json" with { type: "json" };

interface PaperCardProps {
  title: string;
  author: string;
  subject: string;
  year: number;
  url: string;
}

const SITE_NAME = "HSC Archive";
const SITE_DESCRIPTION =
  "The online library for past HSC papers and resources.";

function PaperCard(props: PaperCardProps) {
  return (
    <div class="space-y-1 py-4">
      <h2>
        <a
          href={props.url}
          target="_blank"
          class="hover:underline after:content-['_↗']"
        >
          {props.title}
        </a>
      </h2>
      <p>
        {props.author} • {props.subject} • {props.year}
      </p>
    </div>
  );
}

export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <title>{SITE_NAME}</title>
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body class="max-w-xl mx-auto min-h-screen flex flex-col">
        <header class="p-4">
          <a
            href="/"
            aria-label="Home"
            class="font-['Times_New_Roman'] text-4xl hover:underline align-middle"
            title="Go to home page"
          >
            HSCɅ
          </a>
        </header>
        <main class="flex-1 p-4">
          <div class="divide-y" id="entries">
            {data.map((paper) => <PaperCard {...paper} />)}
          </div>
        </main>
        <footer class="p-4 pt-8 justify-between gap-8 flex flex-wrap">
          <p>© {SITE_NAME}</p>
          <nav class="flex gap-8 flex-wrap">
            <a
              href="https://github.com/anhii/open"
              class="hover:underline"
            >
              Source
            </a>
            <a
              href="https://www.termsfeed.com/live/ccf9889e-ce5d-462a-af0d-b891f5513d33"
              class="hover:underline"
            >
              Disclaimer
            </a>
            <a
              href="https://www.termsfeed.com/live/ad05c0c9-f5e6-4ee0-8314-aa204dc88b2e"
              class="hover:underline"
            >
              Terms
            </a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
