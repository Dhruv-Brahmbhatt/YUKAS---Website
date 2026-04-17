import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function EventForm({ onSubmit, initialData = null, isLoading = false }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    category: 'Conference',
    date: '',
    venue: '',
    city: '',
    organizer: 'YUKAS',
    description: '',
    seats: 200,
    filled: 0,
    bannerUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=1200',
    featured: false,
    roles: ['Participant', 'OC', 'EB'],
    committees: []
  });

  const [newCommittee, setNewCommittee] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

  const addCommittee = () => {
    if (!newCommittee.trim()) return;
    setFormData(prev => ({
      ...prev,
      committees: [...prev.committees, newCommittee.trim()]
    }));
    setNewCommittee('');
  };

  const removeCommittee = (idx) => {
    setFormData(prev => ({
      ...prev,
      committees: prev.committees.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="title"
          label="Event Title"
          required
          placeholder="e.g. Mumbai Youth Summit 2026"
          value={formData.title}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase tracking-[0.1em] text-navy-800 mb-2.5 ml-1">Category</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-cream-50 border border-cream-200 rounded-2xl py-4 px-5 text-base text-navy-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-medium"
          >
            <option>Conference</option>
            <option>Workshop</option>
            <option>Summit</option>
            <option>MUN</option>
            <option>Tech Event</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          id="date"
          type="date"
          label="Date"
          required
          value={formData.date}
          onChange={handleChange}
        />
        <Input
          id="venue"
          label="Venue"
          required
          placeholder="e.g. IIT Bombay Auditorium"
          value={formData.venue}
          onChange={handleChange}
        />
        <Input
          id="city"
          label="City"
          required
          placeholder="e.g. Mumbai"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <Input
        id="description"
        type="textarea"
        label="Event Description"
        required
        placeholder="Provide a detailed description of the event..."
        value={formData.description}
        onChange={handleChange}
        rows={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-cream-50 rounded-3xl border border-cream-200">
        <div>
          <label className="text-xs font-bold uppercase tracking-[0.1em] text-navy-800 mb-4 block">Available Roles</label>
          <div className="flex flex-wrap gap-3">
            {['Participant', 'OC', 'EB'].map(role => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleToggle(role)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  formData.roles.includes(role)
                    ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-md'
                    : 'bg-white text-slate-400 border-cream-200 hover:border-gold-300'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold uppercase tracking-[0.1em] text-navy-800">Committees / Agendas</label>
            <span className="text-[10px] font-bold text-gold-600 block bg-gold-500/10 px-2 py-0.5 rounded uppercase">Optional</span>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="e.g. UNHRC, ECOFIN"
              value={newCommittee}
              onChange={(e) => setNewCommittee(e.target.value)}
              className="flex-1 bg-white border border-cream-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-gold-500"
            />
            <button
              type="button"
              onClick={addCommittee}
              className="px-4 py-2 bg-gold-500 text-navy-900 rounded-xl font-bold text-xs"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.committees.map((com, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-cream-200 rounded-lg text-xs font-medium text-navy-800">
                {com}
                <button type="button" onClick={() => removeCommittee(i)} className="text-slate-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="seats"
          type="number"
          label="Total Seats"
          required
          value={formData.seats}
          onChange={handleChange}
        />
        <Input
          id="bannerUrl"
          label="Banner Image URL"
          placeholder="https://..."
          value={formData.bannerUrl}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-white border border-cream-200 rounded-2xl">
        <input
          id="featured"
          type="checkbox"
          checked={formData.featured}
          onChange={handleChange}
          className="w-5 h-5 accent-gold-500 rounded border-cream-300"
        />
        <label htmlFor="featured" className="text-sm font-bold text-navy-900 font-mono">
          Featured Event (Shows prominently on Home)
        </label>
      </div>

      <div className="pt-8 border-t border-cream-200 flex justify-end">
        <Button
          type="submit"
          variant="gold"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
}
