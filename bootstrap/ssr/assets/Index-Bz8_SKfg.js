import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useForm, Head, router } from "@inertiajs/react";
import * as React from "react";
import { useState } from "react";
import { A as AppLayout } from "./AppLayout-DKRAsidd.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, I as Input } from "./card-CWhze8JT.js";
import { b as buttonVariants, B as Button } from "./button-CIlhfeS0.js";
import { c as cn } from "../ssr.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-6lCd8JO8.js";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { L as Label } from "./label-CNvk9rvV.js";
import { cva } from "class-variance-authority";
import { Plus, Car, CheckCircle, Pencil, Trash2 } from "lucide-react";
import "@radix-ui/react-slot";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const emptyForm = {
  name: "",
  brand: "",
  model: "",
  plate: "",
  battery_capacity: void 0,
  year: void 0,
  kilometer: void 0
};
function Index({ vehicles }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const form = useForm(emptyForm);
  const resetForm = () => {
    form.reset();
    form.clearErrors();
    setEditingVehicle(null);
  };
  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };
  const openEditDialog = (vehicle) => {
    setEditingVehicle(vehicle);
    form.setData({
      name: vehicle.name,
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      plate: vehicle.plate || "",
      battery_capacity: vehicle.battery_capacity || void 0,
      year: vehicle.year || void 0,
      kilometer: vehicle.kilometer || void 0
    });
    setDialogOpen(true);
  };
  const openDeleteDialog = (vehicle) => {
    setVehicleToDelete(vehicle);
    setDeleteDialogOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.data.name.trim()) return;
    if (editingVehicle) {
      form.put(`/vehicles/${editingVehicle.id}`, {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
        },
        preserveScroll: true
      });
    } else {
      form.post("/vehicles", {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
        },
        preserveScroll: true
      });
    }
  };
  const handleDelete = () => {
    if (!vehicleToDelete) return;
    router.delete(`/vehicles/${vehicleToDelete.id}`, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setVehicleToDelete(null);
      },
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Araçlarım" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Araçlarım" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Araçlarınızı yönetin ve aktif aracı seçin" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: openAddDialog, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Yeni Araç"
        ] })
      ] }),
      vehicles.length === 0 ? /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
        /* @__PURE__ */ jsx(Car, { className: "mb-4 h-12 w-12 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: "Henüz aracınız yok" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-center text-muted-foreground", children: "İlk aracınızı ekleyerek şarj takibine başlayın." }),
        /* @__PURE__ */ jsxs(Button, { onClick: openAddDialog, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "İlk Aracı Ekle"
        ] })
      ] }) }) : /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { children: [
          "Kayıtlı Araçlar (",
          vehicles.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Araç Adı" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Marka / Model" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Plaka" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Pil (kWh)" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Yıl" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Kilometre" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Durum" }),
            /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "İşlemler" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: vehicles.map((vehicle) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: vehicle.name }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.brand && vehicle.model ? `${vehicle.brand} ${vehicle.model}` : vehicle.brand || vehicle.model || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.plate || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.battery_capacity ? `${vehicle.battery_capacity} kWh` : "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.year || "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.kilometer ? `${vehicle.kilometer.toLocaleString("tr-TR")} km` : "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: vehicle.is_active ? /* @__PURE__ */ jsxs(Badge, { variant: "default", className: "gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3" }),
              "Aktif"
            ] }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Pasif" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => openEditDialog(vehicle),
                  children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => openDeleteDialog(vehicle),
                  disabled: vehicles.length === 1 && vehicle.is_active,
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, vehicle.id)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: editingVehicle ? "Araç Düzenle" : "Yeni Araç Ekle" }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Araç Adı *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  value: form.data.name,
                  onChange: (e) => form.setData("name", e.target.value),
                  placeholder: "Örn: T10 Togg",
                  required: true
                }
              ),
              form.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: form.errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "brand", children: "Marka" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "brand",
                    value: form.data.brand || "",
                    onChange: (e) => form.setData("brand", e.target.value),
                    placeholder: "Örn: Togg"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "model", children: "Model" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "model",
                    value: form.data.model || "",
                    onChange: (e) => form.setData("model", e.target.value),
                    placeholder: "Örn: T10"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "plate", children: "Plaka" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "plate",
                  value: form.data.plate || "",
                  onChange: (e) => form.setData("plate", e.target.value),
                  placeholder: "Örn: 34 ABC 123"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "battery", children: "Pil Kapasitesi (kWh)" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "battery",
                    type: "number",
                    step: "0.1",
                    value: form.data.battery_capacity ?? "",
                    onChange: (e) => form.setData(
                      "battery_capacity",
                      e.target.value ? parseFloat(e.target.value) : void 0
                    ),
                    placeholder: "Örn: 52.5"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "year", children: "Model Yılı" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "year",
                    type: "number",
                    value: form.data.year ?? "",
                    onChange: (e) => form.setData(
                      "year",
                      e.target.value ? parseInt(e.target.value, 10) : void 0
                    ),
                    placeholder: "Örn: 2024",
                    min: "1900",
                    max: "2100"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "kilometer", children: "Kilometre" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "kilometer",
                  type: "number",
                  value: form.data.kilometer ?? "",
                  onChange: (e) => form.setData(
                    "kilometer",
                    e.target.value ? parseInt(e.target.value, 10) : void 0
                  ),
                  placeholder: "Örn: 15000",
                  min: "0"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setDialogOpen(false), children: "İptal" }),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: form.processing, children: editingVehicle ? "Güncelle" : "Ekle" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Aracı silmek istediğinize emin misiniz?" }),
          /* @__PURE__ */ jsx(AlertDialogDescription, { children: vehicleToDelete && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("strong", { children: vehicleToDelete.name }),
            " adlı aracı silmek üzeresiniz. Bu araca ait şarj kayıtları da silinecek.",
            vehicles.length === 1 && vehicleToDelete.is_active && /* @__PURE__ */ jsx("span", { className: "mt-2 block text-destructive", children: "Bu son aracınız olduğu için silme işlemi yapılamaz." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsx(AlertDialogCancel, { children: "İptal" }),
          /* @__PURE__ */ jsx(
            AlertDialogAction,
            {
              onClick: handleDelete,
              disabled: vehicles.length === 1 && vehicleToDelete?.is_active,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              children: "Sil"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Index as default
};
