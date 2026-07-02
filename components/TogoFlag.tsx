export default function TogoFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      role="img"
      aria-label="Drapeau du Togo"
    >
      <rect width="30" height="20" fill="#FBF8F1" />
      <rect y="0" width="30" height="4" fill="#2E6B44" />
      <rect y="4" width="30" height="4" fill="#FFCE00" />
      <rect y="8" width="30" height="4" fill="#2E6B44" />
      <rect y="12" width="30" height="4" fill="#FFCE00" />
      <rect y="16" width="30" height="4" fill="#2E6B44" />
      <rect x="0" y="0" width="12" height="12" fill="#D21034" />
      <path
        fill="#FBF8F1"
        d="M6 3.2l0.85 2.6h2.75l-2.22 1.6 0.85 2.6L6 8.4 3.77 10l0.85-2.6L2.4 5.8h2.75z"
      />
    </svg>
  );
}
