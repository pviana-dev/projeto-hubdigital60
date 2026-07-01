import { useApp } from '../context/AppContext'

export default function BarraTopo({ titulo, onVoltar }) {
  const { voltar, history, altoContraste, fs } = useApp()

  const bg = altoContraste ? '#1a1a1a' : '#1d4ed8'
  const cor = '#fff'
  const handleVoltar = onVoltar ?? voltar
  const mostrarVoltar = onVoltar != null || history.length > 0

  return (
    <div
      className="flex items-center gap-3 px-4 py-4"
      style={{ background: bg, color: cor, minHeight: 64, position: 'sticky', top: 0, zIndex: 10 }}
    >
      {mostrarVoltar && (
        <button
          onClick={handleVoltar}
          className="flex items-center justify-center rounded-xl font-bold"
          style={{ minWidth: 48, minHeight: 48, background: 'rgba(255,255,255,0.2)', fontSize: fs(22), color: cor }}
          aria-label="Voltar"
        >
          ←
        </button>
      )}
      <span className="font-bold flex-1 text-left" style={{ fontSize: fs(20) }}>{titulo}</span>
    </div>
  )
}
