export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'food' | 'ambience' | 'events' | 'kitchen';
  span?: 'tall' | 'wide' | 'normal';
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Elegantly plated pasta dish at The Urban Plate',
    category: 'food',
    span: 'tall',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    alt: 'Warm, candlelit dining room ambience',
    category: 'ambience',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    alt: 'Decadent gourmet culinary creation',
    category: 'food',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    alt: 'Bar area with craft cocktails',
    category: 'ambience',
    span: 'wide',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Beautifully arranged platter of food',
    category: 'food',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
    alt: 'Head chef plating a dish in the kitchen',
    category: 'kitchen',
    span: 'tall',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    alt: 'Wood-fired pizza fresh from the oven',
    category: 'food',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80',
    alt: 'Private dining setup for a special event',
    category: 'events',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
    alt: 'Friends celebrating over dinner',
    category: 'events',
    span: 'wide',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    alt: 'Molten chocolate dessert up close',
    category: 'food',
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    alt: 'Outdoor terrace dining at sunset',
    category: 'ambience',
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    alt: 'Chef at work in the open kitchen',
    category: 'kitchen',
  },
  {
    id: 'g13',
    src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    alt: 'Classic Tiramisu dessert',
    category: 'food',
  },
  {
    id: 'g14',
    src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
    alt: 'Restaurant interior with warm lighting',
    category: 'ambience',
  },
];

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'ambience', label: 'Ambience' },
  { id: 'events', label: 'Events' },
  { id: 'kitchen', label: 'Kitchen' },
] as const;
