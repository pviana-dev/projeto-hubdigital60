import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

export default function Saude() {
  const { navegar, altoContraste, fs } = useApp()

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const verde = '#059669'

  const opcoes = [
    { id: 'agendamento', emoji: '📅', titulo: 'Agendar Consulta', descricao: 'Marque uma consulta médica' },
    { id: 'medicamentos', emoji: '💊', titulo: 'Meus Medicamentos', descricao: 'Veja sua lista de remédios' },
  ]

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Minha Saúde" />

      <div className="flex flex-col gap-4 px-5 py-6">
        <div
          className="rounded-3xl px-5 py-4"
          style={{ background: altoContraste ? '#052e16' : '#d1fae5', border: altoContraste ? '1px solid #059669' : 'none' }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: fs(32) }}>🏥</span>
            <div>
              <p className="font-bold" style={{ fontSize: fs(18), color: altoContraste ? '#6ee7b7' : verde }}>Área de Saúde</p>
              <p style={{ color: altoContraste ? '#a7f3d0' : '#065f46', fontSize: fs(14) }}>Cuide da sua saúde com facilidade</p>
            </div>
          </div>
        </div>

        {opcoes.map(op => (
          <button
            key={op.id}
            onClick={() => navegar(op.id)}
            className="flex items-center gap-5 rounded-3xl px-5 py-5 shadow-sm text-left"
            style={{
              background: card,
              border: altoContraste ? `2px solid ${verde}` : 'none',
              minHeight: 100,
            }}
          >
            <div
              className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 72,
                height: 72,
                background: altoContraste ? 'transparent' : '#d1fae5',
                fontSize: fs(36),
                border: altoContraste ? `2px solid ${verde}` : 'none',
              }}
            >
              {op.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold" style={{ fontSize: fs(20), color: altoContraste ? '#fff' : verde }}>{op.titulo}</p>
              <p className="mt-1" style={{ fontSize: fs(16), color: subtexto }}>{op.descricao}</p>
            </div>
            <span style={{ fontSize: fs(24), color: altoContraste ? '#fff' : '#9ca3af' }}>›</span>
          </button>
        ))}
      </div>

      <BotaoAjuda />
    </div>
  )
}
