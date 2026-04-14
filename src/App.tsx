/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FilesetResolver, LlmInference } from '@mediapipe/tasks-genai';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Cpu,
  Zap,
  Activity,
  Settings,
  Lock,
  Wifi,
  WifiOff,
  Battery,
  Smartphone,
  Globe,
  Mic,
  Phone,
  MessageCircle,
  Image as ImageIcon,
  Search,
  Apple,
  Play,
  Video,
  CloudUpload,
  ChevronRight,
  Calendar,
  Clock,
  Volume2,
  Bell,
  BatteryCharging,
  HardDrive,
  Trash2,
  User,
  Sun,
  Moon,
  Fingerprint,
  UserCheck,
  MapPin,
  Eye,
} from 'lucide-react';

// ─── Reusable Components ────────────────────────────────────────────────────

const Toggle = ({ active, onToggle }: { active: boolean; onToggle?: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${
      active ? 'bg-edge-secondary' : 'bg-white/15'
    }`}
  >
    <div
      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
        active ? 'left-5' : 'left-0.5'
      }`}
    />
  </button>
);

const Slider = ({ value }: { value: number }) => (
  <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
    <div className="h-full bg-gradient-to-r from-edge-primary to-edge-secondary rounded-full" style={{ width: `${value}%` }} />
  </div>
);

const MetricCard = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}) => (
  <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex flex-col gap-2">
    <div className="flex items-center gap-1.5 text-white/40">
      <Icon size={13} style={{ color }} />
      <span className="text-[10px] font-mono uppercase tracking-wider">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold tracking-tight">{value}</span>
      {unit && <span className="text-[10px] text-white/30 font-mono">{unit}</span>}
    </div>
  </div>
);

