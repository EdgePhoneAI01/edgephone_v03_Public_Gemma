/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Zap, 
  Activity, 
  MessageSquare, 
  Settings, 
  Lock, 
  Wifi, 
  WifiOff,
  Battery,
  Smartphone,
  BrainCircuit,
  Globe,
  Mic,
  Phone,
  MessageCircle,
  Image as ImageIcon,
  Search,
  Apple,
  Play,
  Video,
  VideoOff,
  Bluetooth,
  Plane,
  Database,
  Share2,
  Sun,
  Moon,
  Type,
  Monitor,
  Clock,
  Volume2,
  Bell,
  Music,
  AlarmClock,
  MinusCircle,
  Fingerprint,
  UserCheck,
  MapPin,
  Eye,
  BatteryCharging,
  HardDrive,
  Trash2,
  User,
  CloudUpload,
  ChevronRight,
  Calendar
} from 'lucide-react';

// --- Components ---

const SettingsSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-edge-primary/10 flex items-center justify-center text-edge-primary">
        <Icon size={18} />
      </div>
      <h3 className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-white/70">{title}</h3>
    </div>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, sub, control }: { label: string, sub?: string, control: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
    <div className="flex-1 pr-4">
      <p className="text-xs md:text-sm font-medium">{label}</p>
      {sub && <p className="text-[9px] md:text-[10px] text-white/30">{sub}</p>}
    </div>
    <div className="flex-shrink-0">{control}</div>
  </div>
);

const Toggle = ({ active }: { active: boolean }) => (
  <div className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-edge-secondary' : 'bg-white/10'}`}>
    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${active ? 'left-4.5' : 'left-0.5'}`} />
  </div>
);

const Slider = ({ value }: { value: number }) => (
  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
    <div className="h-full bg-edge-secondary" style={{ width: `${value}%` }} />
  </div>
);

const MetricCard = ({ icon: Icon, label, value, unit, color }: { 
  icon: any, 
  label: string, 
  value: string | number, 
  unit?: string,
  color: string 
}) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4 flex flex-col gap-1 md:gap-2 backdrop-blur-sm">
    <div className="flex items-center gap-2 text-white/50">
      <Icon size={14} className="md:w-4 md:h-4" style={{ color }} />
      <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-xl md:text-2xl font-bold tracking-tight">{value}</span>
      {unit && <span className="text-[10px] md:text-xs text-white/30 font-mono">{unit}</span>}
    </div>
  </div>
);

const StatusBadge = ({ active, label, icon: Icon }: { active: boolean, label: string, icon: any }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
    active 
      ? 'bg-edge-secondary/10 border-edge-secondary/30 text-edge-secondary' 
      : 'bg-white/5 border-white/10 text-white/30'
  }`}>
    <Icon size={14} />
    <span>{label}</span>
  </div>
);

