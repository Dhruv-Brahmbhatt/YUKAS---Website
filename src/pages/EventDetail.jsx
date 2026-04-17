import { useParams, Link, useNavigate } from 'react-router-dom';
import { dummyEvents } from '../data/dummyEvents';
import { FiCalendar, FiMapPin, FiUsers, FiTag, FiArrowLeft, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Modal from '../components/ui/Modal';
import RegistrationForm from '../components/events/RegistrationForm';
import { useAuth } from '../context/AuthContext';
import { checkExistingRegistration } from '../services/applicationsService';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';

export default function EventDetail() {
  const { id } = useParams();
  const event = dummyEvents.find(e => e.id === id);
  
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && event) {
      checkExistingRegistration(user.uid, event.id).then(exists => {
        setRegistered(exists);
      });
      if (analytics) {
        logEvent(analytics, 'view_item', {
          item_id: event.id,
          item_name: event.title,
          category: event.category
        });
      }
    }
  }, [user, event]);

  if (!event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-cream-50">
        <h2 className="font-display text-4xl font-bold text-navy-900 mb-6">Event Not Found</h2>
        <p className="text-slate-500 mb-10 max-w-md text-lg">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold bg-white text-navy-900 border border-cream-200 rounded-full hover:border-gold-300 hover:shadow-lg transition-all">
           <FiArrowLeft size={18} /> Back to Events
        </Link>
      </div>
    );
  }

  const handleOpenRegistration = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!selectedRole) {
      alert("Please select a role first.");
      return;
    }
    if (event.committees && event.committees.length > 0 && !selectedCommittee) {
      alert("Please select a committee first.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setRegistered(true);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-32 bg-cream-50">
      {/* Banner */}
      <div className="relative h-[55vh] md:h-[65vh] w-full">
        <div className="absolute inset-0">
          <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto z-10">
          <Link to="/events" className="inline-flex items-center gap-3 text-cream-50/70 hover:text-white transition-colors mb-8 text-sm font-bold bg-white/10 border border-white/20 px-6 py-2.5 rounded-full backdrop-blur-md uppercase tracking-widest font-mono">
            <FiArrowLeft size={16} /> Back to Events
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 relative">
            <span className="px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              {event.category}
            </span>
            {event.featured && (
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-white tracking-tight leading-[1.05] drop-shadow-2xl font-display mb-4">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-16">
          
          <section className="animate-fade-in-up text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-6 flex items-center justify-center gap-3">
              <div className="w-1.5 h-8 bg-gold-500 rounded-full hidden md:block" /> About the Event
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed font-light mx-auto max-w-2xl">{event.description}</p>
          </section>

          {event.committees && event.committees.length > 0 && (
            <section className="animate-fade-in-up delay-100 text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 flex items-center justify-center gap-3">
                <div className="w-1.5 h-8 bg-gold-500 rounded-full hidden md:block" /> Committees & Agendas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {event.committees.map((com, idx) => (
                  <label key={idx} className={`p-8 text-center rounded-3xl border shadow-xl cursor-pointer transition-all duration-300 group ${selectedCommittee === com ? 'bg-gold-50 border-gold-500 shadow-gold-500/10 scale-105' : 'bg-white border-cream-200 shadow-navy-900/5 hover:-translate-y-1 hover:border-gold-300'}`}>
                    <input 
                      type="radio" 
                      name="committee" 
                      value={com} 
                      checked={selectedCommittee === com} 
                      onChange={(e) => setSelectedCommittee(e.target.value)} 
                      className="hidden" 
                    />
                    <span className={`font-mono font-bold text-lg transition-colors duration-300 ${selectedCommittee === com ? 'text-gold-600' : 'text-navy-800 group-hover:text-gold-600'}`}>
                      {com}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}

          <section className="animate-fade-in-up delay-200 p-10 md:p-12 bg-white rounded-[2rem] border border-cream-200 shadow-xl shadow-navy-900/5 relative overflow-hidden text-center mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-6 flex items-center justify-center gap-3">
              <FiUsers className="text-gold-500" /> Participate As
            </h2>
            <p className="text-slate-500 text-lg mb-10 font-light max-w-xl mx-auto">Select a role below to configure your registration process:</p>
            
            <div className="flex flex-col gap-6 relative z-10 text-left">
              {event.roles.map((role, idx) => (
                <label key={idx} className={`flex items-center gap-6 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedRole === role ? 'border-gold-500 bg-gold-50 shadow-md shadow-gold-500/10' : 'border-cream-200 hover:border-gold-300 bg-white'}`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value={role} 
                    checked={selectedRole === role} 
                    onChange={(e) => setSelectedRole(e.target.value)} 
                    className="hidden" 
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedRole === role ? 'border-gold-500' : 'border-slate-300'}`}>
                    {selectedRole === role && <div className="w-3 h-3 bg-gold-500 rounded-full animate-fade-in" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 font-mono">{role}</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      {role === 'Participant' && 'Standard delegate or attendee registration.'}
                      {role === 'OC' && 'Join the Organizing Committee and manage event operations.'}
                      {role === 'EB' && 'Apply to be an Executive Board member or speaker.'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Registration sticky card */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 p-8 md:p-10 bg-white rounded-[2rem] border border-cream-200 shadow-2xl shadow-navy-900/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-400 to-gold-600" />
            <h3 className="text-2xl font-bold text-navy-900 mb-8 font-display flex items-center gap-3 border-b border-cream-200 pb-6">
              Event Details
            </h3>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <FiCalendar size={20} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">Date</p>
                  <p className="text-navy-900 font-mono font-bold text-sm leading-snug">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <FiMapPin size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">Venue</p>
                  <p className="text-navy-900 font-bold mb-1">{event.venue}</p>
                  <p className="text-slate-500 text-sm font-light">{event.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <FiTag size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5">Organizer</p>
                  <p className="text-navy-900 font-bold">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Registration Progress */}
            <div className="mb-10 pt-8 border-t border-cream-200">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-4 text-slate-500">
                <span>Seat Availability</span>
                <span className="text-navy-900">{event.filled} / {event.seats}</span>
              </div>
              <div className="w-full h-3 bg-cream-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${event.filled >= event.seats ? 'bg-red-500' : 'bg-gradient-to-r from-gold-500 to-gold-400'}`}
                  style={{ width: `${(event.filled / event.seats) * 100}%` }}
                />
              </div>
            </div>

            {registered ? (
              <div className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold font-mono mt-4">
                <FiCheckCircle size={22} /> Application Submitted
              </div>
            ) : (
              <div className="mt-8">
                <button
                  onClick={handleOpenRegistration}
                  className="w-full inline-flex items-center justify-center gap-3 py-5 px-6 text-base font-bold text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 hover:shadow-xl disabled:hover:translate-y-0 disabled:hover:shadow-none bg-gradient-to-br from-navy-800 to-navy-900 hover:shadow-navy-900/20 font-mono tracking-wide"
                  disabled={event.filled >= event.seats}
                >
                  {event.filled >= event.seats ? 'Sold Out' : (
                     user ? 'Proceed to Register' : 'Login to Register'
                  )}
                </button>
              </div>
            )}
            
            {!user && event.filled < event.seats && (
              <p className="text-center text-sm font-light text-slate-500 mt-6 leading-relaxed">You need an account to register for events.</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Application: ${selectedRole}`}>
        <RegistrationForm event={event} user={user} role={selectedRole} committee={selectedCommittee} onSuccess={handleSuccess} />
      </Modal>

    </div>
  );
}
