interface EmptyStateProps {
  message: string;
  actions?: React.ReactNode;
}

export default function EmptyState({ message, actions }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-4xl text-inkwash">📖</div>
      <p className="mb-4 text-lg text-zinc-500 dark:text-zinc-400">{message}</p>
      {actions}
    </div>
  );
}
