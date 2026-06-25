export function GradientBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`rb-gradient-background ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
