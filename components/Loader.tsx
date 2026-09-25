export default function Loader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-text-muted">
      <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-base-border border-t-accent" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  );
}