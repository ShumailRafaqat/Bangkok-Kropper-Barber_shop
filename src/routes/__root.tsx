import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Scissors } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider } from "../lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kis Fl H | Modern Barber Shop in Bangkok" },
      { name: "description", content: "Kis Fl H offers precision haircuts, beard trims, styling, and premium grooming in Bangkok for a sharp, modern look." },
      { name: "author", content: "Kis Fl H" },
      { property: "og:title", content: "Kis Fl H | Modern Barber Shop in Bangkok" },
      { property: "og:description", content: "Precision haircuts, beard trims, styling, and premium grooming in Bangkok." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "/" },
      { rel: "alternate", hrefLang: "th", href: "/?lang=th" },
      { rel: "alternate", hrefLang: "x-default", href: "/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600&family=DM+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showSplash, setShowSplash] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveSplash = () => {
      setIsLeaving(true);
      window.setTimeout(() => setShowSplash(false), 850);
    };

    const timer = window.setTimeout(leaveSplash, 2150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        {showSplash && (
          <div className={`welcome-splash ${isLeaving ? "welcome-splash--leaving" : ""}`} role="status" aria-label="Welcome to Bangkok Kropper">
            <div className="welcome-splash__backdrop" />
            <div className="welcome-splash__texture" />
            <div className="welcome-splash__wash" />
            <div className="welcome-splash__beam" aria-hidden="true" />
            <div className="welcome-splash__line" aria-hidden="true" />
            <div className="welcome-splash__glitter" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="welcome-splash__logo-stage" aria-hidden="true">
              <span className="welcome-splash__logo-ring" />
              <img src="/logo.png" alt="" />
            </div>
            <div className="welcome-splash__scissors" aria-hidden="true">
              <Scissors />
            </div>
            <div className="welcome-splash__content">
              <div className="welcome-splash__mark">
                <span className="welcome-splash__monogram" aria-label="BK">BK</span>
              </div>
              <p className="welcome-splash__name">Bangkok Kropper</p>
              <div className="welcome-splash__rule" aria-hidden="true"><span /><span /></div>
            </div>
            <div className="welcome-splash__progress" aria-hidden="true"><span /></div>
          </div>
        )}
      </I18nProvider>
    </QueryClientProvider>
  );
}
