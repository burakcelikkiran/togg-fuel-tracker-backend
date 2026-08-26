import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { B as Button } from "./button-CIlhfeS0.js";
import { Zap, ChevronRight, BarChart3, TrendingUp, Car, Shield, Battery, MapPin, Smartphone, Clock, Download } from "lucide-react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
const ease = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease }
  })
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease }
  })
};
const features = [
  {
    icon: BarChart3,
    title: "Detaylı Raporlar",
    desc: "Aylık, firma bazlı ve araç bazlı harcama raporları ile bütçenizi kontrol altında tutun."
  },
  {
    icon: TrendingUp,
    title: "Harcama Trendleri",
    desc: "Şarj harcamalarınızın zaman içindeki değişimini görsel grafiklerle takip edin."
  },
  {
    icon: Car,
    title: "Çoklu Araç Desteği",
    desc: "Birden fazla elektrikli aracınızı tek bir panelden yönetin ve karşılaştırın."
  },
  {
    icon: Shield,
    title: "Güvenli & Gizli",
    desc: "Verileriniz şifrelenerek saklanır, sadece siz erişebilirsiniz."
  },
  {
    icon: Battery,
    title: "kWh Takibi",
    desc: "Her şarj için harcanan enerjiyi kaydedin, birim fiyat otomatik hesaplansın."
  },
  {
    icon: MapPin,
    title: "Firma Karşılaştırma",
    desc: "Farklı şarj firmalarının fiyatlarını karşılaştırarak en uygun seçeneği bulun."
  }
];
const Landing = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Ana Sayfa" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      /* @__PURE__ */ jsx(
        motion.nav,
        {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl",
          children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25", children: /* @__PURE__ */ jsx(Zap, { className: "h-5 w-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: "EV Şarj Takip" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/login", children: "Giriş Yap" }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, className: "shadow-lg shadow-primary/25", children: /* @__PURE__ */ jsx(Link, { href: "/register", children: "Ücretsiz Başla" }) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen items-center justify-center px-6 pt-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] },
              transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              className: "absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              animate: { scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] },
              transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              className: "absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[100px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              initial: "hidden",
              animate: "visible",
              custom: 0,
              className: "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary",
              children: [
                /* @__PURE__ */ jsx(Zap, { className: "h-3.5 w-3.5" }),
                "Elektrikli araç şarj harcamalarınızı takip edin"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              variants: fadeUp,
              initial: "hidden",
              animate: "visible",
              custom: 1,
              className: "text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              children: [
                "Şarj Masraflarınızı",
                " ",
                /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-[hsl(196,70%,55%)] bg-clip-text text-transparent", children: "Akıllıca" }),
                " ",
                "Yönetin"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              variants: fadeUp,
              initial: "hidden",
              animate: "visible",
              custom: 2,
              className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl",
              children: "Her şarj kaydını takip edin, firma fiyatlarını karşılaştırın ve aylık harcama trendlerinizi detaylı grafiklerle analiz edin. Elektrikli aracınızın gerçek maliyetini bilin."
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              initial: "hidden",
              animate: "visible",
              custom: 3,
              className: "mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center",
              children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    asChild: true,
                    className: "h-13 px-8 text-base shadow-xl shadow-primary/30",
                    children: /* @__PURE__ */ jsxs(Link, { href: "/register", children: [
                      "Hemen Başla",
                      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    onClick: () => {
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                    },
                    className: "h-13 px-8 text-base",
                    children: "Özellikleri Keşfet"
                  }
                )
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "features", className: "relative px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: fadeUp,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-100px" },
            className: "mb-16 text-center",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Neden EV Şarj Takip?" }),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Elektrikli araç sahipleri için tasarlanmış, şarj harcamalarınızı kontrol altında tutan kapsamlı platform." })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: features.map((f, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: scaleIn,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-50px" },
            custom: i,
            className: "group rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent/30",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20", children: /* @__PURE__ */ jsx(f.icon, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: f.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: f.desc })
            ]
          },
          f.title
        )) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "relative px-6 py-24", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "mb-16 text-center",
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Nasıl Çalışır?" }),
                /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Üç basit adımda şarj harcamalarınızı takip etmeye başlayın." })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid gap-8 md:grid-cols-3", children: [
            {
              step: "01",
              icon: Car,
              title: "Aracınızı Ekleyin",
              desc: "Elektrikli aracınızın bilgilerini girerek takibe başlayın."
            },
            {
              step: "02",
              icon: Zap,
              title: "Şarjlarınızı Kaydedin",
              desc: "Her şarj sonrası kWh, tutar ve firma bilgilerini kaydedin."
            },
            {
              step: "03",
              icon: BarChart3,
              title: "Analiz Edin",
              desc: "Detaylı raporlar ve grafiklerle harcamalarınızı optimize edin."
            }
          ].map((item, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              custom: i,
              className: "relative text-center",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10", children: /* @__PURE__ */ jsx(item.icon, { className: "h-7 w-7 text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-primary", children: [
                  "Adım ",
                  item.step
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-semibold", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.desc })
              ]
            },
            item.step
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative px-6 py-24", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" }) }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: fadeUp,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary", children: [
                  /* @__PURE__ */ jsx(Smartphone, { className: "h-3.5 w-3.5" }),
                  "Mobil Uygulama"
                ] }),
                /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold sm:text-4xl", children: [
                  "Her Yerde",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary to-[hsl(196,70%,55%)] bg-clip-text text-transparent", children: "Yanınızda" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Mobil uygulamamız ile şarj kayıtlarınızı anında ekleyin, harcamalarınızı takip edin ve raporlarınıza istediğiniz yerden erişin. iOS ve Android için yakında!" }),
                /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-4", children: [
                  { icon: Clock, text: "Anlık şarj kaydı ekleme" },
                  { icon: BarChart3, text: "Cep telefonundan rapor görüntüleme" },
                  { icon: Battery, text: "Şarj durumu bildirimleri" },
                  { icon: MapPin, text: "Yakındaki şarj istasyonları" }
                ].map((item, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: fadeUp,
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: { once: true },
                    custom: i + 1,
                    className: "flex items-center gap-3",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.text })
                    ]
                  },
                  item.text
                )) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
                  /* @__PURE__ */ jsxs(Button, { size: "lg", className: "shadow-lg shadow-primary/25", children: [
                    /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
                    "App Store"
                  ] }),
                  /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "outline", children: [
                    /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
                    "Google Play"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: scaleIn,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "flex justify-center",
              children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl" }),
                /* @__PURE__ */ jsxs("div", { className: "relative h-[580px] w-[280px] overflow-hidden rounded-[2.5rem] border-[6px] border-border bg-card shadow-2xl", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-background" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col p-4 pt-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-primary-foreground" }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "EV Şarj Takip" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded-xl border border-border bg-background p-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Toplam Harcama" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-primary", children: "₺4,285.50" }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1 text-[10px] text-muted-foreground", children: "Bu ay +₺320" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-2.5 text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "kWh" }),
                        /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "892" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-2.5 text-center", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Şarj" }),
                        /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: "47" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3 rounded-xl border border-border bg-background p-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-2 text-xs text-muted-foreground", children: "Aylık Trend" }),
                      /* @__PURE__ */ jsx("div", { className: "flex items-end gap-1.5 h-16", children: [40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { height: 0 },
                          whileInView: { height: `${h}%` },
                          transition: { delay: 0.5 + i * 0.05, duration: 0.4 },
                          viewport: { once: true },
                          className: "flex-1 rounded-sm bg-primary/70"
                        },
                        i
                      )) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [
                      { name: "ZES", kwh: "32 kWh", price: "₺128" },
                      { name: "Eşarj", kwh: "28 kWh", price: "₺98" }
                    ].map((item) => /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between rounded-lg border border-border bg-background p-2.5",
                        children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium", children: item.name }),
                            /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: item.kwh })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-primary", children: item.price })
                        ]
                      },
                      item.name
                    )) })
                  ] })
                ] })
              ] })
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative px-6 py-24", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: fadeUp,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            className: "mx-auto max-w-2xl text-center",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Şarj Harcamalarınızı Kontrol Altına Alın" }),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-lg text-muted-foreground", children: "Ücretsiz hesap oluşturun, aracınızı ekleyin ve şarj masraflarınızı akıllıca yönetmeye hemen başlayın." }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "lg",
                  asChild: true,
                  className: "mt-8 h-13 px-10 text-base shadow-xl shadow-primary/30",
                  children: /* @__PURE__ */ jsxs(Link, { href: "/register", children: [
                    "Ücretsiz Hesap Oluştur",
                    /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
                  ] })
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "border-t border-border px-6 py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "EV Şarj Takip" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "© 2026 Kapital Online Tüm hakları saklıdır." })
      ] }) })
    ] })
  ] });
};
export {
  Landing as default
};
