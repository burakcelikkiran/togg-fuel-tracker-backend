import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { B as Button } from "./button-CIlhfeS0.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, I as Input } from "./card-CWhze8JT.js";
import { L as Label } from "./label-CNvk9rvV.js";
import { Mail, ArrowLeft } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function VerifyEmail({ customerId }) {
  const { data, setData, post, processing, errors } = useForm({
    customer_id: customerId,
    code: ""
  });
  const resendForm = useForm({
    customer_id: customerId
  });
  const [timeLeft, setTimeLeft] = useState(0);
  const submit = (e) => {
    e.preventDefault();
    post("/verify");
  };
  const handleResend = () => {
    if (timeLeft > 0) return;
    resendForm.post("/resend-code", {
      onSuccess: () => {
        setTimeLeft(60);
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1e3);
      }
    });
  };
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setData("code", value);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "E-posta Doğrulama" }),
    /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsx(Mail, { className: "h-8 w-8 text-primary" }) }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "E-posta Doğrulama" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "E-posta adresinize gönderilen 6 haneli kodu girin" })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "code", className: "text-center", children: "Doğrulama Kodu" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "code",
              type: "text",
              inputMode: "numeric",
              maxLength: 6,
              value: data.code,
              onChange: handleCodeChange,
              placeholder: "------",
              className: "text-center text-2xl tracking-widest",
              required: true,
              autoFocus: true
            }
          ),
          errors.code && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-destructive", children: errors.code }),
          /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: "Kodu 15 dakika içinde girin" })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: processing || data.code.length !== 6, children: processing ? "Doğrulanıyor..." : "Doğrula" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              className: "w-full",
              onClick: handleResend,
              disabled: resendForm.processing || timeLeft > 0,
              children: resendForm.processing ? "Gönderiliyor..." : timeLeft > 0 ? `Yeni kod (${timeLeft}s)` : "Yeni kod gönder"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", className: "w-full", asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: "/register", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
            "Geri dön"
          ] }) })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  VerifyEmail as default
};
