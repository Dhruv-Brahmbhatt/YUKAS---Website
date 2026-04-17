import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { submitApplication } from '../../services/applicationsService';
import { sendEmailNotification } from '../../services/emailService';
import toast from 'react-hot-toast';
import { FiInfo, FiCheckCircle } from 'react-icons/fi';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../services/firebase';

export default function RegistrationForm({ event, user, role, committee, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    college: '',
    department: '',
    experience: '',
    sop: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const applicationPayload = {
        eventId: event.id,
        eventTitle: event.title,
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        role: role,
        committee: committee || null,
        details: formData
      };

      await submitApplication(applicationPayload);
      
      if (analytics) {
        logEvent(analytics, 'generate_lead', {
          event_title: event.title,
          role: role,
          method: 'RegistrationForm'
        });
      }

      toast.success('Registration successful! Confirmation email sent.');
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      <div className="p-6 bg-gold-500/10 border border-gold-500/20 rounded-2xl flex items-start gap-4">
        <FiInfo size={20} className="text-gold-600 mt-1 shrink-0" />
        <div className="space-y-1">
          <p className="text-sm text-navy-900 font-bold font-mono tracking-tight">
            Registering for: <span className="text-gold-600 underline underline-offset-4 decoration-gold-500/30">{event.title}</span>
          </p>
          <p className="text-xs text-slate-500 font-medium">Role: <span className="text-navy-800 font-bold">{role}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          required
          placeholder="+91 00000 00000"
          value={formData.phone}
          onChange={handleChange}
        />
        
        <Input
          id="college"
          type="text"
          label="College / University"
          required
          placeholder="Enter your institution name"
          value={formData.college}
          onChange={handleChange}
        />
      </div>

      {role === 'OC' && (
        <div className="space-y-6 animate-fade-in">
          <Input
            id="department"
            type="text"
            label="Preferred Department"
            required
            placeholder="e.g. Logistics, Tech, Marketing"
            value={formData.department}
            onChange={handleChange}
          />
          <Input
            id="experience"
            type="textarea"
            label="Previous Experience"
            placeholder="Describe your previous organizing experience in detail..."
            value={formData.experience}
            onChange={handleChange}
            rows={4}
          />
        </div>
      )}

      {role === 'EB' && (
        <div className="space-y-6 animate-fade-in">
          <Input
            id="experience"
            type="textarea"
            label="MUN / Professional Experience"
            required
            placeholder="List your previous Executive Board or delegate experience..."
            value={formData.experience}
            onChange={handleChange}
            rows={4}
          />
          <Input
            id="sop"
            type="textarea"
            label="Statement of Purpose (SOP)"
            required
            placeholder="Why should we select you for the Executive Board?"
            value={formData.sop}
            onChange={handleChange}
            rows={5}
          />
          <div className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl border border-cream-200">
            <FiInfo className="text-slate-400 shrink-0" size={16} />
            <p className="text-xs text-slate-500 font-medium italic">
              PDF Resume upload is currently disabled in this preview version.
            </p>
          </div>
        </div>
      )}

      <div className="pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-emerald-600">
          <FiCheckCircle size={18} />
          <span className="text-xs font-bold uppercase tracking-widest font-mono">Secure Submission</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-10 py-4 text-base font-bold text-navy-900 bg-gradient-to-br from-gold-300 to-gold-500 rounded-2xl shadow-xl shadow-gold-500/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wide"
        >
          {loading ? 'Submitting Application...' : 'Confirm Registration'}
        </button>
      </div>
    </form>
  );
}
