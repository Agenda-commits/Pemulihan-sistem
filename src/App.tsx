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

  useEffect(() => {
    const now = new Date();
    const startStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const end = new Date(now.getTime() + 5 * 60000);
    const endStr = end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    setStartTime(startStr);
    setEndTime(endStr);

    // Progress simulation for 5 minutes (300 seconds)
    const duration = 5 * 60; // seconds
    const interval = 1000; // 1 second
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += 1;
      const newProgress = (elapsed / duration) * 100;
      setProgress(Math.min(newProgress, 100));

      if (elapsed < 30) setStatus('Authenticating...');
      else if (elapsed < 120) setStatus('Synchronizing Data...');
      else if (elapsed < 240) setStatus('Processing Transactions...');
      else if (elapsed < 300) setStatus('Finalizing...');
      else {
        setStatus('Completed');
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#020617] overflow-hidden font-sans pt-12 md:pt-20">
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
          <Globe className="text-blue-500 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]" strokeWidth={0.5} />
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
          className="text-6xl sm:text-8xl md:text-[10rem] font-serif tracking-[0.15em] sm:tracking-[0.2em] mb-6 md:mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        >
          GUCCI
        </motion.h1>

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

        {/* Completion Message */}
        <AnimatePresence>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 md:p-5 bg-green-500/10 border border-green-500/30 rounded-xl md:rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            >
              <p className="text-green-400 font-bold text-lg md:text-xl tracking-wide">
                Proses telah selesai, silahkan hubungi Kordinator Grup
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Icons for Tech Vibe */}
      <div className="absolute bottom-10 left-10 text-white/20 flex flex-col gap-4">
        <Activity size={24} />
        <Activity size={24} className="opacity-50" />
        <Activity size={24} className="opacity-25" />
      </div>
      
      <div className="absolute bottom-10 right-10 text-white/20 flex flex-col gap-4 items-end">
        <MapPin size={24} />
        <div className="text-[10px] font-mono tracking-tighter">LAT: 34.0522 N</div>
        <div className="text-[10px] font-mono tracking-tighter">LNG: 118.2437 W</div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/30 m-8 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500/30 m-8 rounded-br-3xl" />
    </div>
  );
}
