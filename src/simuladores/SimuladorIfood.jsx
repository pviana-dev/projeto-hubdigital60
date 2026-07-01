import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BannerSimulador from './BannerSimulador'
import SimuladorZoomWrapper from './SimuladorZoomWrapper'

const restaurantes = [
  { id: 1, nome: 'Restaurante da Dona Maria', cat: 'Comida Caseira', rating: '4.8', tempo: '30–45 min', emoji: '🍲', cor: '#f97316' },
  { id: 2, nome: 'Pizzaria Bella Napoli', cat: 'Pizza', rating: '4.6', tempo: '25–40 min', emoji: '🍕', cor: '#dc2626' },
  { id: 3, nome: 'Churrascaria do Zé', cat: 'Churrasco', rating: '4.5', tempo: '40–55 min', emoji: '🥩', cor: '#92400e' },
]

const pratos = [
  { id: 1, nome: 'Frango Assado com Arroz', desc: 'Frango inteiro assado com alho, ervas e arroz branco soltinho', preco: 28.90, emoji: '🍗' },
  { id: 2, nome: 'Feijoada Completa', desc: 'Feijão preto com carnes selecionadas, farofa, couve e laranja', preco: 34.90, emoji: '🫘' },
  { id: 3, nome: 'Macarrão ao Molho Vermelho', desc: 'Espaguete com molho de tomate caseiro e almôndegas', preco: 24.90, emoji: '🍝' },
]

