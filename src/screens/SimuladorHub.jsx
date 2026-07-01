import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'
import { SiWhatsapp, SiGooglemaps, SiYoutube, SiIfood } from 'react-icons/si'

function GovBrIcon({ size }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
      <span style={{ fontSize: size * 0.48, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>gov</span>
      <span style={{ fontSize: size * 0.3, fontWeight: 700, color: '#7ee8a2' }}>.br</span>
    </div>
  )
}

const apps = [
  {
    id: 'sim-whatsapp',
    nome: 'WhatsApp',
    Icone: SiWhatsapp,
    cor: '#25D366',
    corClara: '#dcfce7',
    descricao: 'Enviar mensagens e ligar para a família',
  },
  {
    id: 'sim-maps',
    nome: 'Google Maps',
    Icone: SiGooglemaps,
    cor: '#4285F4',
    corClara: '#dbeafe',
    descricao: 'Buscar endereços e traçar rotas',
  },
  {
    id: 'sim-youtube',
    nome: 'YouTube',
    Icone: SiYoutube,
    cor: '#FF0000',
    corClara: '#fee2e2',
    descricao: 'Assistir vídeos e seguir canais',
  },
  {
    id: 'sim-ifood',
    nome: 'iFood',
    Icone: SiIfood,
    cor: '#EA1D2C',
    corClara: '#fee2e2',
    descricao: 'Pedir refeições pelo celular',
  },
  {
    id: 'sim-govbr',
    nome: 'Gov.br',
    Icone: null,
    cor: '#1351B4',
    corClara: '#dbeafe',
    descricao: 'Documentos e serviços do governo',
  },
]

export default function SimuladorHub() {
  const { navegar, altoContraste, fs } = useApp()
  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Praticar Aplicativos" />

      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        <div className="rounded-3xl p-5" style={{ background: card }}>
          <p className="font-bold mb-2" style={{ fontSize: fs(20), color: texto }}>Pratique sem medo</p>
          <p style={{ color: subtexto, fontSize: fs(16), lineHeight: 1.5 }}>
            Escolha um aplicativo para explorar como ele funciona. Tudo é simulado — você não vai errar nada de verdade.
          </p>
        </div>

        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => navegar(app.id)}
            className="flex items-center gap-5 rounded-3xl px-5 py-5 shadow-sm text-left"
            style={{
              background: altoContraste ? '#1a1a1a' : '#fff',
              border: altoContraste ? `2px solid ${app.cor}` : 'none',
              minHeight: 100,
            }}
          >
            <div
              className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 72,
                height: 72,
                background: app.cor,
                border: altoContraste ? `2px solid ${app.cor}` : 'none',
              }}
            >
              {app.Icone
                ? <app.Icone size={fs(36)} color="#fff" />
                : <GovBrIcon size={fs(36)} />
              }
            </div>
            <div className="flex-1">
              <p className="font-bold" style={{ fontSize: fs(20), color: altoContraste ? '#fff' : app.cor }}>{app.nome}</p>
              <p className="mt-1" style={{ fontSize: fs(16), color: subtexto }}>{app.descricao}</p>
            </div>
            <span style={{ fontSize: fs(24), color: altoContraste ? '#fff' : '#9ca3af' }}>›</span>
          </button>
        ))}

        <a
          href="?acessivel=galeria"
          className="text-center mt-2"
          style={{ fontSize: 13, color: subtexto, textDecoration: 'underline' }}
        >
          Ver telas com fonte ampliada
        </a>
      </div>

      <BotaoAjuda />
    </div>
  )
}
