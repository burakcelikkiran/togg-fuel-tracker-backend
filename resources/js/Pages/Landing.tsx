import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Zap,
  BarChart3,
  Shield,
  Smartphone,
  TrendingUp,
  Car,
  ChevronRight,
  Battery,
  MapPin,
  Clock,
  Download,
} from "lucide-react";
import type { Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

const features = [
  {
    icon: BarChart3,
    title: "Detaylı Raporlar",
    desc: "Aylık, firma bazlı ve araç bazlı harcama raporları ile bütçenizi kontrol altında tutun.",
  },
  {
    icon: TrendingUp,
    title: "Harcama Trendleri",
    desc: "Şarj harcamalarınızın zaman içindeki değişimini görsel grafiklerle takip edin.",
  },
  {
    icon: Car,
    title: "Çoklu Araç Desteği",
    desc: "Birden fazla elektrikli aracınızı tek bir panelden yönetin ve karşılaştırın.",
  },
  {
    icon: Shield,
    title: "Güvenli & Gizli",
    desc: "Verileriniz şifrelenerek saklanır, sadece siz erişebilirsiniz.",
  },
  {
    icon: Battery,
    title: "kWh Takibi",
    desc: "Her şarj için harcanan enerjiyi kaydedin, birim fiyat otomatik hesaplansın.",
  },
  {
    icon: MapPin,
    title: "Firma Karşılaştırma",
    desc: "Farklı şarj firmalarının fiyatlarını karşılaştırarak en uygun seçeneği bulun.",
  },
];


const Landing = () => {
  return (
    <>
      <Head title="Ana Sayfa" />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">EV Şarj Takip</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Giriş Yap</Link>
            </Button>
            <Button asChild className="shadow-lg shadow-primary/25">
              <Link href="/register">Ücretsiz Başla</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[100px]"
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            <Zap className="h-3.5 w-3.5" />
            Elektrikli araç şarj harcamalarınızı takip edin
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Şarj Masraflarınızı{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(196,70%,55%)] bg-clip-text text-transparent">
              Akıllıca
            </span>{" "}
            Yönetin
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Her şarj kaydını takip edin, firma fiyatlarını karşılaştırın ve aylık harcama
            trendlerinizi detaylı grafiklerle analiz edin. Elektrikli aracınızın gerçek maliyetini bilin.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              asChild
              className="h-13 px-8 text-base shadow-xl shadow-primary/30"
            >
              <Link href="/register">
                Hemen Başla
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-13 px-8 text-base"
            >
              Özellikleri Keşfet
            </Button>
          </motion.div>

        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Neden EV Şarj Takip?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Elektrikli araç sahipleri için tasarlanmış, şarj harcamalarınızı kontrol altında tutan kapsamlı platform.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                className="group rounded-2xl border border-border/60 bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Nasıl Çalışır?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Üç basit adımda şarj harcamalarınızı takip etmeye başlayın.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Car,
                title: "Aracınızı Ekleyin",
                desc: "Elektrikli aracınızın bilgilerini girerek takibe başlayın.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Şarjlarınızı Kaydedin",
                desc: "Her şarj sonrası kWh, tutar ve firma bilgilerini kaydedin.",
              },
              {
                step: "03",
                icon: BarChart3,
                title: "Analiz Edin",
                desc: "Detaylı raporlar ve grafiklerle harcamalarınızı optimize edin.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                  Adım {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Smartphone className="h-3.5 w-3.5" />
                Mobil Uygulama
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Her Yerde{" "}
                <span className="bg-gradient-to-r from-primary to-[hsl(196,70%,55%)] bg-clip-text text-transparent">
                  Yanınızda
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Mobil uygulamamız ile şarj kayıtlarınızı anında ekleyin, harcamalarınızı takip edin ve
                raporlarınıza istediğiniz yerden erişin. iOS ve Android için yakında!
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Clock, text: "Anlık şarj kaydı ekleme" },
                  { icon: BarChart3, text: "Cep telefonundan rapor görüntüleme" },
                  { icon: Battery, text: "Şarj durumu bildirimleri" },
                  { icon: MapPin, text: "Yakındaki şarj istasyonları" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 1}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="shadow-lg shadow-primary/25">
                  <Download className="mr-2 h-4 w-4" />
                  App Store
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Google Play
                </Button>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl" />
                {/* Phone frame */}
                <div className="relative h-[580px] w-[280px] overflow-hidden rounded-[2.5rem] border-[6px] border-border bg-card shadow-2xl">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-background" />
                  {/* Screen content */}
                  <div className="flex h-full flex-col p-4 pt-10">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Zap className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-bold">EV Şarj Takip</span>
                    </div>

                    <div className="mb-4 rounded-xl border border-border bg-background p-3">
                      <div className="text-xs text-muted-foreground">Toplam Harcama</div>
                      <div className="text-xl font-bold text-primary">₺4,285.50</div>
                      <div className="mt-1 text-[10px] text-muted-foreground">Bu ay +₺320</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="rounded-lg border border-border bg-background p-2.5 text-center">
                        <div className="text-xs text-muted-foreground">kWh</div>
                        <div className="text-sm font-bold">892</div>
                      </div>
                      <div className="rounded-lg border border-border bg-background p-2.5 text-center">
                        <div className="text-xs text-muted-foreground">Şarj</div>
                        <div className="text-sm font-bold">47</div>
                      </div>
                    </div>

                    {/* Mini chart bars */}
                    <div className="mb-3 rounded-xl border border-border bg-background p-3">
                      <div className="mb-2 text-xs text-muted-foreground">Aylık Trend</div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[40, 55, 35, 65, 50, 75, 60, 80, 70, 90, 85, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex-1 rounded-sm bg-primary/70"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "ZES", kwh: "32 kWh", price: "₺128" },
                        { name: "Eşarj", kwh: "28 kWh", price: "₺98" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between rounded-lg border border-border bg-background p-2.5"
                        >
                          <div>
                            <div className="text-xs font-medium">{item.name}</div>
                            <div className="text-[10px] text-muted-foreground">{item.kwh}</div>
                          </div>
                          <div className="text-xs font-bold text-primary">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Şarj Harcamalarınızı Kontrol Altına Alın
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Ücretsiz hesap oluşturun, aracınızı ekleyin ve şarj masraflarınızı
            akıllıca yönetmeye hemen başlayın.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-8 h-13 px-10 text-base shadow-xl shadow-primary/30"
          >
            <Link href="/register">
              Ücretsiz Hesap Oluştur
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">EV Şarj Takip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Kapital Online Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Landing;
