import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Utensils, Sparkles } from 'lucide-react';
import { menuItems, categories, type CategoryId } from '../data/menu';
import DishCard from '../components/DishCard';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as CategoryId | null;

  const activeCategory: CategoryId =
    categoryParam && categories.some(c => c.id === categoryParam) ? categoryParam : 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const handleCategoryChange = (catId: CategoryId) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Dietary filter
      const matchesDiet =
        vegFilter === 'all'
          ? true
          : vegFilter === 'veg'
          ? item.isVeg
          : !item.isVeg;

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [activeCategory, vegFilter, searchQuery]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setVegFilter('all');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#C76B3C] font-semibold text-xs uppercase tracking-widest block mb-2">
            The Urban Plate Kitchen
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D211E]">
            Our Menu
          </h1>
          <p className="text-[#77766F] text-sm sm:text-base mt-3">
            Fresh ingredients. Authentic flavors. Something for everyone.
          </p>
        </div>

        {/* Filter bar: Search + Dietary toggle */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#D6CCC2] shadow-[0_4px_20px_rgba(29,33,30,0.06)] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#77766F] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for dishes, flavors, ingredients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2] rounded-full pl-10 pr-10 py-2.5 text-sm text-[#1D211E] placeholder-[#77766F] focus:outline-none focus:ring-2 focus:ring-[#C76B3C] border border-[#E2D8CC] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#77766F] hover:text-[#1D211E] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filters (Veg / Non-Veg) - Centered on mobile */}
          <div className="flex items-center justify-center gap-3 w-full md:w-auto md:justify-end">
            <button
              onClick={() => setVegFilter(vegFilter === 'veg' ? 'all' : 'veg')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                vegFilter === 'veg'
                  ? 'bg-green-700 text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#252823] hover:bg-[#eee8dc] border border-[#D6CCC2]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setVegFilter(vegFilter === 'non-veg' ? 'all' : 'non-veg')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                vegFilter === 'non-veg'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#252823] hover:bg-[#eee8dc] border border-[#D6CCC2]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Non-Veg Only</span>
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#C76B3C] text-white shadow-md'
                    : 'bg-white text-[#252823] hover:bg-[#ECE6DE] border border-[#D6CCC2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-[#77766F] mb-6 px-1">
          <span>Showing {filteredItems.length} dishes</span>
          {(searchQuery || vegFilter !== 'all' || activeCategory !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="text-[#C76B3C] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-[#ECE6DE] shadow-xs my-8">
            <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-4 text-[#77766F]">
              <Utensils className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1D211E] mb-2">
              No matching dishes found
            </h3>
            <p className="text-[#77766F] text-xs leading-relaxed mb-6">
              We couldn’t find any dish matching your search and dietary filter. Try refining your keywords or clearing the filter.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 bg-[#C76B3C] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#b5602f] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Show All Dishes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
