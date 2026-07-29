/**
 * 617 EAST TRUST — SSG ENTRY POINT
 *
 * vite-ssg calls ViteSSG() instead of createRoot().
 * It pre-renders each route in SSG_ROUTES at build time,
 * producing a unique HTML file per URL with correct <title>,
 * <meta name="description">, <link rel="canonical">, and JSON-LD.
 *
 * The client hydrates after load — all React interactivity is preserved.
 */
import { ViteSSG } from "vite-ssg";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

// Page components
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export const createApp = ViteSSG(
  // Root shell — HelmetProvider wraps everything so Helmet tags are serialized to HTML at build time
  {
    render: ({ app }: { app: React.ReactNode }) => (
      <ErrorBoundary>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <Toaster />
              {app}
            </TooltipProvider>
          </ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    ),
  },
  // Route definitions — mirrors App.tsx Router()
  [
    { path: "/",                                             component: Home },
    { path: "/services",                                     component: Services },
    { path: "/services/:slug",                               component: ServiceDetail },
    { path: "/about",                                        component: About },
    { path: "/contact",                                      component: Contact },
    { path: "/blog",                                         component: Blog },
    { path: "/blog/:slug",                                   component: BlogPost },
    { path: "/privacy",                                      component: Privacy },
    { path: "/terms",                                        component: Terms },
    { path: "/:rest*",                                       component: NotFound },
  ],
);
