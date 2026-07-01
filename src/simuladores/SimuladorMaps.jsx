import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BannerSimulador from './BannerSimulador'
import SimuladorZoomWrapper from './SimuladorZoomWrapper'

const resultados = [
  { id: 1, nome: 'UBS Vila Nova', dist: '0,5 km', rating: '4.2', tempo: '6 min a pé', aberto: true, tel: '(11) 3456-7890', end: 'Rua das Flores, 123 — Vila Nova' },
  { id: 2, nome: 'UBS Centro', dist: '1,2 km', rating: '4.0', tempo: '15 min a pé', aberto: true, tel: '(11) 3456-1234', end: 'Av. Central, 500 — Centro' },
  { id: 3, nome: 'UBS Jardim América', dist: '2,1 km', rating: '3.8', tempo: '25 min a pé', aberto: false, tel: '(11) 3456-5678', end: 'Rua Ipê, 78 — Jardim América' },
]

function MapaFake({ pinAtivo }) {
  return (
    <div className="relative flex-shrink-0" style={{ height: 200, background: '#e8ead2', overflow: 'hidden' }}>
      <div className="absolute" style={{ top: 70, left: 0, right: 0, height: 18, background: '#fff', opacity: 0.75 }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: 110, width: 12, background: '#fff', opacity: 0.75 }} />
      <div className="absolute" style={{ top: 130, left: 0, right: 0, height: 9, background: '#fff', opacity: 0.5 }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: 230, width: 9, background: '#fff', opacity: 0.5 }} />
      <div className="absolute rounded" style={{ top: 35, left: 130, width: 60, height: 35, background: '#d1d5db' }} />
      <div className="absolute rounded" style={{ top: 95, left: 240, width: 50, height: 40, background: '#d1d5db' }} />
      <div className="absolute rounded" style={{ top: 140, left: 50, width: 45, height: 30, background: '#d1d5db' }} />
      {pinAtivo && (
        <div className="absolute flex flex-col items-center" style={{ top: 38, left: 120, zIndex: 2 }}>
          <div
            className="flex items-center justify-center rounded-full text-white font-bold"
            style={{ width: 32, height: 32, background: '#EA4335', fontSize: 18, boxShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
          >
            📍
          </div>
        </div>
      )}
      <div
        className="absolute rounded-full"
        style={{ bottom: 50, left: 190, width: 16, height: 16, background: '#4285F4', border: '3px solid #fff', boxShadow: '0 0 0 5px rgba(66,133,244,0.25)' }}
      />
      <button
        className="absolute flex items-center justify-center rounded-full shadow-md"
        style={{ bottom: 12, right: 12, width: 42, height: 42, background: '#fff', fontSize: 20 }}
      >
        🎯
      </button>
    </div>
  )
}

function TelaHome({ onBuscar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-3 py-2 flex-shrink-0" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <button
          onClick={() => onBuscar('UBS')}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-full text-left"
          style={{ background: '#f1f3f4', border: '1px solid #ddd' }}
        >
          <span style={{ fontSize: 18, color: '#4285F4' }}>🔍</span>
          <span style={{ color: '#9ca3af', fontSize: 15 }}>Pesquise aqui</span>
        </button>
      </div>

      <MapaFake pinAtivo={false} />

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ background: '#fff' }}>
        <p className="font-bold text-base mb-3" style={{ color: '#374151' }}>O que quer encontrar?</p>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[['🏥', 'Saúde'], ['🍽️', 'Restaurante'], ['🏧', 'Banco'], ['⛽', 'Posto']].map(([e, n]) => (
            <button
              key={n}
              onClick={() => onBuscar('UBS')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
            >
              <span style={{ fontSize: 26 }}>{e}</span>
              <span style={{ fontSize: 11, color: '#374151', textAlign: 'center' }}>{n}</span>
            </button>
          ))}
        </div>
        <p className="font-bold text-base mb-2" style={{ color: '#374151' }}>Recentes</p>
        <button onClick={() => onBuscar('UBS')} className="flex items-center gap-3 py-2 w-full">
          <span style={{ fontSize: 20, color: '#9ca3af' }}>🕐</span>
          <span style={{ fontSize: 15, color: '#374151' }}>UBS Vila Nova</span>
        </button>
      </div>
    </div>
  )
}

