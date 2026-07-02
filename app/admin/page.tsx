"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-night px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-ivory p-8 shadow-card"
      >
        <p className="eyebrow text-clayDeep">Espace admin</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-night">
          Delali Apartment
        </h1>
        <p className="mt-2 text-sm text-night/60">
          Connectez-vous pour gérer les logements.
        </p>

        <label className="mt-6 block text-sm font-medium text-night/80">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="focus-ring mt-2 w-full rounded-lg border border-night/20 bg-sand px-4 py-2.5 text-night"
          />
        </label>

        {error && <p className="mt-3 text-sm text-clayDeep">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 w-full rounded-full bg-night px-6 py-3 text-sm font-medium text-ivory transition hover:bg-nightSoft disabled:opacity-60"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
