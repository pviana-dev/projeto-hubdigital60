import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BannerSimulador from './BannerSimulador'
import SimuladorZoomWrapper from './SimuladorZoomWrapper'

const conversas = [
  { id: 'maria', nome: 'Maria (filha)', msg: 'Oi mãe, tudo bem? 😊', hora: '14:32', naoLidas: 2, avatar: '👩' },
  { id: 'joao', nome: 'João (filho)', msg: 'Chego lá às 18h', hora: '10:15', naoLidas: 0, avatar: '👦' },
  { id: 'drsilva', nome: 'Dr. Silva', msg: 'Sua consulta é amanhã às 10h', hora: 'Ontem', naoLidas: 0, avatar: '👨‍⚕️' },
  { id: 'igreja', nome: 'Igreja São José 🙏', msg: '📷 Foto', hora: 'Seg', naoLidas: 5, avatar: '⛪' },
]

const mensagens = [
  { de: 'maria', texto: 'Oi mãe! Tudo bem com você?', hora: '14:28' },
  { de: 'maria', texto: 'O João fez aquela lasanha que você gosta 😊', hora: '14:29' },
  { de: 'eu', texto: 'Que bom! Vou sim minha filha!', hora: '14:30', status: '✓✓', lida: true },
  { de: 'eu', texto: 'Que horas posso chegar?', hora: '14:31', status: '✓', lida: false },
  { de: 'maria', texto: 'Pode vir a partir das 19h 🕖', hora: '14:32' },
]

function TelaConversas({ onAbrirChat }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3" style={{ background: '#075E54' }}>
        <span className="font-bold text-xl text-white">WhatsApp</span>
        <div className="flex gap-5">
          {['📷', '🔍', '⋮'].map(i => (
            <span key={i} style={{ fontSize: 22, color: '#fff' }}>{i}</span>
          ))}
        </div>
      </div>

      <div className="flex" style={{ background: '#075E54' }}>
        {['CONVERSAS', 'STATUS', 'LIGAÇÕES'].map((tab, i) => (
          <div
            key={tab}
            className="flex-1 text-center py-3"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: i === 0 ? '#25D366' : 'rgba(255,255,255,0.6)',
              borderBottom: i === 0 ? '2px solid #25D366' : '2px solid transparent',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#fff' }}>
        {conversas.map(c => (
          <button
            key={c.id}
            onClick={() => onAbrirChat(c)}
            className="flex items-center gap-3 px-4 py-3 w-full text-left"
            style={{ borderBottom: '1px solid #f0f0f0' }}
          >
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 52, height: 52, background: '#e5e7eb', fontSize: 28 }}
            >
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base" style={{ color: '#111' }}>{c.nome}</span>
                <span style={{ fontSize: 12, color: c.naoLidas ? '#25D366' : '#9ca3af', flexShrink: 0 }}>{c.hora}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-sm" style={{ color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 190 }}>
                  {c.msg}
                </span>
                {c.naoLidas > 0 && (
                  <span
                    className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                    style={{ width: 20, height: 20, background: '#25D366', fontSize: 11 }}
                  >
                    {c.naoLidas}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div
        className="absolute flex items-center justify-center rounded-full shadow-lg"
        style={{ bottom: 16, right: 16, width: 58, height: 58, background: '#25D366', fontSize: 28, zIndex: 5 }}
      >
        💬
      </div>
    </div>
  )
}

function TelaChat({ contato, onVoltar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-2 flex-shrink-0" style={{ background: '#075E54' }}>
        <button onClick={onVoltar} style={{ fontSize: 22, color: '#fff' }}>←</button>
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 40, height: 40, background: '#e5e7eb', fontSize: 22 }}
        >
          {contato.avatar}
        </div>
        <div className="flex-1">
          <p className="font-bold text-base text-white leading-tight">{contato.nome}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>online</p>
        </div>
        <div className="flex gap-4">
          {['📹', '📞', '⋮'].map(i => (
            <span key={i} style={{ fontSize: 22, color: '#fff' }}>{i}</span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2" style={{ background: '#ECE5DD' }}>
        <div className="flex justify-center my-1">
          <span className="px-3 py-1 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.7)', color: '#6b7280' }}>
            Hoje
          </span>
        </div>
        {mensagens.map((m, i) => (
          <div key={i} className={`flex ${m.de === 'eu' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="px-3 py-2 shadow-sm"
              style={{
                background: m.de === 'eu' ? '#DCF8C6' : '#fff',
                borderRadius: m.de === 'eu' ? '12px 2px 12px 12px' : '2px 12px 12px 12px',
                maxWidth: 240,
              }}
            >
              <p style={{ fontSize: 15, color: '#111', lineHeight: 1.4 }}>{m.texto}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{m.hora}</span>
                {m.de === 'eu' && (
                  <span style={{ fontSize: 11, color: m.lida ? '#53bdeb' : '#9ca3af' }}>{m.status}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{ background: '#f0f0f0' }}>
        <span style={{ fontSize: 24, color: '#9ca3af' }}>📎</span>
        <div
          className="flex-1 px-4 py-2 rounded-full"
          style={{ background: '#fff', color: '#9ca3af', fontSize: 15 }}
        >
          Digite uma mensagem
        </div>
        <span style={{ fontSize: 22, color: '#9ca3af' }}>😊</span>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 46, height: 46, background: '#25D366', fontSize: 22, flexShrink: 0 }}
        >
          🎙️
        </div>
      </div>
    </div>
  )
}

export default function SimuladorWhatsApp() {
  const { voltar } = useApp()
  const [tela, setTela] = useState('conversas')
  const [contatoAberto, setContatoAberto] = useState(null)

  function abrirChat(contato) {
    setContatoAberto(contato)
    setTela('chat')
  }

  return (
    <SimuladorZoomWrapper>
      <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#fff' }}>
        <BannerSimulador nome="WhatsApp" onSair={voltar} />
        {tela === 'conversas' && <TelaConversas onAbrirChat={abrirChat} />}
        {tela === 'chat' && <TelaChat contato={contatoAberto} onVoltar={() => setTela('conversas')} />}
      </div>
    </SimuladorZoomWrapper>
  )
}
