import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, AlertTriangle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f3e7ff, #dbeafe)',
    padding: '20px',
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    marginTop: '40px',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.1rem',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginBottom: '30px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1f2937',
  },
  moodSliderContainer: {
    marginBottom: '30px',
  },
  moodDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  emoji: {
    fontSize: '3rem',
  },
  moodScore: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#9333ea',
  },
  slider: {
    width: '100%',
    height: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '5px',
  },
  label: {
    display: 'block',
    color: '#374151',
    fontWeight: '500',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'none',
    fontFamily: 'inherit',
  },
  button: {
    width: '100%',
    background: '#9333ea',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s',
  },
  buttonDisabled: {
    background: '#d1d5db',
    cursor: 'not-allowed',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '30px',
  },
  statsCard: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
  },
  statsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  statsTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  statItem: {
    marginBottom: '15px',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#9333ea',
  },
  crisisCard: {
    background: '#fef2f2',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    border: '2px solid #fecaca',
  },
  crisisTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#991b1b',
    marginBottom: '15px',
  },
  crisisText: {
    color: '#374151',
    fontSize: '0.875rem',
    marginBottom: '10px',
  },
  alertCard: {
    background: '#fffbeb',
    border: '2px solid #fcd34d',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginBottom: '30px',
    display: 'flex',
    gap: '15px',
  },
  alertTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#92400e',
    marginBottom: '10px',
  },
  alertText: {
    color: '#374151',
    marginBottom: '15px',
  },
  alertList: {
    listStyle: 'disc',
    marginLeft: '20px',
    color: '#374151',
    fontSize: '0.875rem',
  },
  strategiesCard: {
    background: 'linear-gradient(to right, #f3e7ff, #dbeafe)',
    borderRadius: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    marginBottom: '30px',
  },
  strategiesTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '20px',
  },
  strategiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  strategyItem: {
    background: 'white',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #e9d5ff',
    fontSize: '0.875rem',
    color: '#374151',
  },
  historyEmpty: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280',
  },
  historyItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    transition: 'box-shadow 0.3s',
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  historyLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  historyEmoji: {
    fontSize: '2rem',
  },
  historyMood: {
    fontWeight: '600',
    color: '#1f2937',
  },
  historyDate: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  historyDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  historyNote: {
    color: '#374151',
    fontSize: '0.875rem',
    marginLeft: '60px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '20px',
    color: '#6b7280',
    fontSize: '0.875rem',
  },
};

