// Placeholder photography (free Unsplash License) used until real photos of
// Delali Apartment are uploaded through the admin panel. Swap any of these
// for real photos at any time — nothing else in the code needs to change.

function unsplash(id: string, params = "w=1600&q=80&auto=format&fit=crop") {
  return `https://images.unsplash.com/${id}?${params}`;
}

export const stockPhotos = {
  heroPool: unsplash("photo-1758448756167-88dc934c58e4", "w=2000&q=80&auto=format&fit=crop"),
  livingRoom: unsplash("photo-1768609239321-1cfe14893e80"),
  bedroom: unsplash("photo-1541123356219-284ebe98ae3b"),
  kitchenLounge: unsplash("photo-1737898415581-7dea57a1905b"),
};

// Generic guest avatar placeholders (randomuser.me is a standard placeholder
// avatar service). Replace with real guest photos once available.
export const guestAvatars = [
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
];
