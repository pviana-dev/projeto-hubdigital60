import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

const documentos = [
  {
    tipo: 'RG Digital',
    emoji: '🪪',
    nome: 'Maria Aparecida Silva',
    numero: '12.345.678-9',
    validade: '31/12/2030',
    nascimento: '15/03/1958',
    cor: '#7c3aed',
    corClara: '#ede9fe',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida Silva' },
      { label: 'Número do RG', valor: '12.345.678-9' },
      { label: 'Data de nascimento', valor: '15/03/1958' },
      { label: 'Validade', valor: '31/12/2030' },
      { label: 'Naturalidade', valor: 'Natal - RN' },
    ],
  },
  {
    tipo: 'CPF',
    emoji: '📋',
    nome: 'Maria Aparecida Silva',
    numero: '123.456.789-00',
    validade: null,
    cor: '#1d4ed8',
    corClara: '#dbeafe',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida Silva' },
      { label: 'Número do CPF', valor: '123.456.789-00' },
      { label: 'Situação', valor: 'Regular ✓' },
    ],
  },
  {
    tipo: 'Carteira de Vacinação',
    emoji: '💉',
    nome: 'Maria Aparecida Silva',
    numero: null,
    cor: '#059669',
    corClara: '#d1fae5',
    campos: [
      { label: 'Covid-19 (3ª dose)', valor: '10/04/2023 ✓' },
      { label: 'Influenza', valor: '05/05/2025 ✓' },
      { label: 'Febre Amarela', valor: '20/08/2018 ✓' },
      { label: 'Próxima vacina', valor: 'Influenza - Mai/2026' },
    ],
  },
]

export default function Documentos() {
  const { altoContraste } = useApp()
  const [docAberto, setDocAberto] = useState(null)

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'

  if (docAberto !== null) {
    const doc = documentos[docAberto]
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo={doc.tipo} onVoltar={() => setDocAberto(null)} />
        <div className="flex flex-col gap-4 px-5 py-5 pb-24">
          {/* Card do documento */}
          <div
            className="rounded-3xl p-5 shadow-md"
            style={{
              background: altoContraste ? '#1a1a1a' : `linear-gradient(135deg, ${doc.cor}, ${doc.cor}cc)`,
              border: altoContraste ? `2px solid ${doc.cor}` : 'none',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 40 }}>{doc.emoji}</span>
              <div>
                <p className="font-bold text-xl text-white">{doc.tipo}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Documento Digital Simulado</p>
              </div>
            </div>
            {doc.numero && (
              <p className="font-bold text-white text-2xl tracking-widest">{doc.numero}</p>
            )}
          </div>

          {/* Campos */}
          <div className="rounded-3xl p-5 shadow-sm" style={{ background: card }}>
            <p className="font-bold text-lg mb-4" style={{ color: texto }}>Informações do documento:</p>
            <div className="flex flex-col gap-4">
              {doc.campos.map((campo, i) => (
                <div key={i} style={{ borderBottom: i < doc.campos.length - 1 ? `1px solid ${altoContraste ? '#333' : '#f3f4f6'}` : 'none', paddingBottom: i < doc.campos.length - 1 ? 16 : 0 }}>
                  <p style={{ color: subtexto, fontSize: 14 }}>{campo.label}</p>
                  <p className="font-bold text-lg mt-1" style={{ color: texto }}>{campo.valor}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: altoContraste ? '#1a1a00' : '#fef3c7' }}
          >
            <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: 14, lineHeight: 1.4 }}>
              ⚠️ Este é um documento fictício para fins de treinamento. Não use para fins reais.
            </p>
          </div>

          <button
            onClick={() => setDocAberto(null)}
            className="w-full py-5 rounded-2xl font-bold text-xl"
            style={{ background: altoContraste ? '#facc15' : '#1d4ed8', color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
          >
            ← Voltar aos documentos
          </button>
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Meus Documentos" />

      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        <div
          className="rounded-2xl px-4 py-3"
          style={{ background: altoContraste ? '#1a1a00' : '#fef3c7' }}
        >
          <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: 14, lineHeight: 1.4 }}>
            ⚠️ <strong>Simulação:</strong> Estes são documentos fictícios para fins de treinamento.
          </p>
        </div>

        {documentos.map((doc, i) => (
          <button
            key={i}
            onClick={() => setDocAberto(i)}
            className="flex items-center gap-5 rounded-3xl px-5 py-5 shadow-sm text-left"
            style={{
              background: card,
              border: altoContraste ? `2px solid ${doc.cor}` : 'none',
              minHeight: 100,
            }}
          >
            <div
              className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 72,
                height: 72,
                background: altoContraste ? 'transparent' : doc.corClara,
                border: altoContraste ? `2px solid ${doc.cor}` : 'none',
                fontSize: 36,
              }}
            >
              {doc.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-xl" style={{ color: altoContraste ? '#fff' : doc.cor }}>{doc.tipo}</p>
              <p className="mt-1 text-base" style={{ color: subtexto }}>{doc.nome}</p>
              {doc.numero && (
                <p className="mt-1 text-sm font-mono" style={{ color: subtexto }}>{doc.numero}</p>
              )}
            </div>
            <span style={{ fontSize: 24, color: altoContraste ? '#fff' : '#9ca3af' }}>›</span>
          </button>
        ))}
      </div>

      <BotaoAjuda />
    </div>
  )
}
