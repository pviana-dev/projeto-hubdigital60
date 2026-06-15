import { useApp } from '../context/AppContext'

export default function Onboarding() {
  const { navegar, altoContraste } = useApp()

  const bg = altoContraste ? '#000' : '#1d4ed8'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#4b5563'

  return (
    <div className="flex flex-col min-h-full" style={{ background: bg }}>
      {/* Área superior com ilustração */}
      <div className="flex flex-col items-center justify-center pt-10 pb-8 px-6">
        <div
          className="flex items-center justify-center rounded-full mb-4"
          style={{ width: 120, height: 120, background: 'rgba(255,255,255,0.15)' }}
        >
          <span style={{ fontSize: 64 }}>📱</span>
        </div>
        <h1 className="text-white font-bold text-center mb-2" style={{ fontSize: 30, lineHeight: 1.2 }}>
          Bem-vindo ao<br />Navega+
        </h1>
        <p className="text-center mt-2" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, lineHeight: 1.5 }}>
          Seu assistente digital para aprender e praticar o uso do celular com segurança
        </p>
      </div>

      {/* Card inferior */}
      <div
        className="flex-1 rounded-t-3xl px-6 pt-8 pb-6 flex flex-col gap-5"
        style={{ background: card }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <span style={{ fontSize: 32 }}>🔒</span>
            <div>
              <p className="font-bold text-lg" style={{ color: texto }}>100% seguro</p>
              <p style={{ color: subtexto, fontSize: 16, lineHeight: 1.4 }}>Você pratica sem medo. Nenhuma informação real é usada.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span style={{ fontSize: 32 }}>🧩</span>
            <div>
              <p className="font-bold text-lg" style={{ color: texto }}>Passo a passo</p>
              <p style={{ color: subtexto, fontSize: 16, lineHeight: 1.4 }}>Cada tarefa é simples e ensinada de um jeito fácil de entender.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span style={{ fontSize: 32 }}>🎯</span>
            <div>
              <p className="font-bold text-lg" style={{ color: texto }}>Para você</p>
              <p style={{ color: subtexto, fontSize: 16, lineHeight: 1.4 }}>Criado especialmente para pessoas que querem usar o celular com mais confiança.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={() => navegar('acessibilidade')}
            className="w-full py-5 rounded-2xl font-bold text-white text-xl"
            style={{ background: altoContraste ? '#facc15' : '#1d4ed8', color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
          >
            Começar
          </button>
          <button
            onClick={() => navegar('home')}
            className="w-full py-4 rounded-2xl font-bold text-lg"
            style={{ background: 'transparent', color: altoContraste ? '#facc15' : '#1d4ed8', border: `2px solid ${altoContraste ? '#facc15' : '#1d4ed8'}`, minHeight: 64 }}
          >
            Já conheço o aplicativo
          </button>
        </div>
      </div>
    </div>
  )
}
