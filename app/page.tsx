import { Cta } from "@/components/marketing/cta";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { LogoStrip } from "@/components/marketing/logo-strip";
import { Navbar } from "@/components/marketing/navbar";
import { Testimonials } from "@/components/marketing/testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoStrip />
        <Features />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
