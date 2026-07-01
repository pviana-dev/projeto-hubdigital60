import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BannerSimulador from './BannerSimulador'
import SimuladorZoomWrapper from './SimuladorZoomWrapper'

const videos = [
  { id: 1, titulo: 'Como usar o WhatsApp — Passo a passo para iniciantes', canal: 'Aprenda Fácil', views: '142 mil', tempo: '12:34', cor: '#1d4ed8', emoji: '📱' },
  { id: 2, titulo: 'Missa de Domingo — Paróquia São José ao vivo', canal: 'Paróquia São José', views: '8,3 mil', tempo: '58:20', cor: '#7c3aed', emoji: '⛪' },
  { id: 3, titulo: 'Pão caseiro fácil sem sovar — receita da vovó', canal: 'Culinária da Vovó', views: '234 mil', tempo: '8:45', cor: '#b45309', emoji: '🍞' },
  { id: 4, titulo: 'Exercícios para a terceira idade em casa', canal: 'Saúde em Movimento', views: '56 mil', tempo: '22:10', cor: '#047857', emoji: '🤸' },
]

function TelaHome({ onAbrirVideo }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}
      >
        <div className="flex items-center gap-1">
          <span style={{ fontSize: 26, color: '#FF0000' }}>▶️</span>
          <span className="font-bold text-xl" style={{ color: '#282828' }}>YouTube</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ fontSize: 22, color: '#282828' }}>🔍</span>
          <span style={{ fontSize: 22, color: '#282828' }}>🔔</span>
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 34, height: 34, background: '#dbeafe', fontSize: 18 }}
          >
            👩‍🦳
          </div>
        </div>
      </div>

      <div
        className="flex gap-2 px-3 py-2 overflow-x-auto flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}
      >
        {['Início', 'Shorts', 'Inscrições', 'Você', 'Biblioteca'].map((t, i) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-sm whitespace-nowrap font-medium flex-shrink-0"
            style={{ background: i === 0 ? '#111' : '#f1f3f4', color: i === 0 ? '#fff' : '#374151' }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#fff' }}>
        {videos.map(v => (
          <button key={v.id} onClick={() => onAbrirVideo(v)} className="w-full text-left mb-2">
            <div
              className="flex items-center justify-center w-full relative"
              style={{ height: 190, background: v.cor }}
            >
              <span style={{ fontSize: 64, opacity: 0.35 }}>{v.emoji}</span>
              <div
                className="absolute flex items-center justify-center rounded-full"
                style={{ width: 50, height: 50, background: 'rgba(0,0,0,0.5)' }}
              >
                <span style={{ fontSize: 22, color: '#fff' }}>▶</span>
              </div>
              <div
                className="absolute bottom-2 right-2 px-2 py-0.5 rounded font-bold"
                style={{ background: 'rgba(0,0,0,0.75)', color: '#fff', fontSize: 12 }}
              >
                {v.tempo}
              </div>
            </div>
            <div className="flex gap-3 px-3 py-2">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 36, height: 36, background: '#f3f4f6', fontSize: 18 }}
              >
                🎬
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-snug" style={{ color: '#0f0f0f' }}>{v.titulo}</p>
                <p className="text-xs mt-1" style={{ color: '#6b7280' }}>{v.canal} · {v.views} visualizações</p>
              </div>
              <span style={{ fontSize: 18, color: '#9ca3af' }}>⋮</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function TelaVideo({ video, onVoltar }) {
  const [inscrito, setInscrito] = useState(false)
  const [curtiu, setCurtiu] = useState(false)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="relative flex-shrink-0" style={{ height: 210, background: video.cor }}>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: 70, opacity: 0.3 }}
        >
          {video.emoji}
        </span>

        <button
          onClick={onVoltar}
          className="absolute top-3 left-3 flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.5)', fontSize: 20, color: '#fff' }}
        >
          ←
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 58, height: 58, background: 'rgba(0,0,0,0.5)' }}
          >
            <span style={{ fontSize: 28, color: '#fff' }}>⏸</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
          <div className="relative h-1 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.3)' }}>
            <div className="h-1 rounded-full absolute left-0" style={{ width: '35%', background: '#FF0000' }}>
              <div
                className="absolute right-0 top-1/2 rounded-full"
                style={{ width: 12, height: 12, background: '#FF0000', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#fff', fontSize: 11 }}>4:21</span>
            <div className="flex gap-3">
              {['⏪', '⏩', '⛶'].map(i => <span key={i} style={{ color: '#fff', fontSize: 18 }}>{i}</span>)}
            </div>
            <span style={{ color: '#fff', fontSize: 11 }}>{video.tempo}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: '#fff' }}>
        <p className="font-bold text-base leading-snug mb-1" style={{ color: '#0f0f0f' }}>{video.titulo}</p>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{video.views} visualizações · Hoje</p>

        <div
          className="flex gap-4 pb-3 mb-3 overflow-x-auto"
          style={{ borderBottom: '1px solid #e5e7eb' }}
        >
          {[
            { e: curtiu ? '👍' : '👍', n: curtiu ? '4,9 mil' : '4,8 mil', fn: () => setCurtiu(!curtiu) },
            { e: '👎', n: 'Não curti', fn: null },
            { e: '↩️', n: 'Compartilhar', fn: null },
            { e: '⬇️', n: 'Baixar', fn: null },
            { e: '🔖', n: 'Salvar', fn: null },
          ].map(b => (
            <button key={b.n} onClick={b.fn} className="flex flex-col items-center gap-1 flex-shrink-0">
              <span style={{ fontSize: 22, color: curtiu && b.n.includes('mil') ? '#065f46' : '#374151' }}>{b.e}</span>
              <span style={{ fontSize: 11, color: '#374151' }}>{b.n}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 pb-3 mb-3" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 44, height: 44, background: '#f3f4f6', fontSize: 24 }}
          >
            🎬
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: '#0f0f0f' }}>{video.canal}</p>
            <p style={{ fontSize: 12, color: '#6b7280' }}>150 mil inscritos</p>
          </div>
          <button
            onClick={() => setInscrito(!inscrito)}
            className="px-4 py-2 rounded-full font-bold text-sm flex-shrink-0"
            style={{ background: inscrito ? '#e5e7eb' : '#0f0f0f', color: inscrito ? '#374151' : '#fff' }}
          >
            {inscrito ? 'Inscrito ✓' : 'Inscrever-se'}
          </button>
        </div>

        <p className="font-bold text-base mb-3" style={{ color: '#0f0f0f' }}>
          Comentários <span style={{ color: '#6b7280', fontWeight: 400 }}>2,3 mil</span>
        </p>
        <div className="flex gap-3">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{ width: 36, height: 36, background: '#dbeafe', fontSize: 18 }}
          >
            👩‍🦳
          </div>
          <div className="flex-1 px-4 py-2 rounded-2xl" style={{ background: '#f1f3f4' }}>
            <p style={{ fontSize: 14, color: '#9ca3af' }}>Adicionar um comentário...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimuladorYouTube() {
  const { voltar } = useApp()
  const [tela, setTela] = useState('home')
  const [videoAberto, setVideoAberto] = useState(null)

  return (
    <SimuladorZoomWrapper>
      <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#fff' }}>
        <BannerSimulador nome="YouTube" onSair={voltar} />
        {tela === 'home' && <TelaHome onAbrirVideo={v => { setVideoAberto(v); setTela('video') }} />}
        {tela === 'video' && <TelaVideo video={videoAberto} onVoltar={() => setTela('home')} />}
      </div>
    </SimuladorZoomWrapper>
  )
}
