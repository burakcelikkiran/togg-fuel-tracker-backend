import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AppLayout } from "./AppLayout-DKRAsidd.js";
import { a as formatMonthShort } from "./date-utils-D-W88WyC.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-CWhze8JT.js";
import { B as Button } from "./button-CIlhfeS0.js";
import { Car, TrendingUp, Zap, Building2, Hash } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell } from "recharts";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
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
function Dashboard({ dashboard, activeVehicle }) {
  if (!activeVehicle) {
    return /* @__PURE__ */ jsxs(AppLayout, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
        /* @__PURE__ */ jsx(Car, { className: "mb-4 h-16 w-16 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xl font-semibold", children: "Henüz aracınız yok" }),
        /* @__PURE__ */ jsx("p", { className: "mb-6 text-center text-muted-foreground", children: "Şarj takibine başlamak için ilk aracınızı ekleyin." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/vehicles", children: "Araç Ekle" }) })
      ] })
    ] });
  }
  const summaryCards = [
    {
      title: "Toplam Harcama",
      value: `₺${dashboard.total_amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`,
      icon: TrendingUp
    },
    {
      title: "Toplam kWh",
      value: `${dashboard.total_kwh.toLocaleString("tr-TR", { minimumFractionDigits: 1 })} kWh`,
      icon: Zap
    },
    {
      title: "Ort. Birim Fiyat",
      value: `₺${dashboard.avg_unit_price.toFixed(2)}/kWh`,
      icon: Building2
    },
    { title: "Şarj Sayısı", value: dashboard.total_charges.toString(), icon: Hash }
  ];
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: activeVehicle.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: activeVehicle.brand && activeVehicle.model ? `${activeVehicle.brand} ${activeVehicle.model}` : "Dashboard" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: summaryCards.map((card) => /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: card.title }),
          /* @__PURE__ */ jsx(card.icon, { className: "h-4 w-4 text-primary" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: card.value }) })
      ] }, card.title)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Aylık Harcama Trendi" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(LineChart, { data: dashboard.monthly_trend, children: [
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
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: {
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                },
                labelStyle: { color: "hsl(var(--foreground))" },
                labelFormatter: formatMonthShort
              }
            ),
            /* @__PURE__ */ jsx(
              Line,
              {
                type: "monotone",
                dataKey: "amount",
                stroke: "hsl(var(--primary))",
                strokeWidth: 2,
                dot: { fill: "hsl(var(--primary))" }
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Firma Dağılımı" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(
              Pie,
              {
                data: dashboard.company_distribution,
                dataKey: "amount",
                nameKey: "company",
                cx: "50%",
                cy: "50%",
                outerRadius: 90,
                label: ({ company }) => company,
                children: dashboard.company_distribution.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i))
              }
            ),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                contentStyle: {
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }
              }
            )
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Son Şarj Kayıtları" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-left text-muted-foreground", children: [
            /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Tarih" }),
            /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4", children: "Firma" }),
            /* @__PURE__ */ jsx("th", { className: "pb-2 pr-4 text-right", children: "kWh" }),
            /* @__PURE__ */ jsx("th", { className: "pb-2 text-right", children: "Tutar" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: dashboard.recent_charges.map((charge) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50", children: [
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-4", children: charge.date }),
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-4", children: charge.company }),
            /* @__PURE__ */ jsx("td", { className: "py-2 pr-4 text-right", children: charge.kwh }),
            /* @__PURE__ */ jsxs("td", { className: "py-2 text-right", children: [
              "₺",
              charge.amount.toFixed(2)
            ] })
          ] }, charge.id)) })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
