import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { A as AppLayout } from "./AppLayout-DKRAsidd.js";
import { B as Button } from "./button-CIlhfeS0.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, I as Input } from "./card-CWhze8JT.js";
import { L as Label } from "./label-CNvk9rvV.js";
import { Zap, ZapOff } from "lucide-react";
import { c as cn } from "../ssr.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@radix-ui/react-label";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
function Create({ companies, activeVehicle }) {
  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [customCompanyName, setCustomCompanyName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const form = useForm({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    company: "",
    charge_type: "AC",
    charge_percentage: "",
    kwh: "",
    amount: ""
  });
  form.transform((data2) => ({
    date: data2.date,
    company: isOtherCompany ? customCompanyName : data2.company,
    charge_type: data2.charge_type,
    charge_percentage: data2.charge_percentage ? parseInt(data2.charge_percentage, 10) : null,
    kwh: parseFloat(data2.kwh),
    amount: parseFloat(data2.amount)
  }));
  const { data, setData, post, processing, errors } = form;
  const unitPrice = data.kwh && data.amount ? (parseFloat(data.amount) / parseFloat(data.kwh)).toFixed(2) : "—";
  const filteredCompanies = [
    ...companies.filter((c) => c.toLowerCase().includes(data.company.toLowerCase())),
    ...data.company.toLowerCase().includes("diğer") ? [] : ["Diğer"]
  ];
  const handleCompanySelect = (company) => {
    if (company === "Diğer") {
      setIsOtherCompany(true);
      setData("company", "Diğer");
    } else {
      setIsOtherCompany(false);
      setData("company", company);
    }
    setShowSuggestions(false);
  };
  const submit = (e) => {
    e.preventDefault();
    post("/charges");
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Yeni Şarj Kaydı" }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-lg space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Yeni Şarj Kaydı" }),
        activeVehicle && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: activeVehicle.name })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Şarj Bilgileri" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "date", children: "Tarih" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "date",
                type: "date",
                value: data.date,
                onChange: (e) => setData("date", e.target.value),
                required: true
              }
            ),
            errors.date && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.date })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Şarj Tipi" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: ["AC", "DC"].map((type) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setData("charge_type", type),
                className: cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all",
                  data.charge_type === type ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent/50"
                ),
                children: [
                  type === "AC" ? /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(ZapOff, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    type,
                    " Şarj"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-normal opacity-70", children: type === "AC" ? "Normal" : "Hızlı" })
                ]
              },
              type
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "company", children: "Şarj Firması" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "company",
                value: data.company,
                onChange: (e) => {
                  setData("company", e.target.value);
                  setShowSuggestions(true);
                },
                onBlur: () => setTimeout(() => setShowSuggestions(false), 200),
                required: true,
                placeholder: "ZES, Eşarj, Trugo..."
              }
            ),
            errors.company && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.company }),
            showSuggestions && filteredCompanies.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover shadow-lg", children: filteredCompanies.map((company) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "block w-full px-3 py-2 text-left text-sm hover:bg-accent",
                onClick: () => handleCompanySelect(company),
                children: company
              },
              company
            )) })
          ] }),
          isOtherCompany && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "custom-company", children: "Firma Adı" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "custom-company",
                value: customCompanyName,
                onChange: (e) => setCustomCompanyName(e.target.value),
                placeholder: "Firma adını girin...",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "kwh", children: "Enerji (kWh)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "kwh",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  value: data.kwh,
                  onChange: (e) => setData("kwh", e.target.value),
                  required: true,
                  placeholder: "45.2"
                }
              ),
              errors.kwh && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.kwh })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "amount", children: "Tutar (₺)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "amount",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  value: data.amount,
                  onChange: (e) => setData("amount", e.target.value),
                  required: true,
                  placeholder: "150.00"
                }
              ),
              errors.amount && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.amount })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "percentage", children: "Şarj Yüzdesi (%)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "percentage",
                  type: "number",
                  min: "0",
                  max: "100",
                  value: data.charge_percentage,
                  onChange: (e) => setData("charge_percentage", e.target.value),
                  placeholder: "80"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-accent/50 px-4 py-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Birim Fiyat: " }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-primary", children: [
              unitPrice,
              " ₺/kWh"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: processing, children: processing ? "Kaydediliyor..." : "Kaydet" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Create as default
};
