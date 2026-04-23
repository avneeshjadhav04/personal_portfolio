import { useEffect, useRef, useState } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  interface QueueItem { from: string; to: string; start: number; end: number; char?: string }
  const queueRef = useRef<QueueItem[]>([]);
  const frameCounter = useRef(0);
  const prevTextRef = useRef(text);

  useEffect(() => {
    const oldText = prevTextRef.current;
    prevTextRef.current = text;
    const length = Math.max(oldText.length, text.length);
    const queue: QueueItem[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = text[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }
    queueRef.current = queue;
    frameCounter.current = 0;

    const update = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frameCounter.current >= item.end) {
          complete++;
          output += item.to;
        } else if (frameCounter.current >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            queue[i].char = chars[Math.floor(Math.random() * chars.length)];
          }
          output += queue[i].char || '';
        } else {
          output += item.from;
        }
      }
      setDisplay(output);
      frameCounter.current++;
      if (complete < queue.length) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text]);

  return <span className={className}>{display}</span>;
}
