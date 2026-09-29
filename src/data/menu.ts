export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'main' | 'pizza-pasta' | 'desserts' | 'beverages';
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  badge?: string;
}

export const menuItems: MenuItem[] = [
  // ── STARTERS ──────────────────────────────────────
  {
    id: 's1',
    name: 'Garlic Bread',
    description: 'Toasted ciabatta with herb butter, roasted garlic and a sprinkle of parmesan.',
    price: 160,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&q=80',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 's2',
    name: 'Crispy Chicken Wings',
    description: 'Double-fried wings tossed in smoky chipotle glaze, served with ranch dip.',
    price: 280,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: 's3',
    name: 'Tomato Soup',
    description: 'Slow-cooked heirloom tomato soup with cream swirl and sourdough croutons.',
    price: 160,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
    isVeg: true,
  },
  {
    id: 's4',
    name: 'Caesar Salad',
    description: 'Romaine hearts, parmesan shavings, house-made dressing and anchovy croutons.',
    price: 220,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80',
    isVeg: false,
  },
  {
    id: 's5',
    name: 'Paneer Tikka',
    description: 'Chargrilled cottage cheese marinated in tandoori spices, served with mint chutney.',
    price: 240,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80',
    isVeg: true,
    isFeatured: true,
  },

  // ── MAIN COURSE ───────────────────────────────────
  {
    id: 'm1',
    name: 'Butter Chicken',
    description: 'Slow-cooked chicken in a rich, velvety tomato-cream sauce. A timeless classic.',
    price: 380,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    isVeg: false,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'm2',
    name: 'Dal Makhani',
    description: 'Black lentils slow-simmered overnight in butter and cream. A vegetarian showstopper.',
    price: 280,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'm3',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon fillet with lemon-dill beurre blanc, asparagus and herb risotto.',
    price: 520,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    isVeg: false,
    badge: 'Chef Special',
  },
  {
    id: 'm4',
    name: 'Mushroom Risotto',
    description: 'Arborio rice with wild mushrooms, truffle oil, and aged parmesan.',
    price: 320,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    isVeg: true,
  },
  {
    id: 'm5',
    name: 'Lamb Rogan Josh',
    description: 'Slow-braised Kashmiri lamb with whole spices, saffron and caramelized onions.',
    price: 450,
    category: 'main',
    image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80',
    isVeg: false,
    badge: 'Chef Special',
  },

  // ── PIZZA & PASTA ─────────────────────────────────
  {
    id: 'p1',
    name: 'Margherita Pizza',
    description: 'Hand-stretched dough, San Marzano tomato, fresh mozzarella and torn basil.',
    price: 350,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    isVeg: true,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Wood-Fired Margherita',
    description: 'Blistered thin crust from our wood-fired oven. Simple, perfect, unforgettable.',
    price: 420,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
    isVeg: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Farmhouse Pizza',
    description: 'Loaded with capsicum, onions, olives, jalapeños and smoked mozzarella.',
    price: 420,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    isVeg: true,
  },
  {
    id: 'p4',
    name: 'Truffle Mushroom Pasta',
    description: 'Tagliatelle tossed with wild mushrooms, truffle cream and shaved parmesan.',
    price: 420,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    isVeg: true,
    isFeatured: true,
  },
  {
    id: 'p5',
    name: 'Penne Arrabbiata',
    description: 'Penne in a fierce, slow-cooked tomato and chilli sauce. Bold and satisfying.',
    price: 320,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&q=80',
    isVeg: true,
    isFeatured: true,
  },
  {
    id: 'p6',
    name: 'Alfredo Pasta',
    description: 'Fettuccine in house-made Alfredo cream, butter and a shower of parmesan.',
    price: 360,
    category: 'pizza-pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&q=80',
    isVeg: true,
  },

  // ── DESSERTS ──────────────────────────────────────
  {
    id: 'd1',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark-chocolate cake with a molten centre, served with vanilla bean ice cream.',
    price: 280,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    isVeg: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'd2',
    name: 'Tiramisu',
    description: 'Classic Italian mascarpone dessert layered with espresso-soaked savoiardi.',
    price: 260,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'd3',
    name: 'Gulab Jamun',
    description: 'Soft khoya dumplings soaked in rose-cardamom syrup. A warm hug in a bowl.',
    price: 180,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    isVeg: true,
  },

  // ── BEVERAGES ─────────────────────────────────────
  {
    id: 'b1',
    name: 'Fresh Lime Soda',
    description: 'Freshly squeezed lime with sparkling water. Sweet, salted or classic.',
    price: 100,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    isVeg: true,
  },
  {
    id: 'b2',
    name: 'Mango Lassi',
    description: 'Thick, creamy Alphonso mango blended with chilled yoghurt and a pinch of cardamom.',
    price: 160,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'b3',
    name: 'Cold Brew Coffee',
    description: 'Smooth 18-hour cold brew, lightly sweetened and poured over ice.',
    price: 180,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    isVeg: true,
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'main', label: 'Main Course' },
  { id: 'pizza-pasta', label: 'Pizza & Pasta' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
] as const;

export type CategoryId = typeof categories[number]['id'];
