const API_URL = import.meta.env.VITE_API_URL;

export async function getGallery(eventId: number) {
  const response = await fetch(`${API_URL}/api/gallery/${eventId}`);

  if (!response.ok) {
    throw new Error("Erreur chargement galerie");
  }

  return response.json();
}
