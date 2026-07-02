# Delali Apartment

Site vitrine + moteur de réservation "sur WhatsApp" pour Delali Apartment
(DVA, Lomé, Togo). Next.js 14 (App Router), Tailwind CSS, un héros en 3D
(react-three-fiber / Three.js), contenu bilingue FR/EN, données dans
Supabase, et un panneau d'administration protégé par mot de passe pour
ajouter/modifier/supprimer les logements.

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- Three.js / @react-three/fiber / @react-three/drei pour la maison 3D du héros
- Supabase (Postgres) pour stocker les logements
- WhatsApp (liens `wa.me`) pour le contact et la réservation
- Déploiement : Vercel

## 1. Installer en local

```bash
npm install
cp .env.local.example .env.local
# puis remplir .env.local (voir section 2 et 3)
npm run dev
```

Le site est sur http://localhost:3000, l'admin sur http://localhost:3000/admin.

## 2. Créer le projet Supabase

1. Va sur https://supabase.com → New project.
2. Une fois le projet créé, ouvre **SQL Editor** → New query, colle le
   contenu de `supabase-schema.sql` et exécute-le. Cela crée la table
   `apartments` avec les bonnes permissions (lecture publique, écriture
   uniquement via le serveur).
3. Va dans **Project Settings → API** et récupère :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret, ne jamais
     l'exposer côté client, ne jamais préfixer par `NEXT_PUBLIC_`)

## 3. Variables d'environnement

Voir `.env.local.example`. En résumé :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé secrète Supabase (écriture admin) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp affiché sur tout le site (indicatif + numéro, sans + ni espace, ex. `22890000000`) |
| `ADMIN_PASSWORD` | Mot de passe de l'espace admin |
| `ADMIN_SESSION_SECRET` | Chaîne aléatoire longue, sert à signer la session admin |

## 4. Déployer sur Vercel

1. Pousse le projet sur GitHub (un nouveau repo).
2. Sur https://vercel.com → **Add New… → Project** → importe le repo.
3. Dans **Environment Variables**, ajoute les 6 variables ci-dessus (les
   mêmes valeurs que dans `.env.local`).
4. Déploie. Vercel détecte automatiquement Next.js, aucune configuration
   supplémentaire n'est nécessaire.
5. Une fois en ligne, va sur `https://ton-domaine.vercel.app/admin` et
   connecte-toi avec `ADMIN_PASSWORD` pour ajouter le premier logement.

## 5. Utiliser l'espace admin

- `/admin` : connexion par mot de passe.
- `/admin/dashboard` : formulaire d'ajout d'un logement (nom, adresse, prix,
  chambres, salles de bain, capacité, description FR/EN, équipements,
  photos, numéro WhatsApp dédié) + liste des logements existants avec
  modification et suppression.
- Les photos sont ajoutées sous forme d'URLs (une par ligne). Le plus
  simple : héberge les photos sur un bucket Supabase Storage, sur
  Cloudinary, ou sur n'importe quel hébergeur d'images, et colle les liens
  directs (`https://…jpg`) dans le formulaire.
- Chaque logement peut avoir son propre numéro WhatsApp, ou tu peux réutiliser
  le numéro global défini dans `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## 6. Structure du projet

```
app/
  page.tsx                  Page d'accueil (héros 3D, logements, quartier, contact)
  apartment/[slug]/page.tsx Fiche détaillée d'un logement
  admin/page.tsx            Connexion admin
  admin/dashboard/page.tsx  CRUD des logements
  api/admin-login/route.ts  Authentification admin (cookie httpOnly)
  api/apartments/route.ts   Liste + création (protégée)
  api/apartments/[id]/route.ts  Modification + suppression (protégée)
components/                 Header, Hero, House3D, ApartmentGrid, etc.
lib/                        i18n (FR/EN), Supabase, WhatsApp, auth admin
supabase-schema.sql         Schéma de la base + policies RLS
```

## 7. Notes de sécurité

- L'espace admin est protégé par un mot de passe unique (`ADMIN_PASSWORD`)
  et un cookie de session httpOnly. C'est suffisant pour un site à un seul
  administrateur ; si plusieurs personnes doivent gérer le contenu avec des
  comptes séparés, il est recommandé de migrer vers Supabase Auth.
- Toutes les écritures (ajout/modification/suppression de logement) passent
  par les routes API du serveur, qui vérifient le cookie admin avant
  d'utiliser la clé `service_role`. La clé publique (`anon`) ne permet que
  la lecture.

## 8. Personnaliser le design

- Couleurs, typographies : `tailwind.config.ts`.
- Textes FR/EN : `lib/dictionary.ts`.
- La maison 3D du héros (formes, couleurs, rotation) : `components/House3D.tsx`.
- Numéro WhatsApp par défaut, adresse, quartier : `lib/whatsapp.ts` et
  `lib/dictionary.ts`.