function TelaResultados({ onAbrirLocal, onVoltar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <button onClick={onVoltar} style={{ fontSize: 22, color: '#4285F4' }}>←</button>
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: '#f1f3f4' }}>
          <span style={{ fontSize: 16, color: '#4285F4' }}>🔍</span>
          <span style={{ fontSize: 15, color: '#374151' }}>UBS</span>
        </div>
      </div>

      <MapaFake pinAtivo />

      <div className="flex-1 overflow-y-auto" style={{ background: '#fff' }}>
        <div className="px-4 py-2">
          <p style={{ fontSize: 13, color: '#6b7280' }}>3 resultados próximos a você</p>
        </div>
        {resultados.map(r => (
          <button
            key={r.id}
            onClick={() => onAbrirLocal(r)}
            className="flex items-start gap-3 px-4 py-3 w-full text-left"
            style={{ borderTop: '1px solid #f0f0f0' }}
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0 mt-1"
              style={{ width: 44, height: 44, background: '#fee2e2', fontSize: 22 }}
            >
              🏥
            </div>
            <div className="flex-1">
              <p className="font-bold text-base" style={{ color: '#111' }}>{r.nome}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>⭐ {r.rating} · {r.dist} · {r.tempo}</p>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: r.aberto ? '#dcfce7' : '#fee2e2', color: r.aberto ? '#166534' : '#991b1b' }}
              >
                {r.aberto ? 'Aberto agora' : 'Fechado'}
              </span>
            </div>
            <span style={{ fontSize: 18, color: '#9ca3af', marginTop: 4 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function TelaLocal({ local, onVoltar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <button onClick={onVoltar} style={{ fontSize: 22, color: '#4285F4' }}>←</button>
        <span className="font-bold text-lg flex-1" style={{ color: '#111' }}>{local.nome}</span>
      </div>

      <MapaFake pinAtivo />

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: '#fff' }}>
        <h2 className="font-bold text-2xl mb-1" style={{ color: '#111' }}>{local.nome}</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>⭐ {local.rating} · Posto de saúde</p>

        <div className="flex gap-3 mb-5">
          {[['🗺️', 'Rota'], ['📞', 'Ligar'], ['🔖', 'Salvar']].map(([e, n]) => (
            <div
              key={n}
              className="flex flex-col items-center gap-1 flex-1 py-3 rounded-xl"
              style={{ background: '#f1f3f4' }}
            >
              <span style={{ fontSize: 24 }}>{e}</span>
              <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{n}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span style={{ fontSize: 22, marginTop: 1 }}>📍</span>
            <p style={{ fontSize: 15, color: '#111' }}>{local.end}</p>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 22 }}>🕐</span>
            <span style={{ fontSize: 15, color: local.aberto ? '#166534' : '#991b1b' }}>
              {local.aberto ? 'Aberto agora · Fecha às 17h00' : 'Fechado · Abre às 08h00'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 22 }}>📞</span>
            <span style={{ fontSize: 15, color: '#111' }}>{local.tel}</span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: 22 }}>🚶</span>
            <span style={{ fontSize: 15, color: '#111' }}>{local.tempo} de você</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimuladorMaps() {
  const { voltar } = useApp()
  const [tela, setTela] = useState('home')
  const [localAberto, setLocalAberto] = useState(null)

  function abrirLocal(l) {
    setLocalAberto(l)
    setTela('local')
  }

  return (
    <SimuladorZoomWrapper>
      <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#fff' }}>
        <BannerSimulador nome="Google Maps" onSair={voltar} />
        {tela === 'home' && <TelaHome onBuscar={() => setTela('resultados')} />}
        {tela === 'resultados' && <TelaResultados onAbrirLocal={abrirLocal} onVoltar={() => setTela('home')} />}
        {tela === 'local' && <TelaLocal local={localAberto} onVoltar={() => setTela('resultados')} />}
      </div>
    </SimuladorZoomWrapper>
  )
}
