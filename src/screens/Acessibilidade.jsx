import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'

const opcoesFonte = [
  { valor: 'normal', label: 'Normal', tamanho: 16 },
  { valor: 'grande', label: 'Grande', tamanho: 20 },
  { valor: 'muito-grande', label: 'Muito Grande', tamanho: 24 },
]

export default function Acessibilidade() {
  const { navegar, fontSize, setFontSize, altoContraste, setAltoContraste } = useApp()

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const bordaSelecionada = altoContraste ? '#facc15' : '#1d4ed8'
  const bgSelecionado = altoContraste ? '#1a1a00' : '#eff6ff'

  return (
    <div className="flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Configurar Tela" />

      <div className="flex flex-col gap-5 px-5 py-6">

        {/* Tamanho da Fonte */}
        <div className="rounded-3xl p-5 shadow-sm" style={{ background: card }}>
          <p className="font-bold text-xl mb-1" style={{ color: texto }}>Tamanho da letra</p>
          <p className="mb-4" style={{ color: subtexto, fontSize: 15 }}>Escolha o tamanho que fica mais fácil para você ler</p>
          <div className="flex flex-col gap-3">
            {opcoesFonte.map(op => {
              const selecionado = fontSize === op.valor
              return (
                <button
                  key={op.valor}
                  onClick={() => setFontSize(op.valor)}
                  className="flex items-center justify-between rounded-2xl px-5 py-4 font-semibold transition-all"
                  style={{
                    border: `2.5px solid ${selecionado ? bordaSelecionada : (altoContraste ? '#444' : '#e5e7eb')}`,
                    background: selecionado ? bgSelecionado : 'transparent',
                    color: selecionado ? bordaSelecionada : texto,
                    minHeight: 64,
                    fontSize: op.tamanho,
                  }}
                >
                  <span>{op.label}</span>
                  <span style={{ fontSize: op.tamanho }}>Aa</span>
                  {selecionado && <span style={{ fontSize: 22 }}>✓</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Alto Contraste */}
        <div className="rounded-3xl p-5 shadow-sm" style={{ background: card }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xl mb-1" style={{ color: texto }}>Alto Contraste</p>
              <p style={{ color: subtexto, fontSize: 15 }}>Fundo escuro com letras claras para enxergar melhor</p>
            </div>
            <button
              onClick={() => setAltoContraste(v => !v)}
              className="relative flex-shrink-0 rounded-full transition-all"
              style={{
                width: 64,
                height: 36,
                background: altoContraste ? '#facc15' : '#d1d5db',
                minWidth: 64,
                minHeight: 36,
              }}
              aria-label={altoContraste ? 'Desativar alto contraste' : 'Ativar alto contraste'}
            >
              <span
                className="absolute top-1 rounded-full transition-all"
                style={{
                  width: 28,
                  height: 28,
                  background: '#fff',
                  left: altoContraste ? 32 : 4,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>
          {altoContraste && (
            <div className="mt-3 rounded-xl px-4 py-3" style={{ background: '#facc15', color: '#000' }}>
              <p className="font-bold">Alto contraste ativado ✓</p>
            </div>
          )}
        </div>

        {/* Prévia */}
        <div className="rounded-3xl p-5 shadow-sm" style={{ background: altoContraste ? '#1a1a00' : '#eff6ff', border: `2px solid ${bordaSelecionada}` }}>
          <p className="font-bold mb-1" style={{ color: bordaSelecionada, fontSize: 16 }}>Prévia de como vai ficar:</p>
          <p style={{ color: texto, fontSize: fontSize === 'normal' ? 16 : fontSize === 'grande' ? 20 : 24, lineHeight: 1.5 }}>
            "Olá! Este é um exemplo de como o texto vai aparecer para você."
          </p>
        </div>

        <button
          onClick={() => navegar('home')}
          className="w-full py-5 rounded-2xl font-bold text-xl"
          style={{ background: altoContraste ? '#facc15' : '#1d4ed8', color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
        >
          Salvar e Continuar
        </button>
      </div>
    </div>
  )
}
