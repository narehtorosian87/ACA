interface SuccessMessageProps {
  children: string;
}

export function SuccessMessage({ children }: SuccessMessageProps) {
  return (
    <div role="status" className="mt-5 rounded-xl border border-primary-400 bg-primary-100 px-5 py-4 text-sm text-primary-800">
      {children}
    </div>
  );
}
