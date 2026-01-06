import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';

const moodEmojis = {
  1: {
    emoji: "😰",
    label: "Anxious/Distressed",
    color: "linear-gradient(to bottom right, #f87171, #dc2626)",
    keywords: ["freaking out", "heart is racing", "on edge", "losing it", "nervous wreck", "scared", "sweating", "stomach is in knots", "anxious", "distressed", "panic"],
  },
  2: {
    emoji: "😞",
    label: "Very Down",
    color: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
    keywords: ["down in the dumps", "feeling blue", "bummed out", "hit rock bottom", "heartbroken", "feel like crap", "under a dark cloud", "crushed", "very down", "depressed"],
  },
  3: {
    emoji: "😟",
    label: "Worried",
    color: "linear-gradient(to bottom right, #60a5fa, #3b82f6)",
    keywords: ["stressed out", "biting my nails", "losing sleep", "eating me up", "concerned", "something's bugging me", "bad feeling", "mind is racing", "worried", "stressed"],
  },
  4: {
    emoji: "😕",
    label: "Low",
    color: "linear-gradient(to bottom right, #9ca3af, #6b7280)",
    keywords: ["not feeling great", "bit off", "under the weather", "rough day", "not myself", "feeling blah", "could be better", "dragging", "feeling drained", "low"],
  },
  5: {
    emoji: "😐",
    label: "Neutral",
    color: "linear-gradient(to bottom right, #d1d5db, #9ca3af)",
    keywords: ["whatever", "it is what it is", "can't complain", "so-so", "nothing special", "same old", "meh", "on the fence", "neutral", "okay"],
  },
  6: {
    emoji: "😌",
    label: "Calm",
    color: "linear-gradient(to bottom right, #93c5fd, #60a5fa)",
    keywords: ["chilling out", "taking it easy", "at ease", "keeping my cool", "peace of mind", "breathing easy", "smooth sailing", "no sweat", "laid back", "calm", "relaxed"],
  },
  7: {
    emoji: "🙂",
    label: "Content",
    color: "linear-gradient(to bottom right, #86efac, #4ade80)",
    keywords: ["doing well", "pretty good", "in a good place", "things are looking up", "feeling decent", "hanging in there well", "i'm good", "all good", "life's good", "content"],
  },
  8: {
    emoji: "😊",
    label: "Happy",
    color: "linear-gradient(to bottom right, #fde047, #facc15)",
    keywords: ["stoked", "feeling great", "in high spirits", "happy as a clam", "walking on sunshine", "bright-eyed", "tickled pink", "grinning", "pleased", "on cloud nine", "happy"],
  },
  9: {
    emoji: "😄",
    label: "Joyful",
    color: "linear-gradient(to bottom right, #4ade80, #22c55e)",
    keywords: ["over the moon", "jumping for joy", "living my best life", "having a blast", "on top of the world", "flying high", "pumped up", "buzzing", "having the time of my life", "joyful", "excited"],
  },
  10: {
    emoji: "🥰",
    label: "Thriving!",
    color: "linear-gradient(to bottom right, #f9a8d4, #ec4899)",
    keywords: ["living the dream", "in seventh heaven", "on fire", "crushing it", "feeling blessed", "everything's amazing", "head over heels", "floating on air", "never been better", "thriving", "amazing", "wonderful", "fantastic"],
  },
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.7s ease',
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    background: 'linear-gradient(to bottom right, #f3f4f6, #dbeafe, #fef3c7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #22c55e, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#1f2937',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  streakBadge: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 20px',
    background: 'linear-gradient(to right, #fb923c, #ef4444)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  card: {
    background: 'linear-gradient(to bottom right, #fafaf9, #ffffff, #fce7f3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(147, 197, 253, 0.3)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1f2937',
  },
  emojiDisplay: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  emoji: {
    fontSize: '6rem',
    marginBottom: '15px',
  },
  moodScore: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
  },
  moodLabel: {
    fontSize: '1rem',
    color: '#6b7280',
    marginTop: '5px',
  },
  slider: {
    width: '100%',
    height: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    color: '#6b7280',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    resize: 'none',
    fontFamily: 'inherit',
    background: 'linear-gradient(to bottom right, #dbeafe, #ffffff, #dcfce7)',
    transition: 'border 0.3s',
  },
  button: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(to right, #60a5fa, #4ade80, #f9a8d4)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginBottom: '30px',
  },
  statsCard: {
    background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa, #fef08a)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid #fed7aa',
  },
  crisisCard: {
    background: 'linear-gradient(to bottom right, #ccfbf1, #a5f3fc, #bfdbfe)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid #5eead4',
  },
  historyCard: {
    background: 'linear-gradient(to bottom right, #fae8ff, #fbcfe8, #fce7f3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e9d5ff',
  },
  historyItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #fbcfe8',
    background: 'linear-gradient(to right, #fce7f3, #fbcfe8)',
    marginBottom: '15px',
    transition: 'box-shadow 0.3s',
  },
  celebration: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1000,
  },
  celebrationContent: {
    textAlign: 'center',
    animation: 'bounce 1s infinite',
  },
};