export default function MindfulMoments() {
  const [currentMood, setCurrentMood] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    setMoodHistory(saved);
  }, []);

  const handleSaveEntry = () => {
    if (!journalEntry.trim()) return;

    const newEntry = {
      id: Date.now(),
      mood: currentMood,
      note: journalEntry,
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString()
    };

    const updated = [newEntry, ...moodHistory];
    setMoodHistory(updated);
    localStorage.setItem('moodHistory', JSON.stringify(updated));
    
    setJournalEntry('');
    setCurrentMood(5);
  };

  const getMoodEmoji = (mood) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😐';
    if (mood <= 8) return '🙂';
    return '😊';
  };

  const getMoodColor = (mood) => {
    if (mood <= 3) return '#ef4444';
    if (mood <= 5) return '#f97316';
    if (mood <= 7) return '#eab308';
    return '#22c55e';
  };

  const averageMood = moodHistory.length > 0
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : 'N/A';

  const detectConcerningPattern = () => {
    if (moodHistory.length < 3) return false;
    const recent = moodHistory.slice(0, 3);
    return recent.every(entry => entry.mood <= 4);
  };

  const showConcernAlert = detectConcerningPattern();

  const chartData = moodHistory
    .slice(0, 7)
    .reverse()
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood
    }));

  const getCopingStrategies = (mood) => {
    if (mood <= 3) {
      return [
        "Try the 5-4-3-2-1 grounding technique",
        "Reach out to a trusted friend or family member",
        "Consider speaking with a mental health professional",
        "Take a short walk outside if possible"
      ];
    } else if (mood <= 6) {
      return [
        "Practice deep breathing for 5 minutes",
        "Listen to your favorite uplifting music",
        "Do a quick 10-minute meditation",
        "Journal about what's on your mind"
      ];
    } else {
      return [
        "Share your positive energy with someone",
        "Reflect on what made today great",
        "Try a new hobby or activity",
        "Practice gratitude - list 3 things you're thankful for"
      ];
    }
  };

  const strategies = getCopingStrategies(currentMood);

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <Heart color="#9333ea" size={32} />
            <h1 style={styles.title}>MindfulMoments</h1>
          </div>
          <p style={styles.subtitle}>Your daily mental health companion</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>How are you feeling today?</h2>
          
          <div style={styles.moodSliderContainer}>
            <div style={styles.moodDisplay}>
              <span style={styles.emoji}>{getMoodEmoji(currentMood)}</span>
              <span style={styles.moodScore}>{currentMood}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={currentMood}
              onChange={(e) => setCurrentMood(Number(e.target.value))}
              style={styles.slider}
            />
            <div style={styles.sliderLabels}>
              <span>Very Low</span>
              <span>Amazing</span>
            </div>
          </div>

          <div style={{marginBottom: '30px'}}>
            <label style={styles.label}>
              What happened today? (optional)
            </label>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Share your thoughts, feelings, or what made today special..."
              style={styles.textarea}
              rows="4"
            />
          </div>

          <button
            onClick={handleSaveEntry}
            disabled={!journalEntry.trim()}
            style={{
              ...styles.button,
              ...((!journalEntry.trim()) ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={(e) => {
              if (journalEntry.trim()) e.target.style.background = '#7e22ce';
            }}
            onMouseLeave={(e) => {
              if (journalEntry.trim()) e.target.style.background = '#9333ea';
            }}
          >
            Save Today's Check-in
          </button>
        </div>

        <div style={styles.grid}>
          <div style={styles.statsCard}>
            <div style={styles.statsHeader}>
              <TrendingUp color="#9333ea" />
              <h3 style={styles.statsTitle}>Your Progress</h3>
            </div>
            <div style={styles.statItem}>
              <p style={styles.statLabel}>Total Check-ins</p>
              <p style={styles.statValue}>{moodHistory.length}</p>
            </div>
            <div style={styles.statItem}>
              <p style={styles.statLabel}>Average Mood</p>
              <p style={styles.statValue}>{averageMood}</p>
            </div>
          </div>

          <div style={styles.crisisCard}>
            <h3 style={styles.crisisTitle}>Need Help Now?</h3>
            <p style={styles.crisisText}>
              <strong>988 Suicide & Crisis Lifeline</strong><br />
              Call or text 988 (24/7)
            </p>
            <p style={styles.crisisText}>
              <strong>Crisis Text Line</strong><br />
              Text HOME to 741741
            </p>
            <p style={styles.crisisText}>
              <strong>SAMHSA Helpline</strong><br />
              1-800-662-4357
            </p>
          </div>
        </div>

        {showConcernAlert && (
          <div style={styles.alertCard}>
            <AlertTriangle color="#f59e0b" size={24} style={{flexShrink: 0, marginTop: '5px'}} />
            <div>
              <h3 style={styles.alertTitle}>We've Noticed a Pattern</h3>
              <p style={styles.alertText}>
                Your mood has been lower than usual for the past few days. This might be a good time to:
              </p>
              <ul style={styles.alertList}>
                <li>Talk to someone you trust</li>
                <li>Consider reaching out to a mental health professional</li>
                <li>Use the crisis resources above if you need immediate support</li>
              </ul>
            </div>
          </div>
        )}

        {chartData.length > 0 && (
          <div style={styles.card}>
            <div style={styles.statsHeader}>
              <Activity color="#9333ea" />
              <h3 style={styles.statsTitle}>Mood Trends</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#9333ea" 
                  strokeWidth={3}
                  dot={{ fill: '#9333ea', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {journalEntry && (
          <div style={styles.strategiesCard}>
            <h3 style={styles.strategiesTitle}>
              💡 Suggested Strategies for You
            </h3>
            <div style={styles.strategiesGrid}>
              {strategies.map((strategy, index) => (
                <div key={index} style={styles.strategyItem}>
                  {strategy}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.card}>
          <div style={styles.statsHeader}>
            <Calendar color="#9333ea" />
            <h3 style={styles.statsTitle}>Recent Check-ins</h3>
          </div>
          
          {moodHistory.length === 0 ? (
            <p style={styles.historyEmpty}>No check-ins yet. Start tracking your mood above!</p>
          ) : (
            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              {moodHistory.map((entry) => (
                <div 
                  key={entry.id} 
                  style={styles.historyItem}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={styles.historyHeader}>
                    <div style={styles.historyLeft}>
                      <span style={styles.historyEmoji}>{getMoodEmoji(entry.mood)}</span>
                      <div>
                        <p style={styles.historyMood}>Mood: {entry.mood}/10</p>
                        <p style={styles.historyDate}>{entry.displayDate}</p>
                      </div>
                    </div>
                    <div style={{...styles.historyDot, background: getMoodColor(entry.mood)}}></div>
                  </div>
                  {entry.note && (
                    <p style={styles.historyNote}>{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.footer}>
          <p>Your data is stored locally and privately on your device.</p>
          <p style={{marginTop: '5px'}}>This is not a substitute for professional mental health care.</p>
        </div>
      </div>
    </div>
  );
}