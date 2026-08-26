import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AppLayout } from "./AppLayout-DKRAsidd.js";
import { a as formatMonthShort } from "./date-utils-D-W88WyC.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-CWhze8JT.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "./button-CIlhfeS0.js";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
const COLORS = [
  "hsl(152, 60%, 45%)",
  "hsl(196, 70%, 55%)",
  "hsl(280, 55%, 60%)",
  "hsl(35, 85%, 60%)",
  "hsl(340, 65%, 60%)"
];
function Reports({ report }) {
  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px"
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Raporlar" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Raporlar" }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Aylık Harcama Trendi" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(LineChart, { data: report.monthly_trend, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "month",
              stroke: "hsl(var(--muted-foreground))",
              fontSize: 12,
              tickFormatter: formatMonthShort
            }
          ),
          /* @__PURE__ */ jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle, labelFormatter: formatMonthShort }),
          /* @__PURE__ */ jsx(
            Line,
            {
              type: "monotone",
              dataKey: "amount",
              stroke: "hsl(var(--primary))",
              strokeWidth: 2,
              dot: { fill: "hsl(var(--primary))" },
              name: "Tutar (₺)"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Firma Bazlı Harcama" }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(
                Pie,
                {
                  data: report.company_distribution,
                  dataKey: "amount",
                  nameKey: "company",
                  cx: "50%",
                  cy: "50%",
                  outerRadius: 80,
                  label: ({ company }) => company,
                  children: report.company_distribution.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i))
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: report.company_distribution.map((item, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-lg border border-border px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "h-3 w-3 rounded-full",
                        style: { backgroundColor: COLORS[i % COLORS.length] }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: item.company })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold", children: [
                    "₺",
                    item.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })
                  ] })
                ]
              },
              item.company
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Ort. Birim Fiyat Karşılaştırması" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: report.company_avg_price, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "company", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
            /* @__PURE__ */ jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
            /* @__PURE__ */ jsx(Tooltip, { contentStyle: tooltipStyle }),
            /* @__PURE__ */ jsx(
              Bar,
              {
                dataKey: "avg_price",
                fill: "hsl(var(--primary))",
                radius: [4, 4, 0, 0],
                name: "₺/kWh"
              }
            )
          ] }) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Reports as default
};
