import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AmenitiesStrip from "@/components/AmenitiesStrip";
import ApartmentGrid from "@/components/ApartmentGrid";
import LocationSection from "@/components/LocationSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AmenitiesStrip />
        <ApartmentGrid />
        <LocationSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
