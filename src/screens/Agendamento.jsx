import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

const especialidades = ['Clínico Geral', 'Cardiologista', 'Ortopedista', 'Oftalmologista', 'Dermatologista']
const horarios = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']

export default function Agendamento() {
  const { altoContraste } = useApp()
  const [passo, setPasso] = useState(1)
  const [especialidade, setEspecialidade] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [concluido, setConcluido] = useState(false)

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const verde = '#059669'
  const azul = altoContraste ? '#facc15' : '#1d4ed8'
  const corBotao = altoContraste ? '#facc15' : '#1d4ed8'
  const corTextoBotao = altoContraste ? '#000' : '#fff'

  const proximaSemana = () => {
    const datas = []
    const hoje = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date(hoje)
      d.setDate(hoje.getDate() + i)
      const dia = d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
      datas.push({ label: dia, valor: d.toLocaleDateString('pt-BR') })
    }
    return datas
  }

  const datas = proximaSemana()

  const botaoSelecionado = (selecionado) => ({
    background: selecionado ? (altoContraste ? '#1a1a00' : '#eff6ff') : card,
    border: `2.5px solid ${selecionado ? (altoContraste ? '#facc15' : '#1d4ed8') : (altoContraste ? '#444' : '#e5e7eb')}`,
    color: selecionado ? (altoContraste ? '#facc15' : '#1d4ed8') : texto,
  })

  if (concluido) {
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo="Agendar Consulta" />
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-10 gap-6">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 120, height: 120, background: altoContraste ? '#052e16' : '#d1fae5' }}
          >
            <span style={{ fontSize: 64 }}>✅</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl mb-2" style={{ color: verde }}>Consulta Agendada!</p>
            <p className="text-lg" style={{ color: subtexto }}>Sua consulta foi marcada com sucesso.</p>
          </div>
          <div className="w-full rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold text-lg mb-3" style={{ color: texto }}>Resumo do agendamento:</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span style={{ color: subtexto }}>Especialidade:</span>
                <span className="font-semibold" style={{ color: texto }}>{especialidade}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: subtexto }}>Data:</span>
                <span className="font-semibold" style={{ color: texto }}>{data}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: subtexto }}>Horário:</span>
                <span className="font-semibold" style={{ color: texto }}>{horario}</span>
              </div>
            </div>
          </div>
          <div className="w-full rounded-2xl px-4 py-3" style={{ background: altoContraste ? '#1a1a00' : '#fef3c7' }}>
            <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: 14 }}>
              ⚠️ Lembre-se: este é um simulador. Nenhum agendamento real foi feito.
            </p>
          </div>
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Agendar Consulta" />

      {/* Indicador de passos */}
      <div className="flex items-center justify-center gap-2 px-5 py-4">
        {[1, 2, 3].map(n => (
          <div key={n} className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full font-bold text-sm"
              style={{
                width: 36,
                height: 36,
                background: passo >= n ? (altoContraste ? '#facc15' : '#1d4ed8') : (altoContraste ? '#333' : '#e5e7eb'),
                color: passo >= n ? (altoContraste ? '#000' : '#fff') : subtexto,
              }}
            >
              {passo > n ? '✓' : n}
            </div>
            {n < 3 && (
              <div style={{ width: 40, height: 3, background: passo > n ? (altoContraste ? '#facc15' : '#1d4ed8') : (altoContraste ? '#333' : '#e5e7eb'), borderRadius: 4 }} />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 px-5 pb-6">
        {/* Passo 1: Especialidade */}
        {passo === 1 && (
          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold text-xl mb-1" style={{ color: texto }}>Passo 1 de 3</p>
            <p className="text-lg mb-4" style={{ color: subtexto }}>Escolha o tipo de médico:</p>
            <div className="flex flex-col gap-3">
              {especialidades.map(e => (
                <button
                  key={e}
                  onClick={() => setEspecialidade(e)}
                  className="rounded-2xl px-5 py-4 font-semibold text-lg text-left transition-all"
                  style={{ ...botaoSelecionado(especialidade === e), minHeight: 64 }}
                >
                  {especialidade === e && <span className="mr-2">✓</span>}{e}
                </button>
              ))}
            </div>
            <button
              disabled={!especialidade}
              onClick={() => setPasso(2)}
              className="w-full py-5 rounded-2xl font-bold text-xl mt-5 transition-all"
              style={{
                background: especialidade ? corBotao : (altoContraste ? '#333' : '#e5e7eb'),
                color: especialidade ? corTextoBotao : subtexto,
                minHeight: 72,
              }}
            >
              Próximo →
            </button>
          </div>
        )}

        {/* Passo 2: Data */}
        {passo === 2 && (
          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold text-xl mb-1" style={{ color: texto }}>Passo 2 de 3</p>
            <p className="text-lg mb-4" style={{ color: subtexto }}>Escolha o dia da consulta:</p>
            <div className="flex flex-col gap-3">
              {datas.map(d => (
                <button
                  key={d.valor}
                  onClick={() => setData(d.valor)}
                  className="rounded-2xl px-5 py-4 font-semibold text-lg text-left transition-all"
                  style={{ ...botaoSelecionado(data === d.valor), minHeight: 64 }}
                >
                  {data === d.valor && <span className="mr-2">✓</span>}{d.label}
                </button>
              ))}
            </div>
            <button
              disabled={!data}
              onClick={() => setPasso(3)}
              className="w-full py-5 rounded-2xl font-bold text-xl mt-5 transition-all"
              style={{
                background: data ? corBotao : (altoContraste ? '#333' : '#e5e7eb'),
                color: data ? corTextoBotao : subtexto,
                minHeight: 72,
              }}
            >
              Próximo →
            </button>
          </div>
        )}

        {/* Passo 3: Horário */}
        {passo === 3 && (
          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold text-xl mb-1" style={{ color: texto }}>Passo 3 de 3</p>
            <p className="text-lg mb-4" style={{ color: subtexto }}>Escolha o horário:</p>
            <div className="grid grid-cols-2 gap-3">
              {horarios.map(h => (
                <button
                  key={h}
                  onClick={() => setHorario(h)}
                  className="rounded-2xl px-4 py-4 font-bold text-lg text-center transition-all"
                  style={{ ...botaoSelecionado(horario === h), minHeight: 64 }}
                >
                  {h}
                </button>
              ))}
            </div>
            <button
              disabled={!horario}
              onClick={() => setConcluido(true)}
              className="w-full py-5 rounded-2xl font-bold text-xl mt-5 transition-all"
              style={{
                background: horario ? '#059669' : (altoContraste ? '#333' : '#e5e7eb'),
                color: horario ? '#fff' : subtexto,
                minHeight: 72,
              }}
            >
              Confirmar Agendamento ✓
            </button>
          </div>
        )}
      </div>

      <BotaoAjuda />
    </div>
  )
}