export default function App() {
  const [isLocalOnly, setIsLocalOnly] = useState(true);
  const [npuUsage, setNpuUsage] = useState(12);
  const [privacyScore, setPrivacyScore] = useState(98);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Simulate NPU activity
  useEffect(() => {
    const interval = setInterval(() => {
      setNpuUsage(prev => {
        const delta = Math.floor(Math.random() * 10) - 5;
        return Math.min(Math.max(prev + delta, 5), 85);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-edge-bg text-white selection:bg-edge-secondary/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-edge-primary/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-edge-secondary/10 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12 pb-24 md:pb-12">
        
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg shadow-edge-primary/20">
              <img src="/favicon.png" alt="EdgePhone Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-bold text-base leading-none tracking-tight">EdgePhone</h1>
          </div>
        </div>

        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:flex flex-col gap-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-edge-primary/20">
              <img src="/favicon.png" alt="EdgePhone Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">EdgePhone</h1>
              <span className="text-[10px] text-edge-secondary font-mono uppercase tracking-widest opacity-70">On-Device</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'dashboard', label: 'Core Dashboard', icon: Activity },
              { id: 'mobile', label: 'Mobile Services', icon: Smartphone },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'assistant', label: 'Assistant', icon: 'favicon.png' },
              { id: 'privacy', label: 'Privacy Vault', icon: Shield },
              { id: 'settings', label: 'System Config', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {item.icon === 'favicon.png' ? (
                  <img src="/favicon.png" alt="" className="w-[18px] h-[18px] rounded-sm" />
                ) : (
                  <item.icon size={18} />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Privacy Score</span>
              <Shield size={12} className="text-emerald-400" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold tracking-tight">{privacyScore}</span>
              <span className="text-[10px] text-white/30 font-mono mb-1">/100</span>
            </div>
          </div>
        </aside>

        {/* Bottom Navigation (Mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-edge-bg/80 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-around">
          {[
            { id: 'dashboard', icon: Activity },
            { id: 'mobile', icon: Smartphone },
            { id: 'assistant', icon: 'favicon.png', special: true },
            { id: 'notifications', icon: Bell },
            { id: 'settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center transition-all ${
                item.special 
                  ? `relative -top-4 w-14 h-14 rounded-full bg-edge-primary shadow-[0_0_20px_rgba(100,108,255,0.4)] flex items-center justify-center ${activeTab === item.id ? 'scale-110' : ''}` 
                  : `${activeTab === item.id ? 'text-edge-secondary' : 'text-white/30'}`
              }`}
            >
              {item.icon === 'favicon.png' ? (
                <img src="/favicon.png" alt="" className={item.special ? 'w-8 h-8' : 'w-5 h-5'} />
              ) : (
                <item.icon size={item.special ? 28 : 20} className={item.special ? 'text-white' : ''} />
              )}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex flex-col gap-6 md:gap-8">
          
          {/* Header Stats */}
          <header className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              <StatusBadge active={isLocalOnly} label="AirGap™" icon={isLocalOnly ? WifiOff : Wifi} />
              <StatusBadge active={true} label="NPU" icon={Cpu} />
              <StatusBadge active={privacyScore > 90} label="Secure" icon={Shield} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-white/40 text-[10px] md:text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Battery size={14} className="text-emerald-400" />
                  <span>84%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={14} />
                  <span>EdgeOS 4.2</span>
                </div>
              </div>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <div className="flex items-center bg-black/40 border border-white/10 rounded-full p-1">
                <button 
                  onClick={() => setIsLocalOnly(true)}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                    isLocalOnly ? 'bg-edge-secondary text-edge-bg' : 'text-white/40'
                  }`}
                >
                  Local
                </button>
                <button 
                  onClick={() => setIsLocalOnly(false)}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                    !isLocalOnly ? 'bg-edge-primary text-white' : 'text-white/40'
                  }`}
                >
                  Hybrid
                </button>
              </div>
            </div>
          </header>

          {/* Core Dashboard View */}
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 gap-8"
              >
                {/* AI Visualizer Hero */}
                <div className="relative h-[300px] bg-gradient-to-br from-edge-primary/20 to-edge-secondary/5 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                  
                  <div className="relative flex items-center justify-center">
                    {/* Animated Rings */}
                    <motion.div 
                      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                      transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute w-72 h-72 border border-edge-secondary/10 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360, opacity: [0.2, 0.5, 0.2] }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute w-56 h-56 border border-edge-primary/20 rounded-full border-dashed"
                    />
                    
                    {/* Central Core */}
                    <div className="relative">
                      {/* Outer Glow Pulse */}
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -inset-4 bg-edge-secondary/20 rounded-full blur-2xl"
                      />
                      
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            "0 0 30px rgba(106,0,244,0.3)",
                            "0 0 60px rgba(0,229,255,0.5)",
                            "0 0 30px rgba(106,0,244,0.3)"
                          ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-32 h-32 bg-gradient-to-br from-edge-primary to-edge-secondary rounded-full flex items-center justify-center z-10 overflow-hidden"
                      >
                        {/* Internal Shimmer */}
                        <motion.div 
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                        
                        <motion.div
                          animate={{ 
                            filter: ["drop-shadow(0 0 0px #fff)", "drop-shadow(0 0 12px rgba(0,229,255,0.6))", "drop-shadow(0 0 0px #fff)"]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="relative z-20 w-16 h-16"
                        >
                          <img src="/favicon.png" alt="Edge Core" className="w-full h-full object-contain" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Orbiting Particles - More dynamic and varied */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 360) / 12;
                      const radius = 85 + (i % 4) * 15;
                      const duration = 12 + (i % 6) * 3;
                      const size = 1.5 + (i % 3) * 1;
                      
                      return (
                        <motion.div
                          key={i}
                          animate={{ 
                            rotate: [angle, angle + 360],
                          }}
                          transition={{ 
                            duration, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                          className="absolute"
                          style={{ width: radius * 2, height: radius * 2 }}
                        >
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.4, 1, 0.4]
                            }}
                            transition={{ 
                              duration: 2 + (i % 3), 
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full shadow-lg"
                            style={{ 
                              width: size, 
                              height: size,
                              backgroundColor: i % 2 === 0 ? '#00E5FF' : '#6A00F4',
                              boxShadow: `0 0 ${size * 4}px ${i % 2 === 0 ? '#00E5FF' : '#6A00F4'}`
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Neural Core Active</h2>
                      <p className="text-white/40 text-[10px] uppercase font-mono tracking-wider">Processing 12.4 Trillion Ops/Sec</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/30 uppercase font-mono">Latency</span>
                        <span className="text-xs font-bold text-edge-secondary">0.4ms</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/30 uppercase font-mono">Mode</span>
                        <button 
                          onClick={() => setIsLocalOnly(!isLocalOnly)}
                          className={`text-xs font-bold transition-all hover:scale-105 active:scale-95 ${isLocalOnly ? 'text-emerald-400' : 'text-edge-secondary'}`}
                        >
                          {isLocalOnly ? 'OFFLINE' : 'ONLINE'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard icon={Cpu} label="NPU Load" value={npuUsage} unit="%" color="#00E5FF" />
                  <MetricCard icon={Zap} label="Power" value="Low" color="#6A00F4" />
                  <MetricCard icon={Shield} label="Privacy" value={privacyScore} unit="/100" color="#10b981" />
                  <MetricCard icon={Activity} label="Memory" value="4.2" unit="GB" color="#f59e0b" />
                </div>

                {/* Recent AI Tasks */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-bold">Local Intelligence Log</h3>
                    <button className="text-[10px] md:text-xs text-edge-secondary hover:underline">View All</button>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {[
                      { task: 'Video Stream Analysis', time: 'Just now', type: 'Video', status: 'NPU Active' },
                      { task: 'Real-time Voice Translation', time: '2m ago', type: 'Voice', status: 'Encrypted' },
                      { task: 'Photo Object Recognition', time: '15m ago', type: 'Vision', status: 'Local' },
                      { task: 'Semantic Search Indexing', time: '1h ago', type: 'Data', status: 'Private' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-edge-primary/10 flex items-center justify-center text-edge-primary">
                            {log.type === 'Voice' ? <Mic size={16} className="md:w-[18px] md:h-[18px]" /> : log.type === 'Vision' ? <ImageIcon size={16} className="md:w-[18px] md:h-[18px]" /> : log.type === 'Video' ? <Video size={16} className="md:w-[18px] md:h-[18px]" /> : <Search size={16} className="md:w-[18px] md:h-[18px]" />}
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-medium">{log.task}</p>
                            <p className="text-[8px] md:text-[10px] text-white/30 uppercase font-mono">{log.time}</p>
                          </div>
                        </div>
                        <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 px-2 py-1 bg-emerald-400/10 rounded-md">
                          {log.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'mobile' && (
              <motion.div 
                key="mobile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Section */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-edge-secondary/10 rounded-full flex items-center justify-center text-edge-secondary">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold mb-1">Voice Services</h2>
                      <p className="text-[10px] text-white/40">Encrypted calls with local translation.</p>
                    </div>
                    <button className="w-full bg-edge-secondary text-edge-bg font-bold py-3 rounded-xl hover:scale-[1.02] transition-all text-xs uppercase tracking-widest">
                      Open Dialer
                    </button>
                    <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                      <p className="text-[8px] text-white/30 uppercase font-mono mb-2">Recent Calls</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">John Doe</span>
                          <span className="text-[9px] text-white/20">2m ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">+1 (555) 0123</span>
                          <span className="text-[9px] text-white/20">1h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messaging Section */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 bg-edge-primary/10 rounded-full flex items-center justify-center text-edge-primary">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold mb-1">Secure Messaging</h2>
                      <p className="text-[10px] text-white/40">E2E encrypted texting with local analysis.</p>
                    </div>
                    <button className="w-full bg-edge-primary text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition-all text-xs uppercase tracking-widest">
                      New Message
                    </button>
                    <div className="w-full bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                      <p className="text-[8px] text-white/30 uppercase font-mono mb-2">Active Chats</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Sarah Miller</span>
                          <span className="text-[9px] text-emerald-400">Online</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Design Team</span>
                          <span className="text-[9px] text-white/20">3 new</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Section - Integrated into Mobile */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-edge-primary/10 flex items-center justify-center text-edge-primary">
                        <Calendar size={20} />
                      </div>
                      <h2 className="text-xl font-bold">Local Calendar</h2>
                    </div>
                    <button className="text-[10px] font-bold text-edge-secondary uppercase tracking-widest hover:opacity-70 transition-opacity">Manage Schedule</button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 mb-8 max-w-md mx-auto">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-[10px] font-bold text-white/30 uppercase tracking-widest">{day}</div>
                    ))}
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const isToday = day === 20;
                      const hasEvent = [2, 12, 20, 25].includes(day);
                      
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                            isToday ? 'bg-edge-primary text-white' : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xs font-bold">{day}</span>
                          {hasEvent && !isToday && (
                            <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-edge-secondary" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">Upcoming Events</h3>
                    {[
                      { title: 'Privacy Audit', time: '10:00 AM', type: 'System' },
                      { title: 'Neural Core Sync', time: '02:30 PM', type: 'Optimization' }
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-edge-secondary/10 flex items-center justify-center text-edge-secondary">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{event.title}</p>
                            <p className="text-[10px] text-white/40">{event.type}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-white/60">{event.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold">System Notifications</h2>
                  <button className="text-[10px] font-bold text-edge-secondary uppercase tracking-widest hover:opacity-70 transition-opacity">Clear All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Security Update', desc: 'Neural engine definitions updated to v4.2.8', time: 'Just now', icon: Shield, color: 'text-emerald-400' },
                    { title: 'High NPU Usage', desc: 'Background optimization task completed successfully.', time: '12m ago', icon: Cpu, color: 'text-edge-secondary' },
                    { title: 'Privacy Alert', desc: 'Blocked 12 cross-site tracking attempts in last hour.', time: '45m ago', icon: Lock, color: 'text-edge-primary' },
                    { title: 'System Backup', desc: 'Encrypted local backup completed at 3:00 AM.', time: '4h ago', icon: CloudUpload, color: 'text-white/40' },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${notif.color}`}>
                        <notif.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-bold">{notif.title}</h3>
                          <span className="text-[10px] text-white/20 font-mono">{notif.time}</span>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed">{notif.desc}</p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-edge-secondary opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'assistant' && (
              <motion.div 
                key="assistant"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-[500px] md:h-[600px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
              >
                <div className="p-4 md:p-6 border-bottom border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src="/favicon.png" alt="Edge Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Edge Assistant</h3>
                      <p className="text-[10px] text-emerald-400 font-mono">● Local Engine Ready</p>
                    </div>
                  </div>
                  <Lock size={14} className="text-white/30" />
                </div>

                <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 md:space-y-6">
                  <div className="flex gap-3 max-w-[90%] md:max-w-[80%]">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src="/favicon.png" alt="Edge Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4 text-xs md:text-sm leading-relaxed">
                      Hello! I'm your on-device assistant. I can help you with tasks while keeping your data 100% private. What can I do for you today?
                    </div>
                  </div>
                  
                  <div className="flex gap-3 max-w-[90%] md:max-w-[80%] ml-auto flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-edge-primary/20 flex-shrink-0 flex items-center justify-center text-edge-primary">
                      <Smartphone size={16} />
                    </div>
                    <div className="bg-edge-primary/20 border border-edge-primary/30 rounded-2xl p-3 md:p-4 text-xs md:text-sm leading-relaxed">
                      Can you summarize my recent notifications without sending them to the cloud?
                    </div>
                  </div>

                  <div className="flex gap-3 max-w-[90%] md:max-w-[80%]">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src="/favicon.png" alt="Edge Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4 text-xs md:text-sm leading-relaxed">
                      Of course. Processing your local notification database now... I see 3 important updates from your team and a reminder about your flight. All analysis was performed locally on the NPU.
                    </div>
                  </div>

                  {/* Store Connectivity Section */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-edge-secondary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Store Connectivity</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-tighter ${isLocalOnly ? 'bg-red-400/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                        {isLocalOnly ? 'Offline' : 'Online'}
                      </div>
                    </div>
                    
                    {isLocalOnly ? (
                      <div className="text-center py-2">
                        <p className="text-[10px] text-white/30 mb-3">Switch to Hybrid mode to connect to App Stores and load new applications.</p>
                        <button 
                          onClick={() => setIsLocalOnly(false)}
                          className="px-4 py-2 bg-edge-primary/20 hover:bg-edge-primary/30 border border-edge-primary/30 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                        >
                          Go Online
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a href="https://apple.com/app-store" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl transition-all group">
                          <Apple size={14} className="group-hover:text-edge-secondary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">App Store</span>
                        </a>
                        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-black/40 hover:bg-black/60 border border-white/10 rounded-xl transition-all group">
                          <Play size={14} className="group-hover:text-edge-secondary" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Play Store</span>
                        </a>
                        <button className="sm:col-span-2 flex items-center justify-center gap-2 py-2.5 bg-edge-primary/20 hover:bg-edge-primary/30 border border-edge-primary/30 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest">
                          <CloudUpload size={14} />
                          Load Online Apps
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 md:p-6 bg-black/20 border-t border-white/10">
                  <div className="flex gap-2 mb-3 md:mb-4 overflow-x-auto pb-2 no-scrollbar">
                    <button className="flex-shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                      <Mic size={10} className="text-edge-secondary" />
                      Audio
                    </button>
                    <button className="flex-shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                      <Video size={10} className="text-edge-primary" />
                      Video
                    </button>
                    <button className="flex-shrink-0 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                      <Globe size={10} className="text-emerald-400" />
                      Web Context
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask anything..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 md:py-4 pl-4 md:pl-6 pr-12 md:pr-14 text-xs md:text-sm focus:outline-none focus:border-edge-secondary/50 transition-all"
                    />
                    <button className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-edge-secondary rounded-xl flex items-center justify-center text-edge-bg hover:scale-105 transition-all">
                      <Zap size={16} className="md:w-[18px] md:h-[18px]" />
                    </button>
                  </div>
                  <div className="flex justify-center gap-4 md:gap-6 mt-3 md:mt-4">
                    <button className="text-[9px] md:text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1.5 uppercase tracking-widest font-bold transition-colors">
                      <Mic size={10} className="md:w-3 md:h-3" /> Voice
                    </button>
                    <button className="text-[9px] md:text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1.5 uppercase tracking-widest font-bold transition-colors">
                      <Video size={10} className="md:w-3 md:h-3" /> Video
                    </button>
                    <button className="text-[9px] md:text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1.5 uppercase tracking-widest font-bold transition-colors">
                      <ImageIcon size={10} className="md:w-3 md:h-3" /> Image
                    </button>
                    <button className="text-[9px] md:text-[10px] text-white/30 hover:text-white/60 flex items-center gap-1.5 uppercase tracking-widest font-bold transition-colors">
                      <Search size={10} className="md:w-3 md:h-3" /> Search
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div 
                key="privacy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center text-center gap-6"
              >
                <div className="w-24 h-24 bg-emerald-400/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Shield size={48} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Privacy Vault Active</h2>
                  <p className="text-white/40 max-w-md mx-auto">Your biometric data, training logs, and personal identifiers are encrypted with 256-bit hardware keys and never leave the secure enclave.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-white/30 uppercase font-mono mb-1">Encrypted Data</p>
                    <p className="text-lg font-bold">12.4 GB</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-white/30 uppercase font-mono mb-1">Last Audit</p>
                    <p className="text-lg font-bold">Now</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">System Configuration</h2>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Build 2026.03.20</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Network & Connectivity */}
                  <SettingsSection title="Network & Connectivity" icon={Wifi}>
                    <SettingItem label="Wi-Fi" sub="Connected to Edge_Secure_5G" control={<Toggle active={true} />} />
                    <SettingItem label="Bluetooth" sub="3 devices paired" control={<Toggle active={true} />} />
                    <SettingItem label="Airplane Mode" control={<Toggle active={false} />} />
                    <SettingItem label="Mobile Data" sub="LTE / 5G Auto" control={<Toggle active={true} />} />
                    <SettingItem label="Hotspot" sub="Personal Hotspot Off" control={<Toggle active={false} />} />
                  </SettingsSection>

                  {/* Display & Brightness */}
                  <SettingsSection title="Display & Brightness" icon={Sun}>
                    <SettingItem label="Appearance" sub="Dark Mode Active" control={<div className="flex gap-2 bg-black/40 p-1 rounded-lg"><Moon size={12} className="text-edge-secondary" /><Sun size={12} className="text-white/20" /></div>} />
                    <SettingItem label="Brightness" control={<Slider value={75} />} />
                    <SettingItem label="Adaptive Brightness" control={<Toggle active={true} />} />
                    <SettingItem label="Font Size" sub="Medium" control={<ChevronRight size={14} className="text-white/20" />} />
                    <SettingItem label="Screen Timeout" sub="2 Minutes" control={<ChevronRight size={14} className="text-white/20" />} />
                  </SettingsSection>

                  {/* Sound & Vibration */}
                  <SettingsSection title="Sound & Vibration" icon={Volume2}>
                    <SettingItem label="Media Volume" control={<Slider value={60} />} />
                    <SettingItem label="Ringtone" sub="Edge_Digital_Pulse" control={<ChevronRight size={14} className="text-white/20" />} />
                    <SettingItem label="Notification Sound" sub="Minimal_Chime" control={<ChevronRight size={14} className="text-white/20" />} />
                    <SettingItem label="Do Not Disturb" sub="Off" control={<Toggle active={false} />} />
                  </SettingsSection>

                  {/* Security & Privacy */}
                  <SettingsSection title="Security & Privacy" icon={Lock}>
                    <SettingItem label="Lock Screen" sub="Fingerprint + PIN" control={<Fingerprint size={14} className="text-edge-secondary" />} />
                    <SettingItem label="Find My Device" sub="Active" control={<Toggle active={true} />} />
                    <SettingItem label="App Permissions" sub="Manage 42 apps" control={<ChevronRight size={14} className="text-white/20" />} />
                    <SettingItem label="Face Recognition" sub="Configured" control={<UserCheck size={14} className="text-emerald-400" />} />
                  </SettingsSection>

                  {/* Battery & Storage */}
                  <SettingsSection title="Battery & Storage" icon={BatteryCharging}>
                    <SettingItem label="Fast Charging" sub="Enabled" control={<Toggle active={true} />} />
                    <SettingItem label="Battery Saver" sub="Auto at 15%" control={<Toggle active={false} />} />
                    <SettingItem label="Storage Optimization" sub="12.4 GB Free" control={<button className="text-[10px] font-bold text-edge-secondary uppercase tracking-wider">Optimize</button>} />
                    <SettingItem label="Clear Cache" control={<Trash2 size={14} className="text-white/20 hover:text-red-400 cursor-pointer" />} />
                  </SettingsSection>

                  {/* Accounts & Backup */}
                  <SettingsSection title="Accounts & Backup" icon={User}>
                    <SettingItem label="Cloud Account" sub="et@edgephone.ai" control={<div className="w-6 h-6 rounded-full bg-edge-primary/20 flex items-center justify-center text-edge-primary text-[10px] font-bold">ET</div>} />
                    <SettingItem label="Photo Sync" sub="Last synced 2m ago" control={<Toggle active={true} />} />
                    <SettingItem label="App Data Backup" sub="Daily at 3:00 AM" control={<CloudUpload size={14} className="text-white/20" />} />
                  </SettingsSection>
                </div>

                {/* Advanced System Info */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-white/50">Neural Core Diagnostics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Frequency', value: '3.8 GHz' },
                      { label: 'NPU Temp', value: '42°C' },
                      { label: 'Model', value: 'Edge-Llama' },
                      { label: 'Isolation', value: 'Active' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-[8px] text-white/30 uppercase font-mono">{stat.label}</p>
                        <p className="text-xs font-bold text-edge-secondary">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Branding */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Logo" className="w-5 h-5 rounded-md" />
          <span className="text-xs font-mono uppercase tracking-[0.2em]">EdgePhone © 2026</span>
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-edge-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-edge-secondary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-edge-secondary transition-colors">Hardware Specs</a>
        </div>
      </footer>
    </div>
  );
}
