import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BannerSimulador from './BannerSimulador'
import SimuladorZoomWrapper from './SimuladorZoomWrapper'

const documentos = [
  {
    id: 'cin',
    titulo: 'Carteira de Identidade Nacional',
    subtitulo: 'RG Digital — CIN',
    emoji: '🪪',
    cor: '#1351B4',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida da Silva' },
      { label: 'Data de nascimento', valor: '05/03/1958' },
      { label: 'CPF', valor: '***.456.***-90' },
      { label: 'RG', valor: '12.345.678-9 SP' },
      { label: 'Nome da mãe', valor: 'Ana Maria da Silva' },
      { label: 'Naturalidade', valor: 'São Paulo — SP' },
      { label: 'Data de emissão', valor: '10/01/2024' },
    ],
  },
  {
    id: 'cpf',
    titulo: 'CPF',
    subtitulo: 'Cadastro de Pessoa Física',
    emoji: '📋',
    cor: '#2D9B42',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida da Silva' },
      { label: 'CPF', valor: '***.456.***-90' },
      { label: 'Situação cadastral', valor: 'Regular' },
      { label: 'Data de inscrição', valor: '12/08/1985' },
    ],
  },
  {
    id: 'sus',
    titulo: 'Cartão Nacional de Saúde',
    subtitulo: 'SUS — Sistema Único de Saúde',
    emoji: '🏥',
    cor: '#1E88E5',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida da Silva' },
      { label: 'Número do cartão', valor: '*** *** *** *** 45' },
      { label: 'Data de nascimento', valor: '05/03/1958' },
      { label: 'Município de cadastro', valor: 'São Paulo — SP' },
    ],
  },
]

const servicos = [
  { emoji: '📊', titulo: 'Meu INSS', desc: 'Benefícios e extrato' },
  { emoji: '🚗', titulo: 'Detran', desc: 'CNH e veículo' },
  { emoji: '📝', titulo: 'Receita Federal', desc: 'IR e restituição' },
  { emoji: '💼', titulo: 'CTPS Digital', desc: 'Carteira de trabalho' },
]

function TelaHome({ onAbrirDocumento }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-4 py-3 flex-shrink-0" style={{ background: '#1351B4' }}>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>Bom dia,</p>
            <p className="font-bold text-white text-lg">Maria Aparecida 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 22, color: '#fff' }}>🔔</span>
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.25)', fontSize: 20 }}
            >
              👩‍🦳
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#f5f7fa' }}>
        <div className="px-4 pt-4 mb-2">
          <p className="font-bold text-base" style={{ color: '#111' }}>Seus documentos</p>
        </div>

        {documentos.map(doc => (
          <button
            key={doc.id}
            onClick={() => onAbrirDocumento(doc)}
            className="flex items-center gap-3 mx-4 mb-3 px-4 py-3 rounded-2xl text-left w-auto shadow-sm"
            style={{ background: '#fff', border: `2px solid ${doc.cor}20` }}
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 52, height: 52, background: `${doc.cor}18`, fontSize: 28 }}
            >
              {doc.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: '#111' }}>{doc.titulo}</p>
              <p style={{ fontSize: 12, color: '#6b7280' }}>{doc.subtitulo}</p>
            </div>
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background: '#dcfce7' }}
            >
              <span style={{ fontSize: 10, color: '#166534', fontWeight: 600 }}>✓ Válido</span>
            </div>
          </button>
        ))}

        <div className="px-4 mb-2 mt-2">
          <p className="font-bold text-base" style={{ color: '#111' }}>Serviços</p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 mb-4">
          {servicos.map(s => (
            <div
              key={s.titulo}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl"
              style={{ background: '#fff' }}
            >
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: '#111' }}>{s.titulo}</p>
                <p style={{ fontSize: 11, color: '#6b7280' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TelaDocumento({ doc, onVoltar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: doc.cor }}
      >
        <button onClick={onVoltar} style={{ fontSize: 22, color: '#fff' }}>←</button>
        <span className="font-bold text-white text-base flex-1">{doc.subtitulo}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: '#f5f7fa' }}>
        <div
          className="rounded-3xl px-5 py-5 mb-4 shadow-md"
          style={{ background: `linear-gradient(135deg, ${doc.cor} 0%, ${doc.cor}cc 100%)` }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600 }}>REPÚBLICA FEDERATIVA DO BRASIL</p>
              <p className="font-bold text-white text-base">{doc.titulo}</p>
            </div>
            <span style={{ fontSize: 36 }}>{doc.emoji}</span>
          </div>
          <p className="font-bold text-white text-2xl mb-1">{doc.campos[0].valor}</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            {doc.campos.find(c => c.label === 'Data de nascimento')?.valor}
          </p>
          <div
            className="flex items-center justify-between mt-3 pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>GOV.BR</span>
            <span style={{ fontSize: 20 }}>🔲</span>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden mb-4 shadow-sm" style={{ background: '#fff' }}>
          {doc.campos.map((campo, i) => (
            <div
              key={campo.label}
              className="flex flex-col px-4 py-3"
              style={{ borderBottom: i < doc.campos.length - 1 ? '1px solid #f0f0f0' : 'none' }}
            >
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>{campo.label}</p>
              <p className="font-bold text-base" style={{ color: '#111' }}>{campo.valor}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-4">
          {[['⬆️', 'Compartilhar'], ['⬇️', 'Baixar']].map(([e, n]) => (
            <button
              key={n}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold"
              style={{ background: doc.cor, color: '#fff' }}
            >
              <span>{e}</span>
              <span style={{ fontSize: 14 }}>{n}</span>
            </button>
          ))}
        </div>

        <div
          className="flex items-start gap-3 px-4 py-3 rounded-2xl"
          style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}
        >
          <span style={{ fontSize: 20 }}>🔒</span>
          <p style={{ fontSize: 13, color: '#78350f', lineHeight: 1.4 }}>
            Documento oficial emitido pelo Governo Federal. Seus dados estão protegidos.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SimuladorGovBr() {
  const { voltar } = useApp()
  const [tela, setTela] = useState('home')
  const [docAberto, setDocAberto] = useState(null)

  return (
    <SimuladorZoomWrapper>
      <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#fff' }}>
        <BannerSimulador nome="Gov.br" onSair={voltar} />
        {tela === 'home' && (
          <TelaHome onAbrirDocumento={doc => { setDocAberto(doc); setTela('documento') }} />
        )}
        {tela === 'documento' && (
          <TelaDocumento doc={docAberto} onVoltar={() => setTela('home')} />
        )}
      </div>
    </SimuladorZoomWrapper>
  )
}
