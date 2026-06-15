import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

const pares = [
  {
    emoji: '🔍',
    nome: 'Pesquisar',
    dica: 'Usado para buscar algo no celular ou na internet.',
    variacoes: [
      { simbolo: '🔍', app: 'Google / Chrome', descricao: 'Lupa com cabo, a mais comum em buscadores.' },
      { simbolo: '⌕', app: 'iOS / Safari', descricao: 'Lupa mais fina e arredondada, sem cabo longo.' },
      { simbolo: '🔎', app: 'WhatsApp / Telegram', descricao: 'Lupa menor, geralmente no canto superior da tela.' },
      { simbolo: '▭🔍', app: 'Instagram / YouTube', descricao: 'Barra de texto com lupa dentro, convida a digitar.' },
    ],
  },
  {
    emoji: '⚙️',
    nome: 'Configurações',
    dica: 'Abre as opções para ajustar o celular do seu jeito.',
    variacoes: [
      { simbolo: '⚙️', app: 'Android / Gmail', descricao: 'Engrenagem clássica, a mais encontrada em aplicativos.' },
      { simbolo: '⋮', app: 'WhatsApp / Chrome', descricao: 'Três pontos verticais (também abrem um menu de opções).' },
      { simbolo: '🎚️', app: 'Spotify / Músicas', descricao: 'Controles deslizantes, indica ajustes e preferências.' },
      { simbolo: '☰', app: 'Alguns apps antigos', descricao: 'Três linhas horizontais, às vezes usado no lugar da engrenagem.' },
    ],
  },
  {
    emoji: '🏠',
    nome: 'Início',
    dica: 'Volta para a tela principal do aplicativo.',
    variacoes: [
      { simbolo: '🏠', app: 'Maioria dos apps', descricao: 'Casa com telhado, indica a tela inicial do aplicativo.' },
      { simbolo: '⊞', app: 'Instagram / TikTok', descricao: 'Grade de quadrados, usado como "início" em redes sociais.' },
      { simbolo: '◉', app: 'Android (botão físico)', descricao: 'Círculo na barra inferior do celular, volta para o início.' },
      { simbolo: '△', app: 'Android mais antigo', descricao: 'Triângulo apontando para cima, também significa "início".' },
    ],
  },
  {
    emoji: '🔔',
    nome: 'Notificações',
    dica: 'Avisa sobre mensagens, alertas e novidades.',
    variacoes: [
      { simbolo: '🔔', app: 'WhatsApp / Gmail', descricao: 'Sino vazio — sem notificações pendentes.' },
      { simbolo: '🔔¹', app: 'Instagram / Facebook', descricao: 'Sino com número vermelho indicando quantas notificações há.' },
      { simbolo: '🔕', app: 'Qualquer app', descricao: 'Sino com risco — notificações silenciadas ou desligadas.' },
      { simbolo: '●', app: 'Ícone do app na tela inicial', descricao: 'Bolinha vermelha no canto do ícone do aplicativo.' },
    ],
  },
  {
    emoji: '👤',
    nome: 'Perfil',
    dica: 'Abre suas informações pessoais na conta.',
    variacoes: [
      { simbolo: '👤', app: 'Maioria dos apps', descricao: 'Silhueta de uma pessoa, indica sua conta ou perfil.' },
      { simbolo: '🖼️', app: 'Quando tem foto', descricao: 'Círculo com sua foto de perfil, após cadastrar uma imagem.' },
      { simbolo: '👥', app: 'WhatsApp / Contatos', descricao: 'Duas pessoas, indica lista de contatos ou grupos.' },
      { simbolo: '◯', app: 'Apps minimalistas', descricao: 'Círculo simples com silhueta mínima, versão mais moderna.' },
    ],
  },
  {
    emoji: '❤️',
    nome: 'Favorito',
    dica: 'Salva algo que você gostou para acessar depois.',
    variacoes: [
      { simbolo: '❤️', app: 'Instagram / TikTok', descricao: 'Coração vermelho — curtir ou favoritar uma publicação.' },
      { simbolo: '🤍', app: 'Antes de curtir', descricao: 'Coração vazio (sem preenchimento) — ainda não foi curtido.' },
      { simbolo: '⭐', app: 'Google Maps / YouTube', descricao: 'Estrela — salvar um lugar favorito ou vídeo assistir depois.' },
      { simbolo: '🔖', app: 'Instagram / Twitter', descricao: 'Marcador/bandeira — salvar uma publicação para ver depois.' },
    ],
  },
  {
    emoji: '📤',
    nome: 'Compartilhar',
    dica: 'Envia uma foto, link ou mensagem para outras pessoas.',
    variacoes: [
      { simbolo: '⬆️', app: 'iPhone / iOS', descricao: 'Seta para cima saindo de uma caixa — o padrão do iPhone.' },
      { simbolo: '〈⋯', app: 'Android / Chrome', descricao: 'Três pontos conectados por linhas — o padrão do Android.' },
      { simbolo: '↩️', app: 'WhatsApp', descricao: 'Seta curvada para o lado — significa encaminhar mensagem.' },
      { simbolo: '📋', app: 'Copiar link', descricao: 'Prancheta — copiar o endereço para colar em outro lugar.' },
    ],
  },
  {
    emoji: '🔒',
    nome: 'Privacidade',
    dica: 'Indica que algo está seguro e protegido.',
    variacoes: [
      { simbolo: '🔒', app: 'Navegadores (sites seguros)', descricao: 'Cadeado fechado — o site ou conteúdo está protegido.' },
      { simbolo: '🔓', app: 'Quando não está protegido', descricao: 'Cadeado aberto — atenção, este site pode não ser seguro.' },
      { simbolo: '🛡️', app: 'Antivírus / Segurança', descricao: 'Escudo — indica proteção ativa no aparelho.' },
      { simbolo: '🔑', app: 'Senhas / Login', descricao: 'Chave — indica área de senha ou acesso à conta.' },
    ],
  },
  {
    emoji: '📷',
    nome: 'Câmera',
    dica: 'Abre a câmera para tirar fotos ou gravar vídeos.',
    variacoes: [
      { simbolo: '📷', app: 'Maioria dos apps', descricao: 'Câmera fotográfica clássica — tirar foto.' },
      { simbolo: '📸', app: 'Com flash ativo', descricao: 'Câmera com relâmpago — indica que o flash está ligado.' },
      { simbolo: '🎥', app: 'Vídeos / Reels', descricao: 'Câmera de vídeo — gravar um vídeo ou fazer uma chamada.' },
      { simbolo: '🤳', app: 'Câmera frontal / Selfie', descricao: 'Indica a câmera da frente, para tirar selfie.' },
    ],
  },
  {
    emoji: '☰',
    nome: 'Menu',
    dica: 'Abre uma lista com mais opções do aplicativo.',
    variacoes: [
      { simbolo: '☰', app: 'Maioria dos apps', descricao: 'Três linhas horizontais — o "menu hambúrguer", o mais comum.' },
      { simbolo: '⋮', app: 'Android / WhatsApp', descricao: 'Três pontos verticais — abre opções extras da tela atual.' },
      { simbolo: '···', app: 'iPhone / iOS', descricao: 'Três pontos horizontais — mais opções, usado no iOS.' },
      { simbolo: '⊟', app: 'Apps de navegação', descricao: 'Linhas com um traço menor — menu com filtros ou categorias.' },
    ],
  },
]

