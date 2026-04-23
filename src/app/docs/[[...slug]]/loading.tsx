export default function Loading() {
  return (
    <>
      <style>
        {`
        @keyframes fd-loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}
      </style>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-9999 h-0.5 overflow-hidden">
        <div
          className="absolute top-0 h-full w-1/3 rounded-full bg-fd-primary"
          style={{ animation: 'fd-loading-slide 1.2s ease-in-out infinite' }}
        />
      </div>
    </>
  )
}
