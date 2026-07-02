export type Apartment = {
  id: string;
  slug: string;
  name: string;
  address: string;
  price_per_night: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  description_fr: string;
  description_en: string;
  amenities: string[];
  images: string[];
  whatsapp_number: string;
  featured: boolean;
  created_at?: string;
};

export type ApartmentInput = Omit<Apartment, "id" | "created_at" | "slug"> & {
  slug?: string;
};
