import React from 'react';
import { Channel } from '../types';
import { Play } from 'lucide-react';

interface TapeStackProps {
  channels: Channel[];
  currentChannelId: string;
  onSelectChannel: (id: string) => void;
}

export const TapeStack: React.FC<TapeStackProps> = ({ channels, currentChannelId, onSelectChannel }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-wood-pattern max-w-sm w-full">
      <h2 className="text-amber-100 font-vt323 text-3xl mb-4 border-b-2 border-amber-900/50 pb-2 shadow-[0_1px_0_rgba(255,255,255,0.1)]">
        VHS COLLECTION
      </h2>
      
      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {channels.map((channel) => (
          <div 
            key={channel.id}
            onClick={() => onSelectChannel(channel.id)}
            className={`
              relative group cursor-pointer transition-all duration-300 transform hover:-translate-x-2
              ${currentChannelId === channel.id ? '-translate-x-4' : ''}
            `}
          >
            {/* VHS Spine Visual */}
            <div 
              className="h-16 rounded-l-md shadow-[4px_4px_10px_rgba(0,0,0,0.5)] border-r-4 border-gray-900 flex items-center justify-between px-4 overflow-hidden"
              style={{ backgroundColor: channel.color }}
            >
              {/* Paper Label */}
              <div className="bg-white/90 w-full h-10 rounded-sm flex items-center px-3 shadow-inner transform rotate-[0.5deg]">
                <span className="font-handwriting text-gray-800 font-bold truncate text-lg font-vt323 tracking-wider">
                  {channel.number}. {channel.title}
                </span>
              </div>
              
              {/* Active Indicator */}
              {currentChannelId === channel.id && (
                <div className="absolute right-2 text-white/50 animate-pulse">
                   <Play size={20} fill="currentColor" />
                </div>
              )}
            </div>
            
            {/* Tape texture details */}
            <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-black/10"></div>
            <div className="absolute top-0 bottom-0 right-1 w-[2px] bg-black/10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};