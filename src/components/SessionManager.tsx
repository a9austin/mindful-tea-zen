
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Plus, Play, Pause, Trash2, Clock, Droplets } from 'lucide-react';
import { useSession } from '@/contexts/SessionContext';
import { TeaSession } from '@/types/session';

export const SessionManager: React.FC = () => {
  const { sessions, activeSessionId, setActiveSession, pauseSession, resumeSession, deleteSession } = useSession();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const formatTimeRemaining = (session: TeaSession) => {
    if (session.status === 'completed') return 'Completed';
    if (session.status === 'paused') return 'Paused';
    
    const remainingSteeps = session.totalSteeps - session.currentSteep;
    return `${remainingSteeps} steeps remaining`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'steeping': return 'text-tea-sage';
      case 'heating': return 'text-orange-500';
      case 'paused': return 'text-tea-stone';
      case 'completed': return 'text-tea-earth';
      default: return 'text-tea-stone';
    }
  };

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-tea-stone/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-tea-earth">Tea Sessions</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-tea-sage hover:bg-tea-sage/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tea-sage/20 flex items-center justify-center">
            <span className="text-2xl">🫖</span>
          </div>
          <p className="text-tea-stone mb-4">No active tea sessions</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-tea-sage hover:bg-tea-sage/80 text-white px-6 py-2 rounded-full font-light transition-all duration-300"
          >
            Start Your First Session
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                activeSessionId === session.id
                  ? 'border-tea-sage bg-tea-sage/10'
                  : 'border-tea-stone/20 hover:border-tea-sage/30'
              }`}
              onClick={() => setActiveSession(session.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-tea-earth">{session.name}</h3>
                <div className="flex items-center space-x-2">
                  {session.status !== 'completed' && (
                    <>
                      {session.status === 'paused' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resumeSession(session.id);
                          }}
                          className="text-tea-sage hover:text-tea-sage/80 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            pauseSession(session.id);
                          }}
                          className="text-tea-stone hover:text-tea-earth transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-tea-stone">
                <div className="flex items-center space-x-4">
                  <span>{session.teaType}</span>
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-3 h-3" />
                    <span>{session.waterTemperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Steep {session.currentSteep}/{session.totalSteeps}</span>
                  </div>
                </div>
                <span className={`capitalize ${getStatusColor(session.status)}`}>
                  {formatTimeRemaining(session)}
                </span>
              </div>

              {session.mindfulnessEnabled && (
                <div className="mt-2 text-xs text-tea-sage">
                  Mindfulness: {session.mindfulnessTheme}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showCreateForm && (
        <SessionCreateForm onClose={() => setShowCreateForm(false)} />
      )}
    </Card>
  );
};

const SessionCreateForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createSession } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    teaType: 'Oolong',
    totalSteeps: 5,
    steepTimes: [10, 15, 20, 25, 30],
    waterTemperature: 95,
    mindfulnessEnabled: true,
    mindfulnessTheme: 'Focus on Aroma'
  });

  const mindfulnessThemes = [
    'Focus on Aroma',
    'Breathing Awareness',
    'Gratitude Practice',
    'Present Moment',
    'Color and Clarity',
    'Warmth and Comfort'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSession({
      ...formData,
      currentSteep: 1,
      status: 'preparing'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-card border-tea-stone/20">
        <h3 className="text-lg font-light text-tea-earth mb-4">Create New Tea Session</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-tea-stone mb-1">Session Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border border-tea-stone/20 rounded bg-background text-tea-earth"
              placeholder="Morning Oolong Session"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-tea-stone mb-1">Tea Type</label>
            <select
              value={formData.teaType}
              onChange={(e) => setFormData({...formData, teaType: e.target.value})}
              className="w-full p-2 border border-tea-stone/20 rounded bg-background text-tea-earth"
            >
              <option>Oolong</option>
              <option>Pu-erh</option>
              <option>Black Tea</option>
              <option>Green Tea</option>
              <option>White Tea</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-tea-stone mb-1">Total Steeps</label>
              <input
                type="number"
                min="1"
                max="15"
                value={formData.totalSteeps}
                onChange={(e) => {
                  const steeps = parseInt(e.target.value);
                  const newSteepTimes = Array.from({length: steeps}, (_, i) => 10 + (i * 5));
                  setFormData({...formData, totalSteeps: steeps, steepTimes: newSteepTimes});
                }}
                className="w-full p-2 border border-tea-stone/20 rounded bg-background text-tea-earth"
              />
            </div>

            <div>
              <label className="block text-sm text-tea-stone mb-1">Water Temp (°C)</label>
              <input
                type="number"
                min="70"
                max="100"
                value={formData.waterTemperature}
                onChange={(e) => setFormData({...formData, waterTemperature: parseInt(e.target.value)})}
                className="w-full p-2 border border-tea-stone/20 rounded bg-background text-tea-earth"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.mindfulnessEnabled}
                onChange={(e) => setFormData({...formData, mindfulnessEnabled: e.target.checked})}
                className="rounded"
              />
              <span className="text-sm text-tea-stone">Enable Mindfulness Prompts</span>
            </label>
          </div>

          {formData.mindfulnessEnabled && (
            <div>
              <label className="block text-sm text-tea-stone mb-1">Mindfulness Theme</label>
              <select
                value={formData.mindfulnessTheme}
                onChange={(e) => setFormData({...formData, mindfulnessTheme: e.target.value})}
                className="w-full p-2 border border-tea-stone/20 rounded bg-background text-tea-earth"
              >
                {mindfulnessThemes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-tea-stone/20 rounded text-tea-stone hover:bg-tea-stone/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-tea-sage text-white rounded hover:bg-tea-sage/80 transition-colors"
            >
              Create Session
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
