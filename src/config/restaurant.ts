// Central restaurant configuration
// Update these values to match the real restaurant's details

export const RESTAURANT_CONFIG = {
  name: 'The Urban Plate',
  tagline: 'Good Food. Great Company.',
  description: 'Fresh ingredients. Authentic flavors. Something for everyone.',
  // Placeholder phone — replace with actual restaurant WhatsApp number
  whatsappPhone: '919999999999', // Format: country code + number, no + or spaces
  address: '42, Sector 17, Chandigarh, India (Demo Address)',
  city: 'Chandigarh',
  email: 'hello@theurbanplate.com (Demo)',
  openingHours: {
    weekdays: '11:00 AM – 11:00 PM',
    weekends: '11:00 AM – 11:30 PM',
    display: 'Open Daily: 11:00 AM – 11:00 PM',
  },
  social: {
    instagram: '#',
    facebook: '#',
    twitter: '#',
    youtube: '#',
  },
  mapEmbedQuery: 'Chandigarh+India',
} as const;

export type RestaurantConfig = typeof RESTAURANT_CONFIG;
