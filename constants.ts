import { Channel } from './types';

export const CHANNELS: Channel[] = [
  {
    id: 'c1',
    number: 1,
    title: "Big Buck Bunny",
    description: "A giant rabbit with a heart bigger than his body.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://picsum.photos/id/10/200/300",
    color: "#eab308" // yellow-500
  },
  {
    id: 'c2',
    number: 2,
    title: "Elephant Dream",
    description: "The world's first open movie, made entirely with open source graphics software.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/id/17/200/300",
    color: "#ef4444" // red-500
  },
  {
    id: 'c3',
    number: 3,
    title: "For Bigger Blazes",
    description: "HBO GO - For Bigger Blazes promo.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/id/28/200/300",
    color: "#3b82f6" // blue-500
  },
  {
    id: 'c4',
    number: 4,
    title: "Tears of Steel",
    description: "A group of warriors and scientists gather at the Oude Kerk in Amsterdam.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://picsum.photos/id/40/200/300",
    color: "#22c55e" // green-500
  },
  {
    id: 'c5',
    number: 5,
    title: "Sintel",
    description: "A lonely young woman searches for a dragon she befriended.",
    source: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "https://picsum.photos/id/55/200/300",
    color: "#a855f7" // purple-500
  }
];

export const INITIAL_VOLUME = 50;