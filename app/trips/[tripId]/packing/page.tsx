'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Plus, Sparkles, Trash2, ShieldCheck, CloudSun, CheckSquare } from 'lucide-react';
import { api } from '@/lib/api';
import { getTripDetail, TripDetail } from '@/lib/trips';

const CATEGORIES = ['ALL', 'DOCUMENTS', 'CLOTHING', 'ELECTRONICS', 'HEALTH', 'TOILETRIES', 'MISCELLANEOUS'] as const;

export default function TripPackingPage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('MISCELLANEOUS');
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [params.tripId]);

  async function loadData() {
    try {
      const [tData, pData] = await Promise.all([
        getTripDetail(params.tripId),
        api.request(`/trips/${params.tripId}/packing`).catch(() => null),
      ]);
      setTrip(tData);
      setItems(pData?.items || []);
    } catch (err) {
      console.warn('Packing load error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleItem(item: any) {
    const nextState = !item.isPacked;
    setItems((curr) => curr.map((i) => (i.id === item.id ? { ...i, isPacked: nextState } : i)));
    try {
      await api.request(`/trips/${params.tripId}/packing/items/${item.id}/toggle`, {
        method: 'PATCH',
        body: JSON.stringify({ isPacked: nextState }),
      });
    } catch {}
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const res = await api.request(`/trips/${params.tripId}/packing/items`, {
        method: 'POST',
        body: JSON.stringify({ name: newItemName.trim(), category: newItemCat, quantity: 1 }),
      });
      setItems((curr) => [...curr, res]);
      setNewItemName('');
    } catch (err: any) {
      alert(err.message || 'Could not add item');
    }
  }

  async function handleDeleteItem(itemId: string) {
    setItems((curr) => curr.filter((i) => i.id !== itemId));
    try {
      await api.request(`/trips/${params.tripId}/packing/items/${itemId}`, { method: 'DELETE' });
    } catch {}
  }

  async function handleGenerateAi() {
    setGenerating(true);
    try {
      const res = await api.request(`/trips/${params.tripId}/packing/generate-ai`, { method: 'POST' });
      setItems(res?.items || []);
    } catch (err: any) {
      alert(err.message || 'AI Packing generation failed');
    } finally {
      setGenerating(false);
    }
  }

  const totalCount = items.length;
  const packedCount = items.filter((i) => i.isPacked).length;
  const progress = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const filteredItems = items.filter((i) => {
    if (selectedCategory === 'ALL') return true;
    return i.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-8">
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <Link
          href={`/trips/${params.tripId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-forest"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Trip Hub
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-brand-ink sm:text-4xl">
              Packing Checklist for {trip?.destination || 'Trip'}
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Organized by category with weather recommendations for {trip?.destination}.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateAi}
            disabled={generating}
            className="flex items-center gap-2 rounded-full bg-brand-forest px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#274a39]"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            {generating ? 'Consulting Weather Matrix...' : 'Curate Weather-Matched Packing'}
          </button>
        </div>

        {/* Progress Bar Card */}
        <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="uppercase tracking-wider text-brand-muted">Packing Readiness</span>
            <span className="text-brand-forest">{progress}% ({packedCount}/{totalCount} packed)</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-brand-mist">
            <div
              className="h-full rounded-full bg-brand-forest transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-forest text-white'
                  : 'bg-white text-brand-muted border border-brand-line hover:text-brand-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Item Form */}
        <form onSubmit={handleAddItem} className="mt-6 flex flex-col gap-3 rounded-2xl border border-brand-line bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <input
            type="text"
            required
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add an item (e.g. Travel adapter, linen shirt, sunscreen)..."
            className="flex-1 rounded-xl border border-brand-line p-2.5 text-xs focus:outline-none focus:border-brand-forest"
          />
          <select
            value={newItemCat}
            onChange={(e) => setNewItemCat(e.target.value)}
            className="rounded-xl border border-brand-line p-2.5 text-xs focus:outline-none"
          >
            <option value="CLOTHING">Clothing</option>
            <option value="DOCUMENTS">Documents</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="HEALTH">Health</option>
            <option value="TOILETRIES">Toiletries</option>
            <option value="MISCELLANEOUS">Miscellaneous</option>
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-forest px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#274a39]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </button>
        </form>

        {/* Items List */}
        <div className="mt-8 space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item)}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 shadow-sm transition-all ${
                item.isPacked
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-75'
                  : 'border-brand-line bg-white hover:border-brand-sage'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                    item.isPacked
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-brand-line bg-white'
                  }`}
                >
                  {item.isPacked && <Check className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${item.isPacked ? 'line-through text-brand-muted' : 'text-brand-ink'}`}>
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                    <span className="rounded bg-brand-mist px-1.5 py-0.5 font-semibold text-brand-forest">
                      {item.category}
                    </span>
                    {item.isWeatherDependent && (
                      <span className="flex items-center gap-0.5 text-amber-700 font-medium">
                        <CloudSun className="h-3 w-3" /> Weather-sensitive
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(item.id);
                }}
                className="text-brand-muted hover:text-red-600 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