function TelaHome({ onAbrirRestaurante }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-4 py-3 flex-shrink-0" style={{ background: '#EA1D2C' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Entregar em</p>
            <p className="font-bold text-white text-sm">Rua das Flores, 123 ▾</p>
          </div>
          <span style={{ fontSize: 24, color: '#fff' }}>🔔</span>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: '#fff' }}
        >
          <span style={{ fontSize: 18, color: '#9ca3af' }}>🔍</span>
          <span style={{ color: '#9ca3af', fontSize: 14 }}>Buscar restaurantes e pratos</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#f5f5f5' }}>
        <div className="flex gap-3 px-4 py-3 overflow-x-auto">
          {[['🍔', 'Burguer'], ['🍕', 'Pizza'], ['🍱', 'Japonês'], ['🥗', 'Saudável'], ['🍲', 'Caseiro']].map(([e, n]) => (
            <button
              key={n}
              className="flex flex-col items-center gap-1 flex-shrink-0 px-3 py-2 rounded-xl"
              style={{ background: '#fff', border: '1px solid #e5e7eb' }}
            >
              <span style={{ fontSize: 26 }}>{e}</span>
              <span style={{ fontSize: 11, color: '#374151', whiteSpace: 'nowrap' }}>{n}</span>
            </button>
          ))}
        </div>

        <div
          className="mx-4 mb-4 rounded-2xl flex items-center justify-center"
          style={{ height: 90, background: 'linear-gradient(135deg, #EA1D2C 0%, #f97316 100%)' }}
        >
          <p className="font-bold text-white text-lg">🎉 Frete grátis hoje!</p>
        </div>

        <div className="px-4 mb-2">
          <p className="font-bold text-base" style={{ color: '#111' }}>Restaurantes próximos</p>
        </div>

        {restaurantes.map(r => (
          <button
            key={r.id}
            onClick={() => onAbrirRestaurante(r)}
            className="mx-4 mb-3 rounded-2xl overflow-hidden text-left w-auto shadow-sm"
            style={{ background: '#fff' }}
          >
            <div
              className="flex items-center justify-center w-full"
              style={{ height: 110, background: r.cor }}
            >
              <span style={{ fontSize: 60, opacity: 0.5 }}>{r.emoji}</span>
            </div>
            <div className="px-3 py-2">
              <p className="font-bold text-base" style={{ color: '#111' }}>{r.nome}</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>⭐ {r.rating} · {r.cat} · {r.tempo}</p>
              <p style={{ fontSize: 12, color: '#25a244' }}>Frete grátis</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function TelaRestaurante({ restaurante, onAbrirPrato, onVoltar }) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="relative flex-shrink-0" style={{ height: 140, background: restaurante.cor }}>
        <button
          onClick={onVoltar}
          className="absolute top-3 left-3 flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.4)', fontSize: 20, color: '#fff' }}
        >
          ←
        </button>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: 64, opacity: 0.35 }}
        >
          {restaurante.emoji}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#f5f5f5' }}>
        <div className="px-4 py-3 mb-2" style={{ background: '#fff' }}>
          <h2 className="font-bold text-xl" style={{ color: '#111' }}>{restaurante.nome}</h2>
          <p style={{ fontSize: 13, color: '#6b7280' }}>⭐ {restaurante.rating} · {restaurante.tempo} · Frete grátis</p>
        </div>

        <div className="px-4 mb-2">
          <p className="font-bold text-base" style={{ color: '#111' }}>Mais pedidos</p>
        </div>

        {pratos.map(p => (
          <button
            key={p.id}
            onClick={() => onAbrirPrato(p)}
            className="flex items-center gap-3 mx-4 mb-3 px-3 py-3 rounded-2xl text-left w-auto"
            style={{ background: '#fff' }}
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: 72, height: 72, background: '#fef3c7', fontSize: 40 }}
            >
              {p.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: '#111' }}>{p.nome}</p>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{p.desc}</p>
              <p className="font-bold mt-1" style={{ color: '#111', fontSize: 14 }}>R$ {p.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <span style={{ fontSize: 22, color: '#EA1D2C' }}>➕</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function TelaPrato({ prato, onVoltar }) {
  const [qtd, setQtd] = useState(1)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="relative flex-shrink-0" style={{ height: 180, background: '#fef3c7' }}>
        <button
          onClick={onVoltar}
          className="absolute top-3 left-3 flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.15)', fontSize: 20, color: '#111' }}
        >
          ←
        </button>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: 90 }}
        >
          {prato.emoji}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ background: '#fff' }}>
        <h2 className="font-bold text-xl mb-2" style={{ color: '#111' }}>{prato.nome}</h2>
        <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.5, marginBottom: 16 }}>{prato.desc}</p>

        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl mb-4"
          style={{ background: '#f5f5f5' }}
        >
          <p className="font-bold text-base" style={{ color: '#111' }}>Alguma observação?</p>
          <span style={{ fontSize: 16, color: '#9ca3af' }}>›</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="font-bold text-base" style={{ color: '#111' }}>Quantidade</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQtd(q => Math.max(1, q - 1))}
              className="flex items-center justify-center rounded-full font-bold text-xl"
              style={{ width: 40, height: 40, background: qtd === 1 ? '#e5e7eb' : '#EA1D2C', color: qtd === 1 ? '#9ca3af' : '#fff' }}
            >
              −
            </button>
            <span className="font-bold text-xl" style={{ color: '#111', minWidth: 24, textAlign: 'center' }}>{qtd}</span>
            <button
              onClick={() => setQtd(q => q + 1)}
              className="flex items-center justify-center rounded-full font-bold text-xl"
              style={{ width: 40, height: 40, background: '#EA1D2C', color: '#fff' }}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="w-full py-4 rounded-2xl font-bold text-lg"
          style={{ background: '#EA1D2C', color: '#fff' }}
        >
          Adicionar ao pedido · R$ {(prato.preco * qtd).toFixed(2).replace('.', ',')}
        </button>
      </div>
    </div>
  )
}

export default function SimuladorIfood() {
  const { voltar } = useApp()
  const [tela, setTela] = useState('home')
  const [restauranteAberto, setRestauranteAberto] = useState(null)
  const [pratoAberto, setPratoAberto] = useState(null)

  return (
    <SimuladorZoomWrapper>
      <div className="relative flex flex-col h-full overflow-hidden" style={{ background: '#fff' }}>
        <BannerSimulador nome="iFood" onSair={voltar} />
      {tela === 'home' && (
        <TelaHome onAbrirRestaurante={r => { setRestauranteAberto(r); setTela('restaurante') }} />
      )}
      {tela === 'restaurante' && (
        <TelaRestaurante
          restaurante={restauranteAberto}
          onAbrirPrato={p => { setPratoAberto(p); setTela('prato') }}
          onVoltar={() => setTela('home')}
        />
      )}
      {tela === 'prato' && (
        <TelaPrato prato={pratoAberto} onVoltar={() => setTela('restaurante')} />
      )}
      </div>
    </SimuladorZoomWrapper>
  )
}
