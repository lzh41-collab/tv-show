import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RetroTV } from './components/RetroTV';
import { TapeStack } from './components/TapeStack';
import { CHANNELS, INITIAL_VOLUME } from './constants';
import { TVState } from './types';

function App() {
  const [tvState, setTvState] = useState<TVState>({
    isOn: false,
    channelIndex: 0,
    volume: INITIAL_VOLUME,
    isStatic: false,
  });

  // Sound effects refs (optional, but good for polish)
  const staticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePower = useCallback(() => {
    setTvState(prev => ({ ...prev, isOn: !prev.isOn }));
  }, []);

  const handleVolume = useCallback((val: number) => {
    setTvState(prev => ({ ...prev, volume: val }));
  }, []);

  const triggerStatic = () => {
    setTvState(prev => ({ ...prev, isStatic: true }));
    
    if (staticTimeoutRef.current) clearTimeout(staticTimeoutRef.current);
    
    staticTimeoutRef.current = setTimeout(() => {
      setTvState(prev => ({ ...prev, isStatic: false }));
    }, 600); // 600ms of static when changing channels
  };

  const handleNextChannel = useCallback(() => {
    if (!tvState.isOn) return;
    triggerStatic();
    setTvState(prev => ({
      ...prev,
      channelIndex: (prev.channelIndex + 1) % CHANNELS.length
    }));
  }, [tvState.isOn]);

  const handlePrevChannel = useCallback(() => {
    if (!tvState.isOn) return;
    triggerStatic();
    setTvState(prev => ({
      ...prev,
      channelIndex: (prev.channelIndex - 1 + CHANNELS.length) % CHANNELS.length
    }));
  }, [tvState.isOn]);

  const handleSelectChannel = useCallback((id: string) => {
    if (!tvState.isOn) {
        // If TV is off, just set channel but maybe blink power?
        // Let's auto turn on for better UX
        setTvState(prev => ({ ...prev, isOn: true }));
    }
    
    const index = CHANNELS.findIndex(c => c.id === id);
    if (index !== -1 && index !== tvState.channelIndex) {
      triggerStatic();
      setTvState(prev => ({ ...prev, channelIndex: index }));
    }
  }, [tvState.channelIndex, tvState.isOn]);

  // Clean up timeout
  useEffect(() => {
    return () => {
      if (staticTimeoutRef.current) clearTimeout(staticTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Background Ambience (Wallpaper) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: `radial-gradient(#333 1px, transparent 1px), radial-gradient(#333 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             backgroundPosition: '0 0, 10px 10px'
           }}>
      </div>
      
      {/* Table Surface */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0f0a05] to-[#2d2016] z-0 border-t-4 border-[#1a120b] shadow-[0_-10px_50px_rgba(0,0,0,0.8)]"></div>

      {/* Main Content Area */}
      <div className="z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* The TV */}
        <div className="flex-grow w-full max-w-4xl">
           <RetroTV 
             isOn={tvState.isOn}
             currentChannel={CHANNELS[tvState.channelIndex]}
             volume={tvState.volume}
             isStatic={tvState.isStatic}
             onTogglePower={handlePower}
             onNextChannel={handleNextChannel}
             onPrevChannel={handlePrevChannel}
             onChangeVolume={handleVolume}
           />
        </div>

        {/* The Tape Stack (Channel Selector) */}
        <div className="w-full lg:w-80 flex-shrink-0 lg:self-end mb-8 lg:mb-20 perspective-1000">
          <TapeStack 
            channels={CHANNELS}
            currentChannelId={CHANNELS[tvState.channelIndex].id}
            onSelectChannel={handleSelectChannel}
          />
          
          <div className="mt-6 text-center text-gray-500 font-vt323 opacity-60 text-sm">
            <p>CLICK TAPES TO LOAD</p>
            <p>CLICK KNOB TO TUNE</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;