function BottomSheet({ icone, onFechar, altoContraste }) {
  if (!icone) return null

  const bg = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const cardVar = altoContraste ? '#0f0f0f' : '#f9fafb'
  const borda = altoContraste ? '#333' : '#e5e7eb'

  const target = document.getElementById('phone-overlay-root')
  if (!target) return null

  return createPortal(
    <div
      className="absolute inset-0 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.55)', zIndex: 100 }}
      onClick={onFechar}
    >
      <div
        className="rounded-t-3xl px-5 pt-4 pb-8 flex flex-col gap-4"
        style={{ background: bg, maxHeight: '82%', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Alça visual */}
        <div className="flex justify-center mb-1">
          <div style={{ width: 44, height: 5, borderRadius: 9, background: altoContraste ? '#555' : '#d1d5db' }} />
        </div>

        {/* Cabeçalho */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: 64, height: 64, background: cardVar, fontSize: 34, border: `1.5px solid ${borda}` }}
          >
            {icone.emoji}
          </div>
          <div className="flex-1">
            <p className="font-bold text-xl" style={{ color: texto }}>{icone.nome}</p>
            <p style={{ color: subtexto, fontSize: 14, lineHeight: 1.4 }}>{icone.dica}</p>
          </div>
          <button
            onClick={onFechar}
            className="flex items-center justify-center rounded-full font-bold"
            style={{ width: 40, height: 40, background: cardVar, color: subtexto, fontSize: 18, flexShrink: 0 }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: borda }} />

        {/* Título das variações */}
        <p className="font-bold text-base" style={{ color: texto }}>
          Como esse ícone aparece nos aplicativos:
        </p>

        {/* Cards de variações */}
        <div className="flex flex-col gap-3">
          {icone.variacoes.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl px-4 py-4"
              style={{ background: cardVar, border: `1.5px solid ${borda}` }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0 font-bold"
                style={{ width: 56, height: 56, background: bg, border: `1.5px solid ${borda}`, fontSize: 26, color: texto }}
              >
                {v.simbolo}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: altoContraste ? '#facc15' : '#1d4ed8' }}>{v.app}</p>
                <p style={{ color: subtexto, fontSize: 14, lineHeight: 1.4, marginTop: 2 }}>{v.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botão fechar */}
        <button
          onClick={onFechar}
          className="w-full py-4 rounded-2xl font-bold text-lg mt-1"
          style={{
            background: altoContraste ? '#facc15' : '#1d4ed8',
            color: altoContraste ? '#000' : '#fff',
            minHeight: 64,
          }}
        >
          Entendi
        </button>
      </div>
    </div>,
    target
  )
}

