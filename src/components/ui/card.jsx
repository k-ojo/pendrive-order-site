export function Card({ children, className = '' }) {
  return <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}