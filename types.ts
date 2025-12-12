export interface Channel {
  id: string;
  number: number;
  title: string;
  description: string;
  source: string; // Video URL
  thumbnail: string; // Placeholder or cover art
  color: string; // VHS tape color
}

export interface TVState {
  isOn: boolean;
  channelIndex: number;
  volume: number;
  isStatic: boolean; // For transition effects
}