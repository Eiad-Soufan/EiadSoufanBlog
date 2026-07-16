import localeGateway from "../netlify/edge-functions/locale.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function execute({
  url = "https://eiadsoufan.netlify.app/",
  method = "GET",
  country,
  cookie,
  acceptLanguage,
} = {}) {
  let passedThrough = false;
  const headers = new Headers();
  if (cookie) headers.set("cookie", cookie);
  if (acceptLanguage) headers.set("accept-language", acceptLanguage);

  const response = await localeGateway(new Request(url, { method, headers }), {
    geo: { country: { code: country } },
    next() {
      passedThrough = true;
      return new Response("next", { status: 200 });
    },
  });

  return { response, passedThrough };
}

async function expectRedirect(options, locale, label) {
  const { response, passedThrough } = await execute(options);
  assert(!passedThrough, `${label}: request unexpectedly passed through`);
  assert(response.status === 302, `${label}: expected a temporary redirect`);
  assert(
    new URL(response.headers.get("location")).pathname === `/${locale}/`,
    `${label}: redirected to the wrong locale`,
  );
  assert(
    response.headers.get("cache-control") === "private, no-store",
    `${label}: redirect must not be shared by caches`,
  );
}

export async function verifyLocaleGateway() {
  await expectRedirect({ country: "DE" }, "de", "Germany");
  await expectRedirect({ country: "FR" }, "fr", "France");
  await expectRedirect({ country: "MY" }, "ms", "Malaysia");
  await expectRedirect({ country: "SY" }, "ar", "Arabic-speaking country");
  await expectRedirect(
    { country: "US", acceptLanguage: "fr-FR,fr;q=0.9,en;q=0.7" },
    "fr",
    "Browser language fallback",
  );
  await expectRedirect(
    { country: "DE", cookie: "eiad_locale=ar", acceptLanguage: "de-DE" },
    "ar",
    "Saved user choice",
  );
  await expectRedirect(
    { country: "US", acceptLanguage: "de;q=0.5,ms;q=0.9,en;q=0.8" },
    "ms",
    "Accept-Language quality",
  );
  await expectRedirect({ country: "US" }, "en", "Default language");

  const preview = await execute({ country: "DE" });
  assert(
    preview.response.headers.get("x-robots-tag")?.includes("noindex"),
    "Preview gateway must be noindex",
  );

  const production = await execute({
    country: "DE",
    url: "https://eiadsoufan.blog/",
  });
  assert(
    !production.response.headers.has("x-robots-tag"),
    "Production gateway must not send a noindex header",
  );

  const localized = await execute({
    country: "DE",
    url: "https://eiadsoufan.blog/en/about",
  });
  assert(localized.passedThrough, "Explicit locale routes must never be geo-redirected");

  const post = await execute({ country: "DE", method: "POST" });
  assert(post.passedThrough, "Non-navigation requests must pass through");

  return 12;
}

verifyLocaleGateway()
  .then((checks) => {
    process.stdout.write(`Locale gateway verification passed: ${checks} checks.\n`);
  })
  .catch((error) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  });
