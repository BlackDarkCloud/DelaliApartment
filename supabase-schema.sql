-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

create extension if not exists "pgcrypto";

create table if not exists apartments (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  address text not null default 'DVA, Lomé, Togo',
  price_per_night numeric not null default 0,
  currency text not null default 'FCFA',
  bedrooms int not null default 1,
  bathrooms int not null default 1,
  max_guests int not null default 2,
  description_fr text not null default '',
  description_en text not null default '',
  amenities text[] not null default '{}',
  images text[] not null default '{}',
  whatsapp_number text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table apartments enable row level security;

-- Anyone (including the public site, using the anon key) can read apartments.
create policy "Public can read apartments"
  on apartments for select
  using (true);

-- Writes (insert/update/delete) are only performed by the server using the
-- Supabase service role key inside the /api/apartments routes, which are
-- themselves protected by the admin password. No public write policy is
-- created, so the anon key alone cannot modify data.

-- Optional: seed one example apartment so the homepage isn't empty on first deploy.
-- Replace the WhatsApp number and image URLs, then uncomment and run.

-- insert into apartments
--   (slug, name, address, price_per_night, currency, bedrooms, bathrooms, max_guests,
--    description_fr, description_en, amenities, images, whatsapp_number, featured)
-- values (
--   'delali-apartment-studio-dva',
--   'Delali Apartment — Studio DVA',
--   'DVA, Lomé, Togo',
--   25000,
--   'FCFA',
--   1, 1, 2,
--   'Studio meublé et climatisé à DVA, à deux pas des axes principaux de Lomé. Idéal pour un séjour d''affaires ou de courte durée.',
--   'Furnished, air-conditioned studio in DVA, steps from Lomé''s main roads. Ideal for a business trip or short stay.',
--   array['Climatisation', 'Wi-Fi fibre', 'Cuisine équipée', 'Parking privé'],
--   array['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
--   '22890000000',
--   true
-- );
