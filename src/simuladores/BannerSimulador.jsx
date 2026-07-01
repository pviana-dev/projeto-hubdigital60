import { useApp } from '../context/AppContext'

export default function BannerSimulador({ nome, onSair }) {
  const { fs } = useApp()

  return (
    <div
      className="flex items-center justify-between px-4 py-2 flex-shrink-0"
      style={{ background: '#fffbeb', borderBottom: '1.5px solid #fcd34d' }}
    >
      <span style={{ color: '#78350f', fontSize: fs(13), fontWeight: 600 }}>
        📱 Simulando {nome}
      </span>
      <button
        onClick={onSair}
        className="rounded-lg px-3 py-1 font-bold"
        style={{ background: '#92400e', color: '#fff', fontSize: fs(12) }}
      >
        ✕ Sair
      </button>
    </div>
  )
}
