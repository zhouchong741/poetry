interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'required' | 'dynasty' | 'type';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  required: 'bg-crimson-light text-crimson border border-crimson/20',
  dynasty: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  type: 'bg-jade/10 text-jade border border-jade/20',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
