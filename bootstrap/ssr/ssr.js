import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.tsx": () => import("./assets/Login-YLD7tYwm.js"), "./Pages/Auth/Register.tsx": () => import("./assets/Register-TeOi6KMa.js"), "./Pages/Auth/VerifyEmail.tsx": () => import("./assets/VerifyEmail-CZE2u0xn.js"), "./Pages/Charges/Create.tsx": () => import("./assets/Create-D_CrZBFl.js"), "./Pages/Charges/Index.tsx": () => import("./assets/Index-a1wYigAR.js"), "./Pages/Dashboard.tsx": () => import("./assets/Dashboard-ZjEgqyKJ.js"), "./Pages/Landing.tsx": () => import("./assets/Landing-D_l0gRg6.js"), "./Pages/Reports.tsx": () => import("./assets/Reports-CvmsG9wW.js"), "./Pages/Vehicles/Index.tsx": () => import("./assets/Index-Bz8_SKfg.js") })),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) })
  })
);
export {
  TooltipProvider as T,
  Tooltip as a,
  TooltipTrigger as b,
  cn as c,
  TooltipContent as d
};
