import { useState } from 'react'
import { useApp } from '../context/AppContext'

const dicas = {
  home: 'Esta é a tela principal. Escolha uma das categorias para começar.',
  saude: 'Aqui você encontra tudo sobre saúde: agendar consultas e ver seus medicamentos.',
  agendamento: 'Siga os passos para marcar uma consulta médica. É simples e seguro!',
  medicamentos: 'Aqui você pode ver a lista dos seus medicamentos e os horários de uso.',
  documentos: 'Aqui estão seus documentos digitais. Eles são seguros e ficam sempre com você.',
  aprender: 'Este módulo ensina o significado dos ícones mais usados nos celulares.',
  acessibilidade: 'Aqui você ajusta o tamanho da letra e as cores da tela do jeito que fica melhor para você.',
  default: 'Explore as opções da tela. Não se preocupe, você não vai errar nada de verdade aqui!',
}

export default function BotaoAjuda() {
  const { screen, altoContraste } = useApp()
  const [aberto, setAberto] = useState(false)

  const dica = dicas[screen] || dicas.default

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(true)}
        className="absolute bottom-6 right-4 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-bold text-white"
        style={{
          background: altoContraste ? '#facc15' : '#2563eb',
          color: altoContraste ? '#000' : '#fff',
          fontSize: 16,
          zIndex: 50,
          minWidth: 64,
          minHeight: 64,
        }}
        aria-label="Preciso de ajuda"
      >
        <span style={{ fontSize: 24 }}>?</span>
        <span>Ajuda</span>
      </button>

      {/* Modal */}
      {aberto && (
        <div
          className="absolute inset-0 flex items-end justify-center pb-8 px-4"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}
          onClick={() => setAberto(false)}
        >
          <div
            className="w-full rounded-3xl p-6 shadow-2xl"
            style={{ background: altoContraste ? '#1a1a1a' : '#fff', color: altoContraste ? '#fff' : '#111827' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: 36 }}>💡</span>
              <span className="font-bold text-xl">Dica desta tela</span>
            </div>
            <p className="text-lg leading-relaxed mb-6">{dica}</p>
            <button
              onClick={() => setAberto(false)}
              className="w-full py-4 rounded-2xl font-bold text-lg"
              style={{ background: altoContraste ? '#facc15' : '#2563eb', color: altoContraste ? '#000' : '#fff' }}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
