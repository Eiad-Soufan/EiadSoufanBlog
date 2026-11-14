import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { LocaleProvider } from "./i18n/LocaleContext";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import WhyUs from "./pages/WhyUs";

const SERVER_ROUTE_COMPONENTS = Object.freeze({
  about: AboutUs,
  approach: WhyUs,
  contact: Contact,
  notFound: NotFound,
});

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <LocaleProvider>
        <App routeComponents={SERVER_ROUTE_COMPONENTS} />
      </LocaleProvider>
    </StaticRouter>,
  );
}
