import React, { useRef, useEffect, useState } from 'react';
import { Channel } from '../types';
import { NoiseCanvas } from './NoiseCanvas';

interface ScreenProps {
  channel: Channel;
  isOn: boolean;
  volume: number;
  isStatic: boolean;
  onVideoEnd?: () => void;
}

export const Screen: React.FC<ScreenProps> = ({ 
  channel, 
  isOn, 
  volume, 
  isStatic,
  onVideoEnd 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showChannelInfo, setShowChannelInfo] = useState(false);

  // Handle Video Playback/Volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      
      if (isOn && !isStatic) {
        videoRef.current.play().catch(e => console.warn("Autoplay blocked", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isOn, volume, isStatic, channel]);

  // Show Channel Info (OSD) when channel changes
  useEffect(() => {
    if (isOn) {
      setShowChannelInfo(true);
      const timer = setTimeout(() => setShowChannelInfo(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [channel, isOn]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black rounded-[10%_10%_10%_10%/10%_10%_10%_10%] shadow-inner z-10">
      {/* Screen Content Wrapper with Turn On/Off Animation */}
      <div 
        ref={containerRef}
        className={`relative w-full h-full origin-center transition-all duration-300 ${
          isOn ? 'animate-turn-on opacity-100' : 'animate-turn-off opacity-0'
        }`}
      >
        
        {/* The Video Layer */}
        <div className="absolute inset-0 w-full h-full bg-[#111]">
          {!isStatic && (
            <video
              ref={videoRef}
              src={channel.source}
              className="w-full h-full object-cover"
              loop
              playsInline
              onEnded={onVideoEnd}
            />
          )}
        </div>

        {/* Static Noise Layer (Visible when 'isStatic' or video buffering) */}
        {(isStatic || !isOn) && (
           <div className="absolute inset-0 z-20 bg-gray-900">
             <NoiseCanvas opacity={isOn ? 0.8 : 0} />
           </div>
        )}

        {/* Retro OSD (On Screen Display) */}
        {isOn && showChannelInfo && !isStatic && (
          <div className="absolute top-8 left-8 z-30 font-vt323 text-green-400 text-3xl md:text-5xl drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)] tracking-widest pointer-events-none">
            CH {channel.number.toString().padStart(2, '0')}
            <div className="text-xl md:text-2xl opacity-80 mt-1 uppercase">{channel.title}</div>
          </div>
        )}

        {/* CRT Scanlines Overlay */}
        <div className="absolute inset-0 z-40 scanlines pointer-events-none opacity-40"></div>
        
        {/* CRT Vignette/Glow */}
        <div className="absolute inset-0 z-50 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]"></div>
        
        {/* Slight Phosphor Glow */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-green-500 mix-blend-overlay opacity-[0.03]"></div>

        {/* Screen Reflection (Glass effect) */}
        <div className="absolute inset-0 z-[60] pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-30 rounded-[inherit]"></div>
      </div>
    </div>
  );
};