export default function AlfabetizacaoVisual() {
  const { altoContraste } = useApp()
  const [fase, setFase] = useState('lista')
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [opcoes, setOpcoes] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [respondido, setRespondido] = useState(false)
  const [iconeDetalhes, setIconeDetalhes] = useState(null)

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const amarelo = altoContraste ? '#facc15' : '#1d4ed8'

  function embaralhar(arr) {
    return [...arr].sort(() => Math.random() - 0.5)
  }

  function gerarOpcoes(indice) {
    const correto = pares[indice]
    const outros = pares.filter((_, i) => i !== indice)
    const embaralhados = embaralhar(outros).slice(0, 3)
    return embaralhar([correto, ...embaralhados])
  }

  function iniciarJogo() {
    setIndiceAtual(0)
    setAcertos(0)
    setSelecionado(null)
    setRespondido(false)
    setOpcoes(gerarOpcoes(0))
    setFase('jogo')
  }

  function responder(opcao) {
    if (respondido) return
    setSelecionado(opcao)
    setRespondido(true)
    if (opcao.nome === pares[indiceAtual].nome) {
      setAcertos(a => a + 1)
    }
  }

  function proximo() {
    const prox = indiceAtual + 1
    if (prox >= pares.length) {
      setFase('resultado')
    } else {
      setIndiceAtual(prox)
      setSelecionado(null)
      setRespondido(false)
      setOpcoes(gerarOpcoes(prox))
    }
  }

  const atual = pares[indiceAtual]

  if (fase === 'lista') {
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo="Aprender a Usar" />

        <div className="flex flex-col gap-4 px-5 py-5 pb-24">
          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold text-xl mb-2" style={{ color: texto }}>Ícones do celular</p>
            <p style={{ color: subtexto, fontSize: 16, lineHeight: 1.5 }}>
              Toque em qualquer ícone para ver como ele aparece em diferentes aplicativos:
            </p>
          </div>

          {pares.map((par, i) => (
            <button
              key={i}
              onClick={() => setIconeDetalhes(par)}
              className="flex items-center gap-4 rounded-3xl px-5 py-4 shadow-sm text-left w-full"
              style={{
                background: card,
                border: altoContraste ? '1px solid #333' : 'none',
                minHeight: 88,
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0"
                style={{
                  width: 64,
                  height: 64,
                  background: altoContraste ? '#0f0f0f' : '#f3f4f6',
                  fontSize: 32,
                  border: altoContraste ? '1px solid #444' : 'none',
                }}
              >
                {par.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg" style={{ color: texto }}>{par.nome}</p>
                <p style={{ color: subtexto, fontSize: 14, lineHeight: 1.4 }}>{par.dica}</p>
              </div>
              <span style={{ fontSize: 20, color: altoContraste ? '#facc15' : '#1d4ed8', flexShrink: 0 }}>›</span>
            </button>
          ))}

          <button
            onClick={iniciarJogo}
            className="w-full py-5 rounded-2xl font-bold text-xl mt-2"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
          >
            🎯 Iniciar Jogo de Associação
          </button>
        </div>

        <BottomSheet
          icone={iconeDetalhes}
          onFechar={() => setIconeDetalhes(null)}
          altoContraste={altoContraste}
        />

        <BotaoAjuda />
      </div>
    )
  }

  if (fase === 'resultado') {
    const nota = Math.round((acertos / pares.length) * 100)
    const emoji = nota >= 80 ? '🏆' : nota >= 60 ? '😊' : '💪'
    const mensagem = nota >= 80
      ? 'Excelente! Você conhece muito bem os ícones!'
      : nota >= 60
      ? 'Muito bem! Continue praticando!'
      : 'Continue tentando, você vai melhorar!'

    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo="Resultado" />
        <div className="flex flex-col items-center px-5 py-8 gap-6">
          <span style={{ fontSize: 80 }}>{emoji}</span>
          <div className="text-center">
            <p className="font-bold text-2xl mb-2" style={{ color: texto }}>{nota}% de acertos</p>
            <p className="text-lg" style={{ color: subtexto }}>{mensagem}</p>
          </div>
          <div className="w-full rounded-3xl p-5" style={{ background: card }}>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold text-3xl" style={{ color: '#059669' }}>{acertos}</p>
                <p style={{ color: subtexto }}>Acertos</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-3xl" style={{ color: '#dc2626' }}>{pares.length - acertos}</p>
                <p style={{ color: subtexto }}>Erros</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-3xl" style={{ color: texto }}>{pares.length}</p>
                <p style={{ color: subtexto }}>Total</p>
              </div>
            </div>
          </div>
          <button
            onClick={iniciarJogo}
            className="w-full py-5 rounded-2xl font-bold text-xl"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
          >
            🔄 Jogar Novamente
          </button>
          <button
            onClick={() => setFase('lista')}
            className="w-full py-4 rounded-2xl font-bold text-lg"
            style={{ background: 'transparent', color: amarelo, border: `2px solid ${amarelo}`, minHeight: 64 }}
          >
            Ver lista de ícones
          </button>
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  // Fase: jogo
  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Jogo de Associação" />
      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 10, background: altoContraste ? '#333' : '#e5e7eb' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(indiceAtual / pares.length) * 100}%`, background: amarelo }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: subtexto }}>{indiceAtual + 1}/{pares.length}</span>
        </div>

        <div className="rounded-3xl p-6 flex flex-col items-center" style={{ background: card }}>
          <p className="font-bold text-lg mb-4 text-center" style={{ color: subtexto }}>
            Qual o nome deste ícone?
          </p>
          <div
            className="flex items-center justify-center rounded-3xl mb-4"
            style={{ width: 100, height: 100, background: altoContraste ? '#0f172a' : '#f3f4f6', fontSize: 56 }}
          >
            {atual.emoji}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {opcoes.map((op, i) => {
            const correto = op.nome === atual.nome
            const esteEscolhido = selecionado?.nome === op.nome
            let bgBotao = card
            let bordaBotao = altoContraste ? '#444' : '#e5e7eb'
            let corTexto = texto

            if (respondido) {
              if (correto) { bgBotao = '#059669'; bordaBotao = '#059669'; corTexto = '#fff' }
              else if (esteEscolhido) { bgBotao = '#dc2626'; bordaBotao = '#dc2626'; corTexto = '#fff' }
            } else if (esteEscolhido) {
              bgBotao = altoContraste ? '#1a1a00' : '#eff6ff'
              bordaBotao = amarelo
              corTexto = amarelo
            }

            return (
              <button
                key={i}
                onClick={() => responder(op)}
                className="rounded-2xl px-5 py-4 font-bold text-lg text-left transition-all"
                style={{ background: bgBotao, border: `2.5px solid ${bordaBotao}`, color: corTexto, minHeight: 64 }}
              >
                {respondido && correto && '✓ '}
                {respondido && esteEscolhido && !correto && '✗ '}
                {op.nome}
              </button>
            )
          })}
        </div>

        {respondido && (
          <div
            className="rounded-2xl px-4 py-4"
            style={{ background: selecionado?.nome === atual.nome ? (altoContraste ? '#052e16' : '#d1fae5') : (altoContraste ? '#450a0a' : '#fee2e2') }}
          >
            <p className="font-bold mb-1" style={{ color: selecionado?.nome === atual.nome ? '#059669' : '#dc2626' }}>
              {selecionado?.nome === atual.nome ? '✓ Correto!' : '✗ Quase! A resposta é: ' + atual.nome}
            </p>
            <p style={{ color: altoContraste ? '#d1d5db' : '#374151', fontSize: 15, lineHeight: 1.4 }}>{atual.dica}</p>
          </div>
        )}

        {respondido && (
          <button
            onClick={proximo}
            className="w-full py-5 rounded-2xl font-bold text-xl"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72 }}
          >
            {indiceAtual + 1 >= pares.length ? 'Ver resultado →' : 'Próximo →'}
          </button>
        )}
      </div>
      <BotaoAjuda />
    </div>
  )
}
