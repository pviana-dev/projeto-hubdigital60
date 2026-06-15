import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

const medicamentos = [
  {
    nome: 'Losartana 50mg',
    para: 'Pressão alta',
    horarios: ['08:00', '20:00'],
    cor: '#2563eb',
    emoji: '💙',
    instruções: 'Tomar com água, de preferência antes das refeições.',
  },
  {
    nome: 'Metformina 850mg',
    para: 'Diabetes',
    horarios: ['12:00', '19:00'],
    cor: '#059669',
    emoji: '💚',
    instruções: 'Tomar durante ou logo após as refeições.',
  },
  {
    nome: 'Atorvastatina 20mg',
    para: 'Colesterol',
    horarios: ['22:00'],
    cor: '#7c3aed',
    emoji: '💜',
    instruções: 'Tomar à noite, com ou sem alimentos.',
  },
  {
    nome: 'Omeprazol 20mg',
    para: 'Estômago',
    horarios: ['07:30'],
    cor: '#d97706',
    emoji: '🧡',
    instruções: 'Tomar em jejum, 30 minutos antes do café da manhã.',
  },
]

export default function Medicamentos() {
  const { altoContraste } = useApp()

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Meus Medicamentos" />

      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        {/* Aviso */}
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: altoContraste ? '#1a1a00' : '#fef3c7', border: altoContraste ? '1px solid #854d0e' : 'none' }}
        >
          <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: 14, lineHeight: 1.4 }}>
            ⚠️ <strong>Simulação:</strong> Estes são medicamentos fictícios para fins de treinamento.
          </p>
        </div>

        {medicamentos.map((med, i) => (
          <div
            key={i}
            className="rounded-3xl p-5 shadow-sm"
            style={{ background: card, border: altoContraste ? `2px solid ${med.cor}` : 'none' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: altoContraste ? 'transparent' : `${med.cor}20`,
                  border: altoContraste ? `2px solid ${med.cor}` : 'none',
                  fontSize: 28,
                }}
              >
                {med.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg" style={{ color: altoContraste ? '#fff' : med.cor }}>{med.nome}</p>
                <p className="text-sm" style={{ color: subtexto }}>Para: {med.para}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-2" style={{ color: texto, fontSize: 15 }}>Horários de uso:</p>
              <div className="flex gap-2 flex-wrap">
                {med.horarios.map(h => (
                  <span
                    key={h}
                    className="px-4 py-2 rounded-xl font-bold text-base"
                    style={{
                      background: altoContraste ? `${med.cor}30` : `${med.cor}15`,
                      color: altoContraste ? '#fff' : med.cor,
                      border: `1.5px solid ${med.cor}`,
                    }}
                  >
                    🕐 {h}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="mt-4 rounded-xl px-4 py-3"
              style={{ background: altoContraste ? '#0f172a' : '#f8fafc' }}
            >
              <p style={{ color: subtexto, fontSize: 14, lineHeight: 1.4 }}>
                📋 {med.instruções}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BotaoAjuda />
    </div>
  )
}
