import { useState } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import type { MenuItem } from '../data/menu';
import { useCart } from '../context/CartContext';

interface DishCardProps {
  item: MenuItem;
}

export default function DishCard({ item }: DishCardProps) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const existingInCart = items.find(i => i.id === item.id);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80';

  return (
    <div className="group bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(29,33,30,0.06)] hover:shadow-xl transition-all duration-300 border border-[#D6CCC2] hover:border-[#C76B3C]/50 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#FAF7F2]">
          <img
            src={imgError ? fallbackImage : item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Badges / Dietary Indicator */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            {/* Veg / Non-Veg Icon */}
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center bg-white/90 backdrop-blur-xs ${
                item.isVeg ? 'border-green-600' : 'border-red-600'
              }`}
              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              aria-label={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}
              />
            </div>

            {item.isBestseller && (
              <span className="bg-[#C76B3C] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                Bestseller
              </span>
            )}
            {item.badge && (
              <span className="bg-[#1D211E] text-white text-[11px] font-medium px-2 py-0.5 rounded-full shadow-xs">
                {item.badge}
              </span>
            )}
          </div>

          {/* Star rating mock */}
          <div className="absolute bottom-3 left-3 bg-[#1D211E]/75 backdrop-blur-xs text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>4.9</span>
          </div>
        </div>

        {/* Dish Info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold text-[#1D211E] group-hover:text-[#C76B3C] transition-colors leading-snug">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-[#77766F] leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="flex items-center justify-between pt-3 border-t border-[#ECE3D8]">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#77766F] font-medium capitalize">
            {item.category.replace('-', ' & ')}
          </span>
          <span className="font-serif text-lg font-bold text-[#1D211E] flex items-center">
            <span className="text-sm font-semibold mr-0.5">₹</span>{item.price}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
            added
              ? 'bg-green-600 text-white scale-95'
              : existingInCart
              ? 'bg-[#1D211E] text-white hover:bg-[#C76B3C]'
              : 'bg-[#FAF7F2] text-[#1D211E] hover:bg-[#C76B3C] hover:text-white border border-[#D0C4B4]'
          }`}
          aria-label={`Add ${item.name} to cart`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{existingInCart ? `In Cart (${existingInCart.quantity})` : 'Add'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
