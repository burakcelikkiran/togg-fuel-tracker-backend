import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import { useState } from "react";
import { A as AppLayout, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./AppLayout-DKRAsidd.js";
import { f as formatDateDisplay } from "./date-utils-D-W88WyC.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, I as Input } from "./card-CWhze8JT.js";
import { B as Button } from "./button-CIlhfeS0.js";
import { L as Label } from "./label-CNvk9rvV.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-6lCd8JO8.js";
import { Pencil, Trash2 } from "lucide-react";
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
import "@radix-ui/react-label";
function Index({
  charges,
  companies,
  filters,
  activeVehicle
}) {
  const [filterCompany, setFilterCompany] = useState(filters.company || "");
  const [startDate, setStartDate] = useState(filters.start_date || "");
  const [endDate, setEndDate] = useState(filters.end_date || "");
  const [editCharge, setEditCharge] = useState(null);
  const editForm = useForm({
    date: "",
    company: "",
    kwh: "",
    amount: ""
  });
  editForm.transform((data) => ({
    ...data,
    kwh: parseFloat(data.kwh),
    amount: parseFloat(data.amount)
  }));
  const handleFilter = () => {
    router.get("/charges", {
      company: filterCompany && filterCompany !== "all" ? filterCompany : void 0,
      start_date: startDate || void 0,
      end_date: endDate || void 0
    }, { preserveState: true });
  };
  const handleDelete = (id) => {
    if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    router.delete(`/charges/${id}`, { preserveScroll: true });
  };
  const openEdit = (charge) => {
    setEditCharge(charge);
    editForm.setData({
      date: charge.date,
      company: charge.company,
      kwh: charge.kwh.toString(),
      amount: charge.amount.toString()
    });
  };
  const handleUpdate = () => {
    if (!editCharge) return;
    editForm.put(`/charges/${editCharge.id}`, {
      onSuccess: () => setEditCharge(null),
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Şarj Geçmişi" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Şarj Geçmişi" }),
        activeVehicle && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: activeVehicle.name })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: "Filtreler" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Firma" }),
            /* @__PURE__ */ jsxs(Select, { value: filterCompany, onValueChange: setFilterCompany, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Tümü" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Tümü" }),
                companies.map((company) => /* @__PURE__ */ jsx(SelectItem, { value: company, children: company }, company))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Başlangıç" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "date",
                value: startDate,
                onChange: (e) => setStartDate(e.target.value),
                className: "w-40"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Bitiş" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "date",
                value: endDate,
                onChange: (e) => setEndDate(e.target.value),
                className: "w-40"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { onClick: handleFilter, size: "sm", children: "Filtrele" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: charges.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-10 text-center text-muted-foreground", children: "Henüz kayıt bulunmuyor." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-border text-left text-muted-foreground", children: [
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3", children: "Tarih" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3", children: "Firma" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3 text-right", children: "kWh" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3 text-right", children: "Tutar" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3 text-right", children: "₺/kWh" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 pr-3 text-right", children: "%" }),
          /* @__PURE__ */ jsx("th", { className: "pb-2 text-right", children: "İşlem" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: charges.map((charge) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-border/50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-3", children: formatDateDisplay(charge.date) }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-3", children: charge.company }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-3 text-right", children: charge.kwh }),
          /* @__PURE__ */ jsxs("td", { className: "py-2 pr-3 text-right", children: [
            "₺",
            charge.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-3 text-right", children: charge.unit_price.toFixed(2) }),
          /* @__PURE__ */ jsx("td", { className: "py-2 pr-3 text-right", children: charge.charge_percentage ?? "-" }),
          /* @__PURE__ */ jsx("td", { className: "py-2 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7",
                onClick: () => openEdit(charge),
                children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-destructive",
                onClick: () => handleDelete(charge.id),
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
              }
            )
          ] }) })
        ] }, charge.id)) })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(Dialog, { open: !!editCharge, onOpenChange: (open) => !open && setEditCharge(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Kaydı Düzenle" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { children: "Tarih" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "date",
                value: editForm.data.date,
                onChange: (e) => editForm.setData("date", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { children: "Firma" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: editForm.data.company,
                onChange: (e) => editForm.setData("company", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { children: "kWh" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  value: editForm.data.kwh,
                  onChange: (e) => editForm.setData("kwh", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(Label, { children: "Tutar (₺)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  step: "0.01",
                  value: editForm.data.amount,
                  onChange: (e) => editForm.setData("amount", e.target.value)
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditCharge(null), children: "İptal" }),
          /* @__PURE__ */ jsx(Button, { onClick: handleUpdate, disabled: editForm.processing, children: editForm.processing ? "Kaydediliyor..." : "Güncelle" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Index as default
};
