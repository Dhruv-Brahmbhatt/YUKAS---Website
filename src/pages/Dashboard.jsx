import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiLogOut, FiUser, FiCalendar, FiSettings,
  FiTrash2, FiAlertCircle, FiArrowRight, FiCheckCircle, FiClock, FiShield, FiPlus, FiDatabase
} from 'react-icons/fi';
import { getUserApplications, deleteApplication, getAllApplications, updateApplicationStatus } from '../services/applicationsService';
import { subscribeToEvents, createEvent, deleteEvent } from '../services/eventsService';
import { dummyEvents } from '../data/dummyEvents';
import usePageTitle from '../hooks/usePageTitle';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import EventForm from '../components/events/EventForm';

export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, userProfile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [adminApps, setAdminApps]       = useState([]);
  const [allEvents, setAllEvents]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeTab, setActiveTab]       = useState('my-registrations');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSeeding, setIsSeeding]       = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchData();
  }, [user, navigate]);

  useEffect(() => {
    if (isAdmin) {
      const unsub = subscribeToEvents(events => setAllEvents(events));
      return () => unsub();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [apps, allApps] = await Promise.all([
        getUserApplications(user.uid),
        isAdmin ? getAllApplications() : Promise.resolve([])
      ]);
      setApplications(apps || []);
      setAdminApps(allApps || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    try { await logout(); navigate('/login'); }
    catch (err) { console.error(err); }
  };

  const handleCancel = async appId => {
    if (!window.confirm('Cancel this registration?')) return;
    try {
      await deleteApplication(appId);
      toast.success('Registration cancelled.');
      setApplications(p => p.filter(a => a.id !== appId));
    } catch { toast.error('Failed to cancel.'); }
  };

  const handleStatusUpdate = async (appId, status) => {
    try {
      await updateApplicationStatus(appId, status);
      toast.success(`Application mark as ${status}`);
      setAdminApps(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch { toast.error('Failed to update status.'); }
  };

  const handleCreateEvent = async (data) => {
    try {
      setLoading(true);
      await createEvent(data);
      toast.success('Event created successfully!');
      setIsEventModalOpen(false);
    } catch {
      toast.error('Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event? This cannot be undone.')) return;
    try {
      await deleteEvent(eventId);
      toast.success('Event deleted.');
    } catch {
      toast.error('Failed to delete event.');
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('This will upload all dummy events to your live database. Proceed?')) return;
    try {
      setIsSeeding(true);
      const promises = dummyEvents.map(event => {
        // Remove the dummy ID so Firebase generates a real one
        const { id, ...data } = event;
        return createEvent(data);
      });
      await Promise.all(promises);
      toast.success('Database seeded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Seeding failed.');
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50">
        <Spinner size="lg" />
        <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Loading your platform…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">

      {/* ── Page Header ── */}
      <div className="pt-40 pb-20 px-6 lg:px-12 bg-gradient-to-br from-navy-950 to-navy-800 border-b border-gold-500/10 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6 bg-gold-500/10 border border-gold-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-400">
                {isAdmin ? 'Administrator' : 'Verified Participant'}
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-5xl md:text-6xl leading-tight">
              Welcome back,<br />
              <em className="text-gold-300 italic font-light pr-2">
                {userProfile.name?.split(' ')[0] || 'User'}
              </em>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300 font-mono tracking-wide"
          >
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[2rem] p-10 border border-cream-200 shadow-xl shadow-navy-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="w-20 h-20 rounded-2xl mb-8 flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900 shadow-xl shadow-navy-900/20">
                <FiUser size={30} className="text-gold-400" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2 font-mono tracking-tight">
                {userProfile.name}
              </h3>
              <p className="text-sm text-slate-400 mb-8 truncate">{user.email}</p>

              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('my-registrations')}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 font-mono ${activeTab === 'my-registrations' ? 'bg-gold-500/10 text-gold-600 border border-gold-500/30' : 'text-slate-500 hover:bg-cream-50'}`}
                >
                  <FiCalendar size={18} /> My Events
                </button>
                {isAdmin && (
                  <>
                    <button 
                      onClick={() => setActiveTab('admin-apps')}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 font-mono ${activeTab === 'admin-apps' ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/30' : 'text-slate-500 hover:bg-cream-50'}`}
                    >
                      <FiShield size={18} /> Applications
                    </button>
                    <button 
                      onClick={() => setActiveTab('admin-events')}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 font-mono ${activeTab === 'admin-events' ? 'bg-gold-500/10 text-gold-600 border border-gold-500/30' : 'text-slate-500 hover:bg-cream-50'}`}
                    >
                      <FiCalendar size={18} /> Manage Events
                    </button>
                  </>
                )}
                <button 
                  onClick={() => toast('Settings panel coming in the next update!', { icon: '⚙️' })}
                  className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide text-slate-500 hover:bg-cream-50 transition-all duration-300 font-mono"
                >
                  <FiSettings size={18} /> Settings
                </button>
              </nav>
            </div>

            {isAdmin && (
              <div className="bg-navy-900 rounded-[2rem] p-8 border border-gold-500/20 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 dot-pattern opacity-10" />
                <h4 className="text-white font-bold mb-4 font-display relative z-10">System Tools</h4>
                <button
                  disabled={isSeeding}
                  onClick={handleSeedDatabase}
                  className="w-full inline-flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold text-gold-400 transition-all font-mono relative z-10"
                >
                  <FiDatabase size={14} /> 
                  {isSeeding ? 'Seeding...' : 'Seed Live Database'}
                </button>
                <p className="text-[10px] text-cream-50/40 mt-4 leading-relaxed relative z-10 italic">
                  * Use this to migrate dummy data to your real Firestore instance.
                </p>
              </div>
            )}
          </div>

          {/* ── Main Content ── */}
          <div className="lg:col-span-3">
            
            {activeTab === 'my-registrations' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-navy-900">
                    My Registrations
                  </h2>
                </div>

                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[2rem] border border-cream-200">
                    <Spinner />
                    <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Records…</p>
                  </div>
                ) : applications.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {applications.map(app => (
                      <div
                        key={app.id}
                        className="group flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 bg-white rounded-[2rem] border border-cream-200 shadow-xl shadow-navy-900/5 transition-all duration-500 hover:border-gold-300 hover:shadow-2xl"
                      >
                        <div className="flex gap-6">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-cream-50 border border-cream-200 flex-shrink-0 group-hover:bg-gold-50 group-hover:border-gold-500/30 transition-colors">
                            <FiCalendar size={24} className="text-gold-500" />
                          </div>
                          <div>
                            <h4 className="font-mono font-bold text-2xl text-navy-900 mb-2 group-hover:text-gold-600 transition-colors">
                              {app.eventTitle}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400">
                              <span className="flex items-center gap-2"><FiUser size={14} className="text-slate-300" /> {app.role}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <span className={`inline-flex items-center gap-2 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border ${app.status === 'Pending' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                                {app.status === 'Pending' ? <FiClock size={12} /> : <FiCheckCircle size={12} />}
                                {app.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCancel(app.id)}
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-red-500 bg-red-50/50 border border-red-100 hover:bg-red-100 transition-all duration-300 font-mono"
                        >
                          <FiTrash2 size={16} /> Cancel Registration
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-cream-200">
                    <div className="w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center bg-cream-50 border border-cream-200">
                      <FiAlertCircle size={30} className="text-slate-300" />
                    </div>
                    <p className="text-xl text-slate-500 mb-10 font-light">You haven't registered for any events yet.</p>
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-br from-navy-800 to-navy-900 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 font-mono shadow-xl shadow-navy-900/20"
                    >
                      Browse Events <FiArrowRight size={18} />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'admin-apps' && isAdmin && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-navy-900">
                    Monitor Applications
                  </h2>
                  <div className="px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 font-bold text-xs uppercase tracking-widest font-mono">
                    Total: {adminApps.length}
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-cream-200 shadow-xl shadow-navy-900/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-cream-50 border-b border-cream-200">
                          <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-navy-800 font-mono">User / Event</th>
                          <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-navy-800 font-mono">Role</th>
                          <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-navy-800 font-mono">Status</th>
                          <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-navy-800 font-mono text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminApps.map(app => (
                          <tr key={app.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                            <td className="px-8 py-6">
                              <p className="font-bold text-navy-900 text-base">{app.userName}</p>
                              <p className="text-xs text-slate-400 font-medium">{app.eventTitle}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-cream-100 text-navy-800 rounded-lg text-xs font-bold font-mono">
                                {app.role}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {app.status === 'Accepted' ? <FiCheckCircle size={10} /> : <FiClock size={10} />}
                                {app.status}
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right space-x-2">
                              {app.status === 'Pending' && (
                                <button 
                                  onClick={() => handleStatusUpdate(app.id, 'Accepted')}
                                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100 shadow-sm"
                                  title="Approve"
                                >
                                  <FiCheckCircle size={16} />
                                </button>
                              )}
                              <button 
                                onClick={() => handleCancel(app.id)}
                                className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin-events' && isAdmin && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-navy-900">
                    Live Events
                  </h2>
                  <button
                    onClick={() => setIsEventModalOpen(true)}
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-gold-500 text-navy-900 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-xl font-mono shadow-lg shadow-gold-500/20"
                  >
                    <FiPlus size={18} /> New Event
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {allEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-8 bg-white rounded-3xl border border-cream-200 shadow-xl shadow-navy-900/5 group hover:border-gold-300 transition-all duration-300">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200">
                          <img src={event.bannerUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl text-navy-900 mb-1">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{event.city}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                         onClick={() => handleDeleteEvent(event.id)}
                         className="p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-100"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {allEvents.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-cream-200">
                      <p className="text-slate-400 font-light">No live events yet. Add one to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title="Create New Event">
        <EventForm onSubmit={handleCreateEvent} isLoading={loading} />
      </Modal>
    </div>
  );
}
