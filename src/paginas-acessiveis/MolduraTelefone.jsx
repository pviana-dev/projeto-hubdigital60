export default function MolduraTelefone({ children }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden shadow-2xl"
      style={{
        width: 390,
        height: 844,
        borderRadius: 48,
        background: '#f9fafb',
        color: '#111827',
        border: '8px solid #1f2937',
        boxShadow: '0 0 0 2px #374151, 0 32px 64px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
        <div style={{ width: 120, height: 28, borderRadius: 20, background: '#1f2937' }} />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