export default function MindfulMoments() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [checkIns, setCheckIns] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('mindful-checkins');
    if (stored) {
      setCheckIns(JSON.parse(stored));
      calculateStreak(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (note.trim()) {
      const lowerNote = note.toLowerCase();
      for (const [moodLevel, data] of Object.entries(moodEmojis)) {
        if (data.keywords.some((keyword) => lowerNote.includes(keyword))) {
          setMood(Number(moodLevel));
          break;
        }
      }
    }
  }, [note]);

  const calculateStreak = (checkins) => {
    if (!checkins || checkins.length === 0) {
      setStreak(0);
      return;
    }

    const sortedCheckins = [...checkins].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCheckins.length; i++) {
      const checkinDate = new Date(sortedCheckins[i].date);
      checkinDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (checkinDate.getTime() === expectedDate.getTime() && sortedCheckins[i].mood >= 8) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  };

  const handleSave = () => {
    if (!note.trim()) return;

    const selectedMood = moodEmojis[mood];

    const newCheckIn = {
      id: Date.now().toString(),
      mood,
      note,
      emoji: selectedMood.emoji,
      date: new Date().toISOString(),
    };

    const updatedCheckIns = [newCheckIn, ...checkIns];
    setCheckIns(updatedCheckIns);
    localStorage.setItem('mindful-checkins', JSON.stringify(updatedCheckIns));
    calculateStreak(updatedCheckIns);

    if (mood >= 8) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    setNote('');
    setMood(5);
  };

  const avgMood = checkIns.length > 0 
    ? (checkIns.reduce((sum, c) => sum + c.mood, 0) / checkIns.length).toFixed(1) 
    : 'N/A';

  const currentMood = moodEmojis[mood];

  return (
    <div style={{...styles.container, background: currentMood.color}}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {showCelebration && (
        <div style={styles.celebration}>
          <div style={styles.celebrationContent}>
            <div style={{fontSize: '8rem', marginBottom: '20px'}}>🎉</div>
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              {streak > 0 ? `🔥 ${streak} Day Streak! Keep it up!` : 'Amazing! Great day!'}
            </div>
            <div style={{fontSize: '4rem', marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
              {['🌟', '✨', '💫', '⭐', '🌈'].map((emoji, i) => (
                <span key={i} style={{animation: `pulse 1s infinite ${i * 100}ms`}}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <h1 style={styles.title}>MindfulMoments</h1>
          <p style={styles.subtitle}>Your daily mental health partner</p>
          {streak > 0 && (
            <div style={styles.streakBadge}>
              🔥 {streak} Day Streak of Good Moods!
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Hello there! Anything to share? I have your back!</h2>
          
          <div style={styles.emojiDisplay}>
            <div style={styles.emoji}>{currentMood.emoji}</div>
            <p style={styles.moodScore}>{mood}/10</p>
            <p style={styles.moodLabel}>{currentMood.label}</p>
          </div>

          <div style={{marginBottom: '25px'}}>
            <div style={styles.sliderLabels}>
              <span>Anxious</span>
              <span>Thriving</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div>
            <label style={{display: 'block', fontWeight: '500', marginBottom: '10px', color: '#374151'}}>
              What happened today? (optional)
            </label>
            <textarea
              placeholder="Share your day-to-day feelings here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={styles.textarea}
              rows="4"
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '8px'}}>
              Share your day-to-day feeling in the above section and I can create your records and analyze your mental health.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={!note.trim()}
            style={{
              ...styles.button,
              opacity: note.trim() ? 1 : 0.5,
              cursor: note.trim() ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={(e) => {
              if (note.trim()) e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            I'm with you, got it
          </button>
        </div>

        <div style={styles.grid}>
          <div style={styles.statsCard}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
              <TrendingUp color="#92400e" />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#92400e', margin: 0}}>Your Progress</h3>
            </div>
            <div style={{marginBottom: '15px'}}>
              <p style={{fontSize: '0.875rem', color: '#92400e'}}>Total Check-ins</p>
              <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#ea580c'}}>{checkIns.length}</p>
            </div>
            <div>
              <p style={{fontSize: '0.875rem', color: '#92400e'}}>Average Mood</p>
              <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#ea580c'}}>{avgMood}</p>
            </div>
          </div>

          <div style={styles.crisisCard}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
              <AlertTriangle color="#134e4a" />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#134e4a', margin: 0}}>Need Help Now?</h3>
            </div>
            <div style={{fontSize: '0.875rem'}}>
              <div style={{marginBottom: '12px'}}>
                <p style={{fontWeight: '600', color: '#134e4a'}}>988 Suicide & Crisis Lifeline</p>
                <p style={{color: '#0f766e'}}>Call or text 988 (24/7)</p>
              </div>
              <div style={{marginBottom: '12px'}}>
                <p style={{fontWeight: '600', color: '#134e4a'}}>Crisis Text Line</p>
                <p style={{color: '#0f766e'}}>Text HOME to 741741</p>
              </div>
              <div style={{marginBottom: '12px'}}>
                <p style={{fontWeight: '600', color: '#134e4a'}}>SAMHSA Helpline</p>
                <p style={{color: '#0f766e'}}>1-800-662-4357</p>
              </div>
              <div style={{marginBottom: '12px'}}>
                <p style={{fontWeight: '600', color: '#134e4a'}}>AASRA (India)</p>
                <p style={{color: '#0f766e'}}>91-9820466726</p>
              </div>
              <div>
                <p style={{fontWeight: '600', color: '#134e4a'}}>Vandrevala Foundation</p>
                <p style={{color: '#0f766e'}}>1860-2662-345</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.historyCard}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
            <Calendar color="#701a75" />
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#701a75', margin: 0}}>Recent Check-ins</h3>
          </div>
          
          {checkIns.length === 0 ? (
            <p style={{textAlign: 'center', color: '#9333ea', padding: '40px 0'}}>
              No check-ins yet. Start tracking your mood above!
            </p>
          ) : (
            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              {checkIns.slice(0, 10).map((checkIn) => (
                <div 
                  key={checkIn.id} 
                  style={styles.historyItem}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{fontSize: '3rem'}}>{checkIn.emoji}</div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px'}}>
                      <span style={{fontWeight: '600', color: '#701a75'}}>{checkIn.mood}/10</span>
                      <span style={{fontSize: '0.875rem', color: '#9333ea'}}>
                        {new Date(checkIn.date).toLocaleDateString()}
                      </span>
                    </div>
                    {checkIn.note && <p style={{color: '#86198f', fontSize: '0.875rem', margin: 0}}>{checkIn.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p style={{textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
          Your data is stored locally and privately on your device.
          <br />
          This is not a substitute for professional mental health care.
        </p>
      </div>
    </div>
  );
}