const SettingsRow = ({
  label,
  sub,
  control,
  icon: Icon,
  iconColor,
}: {
  label: string;
  sub?: string;
  control: React.ReactNode;
  icon?: any;
  iconColor?: string;
}) => (
  <div className="flex items-center gap-3 py-3.5 border-b border-white/5 last:border-0 active:bg-white/5 rounded-xl -mx-2 px-2 transition-colors">
    {Icon && (
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${iconColor}22` }}
      >
        <Icon size={16} style={{ color: iconColor }} />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{label}</p>
      {sub && <p className="text-[11px] text-white/35 truncate">{sub}</p>}
    </div>
    <div className="flex-shrink-0">{control}</div>
  </div>
);

const SettingsGroup = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <div className="mb-2">
    {title && (
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 px-4 mb-1 mt-5">
        {title}
      </p>
    )}
    <div className="bg-white/5 rounded-2xl px-4 border border-white/8">{children}</div>
  </div>
);

// ─── Status Bar ─────────────────────────────────────────────────────────────

const StatusBar = ({ time, isOnline }: { time: string; isOnline: boolean }) => (
  <div className="flex items-center justify-between px-6 pt-4 pb-1 text-white text-xs font-semibold flex-shrink-0">
    <span className="text-[13px] font-bold tracking-tight">{time}</span>
    <div className="flex items-center gap-1.5">
      {isOnline ? (
        <>
          <div className="flex gap-0.5 items-end h-3">
            {[2, 3, 4, 5].map((h, i) => (
              <div key={i} className="w-0.5 rounded-full bg-white" style={{ height: h * 2.5 }} />
            ))}
          </div>
          <Wifi size={13} />
        </>
      ) : (
        <WifiOff size={13} className="text-white/40" />
      )}
      <div className="flex items-center gap-0.5 ml-0.5">
        <div className="relative w-6 h-3 border border-white rounded-sm">
          <div className="absolute inset-0.5 right-0.5 bg-white rounded-[1px]" style={{ width: '80%' }} />
        </div>
        <div className="w-0.5 h-1.5 bg-white/50 rounded-r-sm" />
      </div>
    </div>
  </div>
);

// ─── Bottom Navigation ───────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', icon: Activity, label: 'Home' },
  { id: 'mobile', icon: Smartphone, label: 'Apps' },
  { id: 'assistant', icon: null, label: '' }, // special AI button
  { id: 'privacy', icon: Shield, label: 'Privacy' },
  { id: 'settings', icon: Settings, label: 'System' },
];

const BottomNav = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (id: string) => void;
}) => (
  <div className="flex-shrink-0 flex items-center justify-between px-3 pt-2 border-t border-white/8 bg-edge-bg/95 backdrop-blur-2xl pb-safe" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
    {navItems.map((item) => {
      const isAI = item.id === 'assistant';
      const isActive = activeTab === item.id;
      return (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${
            isAI ? 'relative -top-5 scale-110' : 'flex-1'
          }`}
          style={{ minWidth: 56, minHeight: 56 }}
        >
          {isAI ? (
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-br from-edge-primary to-edge-secondary shadow-[0_0_24px_rgba(106,0,244,0.5)]'
                  : 'bg-gradient-to-br from-edge-primary/80 to-edge-secondary/80 shadow-[0_0_16px_rgba(106,0,244,0.3)]'
              }`}
            >
              <img src="/favicon.png" alt="AI" className="w-8 h-8 object-contain" />
            </div>
          ) : (
            <div className={`flex flex-col flex-1 items-center justify-center w-full px-2 py-1.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-edge-secondary/15' : 'hover:bg-white/5 active:scale-95'}`}>
              <div className="mb-0.5">
                {item.icon && (
                  <item.icon
                    size={24}
                    className={isActive ? 'text-edge-secondary drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]' : 'text-white/40'}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-edge-secondary' : 'text-white/30'
                }`}
              >
                {item.label}
              </span>
            </div>
          )}
        </button>
      );
    })}
  </div>
);

// ─── Dashboard Tab ───────────────────────────────────────────────────────────

const DashboardTab = ({
  npuUsage,
  privacyScore,
  isOnline,
  setIsOnline,
}: {
  npuUsage: number;
  privacyScore: number;
  isOnline: boolean;
  setIsOnline: (v: boolean) => void;
}) => (
  <div className="flex flex-col gap-5">
    {/* Hero AI Visualizer */}
    <div className="relative h-52 bg-gradient-to-br from-edge-primary/25 to-edge-secondary/8 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute w-56 h-56 border border-edge-secondary/15 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute w-40 h-40 border border-edge-primary/20 rounded-full border-dashed"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 30px rgba(106,0,244,0.3)', '0 0 60px rgba(0,229,255,0.5)', '0 0 30px rgba(106,0,244,0.3)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-24 h-24 bg-gradient-to-br from-edge-primary to-edge-secondary rounded-full flex items-center justify-center overflow-hidden z-10"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          <img src="/favicon.png" alt="Edge Core" className="w-12 h-12 object-contain relative z-10" />
        </motion.div>
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          const radius = 75 + (i % 3) * 12;
          return (
            <motion.div
              key={i}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{ duration: 14 + i * 2, repeat: Infinity, ease: 'linear' }}
              className="absolute"
              style={{ width: radius * 2, height: radius * 2 }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: 2.5 + (i % 2),
                  height: 2.5 + (i % 2),
                  backgroundColor: i % 2 === 0 ? '#00E5FF' : '#6A00F4',
                  boxShadow: `0 0 ${6 + i}px ${i % 2 === 0 ? '#00E5FF' : '#6A00F4'}`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div>
          <p className="text-sm font-bold">Neural Core Active</p>
          <p className="text-[10px] text-white/35 font-mono uppercase tracking-wide">12.4T ops/sec</p>
        </div>
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
          <div className="text-right">
            <p className="text-[9px] text-white/30 font-mono uppercase">Latency</p>
            <p className="text-xs font-bold text-edge-secondary">0.4ms</p>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <button onClick={() => setIsOnline(!isOnline)} className="text-right">
            <p className="text-[9px] text-white/30 font-mono uppercase">Mode</p>
            <p className={`text-xs font-bold ${isOnline ? 'text-emerald-400' : 'text-white/60'}`}>
              {isOnline ? 'ONLINE' : 'LOCAL'}
            </p>
          </button>
        </div>
      </div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 gap-3">
      <MetricCard icon={Cpu} label="NPU Load" value={npuUsage} unit="%" color="#00E5FF" />
      <MetricCard icon={Zap} label="Power" value="Low" color="#6A00F4" />
      <MetricCard icon={Shield} label="Privacy" value={privacyScore} unit="/100" color="#10b981" />
      <MetricCard icon={Activity} label="Memory" value="4.2" unit="GB" color="#f59e0b" />
    </div>

    {/* AI Log */}
    <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <p className="text-sm font-bold">Intelligence Log</p>
        <button className="text-[11px] text-edge-secondary font-semibold">View All</button>
      </div>
      {[
        { task: 'Video Stream Analysis', time: 'Just now', icon: Video, status: 'NPU Active', statusColor: 'text-edge-secondary' },
        { task: 'Real-time Voice Translation', time: '2m ago', icon: Mic, status: 'Encrypted', statusColor: 'text-emerald-400' },
        { task: 'Photo Object Recognition', time: '15m ago', icon: ImageIcon, status: 'Local', statusColor: 'text-white/40' },
        { task: 'Semantic Search', time: '1h ago', icon: Search, status: 'Private', statusColor: 'text-white/40' },
      ].map((log, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 last:border-0 active:bg-white/5 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-edge-primary/10 flex items-center justify-center text-edge-primary flex-shrink-0">
            <log.icon size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium truncate">{log.task}</p>
            <p className="text-[10px] text-white/30 font-mono uppercase">{log.time}</p>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${log.statusColor}`}>{log.status}</span>
        </div>
      ))}
    </div>

    {/* Privacy Score Card */}
    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-emerald-500/15 rounded-2xl flex items-center justify-center">
        <Shield size={24} className="text-emerald-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">Privacy Score</p>
        <p className="text-[11px] text-white/40">All 42 apps checked · Zero leaks detected</p>
      </div>
      <span className="text-2xl font-black text-emerald-400">{privacyScore}</span>
    </div>
  </div>
);

