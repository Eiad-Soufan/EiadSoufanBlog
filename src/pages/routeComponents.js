import { lazy } from "react";
import { getPageFromPath } from "../i18n/config";

const loadPage = {
  about: () => import("./AboutUs"),
  approach: () => import("./WhyUs"),
  contact: () => import("./Contact"),
  notFound: () => import("./NotFound"),
};

export const clientRouteComponents = {
  about: lazy(loadPage.about),
  approach: lazy(loadPage.approach),
  contact: lazy(loadPage.contact),
  notFound: lazy(loadPage.notFound),
};

export async function loadPrerenderedRoute(pathname) {
  const page = getPageFromPath(pathname);
  if (page === "home") return clientRouteComponents;

  const { default: Page } = await loadPage[page]();
  return { ...clientRouteComponents, [page]: Page };
}
