import { AiAssistant } from "@/components/assistant/AiAssistant";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/ui/BackToTop";
import { BookingSection } from "@/components/home/BookingSection";
import { ClinicBusinessValue } from "@/components/home/ClinicBusinessValue";
import { ContactSection } from "@/components/home/ContactSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { Hero } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-dent-gradient text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <DoctorsSection />
      <ClinicBusinessValue />
      <BookingSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      <AiAssistant />
      <BackToTop />
    </main>
  );
}
