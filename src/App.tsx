/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, ShieldCheck, Activity, MapPin } from 'lucide-react';

export default function App() {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const duration = 5 * 60; // 300 seconds
    const STORAGE_KEY = 'gucci_recovery_start_time';
    
    // Get or set the persistent start time
    let storedStartTime = localStorage.getItem(STORAGE_KEY);
    let startTimeMs: number;

    if (!storedStartTime) {
      startTimeMs = Date.now();
      localStorage.setItem(STORAGE_KEY, startTimeMs.toString());
    } else {
      startTimeMs = parseInt(storedStartTime, 10);
    }

    const startTimestamp = new Date(startTimeMs);
    const endTimestamp = new Date(startTimeMs + duration * 1000);

    setStartTime(startTimestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    setEndTime(endTimestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));

    const systemLogs = [
      '[SYSTEM] Memulai protokol pemulihan...',
      '[ANALYSIS] Menjalankan proses analisis mendalam...',
      '[UPGRADE] Mengunduh paket upgrade sistem v2.4.0...',
      '[REPAIR] Melakukan perbaikan pada modul inti...',
      '[CLEANUP] Pembersihan bug dan optimasi cache...',
      '[SECURITY] Memverifikasi enkripsi akun kerja...',
      '[DATABASE] Sinkronisasi database global...',
      '[NETWORK] Menstabilkan koneksi server...',
      '[SYSTEM] Validasi integritas file selesai.',
      '[PROCESS] Menunggu respon koordinator...'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < systemLogs.length) {
        setLogs(prev => [...prev.slice(-4), systemLogs[logIndex]]);
        logIndex++;
      } else {
        logIndex = 0; // Loop logs
      }
    }, 3000);

    const updateProgress = () => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTimeMs) / 1000);
      const newProgress = Math.min((elapsedSeconds / duration) * 100, 100);
      
      setProgress(newProgress);

      if (elapsedSeconds < 30) setStatus('Authenticating...');
      else if (elapsedSeconds < 120) setStatus('Synchronizing Data...');
      else if (elapsedSeconds < 240) setStatus('Processing Transactions...');
      else if (elapsedSeconds < 300) setStatus('Finalizing...');
      else {
        setStatus('Completed');
        clearInterval(timer);
      }
    };

    // Initial update
    updateProgress();

    const timer = setInterval(updateProgress, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#020617] overflow-x-hidden font-sans pt-12 md:pt-20 pb-12">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-400/10 rounded-full animate-spin [animation-duration:20s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-300/5 rounded-full animate-spin [animation-duration:15s] direction-reverse" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Central Globe Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-40 w-full flex justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Globe className="text-blue-500 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]" strokeWidth={0.5} />
          <div className="absolute inset-0 bg-blue-500/10 blur-[60px] md:blur-[100px] rounded-full" />
        </motion.div>
        
        {/* Scanning Line */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.5)] scan-line" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Logo at the Top */}
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-serif tracking-[0.1em] sm:tracking-[0.2em] mb-6 md:mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        >
          GUCCI
        </motion.h1>

        {/* Main Content Area - Hidden when completed */}
        <AnimatePresence mode="wait">
          {progress < 100 ? (
            <motion.div
              key="active-process"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* Time Boxes - Tighter spacing */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-xl">
                {/* Start Time */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center shadow-xl"
                >
                  <div className="flex items-center gap-2 text-white/60 uppercase tracking-widest text-[10px] md:text-xs font-medium mb-1">
                    <Activity size={12} className="text-blue-400" />
                    MULAI
                  </div>
                  <div className="text-3xl md:text-4xl font-serif text-white">
                    {startTime || '00:00'}
                  </div>
                </motion.div>

                {/* End Time */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col items-center justify-center shadow-xl"
                >
                  <div className="flex items-center gap-2 text-white/60 uppercase tracking-widest text-[10px] md:text-xs font-medium mb-1">
                    <ShieldCheck size={12} className="text-green-400" />
                    SELESAI
                  </div>
                  <div className="text-3xl md:text-4xl font-serif text-white">
                    {endTime || '00:00'}
                  </div>
                </motion.div>
              </div>

              {/* Instruction Text - Tighter spacing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mb-6 md:mb-8"
              >
                <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-white/80 tracking-wide px-4">
                  Proses dilakukan secara otomatis dan telah tersinkronisasi ke dalam akun kerja. Silakan menunggu hingga proses ini selesai, yang diperkirakan memakan waktu sekitar 5 menit.
                </p>
              </motion.div>

              {/* System Process Animation */}
              <div className="w-full max-w-xs sm:max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 mb-3 overflow-hidden">
                <motion.div 
                  className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>
              
              <div className="flex items-center gap-2 text-blue-400 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest mb-4">
                <Cpu size={12} className="animate-pulse" />
                <span>{status}</span>
                <span className="ml-1">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completion-message"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="p-8 md:p-12 bg-green-500/10 border border-green-500/30 rounded-2xl md:rounded-[2.5rem] backdrop-blur-xl shadow-[0_0_50px_rgba(34,197,94,0.2)] max-w-2xl w-full"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40">
                  <ShieldCheck size={32} className="text-green-400" />
                </div>
              </div>
              <h2 className="text-green-400 font-bold text-2xl md:text-4xl tracking-tight text-center mb-4">
                Akun sudah berhasil di pulihkan.
              </h2>
              <p className="text-green-400/90 font-medium text-lg md:text-2xl tracking-wide text-center">
                Silahkan hubungi Kordinator Grup.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Console / Logs - Hidden when completed */}
        <AnimatePresence>
          {progress < 100 && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-10 md:mt-16 w-full max-w-lg bg-black/40 border border-blue-500/20 rounded-lg p-4 font-mono text-[10px] md:text-xs text-blue-300/80 text-left shadow-inner"
            >
              <div className="flex items-center gap-2 mb-2 border-b border-blue-500/10 pb-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="ml-2 text-[8px] uppercase tracking-widest opacity-50">System Console v2.0</span>
              </div>
              <div className="space-y-1 h-24 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div
                      key={log + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-2"
                    >
                      <span className="text-blue-500/50">[{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-2 text-[8px] text-blue-400/40 animate-pulse">
                &gt; STATUS: {status.toUpperCase()} | PROGRESS: {Math.round(progress)}% | MEMORY: 4.2GB/16GB
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Icons for Tech Vibe - Hidden when completed */}
      <AnimatePresence>
        {progress < 100 && (
          <>
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-10 text-white/20 flex flex-col gap-4"
            >
              <Activity size={24} />
              <Activity size={24} className="opacity-50" />
              <Activity size={24} className="opacity-25" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 right-10 text-white/20 flex flex-col gap-4 items-end"
            >
              <MapPin size={24} />
              <div className="text-[10px] font-mono tracking-tighter">LAT: 34.0522 N</div>
              <div className="text-[10px] font-mono tracking-tighter">LNG: 118.2437 W</div>
            </motion.div>

            {/* Corner Accents */}
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/30 m-8 rounded-tl-3xl" 
            />
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/30 m-8 rounded-br-3xl" 
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
