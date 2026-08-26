import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-CIlhfeS0.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, I as Input, e as CardFooter } from "./card-CWhze8JT.js";
import { L as Label } from "./label-CNvk9rvV.js";
import { Zap } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post("/register");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Kayıt Ol" }),
    /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary", children: /* @__PURE__ */ jsx(Zap, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Kayıt Ol" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Yeni hesap oluşturun" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Ad Soyad" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                required: true,
                placeholder: "Adınız Soyadınız"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "E-posta" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                required: true,
                placeholder: "ornek@email.com"
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Şifre" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                autoComplete: "new-password",
                value: data.password,
                onChange: (e) => setData("password", e.target.value),
                required: true,
                placeholder: "••••••••",
                minLength: 6
              }
            ),
            errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Şifre Tekrar" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password_confirmation",
                type: "password",
                autoComplete: "new-password",
                value: data.password_confirmation,
                onChange: (e) => setData("password_confirmation", e.target.value),
                required: true,
                placeholder: "••••••••",
                minLength: 6
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: processing, children: processing ? "Kayıt yapılıyor..." : "Kayıt Ol" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Zaten hesabınız var mı?",
            " ",
            /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-primary hover:underline", children: "Giriş Yap" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Register as default
};