// ─── Mobile Services Tab ─────────────────────────────────────────────────────

const MobileTab = () => (
  <div className="flex flex-col gap-5">
    <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">Quick Actions</p>
    <div className="grid grid-cols-2 gap-3">
      {[
        { icon: Phone, label: 'Dialer', color: '#00E5FF', bg: '#00E5FF15' },
        { icon: MessageCircle, label: 'Messages', color: '#6A00F4', bg: '#6A00F415' },
        { icon: ImageIcon, label: 'Gallery', color: '#f59e0b', bg: '#f59e0b15' },
        { icon: Globe, label: 'Browser', color: '#10b981', bg: '#10b98115' },
        { icon: MapPin, label: 'Locate', color: '#ec4899', bg: '#ec489915' },
        { icon: Music, label: 'Media', color: '#8b5cf6', bg: '#8b5cf615' },
      ].map((app, i) => (
        <button
          key={i}
          className="flex items-center gap-3 p-4 bg-white/5 border border-white/8 rounded-2xl active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: app.bg }}>
            <app.icon size={20} style={{ color: app.color }} />
          </div>
          <span className="text-sm font-semibold">{app.label}</span>
        </button>
      ))}
    </div>

    {/* Calls */}
    <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <p className="text-sm font-bold">Recent Calls</p>
        <button className="text-[11px] text-edge-secondary font-semibold">All Calls</button>
      </div>
      {[
        { name: 'John Doe', time: '2m ago', type: 'incoming', color: 'text-emerald-400' },
        { name: '+1 (555) 0123', time: '1h ago', type: 'outgoing', color: 'text-edge-secondary' },
        { name: 'Sarah Miller', time: 'Yesterday', type: 'missed', color: 'text-red-400' },
      ].map((call, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 last:border-0">
          <div className="w-9 h-9 rounded-full bg-edge-primary/10 flex items-center justify-center text-edge-primary flex-shrink-0">
            <User size={16} />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium">{call.name}</p>
            <p className={`text-[10px] uppercase font-mono ${call.color}`}>{call.type} · {call.time}</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <Phone size={14} className="text-white/40" />
          </button>
        </div>
      ))}
    </div>

    {/* Calendar */}
    <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
        <p className="text-sm font-bold">Calendar</p>
        <Calendar size={16} className="text-edge-primary" />
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-7 gap-1 mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center text-[9px] font-bold text-white/25 uppercase">{d}</div>
          ))}
          {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const isToday = day === 24;
            const hasEvent = [3, 10, 24, 28].includes(day);
            return (
              <div
                key={i}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative text-xs font-bold transition-all ${
                  isToday ? 'bg-edge-primary text-white shadow-[0_0_12px_rgba(106,0,244,0.4)]' : 'hover:bg-white/8 text-white/60'
                }`}
              >
                {day}
                {hasEvent && !isToday && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-edge-secondary" />
                )}
              </div>
            );
          })}
        </div>
        <div className="space-y-2">
          {[
            { title: 'Privacy Audit', time: '10:00 AM' },
            { title: 'Neural Core Sync', time: '02:30 PM' },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-1 h-8 rounded-full bg-edge-secondary flex-shrink-0" />
              <div>
                <p className="text-xs font-bold">{ev.title}</p>
                <p className="text-[10px] text-white/35 font-mono">{ev.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Notifications Tab ────────────────────────────────────────────────────────

const NotificationsTab = () => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">Today</p>
      <button className="text-[11px] text-edge-secondary font-semibold">Clear All</button>
    </div>
    <div className="flex flex-col gap-2">
      {[
        { title: 'Security Update', desc: 'Neural engine definitions updated to v4.2.8', time: 'Now', icon: Shield, color: '#10b981' },
        { title: 'High NPU Usage', desc: 'Background optimization task completed.', time: '12m', icon: Cpu, color: '#00E5FF' },
        { title: 'Privacy Alert', desc: 'Blocked 12 cross-site tracking attempts.', time: '45m', icon: Lock, color: '#6A00F4' },
        { title: 'System Backup', desc: 'Encrypted local backup completed at 3:00 AM.', time: '4h', icon: CloudUpload, color: '#ffffff60' },
        { title: 'Battery Charged', desc: 'Device fully charged. Charger can be unplugged.', time: '6h', icon: BatteryCharging, color: '#f59e0b' },
      ].map((notif, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-4 bg-white/5 border border-white/8 rounded-2xl active:bg-white/8 transition-colors"
        >
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${notif.color}20` }}
          >
            <notif.icon size={18} style={{ color: notif.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className="text-[13px] font-bold leading-tight">{notif.title}</p>
              <span className="text-[10px] text-white/25 font-mono flex-shrink-0 mt-0.5">{notif.time}</span>
            </div>
            <p className="text-[12px] text-white/40 leading-snug">{notif.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Assistant Tab ────────────────────────────────────────────────────────────

const AssistantTab = ({ isOnline, setIsOnline, messages, setMessages }: { isOnline: boolean; setIsOnline: (v: boolean) => void; messages: any[]; setMessages: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [engine, setEngine] = useState<LlmInference | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [modelError, setModelError] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating, isOnline, isModelLoading]);

  useEffect(() => {
    if (isOnline || engine || isModelLoading) return;

    const initModel = async () => {
      setIsModelLoading(true);
      setModelError('');
      try {
        const genai = await FilesetResolver.forGenAiTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm"
        );
        
        const llmInference = await LlmInference.createFromOptions(genai, {
          baseOptions: {
            modelAssetPath: "/models/gemma-2b-it-gpu-int4.bin"
          },
          maxTokens: 512,
          topK: 40,
          temperature: 0.8,
          randomSeed: 101,
        });
        
        setEngine(llmInference);
      } catch (err: any) {
        console.error("Local LLM error:", err);
        setModelError("Model missing in /public/models/");
      } finally {
        setIsModelLoading(false);
      }
    };

    initModel();
  }, [isOnline, engine, isModelLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isGenerating) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsGenerating(true);

    if (isOnline) {
      try {
        const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing API Key");

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMsg }] }]
          })
        });
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        
        setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      } catch (err) {
        setMessages((prev) => [...prev, { role: 'assistant', text: "Error: Could not connect to Google Cloud." }]);
      }
    } else {
      if (!engine) {
        setMessages((prev) => [...prev, { role: 'assistant', text: isModelLoading ? "Local model is currently downloading (approx 1.3GB). Please wait..." : "Error: /public/models/gemma-2b-it-gpu-int4.bin not found. Please download it from Kaggle." }]);
      } else {
        try {
          const gemmaPrompt = `<start_of_turn>user\n${userMsg}<end_of_turn>\n<start_of_turn>model\n`;
          let reply = await engine.generateResponse(gemmaPrompt);
          setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
        } catch (err) {
          setMessages((prev) => [...prev, { role: 'assistant', text: "Error: Local edge inference failed." }]);
        }
      }
    }
    
    setIsGenerating(false);
  };

  return (
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex items-center gap-3 pb-4 border-b border-white/8 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-edge-primary/30 flex-shrink-0">
        <img src="/favicon.png" alt="Edge AI" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">Edge Assistant</p>
        <p className="text-[11px] font-mono flex items-center gap-1">
          {isOnline ? (
            <><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> <span className="text-emerald-400">Cloud Engine Ready</span></>
          ) : isModelLoading ? (
            <><span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> <span className="text-yellow-400">Loading Weights (1.3GB)...</span></>
          ) : modelError ? (
            <><span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" /> <span className="text-red-400">Model Missing: Add to /public/models/</span></>
          ) : engine ? (
            <><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> <span className="text-emerald-400">Local Engine Ready</span></>
          ) : (
            <><span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40" /> <span className="text-white/40">Offline</span></>
          )}
        </p>
      </div>
      {isOnline ? <Globe size={14} className="text-emerald-400" /> : <Lock size={14} className="text-white/25" />}
    </div>

    {/* Messages */}
    <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-4 scroll-touch" ref={scrollRef}>
      {messages.map((msg, idx) => (
        msg.role === 'assistant' ? (
          <div key={idx} className="flex gap-2 max-w-[85%]">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
              <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm p-3 text-[13px] leading-relaxed whitespace-pre-wrap break-words">
              {msg.text}
            </div>
          </div>
        ) : (
          <div key={idx} className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-edge-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
              <User size={12} className="text-edge-primary" />
            </div>
            <div className="bg-edge-primary/20 border border-edge-primary/30 rounded-2xl rounded-tr-sm p-3 text-[13px] leading-relaxed whitespace-pre-wrap break-words">
              {msg.text}
            </div>
          </div>
        )
      ))}
      
      {isGenerating && (
        <div className="flex gap-2 max-w-[85%]">
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
            <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm p-3 flex gap-1 items-center h-10">
             <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
             <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
             <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Store connectivity */}
      <div className="bg-white/5 border border-white/8 rounded-2xl p-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-edge-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">App Stores</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${isOnline ? 'bg-emerald-400/15 text-emerald-400' : 'bg-red-400/15 text-red-400'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        {isOnline ? (
          <div className="grid grid-cols-2 gap-2">
            <a href="https://apple.com/app-store" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-black/40 border border-white/10 rounded-xl active:scale-95 transition-all">
              <Apple size={13} />
              <span className="text-[10px] font-bold uppercase tracking-wide">App Store</span>
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-black/40 border border-white/10 rounded-xl active:scale-95 transition-all">
              <Play size={13} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Play Store</span>
            </a>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[11px] text-white/30 mb-3">Switch to Hybrid mode to browse app stores.</p>
            <button onClick={() => setIsOnline(true)} className="px-5 py-2 bg-edge-primary/20 border border-edge-primary/30 rounded-xl text-[11px] font-bold uppercase tracking-widest active:scale-95 transition-all">
              Go Online
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Input */}
    <div className="flex-shrink-0 pt-3 border-t border-white/8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isGenerating ? "Thinking..." : "Ask anything..."}
          disabled={isGenerating}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
          className="w-full bg-white/8 border border-white/10 rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-edge-secondary/50 transition-all disabled:opacity-50"
          style={{ fontSize: '16px' }}
        />
        <button 
          type="submit" 
          disabled={isGenerating || !inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-edge-secondary rounded-xl flex items-center justify-center text-edge-bg active:scale-90 transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          <Zap size={17} />
        </button>
      </form>
      <div className="flex justify-center gap-6 mt-3">
        {[{ icon: Mic, label: 'Voice' }, { icon: Video, label: 'Video' }, { icon: ImageIcon, label: 'Image' }].map((btn, i) => (
          <button key={i} type="button" className="flex items-center gap-1.5 text-white/30 active:text-white/60 transition-colors">
            <btn.icon size={11} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

// ─── Privacy Tab ──────────────────────────────────────────────────────────────

const PrivacyTab = () => (
  <div className="flex flex-col gap-5">
    {/* Hero */}
    <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/25 rounded-3xl p-6 flex flex-col items-center text-center gap-3">
      <motion.div
        animate={{ boxShadow: ['0 0 20px rgba(16,185,129,0.2)', '0 0 40px rgba(16,185,129,0.4)', '0 0 20px rgba(16,185,129,0.2)'] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="w-20 h-20 bg-emerald-500/15 rounded-full flex items-center justify-center"
      >
        <Shield size={40} className="text-emerald-400" />
      </motion.div>
      <div>
        <p className="text-lg font-black text-emerald-400">Privacy Vault Active</p>
        <p className="text-[12px] text-white/40 mt-1 leading-relaxed">256-bit hardware encryption · Zero cloud exposure</p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full mt-1">
        <div className="bg-black/20 rounded-2xl p-3">
          <p className="text-[10px] text-white/30 font-mono uppercase mb-1">Encrypted</p>
          <p className="text-lg font-black">12.4 GB</p>
        </div>
        <div className="bg-black/20 rounded-2xl p-3">
          <p className="text-[10px] text-white/30 font-mono uppercase mb-1">Last Audit</p>
          <p className="text-lg font-black text-emerald-400">Now</p>
        </div>
      </div>
    </div>

    {/* Permission checks */}
    <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8">
        <p className="text-sm font-bold">Permission Monitor</p>
      </div>
      {[
        { label: 'Camera Access', apps: '3 apps', status: 'Controlled', ok: true },
        { label: 'Location Services', apps: '1 app', status: 'Precise Off', ok: true },
        { label: 'Microphone', apps: '5 apps', status: 'Private', ok: true },
        { label: 'Contacts', apps: '2 apps', status: 'Limited', ok: true },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 last:border-0">
          <div className="flex-1">
            <p className="text-[13px] font-medium">{item.label}</p>
            <p className="text-[10px] text-white/30">{item.apps} with access</p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wide ${item.ok ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {item.status}
          </span>
          <ChevronRight size={14} className="text-white/20" />
        </div>
      ))}
    </div>

    {/* Tracking blocked */}
    <div className="bg-white/5 border border-white/8 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-edge-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
        <Eye size={22} className="text-edge-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">Tracking Blocked</p>
        <p className="text-[11px] text-white/35">48 cross-site trackers blocked today</p>
      </div>
      <span className="text-2xl font-black text-edge-primary">48</span>
    </div>
  </div>
);

// ─── Settings Tab ─────────────────────────────────────────────────────────────

const SettingsTab = () => {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(true);
  const [aod, setAod] = useState(true);
  const [faceId, setFaceId] = useState(true);
  const [fastCharge, setFastCharge] = useState(true);
  const [photoSync, setPhotoSync] = useState(true);

  return (
    <div className="flex flex-col gap-1 pb-4">
      {/* Profile card */}
      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/8 rounded-2xl mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-edge-primary to-edge-secondary flex items-center justify-center text-white text-lg font-black shadow-lg shadow-edge-primary/30">
          ET
        </div>
        <div>
          <p className="text-base font-bold">EdgePhone User</p>
          <p className="text-[12px] text-white/35">et@edgephone.ai</p>
          <p className="text-[11px] text-edge-secondary font-mono mt-0.5">EdgeOS 4.2 · Build 2026.03</p>
        </div>
        <ChevronRight size={18} className="text-white/20 ml-auto" />
      </div>

      <SettingsGroup title="Connectivity">
        <SettingsRow label="Wi-Fi" sub="Edge_Secure_5G" icon={Wifi} iconColor="#00E5FF"
          control={<Toggle active={wifi} onToggle={() => setWifi(!wifi)} />} />
        <SettingsRow label="Bluetooth" sub="3 paired devices" icon={Bluetooth} iconColor="#6A00F4"
          control={<Toggle active={bt} onToggle={() => setBt(!bt)} />} />
        <SettingsRow label="Mobile Data" sub="LTE / 5G Auto" icon={Globe} iconColor="#10b981"
          control={<Toggle active={true} />} />
      </SettingsGroup>

      <SettingsGroup title="Display">
        <SettingsRow label="Brightness" icon={Sun} iconColor="#f59e0b"
          control={<Slider value={75} />} />
        <SettingsRow label="Always-On Display" sub="Energy optimised" icon={Monitor} iconColor="#8b5cf6"
          control={<Toggle active={aod} onToggle={() => setAod(!aod)} />} />
        <SettingsRow label="Font Size" sub="Medium" icon={Type} iconColor="#ffffff60"
          control={<ChevronRight size={16} className="text-white/20" />} />
      </SettingsGroup>

      <SettingsGroup title="Security">
        <SettingsRow label="Face Unlock" sub="Configured" icon={Fingerprint} iconColor="#10b981"
          control={<Toggle active={faceId} onToggle={() => setFaceId(!faceId)} />} />
        <SettingsRow label="App Permissions" sub="42 apps managed" icon={Lock} iconColor="#6A00F4"
          control={<ChevronRight size={16} className="text-white/20" />} />
        <SettingsRow label="Secure Enclave" sub="Active · 256-bit AES" icon={Shield} iconColor="#10b981"
          control={<span className="text-[10px] font-bold text-emerald-400 uppercase">Active</span>} />
      </SettingsGroup>

      <SettingsGroup title="Battery & Storage">
        <SettingsRow label="Fast Charging" sub="Enabled" icon={BatteryCharging} iconColor="#f59e0b"
          control={<Toggle active={fastCharge} onToggle={() => setFastCharge(!fastCharge)} />} />
        <SettingsRow label="Storage" sub="12.4 GB free of 256 GB" icon={HardDrive} iconColor="#ffffff60"
          control={<ChevronRight size={16} className="text-white/20" />} />
        <SettingsRow label="Clear Cache" sub="Tap to free space" icon={Trash2} iconColor="#ef4444"
          control={<ChevronRight size={16} className="text-white/20" />} />
      </SettingsGroup>

      <SettingsGroup title="Backup & Sync">
        <SettingsRow label="Photo Sync" sub="Last synced 2m ago" icon={CloudUpload} iconColor="#00E5FF"
          control={<Toggle active={photoSync} onToggle={() => setPhotoSync(!photoSync)} />} />
        <SettingsRow label="App Data Backup" sub="Daily at 3:00 AM" icon={User} iconColor="#ffffff60"
          control={<ChevronRight size={16} className="text-white/20" />} />
      </SettingsGroup>

      {/* Neural Diagnostics */}
      <div className="mt-3 bg-white/5 border border-white/8 rounded-2xl p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-3">Neural Core Diagnostics</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Frequency', value: '3.8 GHz', color: 'text-edge-secondary' },
            { label: 'NPU Temp', value: '42°C', color: 'text-white' },
            { label: 'Model', value: 'Edge-Llama', color: 'text-edge-primary' },
            { label: 'Isolation', value: 'Active', color: 'text-emerald-400' },
          ].map((s, i) => (
            <div key={i} className="bg-black/20 p-3 rounded-xl">
              <p className="text-[9px] text-white/25 font-mono uppercase">{s.label}</p>
              <p className={`text-xs font-bold mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Missing import placeholder ──────────────────────────────────────────────
const Monitor = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const Type = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
);

const Bluetooth = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/>
  </svg>
);

const Music = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isOnline, setIsOnline] = useState(false);
  const [npuUsage, setNpuUsage] = useState(27);
  const [privacyScore] = useState(98);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState('');
  const [messages, setMessages] = useState<{ role: 'user'|'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm your on-device AI assistant. All processing happens locally on the Neural Processing Unit — your data never leaves this device." }
  ]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setNpuUsage((prev) => Math.min(Math.max(prev + Math.floor(Math.random() * 10) - 5, 5), 85));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    // Full screen background
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center selection:bg-edge-secondary/30">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-edge-primary/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-edge-secondary/8 blur-[160px] rounded-full" />
      </div>

      {/* Phone frame — desktop shows a realistic phone shell */}
      <div className="relative w-full max-w-[390px] mx-auto" style={{ height: '100dvh', maxHeight: 844 }}>
        {/* Phone glass shell — only visible on larger screens */}
        <div className="hidden sm:block absolute -inset-[10px] rounded-[52px] bg-gradient-to-br from-white/10 to-white/3 border-2 border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] pointer-events-none z-50" />
        {/* Side buttons */}
        <div className="hidden sm:block absolute -right-[12px] top-28 w-[3px] h-16 bg-white/10 rounded-full" />
        <div className="hidden sm:block absolute -left-[12px] top-24 w-[3px] h-10 bg-white/10 rounded-full" />
        <div className="hidden sm:block absolute -left-[12px] top-36 w-[3px] h-10 bg-white/10 rounded-full" />

        {/* Phone screen — no border-radius on real mobile, only on desktop frame */}
        <div className="w-full h-full bg-edge-bg sm:rounded-[44px] overflow-hidden flex flex-col relative z-10 sm:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
          {/* Notch */}
          <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50 items-center justify-center gap-2">
            <div className="w-10 h-1.5 rounded-full bg-[#111]" />
            <div className="w-3 h-3 rounded-full bg-[#111] overflow-hidden flex items-center justify-center border border-white/5">
               <div className="w-1 h-1 bg-cyan-900/40 rounded-full" />
            </div>
          </div>

          {/* Status Bar — sm:pt-8 for simulated notch on desktop; pt-safe for real-device notch/Dynamic Island */}
          <div className="sm:pt-8 bg-gradient-to-b from-black/20 to-transparent relative z-40 pt-safe">
            <StatusBar time={currentTime} isOnline={isOnline} />
          </div>

          {/* Page Title */}
          <div className="px-5 pt-1 pb-3 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/25">EdgePhone · On-Device</p>
              <h1 className="text-xl font-black leading-tight tracking-tight">
                {activeTab === 'dashboard' && 'Core Dashboard'}
                {activeTab === 'mobile' && 'Mobile Services'}
                {activeTab === 'notifications' && 'Notifications'}
                {activeTab === 'assistant' && 'AI Assistant'}
                {activeTab === 'privacy' && 'Privacy Vault'}
                {activeTab === 'settings' && 'System Config'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border transition-all ${
                  isOnline
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-white/30'
                }`}
              >
                {isOnline ? 'Hybrid' : 'Local'}
              </div>
              <div className="w-8 h-8 rounded-xl overflow-hidden">
                <img src="/favicon.png" alt="logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 scroll-touch" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2 }}
                className={activeTab === 'assistant' ? 'h-full flex flex-col' : ''}
              >
                {activeTab === 'dashboard' && (
                  <DashboardTab
                    npuUsage={npuUsage}
                    privacyScore={privacyScore}
                    isOnline={isOnline}
                    setIsOnline={setIsOnline}
                  />
                )}
                {activeTab === 'mobile' && <MobileTab />}
                {activeTab === 'notifications' && <NotificationsTab />}
                {activeTab === 'assistant' && (
                  <AssistantTab isOnline={isOnline} setIsOnline={setIsOnline} messages={messages} setMessages={setMessages} />
                )}
                {activeTab === 'privacy' && <PrivacyTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Nav */}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Home Indicator — hidden on real devices since the OS draws its own */}
          <div className="hidden sm:flex justify-center pt-1 pb-2 flex-shrink-0">
            <div className="w-28 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
