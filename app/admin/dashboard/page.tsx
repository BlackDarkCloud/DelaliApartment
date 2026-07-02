"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Apartment, ApartmentInput } from "@/lib/types";

const emptyForm: ApartmentInput = {
  name: "",
  address: "DVA, Lomé, Togo",
  price_per_night: 0,
  currency: "FCFA",
  bedrooms: 1,
  bathrooms: 1,
  max_guests: 2,
  description_fr: "",
  description_en: "",
  amenities: [],
  images: [],
  whatsapp_number: "",
  featured: false,
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ApartmentInput>(emptyForm);
  const [amenitiesText, setAmenitiesText] = useState("");
  const [imagesText, setImagesText] = useState("");

  async function loadApartments() {
    setLoading(true);
    const res = await fetch("/api/apartments");
    const data = await res.json();
    setApartments(data.apartments || []);
    setLoading(false);
  }

  useEffect(() => {
    loadApartments();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setAmenitiesText("");
    setImagesText("");
    setEditingId(null);
  }

  function startEdit(apt: Apartment) {
    setEditingId(apt.id);
    setForm({
      name: apt.name,
      address: apt.address,
      price_per_night: apt.price_per_night,
      currency: apt.currency,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      max_guests: apt.max_guests,
      description_fr: apt.description_fr,
      description_en: apt.description_en,
      amenities: apt.amenities,
      images: apt.images,
      whatsapp_number: apt.whatsapp_number,
      featured: apt.featured,
    });
    setAmenitiesText((apt.amenities || []).join(", "));
    setImagesText((apt.images || []).join("\n"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: ApartmentInput = {
      ...form,
      price_per_night: Number(form.price_per_night),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      max_guests: Number(form.max_guests),
      amenities: amenitiesText
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      images: imagesText
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    const res = await fetch(
      editingId ? `/api/apartments/${editingId}` : "/api/apartments",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    resetForm();
    loadApartments();
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce logement ? Cette action est irréversible.")) return;
    await fetch(`/api/apartments/${id}`, { method: "DELETE" });
    loadApartments();
  }

  async function handleLogout() {
    await fetch("/api/admin-login", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-sand pb-24">
      <header className="border-b border-night/10 bg-ivory">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="eyebrow text-clayDeep">Espace admin</p>
            <h1 className="font-display text-xl font-semibold text-night">
              Gérer les logements
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="focus-ring rounded-full border border-night/20 px-4 py-2 text-sm text-night hover:border-night/50"
          >
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-ivory p-6 shadow-card sm:p-8"
        >
          <h2 className="font-display text-lg font-semibold text-night">
            {editingId ? "Modifier le logement" : "Ajouter un logement"}
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-night/80">
              Nom du logement
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
                placeholder="Delali Apartment — Studio DVA"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Adresse
              <input
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Prix / nuit
              <input
                required
                type="number"
                min={0}
                value={form.price_per_night}
                onChange={(e) =>
                  setForm({ ...form, price_per_night: Number(e.target.value) })
                }
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Devise
              <input
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Chambres
              <input
                type="number"
                min={0}
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Salles de bain
              <input
                type="number"
                min={0}
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Voyageurs max.
              <input
                type="number"
                min={1}
                value={form.max_guests}
                onChange={(e) =>
                  setForm({ ...form, max_guests: Number(e.target.value) })
                }
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>

            <label className="text-sm font-medium text-night/80">
              Numéro WhatsApp (avec indicatif, ex. 22890000000)
              <input
                required
                value={form.whatsapp_number}
                onChange={(e) =>
                  setForm({ ...form, whatsapp_number: e.target.value })
                }
                className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium text-night/80">
            Description (français)
            <textarea
              required
              rows={3}
              value={form.description_fr}
              onChange={(e) => setForm({ ...form, description_fr: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-night/80">
            Description (anglais)
            <textarea
              required
              rows={3}
              value={form.description_en}
              onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-night/80">
            Équipements (séparés par une virgule)
            <input
              value={amenitiesText}
              onChange={(e) => setAmenitiesText(e.target.value)}
              placeholder="Climatisation, Wi-Fi fibre, Cuisine équipée"
              className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-night/80">
            Photos (une URL par ligne)
            <textarea
              rows={4}
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder={"https://…jpg\nhttps://…jpg"}
              className="focus-ring mt-1.5 w-full rounded-lg border border-night/20 bg-sand px-3 py-2 font-mono text-sm"
            />
          </label>

          <label className="mt-5 flex items-center gap-2 text-sm font-medium text-night/80">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Mettre en avant sur la page d'accueil
          </label>

          {error && <p className="mt-4 text-sm text-clayDeep">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="focus-ring rounded-full bg-night px-6 py-2.5 text-sm font-medium text-ivory hover:bg-nightSoft disabled:opacity-60"
            >
              {saving ? "Enregistrement…" : editingId ? "Mettre à jour" : "Ajouter le logement"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="focus-ring rounded-full border border-night/20 px-6 py-2.5 text-sm text-night"
              >
                Annuler
              </button>
            )}
          </div>
        </form>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-night">
            Logements publiés
          </h2>

          {loading ? (
            <p className="mt-4 text-night/50">Chargement…</p>
          ) : apartments.length === 0 ? (
            <p className="mt-4 text-night/50">Aucun logement pour le moment.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {apartments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-ivory p-4 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-night">{apt.name}</p>
                    <p className="text-sm text-night/60">
                      {apt.price_per_night.toLocaleString("fr-FR")} {apt.currency} /
                      nuit · {apt.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(apt)}
                      className="focus-ring rounded-full border border-night/20 px-4 py-1.5 text-sm hover:border-night/50"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="focus-ring rounded-full border border-clay/40 px-4 py-1.5 text-sm text-clayDeep hover:border-clay"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
