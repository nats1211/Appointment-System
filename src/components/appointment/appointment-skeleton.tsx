export default function AppointmentSkeleton() {
  return (
    <div
      aria-label="Loading appointments"
      className="divide-y divide-[#eeece7]"
      role="status"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_100px_90px] items-center gap-4 px-5 py-4"
          key={index}
        >
          <div className="flex items-center gap-3">
            <div className="size-9 animate-pulse rounded-full bg-[#eeece7]" />
            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded bg-[#eeece7]" />
              <div className="h-2.5 w-20 animate-pulse rounded bg-[#f2f0ec]" />
            </div>
          </div>
          <div className="h-3 w-28 animate-pulse rounded bg-[#f2f0ec]" />
          <div className="h-3 w-16 animate-pulse rounded bg-[#f2f0ec]" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-[#f2f0ec]" />
        </div>
      ))}
      <span className="sr-only">Loading appointment list</span>
    </div>
  );
}
