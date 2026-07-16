import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { LocaleProvider } from "./i18n/LocaleContext";

export function render(url) {
  return new Promise((resolve, reject) => {
    let didError = false;
    let settled = false;
    let timeout;

    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </StaticRouter>,
      {
        onAllReady() {
          const output = new PassThrough();
          let html = "";

          output.setEncoding("utf8");
          output.on("data", (chunk) => {
            html += chunk;
          });
          output.on("end", () => {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            if (didError) reject(new Error(`SSR failed while rendering ${url}`));
            else resolve(html);
          });
          output.on("error", (error) => {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            reject(error);
          });
          stream.pipe(output);
        },
        onShellError(error) {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(`SSR ${url}:`, error);
        },
      },
    );

    timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      stream.abort();
      reject(new Error(`SSR timed out while rendering ${url}`));
    }, 20000);
  });
}
