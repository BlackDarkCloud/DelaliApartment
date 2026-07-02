import Hero from "@/components/Hero";
import DestinationsPreview from "@/components/DestinationsPreview";
import SocialProof from "@/components/SocialProof";
import AmenitiesStrip from "@/components/AmenitiesStrip";
import ApartmentGrid from "@/components/ApartmentGrid";
import LocationSection from "@/components/LocationSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <DestinationsPreview />
        <SocialProof />
        <AmenitiesStrip />
        <ApartmentGrid />
        <LocationSection />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
