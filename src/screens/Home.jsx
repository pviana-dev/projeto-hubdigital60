import { useApp } from '../context/AppContext'
import BotaoAjuda from '../components/BotaoAjuda'

const categorias = [
  {
    id: 'saude',
    emoji: '🏥',
    titulo: 'Minha Saúde',
    descricao: 'Consultas e medicamentos',
    cor: '#059669',
    corClara: '#d1fae5',
  },
  {
    id: 'documentos',
    emoji: '📄',
    titulo: 'Meus Documentos',
    descricao: 'RG, CPF e outros',
    cor: '#7c3aed',
    corClara: '#ede9fe',
  },
  {
    id: 'aprender',
    emoji: '📚',
    titulo: 'Aprender a Usar',
    descricao: 'Conheça os ícones do celular',
    cor: '#d97706',
    corClara: '#fef3c7',
  },
]

export default function Home() {
  const { navegar, altoContraste } = useApp()

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      {/* Cabeçalho */}
      <div className="px-5 pt-5 pb-4" style={{ background: altoContraste ? '#1a1a1a' : '#1d4ed8' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-base">Olá! Bem-vindo ao</p>
            <h1 className="text-white font-bold" style={{ fontSize: 28, lineHeight: 1.1 }}>Navega+</h1>
          </div>
          <button
            onClick={() => navegar('acessibilidade')}
            className="flex items-center justify-center rounded-full"
            style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.2)', fontSize: 24 }}
            aria-label="Configurações"
          >
            ⚙️
          </button>
        </div>
        <p className="mt-3 text-base" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>
          O que você quer fazer hoje?
        </p>
      </div>

      {/* Categorias */}
      <div className="flex flex-col gap-4 px-5 py-5">
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => navegar(cat.id)}
            className="flex items-center gap-5 rounded-3xl px-5 py-5 shadow-sm text-left"
            style={{
              background: altoContraste ? '#1a1a1a' : '#fff',
              border: altoContraste ? `2px solid ${cat.cor}` : 'none',
              minHeight: 100,
            }}
          >
            <div
              className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 72,
                height: 72,
                background: altoContraste ? 'transparent' : cat.corClara,
                fontSize: 36,
                border: altoContraste ? `2px solid ${cat.cor}` : 'none',
              }}
            >
              {cat.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-xl" style={{ color: altoContraste ? '#fff' : cat.cor }}>{cat.titulo}</p>
              <p className="mt-1 text-base" style={{ color: subtexto }}>{cat.descricao}</p>
            </div>
            <span style={{ fontSize: 24, color: altoContraste ? '#fff' : '#9ca3af' }}>›</span>
          </button>
        ))}

        {/* Banner informativo */}
        <div
          className="rounded-3xl px-5 py-4 mt-1"
          style={{ background: altoContraste ? '#1a1a00' : '#fef3c7', border: altoContraste ? '1px solid #854d0e' : 'none' }}
        >
          <div className="flex items-start gap-3">
            <span style={{ fontSize: 28 }}>💡</span>
            <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: 15, lineHeight: 1.5 }}>
              <strong>Dica:</strong> Tudo aqui é simulado. Você pode praticar sem medo de errar!
            </p>
          </div>
        </div>
      </div>

      <BotaoAjuda />
    </div>
  )
}
