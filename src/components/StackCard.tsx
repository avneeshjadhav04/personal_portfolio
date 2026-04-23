import type { ReactNode } from 'react';

interface StackCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function StackCard({ children, index, className = '' }: StackCardProps) {
  return (
    <div
      className={`stack-card ${className}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="stack-card-inner w-full h-full">
        {children}
      </div>
    </div>
  );
}
