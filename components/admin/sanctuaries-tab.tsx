'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  Star,
  CheckCircle2,
  Sparkles,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Filter,
  DollarSign,
  X,
} from 'lucide-react';
import { Sanctuary } from '@/lib/admin-store';

interface SanctuariesTabProps {
  sanctuaries: Sanctuary[];
  onAddSanctuary: (s: Omit<Sanctuary, 'id'>) => void;
  onUpdateSanctuary: (id: string, updates: Partial<Sanctuary>) => void;
  onDeleteSanctuary: (id: string) => void;
}

export function SanctuariesTab({
  sanctuaries,
  onAddSanctuary,
  onUpdateSanctuary,
  onDeleteSanctuary,
}: SanctuariesTabProps) {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingSanctuary, setEditingSanctuary] = useState<Sanctuary | null>(null);

  // Form states for Add
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState<Sanctuary['brand']>('Aman');
  const [newLocation, setNewLocation] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newType, setNewType] = useState<Sanctuary['propertyType']>('PRIVATE_SANCTUARY');
  const [newPrice, setNewPrice] = useState(2500);
  const [newScore, setNewScore] = useState(9.8);
  const [newAmenities, setNewAmenities] = useState('Private Onsen, Dedicated Butler, Helipad Access, Michelin Dining');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200');
  const [newBadge, setNewBadge] = useState('Private Reserve');
  const [newSuites, setNewSuites] = useState(4);

  // Filtered list
  const filtered = sanctuaries.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brandFilter === 'ALL' || s.brand === brandFilter;
    const matchesType = typeFilter === 'ALL' || s.propertyType === typeFilter;
    return matchesSearch && matchesBrand && matchesType;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newLocation.trim()) return;

    onAddSanctuary({
      name: newName.trim(),
      brand: newBrand,
      location: newLocation.trim(),
      country: newCountry.trim() || 'Global',
      propertyType: newType,
      pricePerNightUsd: Number(newPrice) || 2000,
      starRating: 5,
      reviewScore: Number(newScore) || 9.8,
      curatedAmenities: newAmenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      imageUrl: newImageUrl.trim(),
      exclusivityBadge: newBadge,
      availableSuites: Number(newSuites) || 3,
      status: 'ACTIVE',
    });

    setIsAddOpen(false);
    // Reset form
    setNewName('');
    setNewLocation('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSanctuary) return;
    onUpdateSanctuary(editingSanctuary.id, {
      pricePerNightUsd: editingSanctuary.pricePerNightUsd,
      availableSuites: editingSanctuary.availableSuites,
      status: editingSanctuary.status,
      exclusivityBadge: editingSanctuary.exclusivityBadge,
    });
    setEditingSanctuary(null);
  };

  return (
    <div className="space-y-6">
      {/* Search, Filter & Add Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">Curated Sanctuaries & Estate Portfolio</h2>
          <p className="mt-1 text-xs text-white/60">
            Exclusive partner properties across Aman, Belmond, Ritz-Carlton Reserve & private villas.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-4 py-2 text-xs font-bold text-brand-ink shadow-md hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Curate New Sanctuary</span>
        </button>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1510] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search sanctuary by name, city, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>

        {/* Brand Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'Aman', 'Belmond', 'Ritz-Carlton Reserve', 'Independent Reserve'].map((brand) => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                brandFilter === brand
                  ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Luxury Sanctuary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0D1510] transition-all hover:border-[#C5A46A]/50 hover:shadow-2xl hover:shadow-[#C5A46A]/10"
          >
            {/* Image Banner */}
            <div className="relative h-52 w-full overflow-hidden bg-black/40">
              <img
                src={s.imageUrl}
                alt={s.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1510] via-transparent to-black/40" />

              {/* Exclusivity Badge */}
              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-[#0A120D]/80 backdrop-blur-md border border-[#C5A46A]/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                  {s.exclusivityBadge}
                </span>
              </div>

              {/* Review Score & Star */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[#0A120D]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10">
                <Star className="h-3.5 w-3.5 fill-[#F5D794] text-[#F5D794]" />
                <span>{s.reviewScore}</span>
              </div>

              {/* Location Tag */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90">
                <MapPin className="h-3.5 w-3.5 text-[#F5D794]" />
                <span className="font-light">{s.location}, {s.country}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#F5D794] transition-colors">
                  {s.name}
                </h3>
              </div>

              {/* Amenities Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.curatedAmenities.slice(0, 3).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/70"
                  >
                    {amenity}
                  </span>
                ))}
                {s.curatedAmenities.length > 3 && (
                  <span className="rounded-md border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[10px] text-[#F5D794]">
                    +{s.curatedAmenities.length - 3} more
                  </span>
                )}
              </div>

              {/* Footer Details: Rate & Actions */}
              <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-white/40">Nightly Curated Rate</span>
                  <p className="font-serif text-xl font-semibold text-white">
                    ${s.pricePerNightUsd.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-white/50 font-sans">/ night</span>
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingSanctuary(s)}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    title="Edit Rate & Exclusivity"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${s.name} from the curated portfolio?`)) {
                        onDeleteSanctuary(s.id);
                      }
                    }}
                    className="rounded-full border border-white/10 bg-white/5 p-2 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
                    title="Remove Sanctuary"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-12 text-center">
          <Building2 className="mx-auto h-8 w-8 text-white/30" />
          <h3 className="mt-3 font-serif text-lg text-white">No Sanctuaries Match Filter</h3>
          <p className="mt-1 text-xs text-white/50">Try broadening your search or resetting brand filters.</p>
        </div>
      )}

      {/* Add Sanctuary Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#F5D794]" />
                <h3 className="font-serif text-xl text-white">Curate New Luxury Sanctuary</h3>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-white/80">Sanctuary Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amanzoe Cliffside Villa"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-white/80">Brand Affiliation</label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#16221A] px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                  >
                    <option value="Aman">Aman</option>
                    <option value="Belmond">Belmond</option>
                    <option value="Ritz-Carlton Reserve">Ritz-Carlton Reserve</option>
                    <option value="Four Seasons Private Retreat">Four Seasons Private Retreat</option>
                    <option value="Independent Reserve">Independent Reserve</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-white/80">Property Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-[#16221A] px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                  >
                    <option value="PRIVATE_SANCTUARY">Private Sanctuary</option>
                    <option value="HERITAGE_ESTATE">Heritage Estate</option>
                    <option value="ALPINE_CHALET">Alpine Chalet</option>
                    <option value="OVERWATER_VILLA">Overwater Villa</option>
                    <option value="SAFARI_LODGE">Safari Lodge</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-white/80">Location (City / Area)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porto Heli"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-white/80">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Greece"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-white/80">Nightly Rate (USD)</label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-white/80">Review Score (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={newScore}
                    onChange={(e) => setNewScore(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-white/80">Available Suites</label>
                  <input
                    type="number"
                    min="1"
                    value={newSuites}
                    onChange={(e) => setNewSuites(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-white/80">Curated Amenities (comma separated)</label>
                <input
                  type="text"
                  value={newAmenities}
                  onChange={(e) => setNewAmenities(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">High-Res Image URL</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-full border border-white/15 px-4 py-2 font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-5 py-2 font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all"
                >
                  Save & Publish to Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Edit Rate / Exclusivity Modal */}
      {editingSanctuary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-lg text-white">Edit Sanctuary Parameters</h3>
                <p className="text-xs text-[#F5D794]">{editingSanctuary.name}</p>
              </div>
              <button
                onClick={() => setEditingSanctuary(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-white/80">Nightly Rate (USD)</label>
                <input
                  type="number"
                  required
                  value={editingSanctuary.pricePerNightUsd}
                  onChange={(e) =>
                    setEditingSanctuary({
                      ...editingSanctuary,
                      pricePerNightUsd: Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Available Suites</label>
                <input
                  type="number"
                  min="0"
                  value={editingSanctuary.availableSuites}
                  onChange={(e) =>
                    setEditingSanctuary({
                      ...editingSanctuary,
                      availableSuites: Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Exclusivity Badge</label>
                <input
                  type="text"
                  value={editingSanctuary.exclusivityBadge}
                  onChange={(e) =>
                    setEditingSanctuary({
                      ...editingSanctuary,
                      exclusivityBadge: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-white/80">Operational Status</label>
                <select
                  value={editingSanctuary.status}
                  onChange={(e) =>
                    setEditingSanctuary({
                      ...editingSanctuary,
                      status: e.target.value as any,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#16221A] px-3 py-2 text-white focus:border-[#C5A46A] focus:outline-none"
                >
                  <option value="ACTIVE">ACTIVE (Accepting VIP Bookings)</option>
                  <option value="SEASONAL_PAUSE">SEASONAL_PAUSE</option>
                  <option value="FULLY_BOOKED">FULLY_BOOKED</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingSanctuary(null)}
                  className="rounded-full border border-white/15 px-4 py-2 font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-5 py-2 font-bold text-[#0A120D] shadow-md hover:scale-105 transition-all"
                >
                  Update Sanctuary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
