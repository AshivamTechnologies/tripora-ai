'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Download, DollarSign, PieChart as PieIcon, Trash2, Users, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { getTripDetail, TripDetail } from '@/lib/trips';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#315B46', '#8CA68D', '#C5A46A', '#202820', '#6366f1', '#ec4899'];

export default function TripBudgetPage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [budgetOverview, setBudgetOverview] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New expense form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [amountStr, setAmountStr] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadData();
  }, [params.tripId]);

  async function loadData() {
    try {
      const [tData, bData, eData] = await Promise.all([
        getTripDetail(params.tripId),
        api.request(`/trips/${params.tripId}/budget`).catch(() => null),
        api.request(`/trips/${params.tripId}/budget/expenses`).catch(() => []),
      ]);
      setTrip(tData);
      setBudgetOverview(bData);
      setExpenses(eData || []);
    } catch (err) {
      console.warn('Budget load error:', err);
    }
  }

  async function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    const amountMinor = Math.round(parseFloat(amountStr || '0') * 100);
    if (!title || amountMinor <= 0) return;

    try {
      await api.request(`/trips/${params.tripId}/budget/expenses`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          category,
          amountMinor,
          notes,
        }),
      });
      setTitle('');
      setAmountStr('');
      setNotes('');
      setShowAddModal(false);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Could not save expense');
    }
  }

  async function handleDeleteExpense(id: string) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try {
      await api.request(`/trips/${params.tripId}/budget/expenses/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err: any) {
      alert(err.message || 'Could not delete expense');
    }
  }

  function exportCSV() {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }
    const headers = ['Date', 'Title', 'Category', 'Payer', 'Amount', 'Currency', 'Notes'];
    const rows = expenses.map((e) => [
      e.expenseDate || '',
      `"${e.title.replace(/"/g, '""')}"`,
      e.category,
      `"${(e.payerName || '').replace(/"/g, '""')}"`,
      (e.amountMinor / 100).toFixed(2),
      e.currency,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${trip?.destination || 'trip'}-expenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const totalBudgetUSD = (trip?.budget_minor || 0) / 100;
  const totalSpentUSD = expenses.reduce((sum, e) => sum + e.amountMinor / 100, 0);
  const remainingUSD = totalBudgetUSD - totalSpentUSD;
  const isOver = totalSpentUSD > totalBudgetUSD;

  // Chart data
  const chartData = [
    { name: 'Accommodation', value: expenses.filter((e) => e.category === 'ACCOMMODATION').reduce((s, e) => s + e.amountMinor / 100, 0) },
    { name: 'Flights & Transit', value: expenses.filter((e) => e.category === 'FLIGHT' || e.category === 'TRANSPORT').reduce((s, e) => s + e.amountMinor / 100, 0) },
    { name: 'Food & Dining', value: expenses.filter((e) => e.category === 'FOOD').reduce((s, e) => s + e.amountMinor / 100, 0) },
    { name: 'Activities', value: expenses.filter((e) => e.category === 'ACTIVITY').reduce((s, e) => s + e.amountMinor / 100, 0) },
    { name: 'Other', value: expenses.filter((e) => e.category === 'MISCELLANEOUS').reduce((s, e) => s + e.amountMinor / 100, 0) },
  ].filter((d) => d.value > 0);

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
              {trip?.destination || 'Trip'} Budget & Expenses
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Track allocated funds, log group spending, and balance splits.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-4 py-2 text-xs font-semibold text-brand-ink shadow-sm transition-colors hover:bg-brand-mist"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#274a39]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Expense
            </button>
          </div>
        </div>

        {/* Budget Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Total Budget</span>
            <p className="mt-2 font-serif text-3xl text-brand-ink">${Math.round(totalBudgetUSD).toLocaleString()}</p>
            <p className="mt-1 text-xs text-brand-muted">Allocated for {trip?.adults || 2} traveler(s)</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Actual Spent</span>
            <p className="mt-2 font-serif text-3xl text-brand-ink">${Math.round(totalSpentUSD).toLocaleString()}</p>
            <p className="mt-1 text-xs text-brand-muted">{expenses.length} logged expense(s)</p>
          </div>

          <div className={`rounded-3xl border p-6 shadow-sm ${isOver ? 'border-red-200 bg-red-50/50' : 'border-brand-line bg-white'}`}>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Remaining Balance</span>
            <p className={`mt-2 font-serif text-3xl ${isOver ? 'text-red-700' : 'text-brand-forest'}`}>
              ${Math.round(Math.abs(remainingUSD)).toLocaleString()}
              {isOver && <span className="text-sm font-sans font-medium text-red-600 ml-1">over budget</span>}
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              {totalBudgetUSD > 0 ? `${Math.round((totalSpentUSD / totalBudgetUSD) * 100)}% budget utilized` : 'Flexible budget'}
            </p>
          </div>
        </div>

        {/* Chart & Spending Distribution */}
        {chartData.length > 0 && (
          <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl text-brand-ink">Category Breakdown</h2>
            <div className="mt-4 flex flex-col items-center justify-between gap-8 sm:flex-row">
              <div className="h-56 w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`$${value}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full space-y-3 sm:w-1/2">
                {chartData.map((d, idx) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="font-medium text-brand-ink">{d.name}</span>
                    </div>
                    <span className="font-semibold text-brand-ink">${Math.round(d.value).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expenses List */}
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-brand-ink">Logged Expenses</h2>
          <div className="mt-4 space-y-3">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between rounded-2xl border border-brand-line bg-white p-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-mist px-2.5 py-0.5 text-[11px] font-semibold text-brand-forest">
                      {exp.category}
                    </span>
                    <h3 className="font-serif text-base text-brand-ink">{exp.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-brand-muted">
                    Paid by {exp.payerName || 'You'} &bull; {exp.expenseDate}
                    {exp.notes && ` &bull; ${exp.notes}`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-serif text-lg font-bold text-brand-ink">
                    ${(exp.amountMinor / 100).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="text-brand-muted hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
              <h3 className="font-serif text-2xl text-brand-ink">Add New Expense</h3>
              <form onSubmit={handleAddExpense} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-brand-muted">Expense Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Traditional Lunch or Train Tickets"
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Amount ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amountStr}
                      onChange={(e) => setAmountStr(e.target.value)}
                      placeholder="0.00"
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    >
                      <option value="FOOD">Food & Dining</option>
                      <option value="ACCOMMODATION">Accommodation</option>
                      <option value="FLIGHT">Flight</option>
                      <option value="TRANSPORT">Local Transport</option>
                      <option value="ACTIVITY">Attraction / Activity</option>
                      <option value="MISCELLANEOUS">Miscellaneous</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-muted">Notes (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Receipt #1024, split evenly"
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-full border border-brand-line px-4 py-2 text-xs font-semibold text-brand-muted hover:bg-brand-mist"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-brand-forest px-5 py-2 text-xs font-semibold text-white hover:bg-[#274a39]"
                  >
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
