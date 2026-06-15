import { useApp } from '../context/AppContext'

export default function PhoneFrame({ children }) {
  const { altoContraste, fontSize } = useApp()

  const fontSizeClass = {
    normal: 'text-base',
    grande: 'text-lg',
    'muito-grande': 'text-xl',
  }[fontSize]

  return (
    <div
      id="phone-overlay-root"
      className={`relative flex flex-col overflow-hidden shadow-2xl ${fontSizeClass}`}
      style={{
        width: 390,
        height: 844,
        borderRadius: 48,
        background: altoContraste ? '#000' : '#f9fafb',
        color: altoContraste ? '#fff' : '#111827',
        border: '8px solid #1f2937',
        boxShadow: '0 0 0 2px #374151, 0 32px 64px rgba(0,0,0,0.4)',
      }}
    >
      {/* Notch */}
      <div className="flex justify-center pt-2 pb-1">
        <div style={{ width: 120, height: 28, borderRadius: 20, background: '#1f2937' }} />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
