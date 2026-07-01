import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'
import {
  MdSearch, MdSettings, MdHome, MdNotifications, MdPerson,
  MdFavorite, MdShare, MdLock, MdCameraAlt, MdMenu,
  MdArrowBack, MdPhone, MdMessage, MdPhotoLibrary, MdLocationOn,
  MdWifi, MdEdit, MdAddCircle, MdDelete, MdCreditCard,
  MdIosShare, MdForward, MdQrCode2, MdDocumentScanner,
  MdClose, MdReplay10, MdCall, MdCallEnd, MdDoneAll,
  MdWifiOff, MdNfc, MdNotificationsActive, MdArrowDownward,
  MdSwipeUp, MdDataUsage, MdBolt, MdFolder, MdTapAndPlay,
} from 'react-icons/md'
import { SiGooglephotos } from 'react-icons/si'

const pares = [
  {
    Icone: MdSearch,
    cor: '#1d4ed8',
    nome: 'Pesquisar',
    dica: 'Usado para buscar algo no celular ou na internet.',
    variacoes: [
      { simbolo: '🔍', app: 'Google / Chrome', descricao: 'Lupa com cabo — a mais comum em buscadores e navegadores.' },
      { simbolo: '🔎', app: 'WhatsApp / Telegram', descricao: 'Lupa menor no canto superior — buscar dentro de conversas.' },
      { simbolo: '🎙️', app: 'Google (pesquisa por voz)', descricao: 'Microfone — fale o que quer buscar em vez de digitar.' },
      { simbolo: '🌐', app: 'Navegadores / Internet', descricao: 'Globo — a barra de endereço do navegador também serve para buscar.' },
    ],
  },
  {
    Icone: MdSettings,
    cor: '#6b7280',
    nome: 'Configurações',
    dica: 'Abre as opções para ajustar o celular do seu jeito.',
    variacoes: [
      { simbolo: '⚙️', app: 'Android / Gmail', descricao: 'Engrenagem clássica — a mais encontrada em aplicativos Android.' },
      { simbolo: '⋮', app: 'WhatsApp / Chrome', descricao: 'Três pontos verticais — abre opções e configurações da tela.' },
      { simbolo: '🎚️', app: 'Spotify / Player de música', descricao: 'Controles deslizantes — ajustar qualidade, equalização e preferências.' },
      { simbolo: '🔧', app: 'Samsung / Motorola', descricao: 'Chave de fenda — configurações avançadas do aparelho.' },
    ],
  },
  {
    Icone: MdHome,
    cor: '#0891b2',
    nome: 'Início',
    dica: 'Volta para a tela principal do aplicativo.',
    variacoes: [
      { simbolo: '🏠', app: 'Maioria dos apps', descricao: 'Casa com telhado — indica a tela inicial do aplicativo.' },
      { simbolo: '◉', app: 'Android (botão físico)', descricao: 'Círculo na barra inferior — volta para o início do celular.' },
      { simbolo: '△', app: 'Android antigo', descricao: 'Triângulo apontando para cima — botão Início nos celulares mais velhos.' },
      { Icone: MdHome, cor: '#6B3FA0', app: 'Nubank / Inter / Itaú', descricao: 'Casa — todos os apps de banco usam o mesmo ícone de casa para voltar à tela inicial da conta.' },
      { Icone: MdHome, cor: '#FF0000', app: 'YouTube', descricao: 'Casa — a aba inicial do YouTube também usa o ícone de casa, igual à maioria dos aplicativos.' },
      { Icone: MdSwipeUp, cor: '#000000', app: 'iPhone (sem botão físico)', descricao: 'Deslize o dedo de baixo para cima — no iPhone moderno não há botão, o gesto substitui.' },
    ],
  },
  {
    Icone: MdNotifications,
    cor: '#f59e0b',
    nome: 'Notificações',
    dica: 'Avisa sobre mensagens, alertas e novidades.',
    variacoes: [
      { simbolo: '🔔', app: 'WhatsApp / Gmail / Instagram', descricao: 'Sino — avisa sobre mensagens e novidades nos aplicativos.' },
      { simbolo: '🔕', app: 'Qualquer app (silenciado)', descricao: 'Sino com risco — notificações silenciadas ou desligadas.' },
      { simbolo: '🔴', app: 'Badge no ícone do app', descricao: 'Bolinha vermelha no canto do ícone — há algo novo para ver.' },
      { Icone: MdNotificationsActive, cor: '#FF0000', app: 'YouTube (ativar notificações do canal)', descricao: 'Sino com vibração — toque para ser avisado sobre novos vídeos do canal que você segue.' },
      { Icone: MdArrowDownward, cor: '#374151', app: 'Central de notificações', descricao: 'Deslize o dedo de cima para baixo na tela — abre a lista de todos os avisos recebidos.' },
    ],
  },
  {
    Icone: MdPerson,
    cor: '#7c3aed',
    nome: 'Perfil',
    dica: 'Abre suas informações pessoais na conta.',
    variacoes: [
      { simbolo: '👤', app: 'Maioria dos apps', descricao: 'Silhueta de pessoa — indica sua conta ou perfil.' },
      { simbolo: '🧑', app: 'Facebook / Instagram', descricao: 'Rosto de pessoa — ver seu perfil público e publicações.' },
      { simbolo: '👥', app: 'WhatsApp / Contatos', descricao: 'Duas pessoas — lista de contatos ou grupos.' },
      { simbolo: '🏛️', app: 'Gov.br / Meu INSS', descricao: 'Prédio governamental — acessa dados e benefícios oficiais.' },
      { simbolo: '🪪', app: 'Carteira de identidade digital', descricao: 'Cartão de identificação — documentos vinculados à conta.' },
    ],
  },
  {
    Icone: MdFavorite,
    cor: '#dc2626',
    nome: 'Favorito',
    dica: 'Salva algo que você gostou para acessar depois.',
    variacoes: [
      { simbolo: '❤️', app: 'Instagram / TikTok', descricao: 'Coração vermelho — curtir ou favoritar uma publicação.' },
      { simbolo: '🤍', app: 'Antes de curtir', descricao: 'Coração vazio — ainda não foi curtido, toque para curtir.' },
      { simbolo: '⭐', app: 'Google Maps / YouTube', descricao: 'Estrela — salvar um lugar ou vídeo favorito.' },
      { simbolo: '🔖', app: 'Instagram / Twitter', descricao: 'Marcador — salvar uma publicação para rever depois.' },
      { simbolo: '💚', app: 'Spotify', descricao: 'Coração verde — curtir músicas e adicionar às favoritas.' },
      { simbolo: '👍', app: 'Facebook / YouTube', descricao: 'Polegar para cima — curtir uma publicação ou vídeo.' },
    ],
  },
  {
    Icone: MdShare,
    cor: '#059669',
    nome: 'Compartilhar',
    dica: 'Envia uma foto, link ou mensagem para outras pessoas.',
    variacoes: [
      { Icone: MdIosShare, cor: '#007AFF', app: 'iPhone / iOS', descricao: 'Caixa com seta para cima — padrão do iPhone. Aparece em baixo da tela ao compartilhar fotos, links e páginas.' },
      { simbolo: '🔗', app: 'Android / Chrome', descricao: 'Corrente — compartilhar o link de uma página ou vídeo.' },
      { Icone: MdForward, cor: '#25D366', app: 'WhatsApp (encaminhar)', descricao: 'Seta para a frente — encaminhar a mensagem para outra conversa.' },
      { simbolo: '📋', app: 'Copiar link', descricao: 'Prancheta — copiar o endereço para colar em outro lugar.' },
      { simbolo: '🔄', app: 'Facebook / Twitter', descricao: 'Duas setas — repostar ou retuitar o conteúdo de alguém.' },
    ],
  },
  {
    Icone: MdLock,
    cor: '#374151',
    nome: 'Privacidade',
    dica: 'Indica que algo está seguro e protegido.',
    variacoes: [
      { simbolo: '🔒', app: 'Navegadores (site seguro)', descricao: 'Cadeado fechado — o site está protegido.' },
      { simbolo: '🔓', app: 'Site não seguro', descricao: 'Cadeado aberto — atenção, este site pode não ser seguro.' },
      { simbolo: '🛡️', app: 'Antivírus / Segurança', descricao: 'Escudo — proteção ativa no aparelho.' },
      { simbolo: '🔑', app: 'Senhas / Login', descricao: 'Chave — área de senha ou acesso à conta.' },
      { simbolo: '👁️', app: 'Campo de senha', descricao: 'Olho — toque para mostrar ou esconder a senha digitada.' },
      { simbolo: '🔐', app: 'Verificação em dois passos', descricao: 'Cadeado com chave — segurança extra que pede código no celular.' },
    ],
  },
  {
    Icone: MdCameraAlt,
    cor: '#1f2937',
    nome: 'Câmera',
    dica: 'Abre a câmera para tirar fotos ou gravar vídeos.',
    variacoes: [
      { simbolo: '📷', app: 'Maioria dos apps', descricao: 'Câmera fotográfica clássica — tirar foto.' },
      { simbolo: '📸', app: 'Com flash ligado', descricao: 'Câmera com relâmpago — indica que o flash está ativo.' },
      { simbolo: '🎥', app: 'Vídeos / Reels / TikTok', descricao: 'Câmera de vídeo — gravar vídeo ou acessar Reels.' },
      { simbolo: '🤳', app: 'Câmera frontal / Selfie', descricao: 'Celular apontado para si — câmera da frente para selfie.' },
      { Icone: MdQrCode2, cor: '#374151', app: 'Leitor de QR Code', descricao: 'QR Code — toque para a câmera virar um scanner e ler códigos de caixa, Pix e links.' },
      { Icone: MdDocumentScanner, cor: '#374151', app: 'Digitalizar documento', descricao: 'Scanner — fotografar e salvar um papel como PDF legível.' },
    ],
  },
  {
    Icone: MdMenu,
    cor: '#374151',
    nome: 'Menu',
    dica: 'Abre uma lista com mais opções do aplicativo.',
    variacoes: [
      { simbolo: '☰', app: 'Maioria dos apps', descricao: 'Três linhas — o "menu hambúrguer", o mais comum.' },
      { simbolo: '⋮', app: 'Android / WhatsApp', descricao: 'Três pontos verticais — opções extras da tela atual.' },
      { simbolo: '…', app: 'iPhone / iOS', descricao: 'Três pontos horizontais — mais opções, padrão no iOS.' },
      { simbolo: '≡', app: 'Gov.br / Bancos', descricao: 'Três traços iguais — abre o menu lateral com todas as funções.' },
      { simbolo: '🗂️', app: 'Abas abertas no Chrome', descricao: 'Pastas sobrepostas — ver e alternar entre abas abertas.' },
    ],
  },
  {
    Icone: MdArrowBack,
    cor: '#374151',
    nome: 'Voltar',
    dica: 'Volta para a tela anterior que você estava vendo.',
    variacoes: [
      { simbolo: '◀', app: 'Android (barra inferior)', descricao: 'Triângulo para a esquerda — botão Voltar do Android.' },
      { simbolo: '‹', app: 'iPhone / iOS', descricao: 'Seta fina no canto superior — padrão dos apps no iPhone.' },
      { simbolo: '←', app: 'Navegadores (Chrome / Safari)', descricao: 'Seta para a esquerda — volta à página anterior no navegador.' },
      { Icone: MdClose, cor: '#374151', app: 'Fechar painel ou janela', descricao: 'X no canto — fecha um painel aberto por cima da tela. Diferente do Voltar: o X fecha sem guardar.' },
      { simbolo: '⬅️', app: 'WhatsApp / Telegram', descricao: 'Seta grossa — volta para a lista de conversas.' },
      { Icone: MdReplay10, cor: '#FF0000', app: 'YouTube / Player de vídeo', descricao: 'Seta com "10" — volta 10 segundos no vídeo. Diferente de navegar entre telas.' },
    ],
  },
  {
    Icone: MdPhone,
    cor: '#059669',
    nome: 'Ligar',
    dica: 'Faz ou recebe uma chamada de voz.',
    variacoes: [
      { simbolo: '📞', app: 'Contatos / Telefone', descricao: 'Monofone clássico — toque para iniciar uma ligação.' },
      { Icone: MdCall, cor: '#059669', app: 'Ao receber uma ligação (atender)', descricao: 'Monofone verde — toque para atender a chamada que está chegando.' },
      { Icone: MdCallEnd, cor: '#dc2626', app: 'Encerrar chamada', descricao: 'Monofone vermelho inclinado — toque para desligar e encerrar a ligação em andamento.' },
      { simbolo: '🔇', app: 'Silenciar microfone', descricao: 'Microfone riscado — a outra pessoa não ouve você.' },
      { simbolo: '🔊', app: 'Viva-voz', descricao: 'Alto-falante — ouvir a chamada sem colocar o celular no ouvido.' },
      { simbolo: '📹', app: 'Videochamada (WhatsApp / FaceTime)', descricao: 'Câmera — chamada em que os dois se veem.' },
    ],
  },
  {
    Icone: MdMessage,
    cor: '#25D366',
    nome: 'Mensagem',
    dica: 'Abre o chat para enviar ou ler mensagens de texto.',
    variacoes: [
      { simbolo: '💬', app: 'WhatsApp / Messenger', descricao: 'Balão de conversa — mensagens de texto ou chat.' },
      { simbolo: '✉️', app: 'Gmail / Email', descricao: 'Envelope — caixa de entrada de e-mails.' },
      { simbolo: '📩', app: 'SMS / Mensagens do celular', descricao: 'Envelope com seta — nova mensagem de texto (SMS).' },
      { simbolo: '🗨️', app: 'Comentários em redes sociais', descricao: 'Balão menor — comentar em uma publicação.' },
      { Icone: MdDoneAll, cor: '#1a86fd', app: 'WhatsApp (mensagem lida)', descricao: 'Dois traços azuis — a pessoa já leu a sua mensagem. Cinza = entregue, azul = lida.' },
      { simbolo: '🕐', app: 'WhatsApp (enviando)', descricao: 'Relógio — mensagem ainda sendo enviada, aguarde.' },
    ],
  },
  {
    Icone: MdPhotoLibrary,
    cor: '#7c3aed',
    nome: 'Galeria',
    dica: 'Abre suas fotos e vídeos salvos no celular.',
    variacoes: [
      { simbolo: '🖼️', app: 'Galeria (Android)', descricao: 'Quadro com paisagem — abre todas as fotos do celular.' },
      { simbolo: '🌄', app: 'Fotos (iPhone)', descricao: 'Sol e montanhas coloridos — galeria de fotos do iPhone.' },
      { Icone: SiGooglephotos, cor: '#4285F4', app: 'Google Fotos', descricao: 'Flor colorida com 4 pétalas — acessa fotos salvas na nuvem do Google.' },
      { Icone: MdFolder, cor: '#f59e0b', app: 'Arquivos / Downloads', descricao: 'Pasta amarela — acessa imagens e documentos salvos em pastas do celular.' },
      { simbolo: '▶️', app: 'Vídeos na galeria', descricao: 'Triângulo sobre a miniatura — indica que é um vídeo, não foto.' },
    ],
  },
  {
    Icone: MdLocationOn,
    cor: '#dc2626',
    nome: 'Localização',
    dica: 'Indica um endereço ou mostra onde você está no mapa.',
    variacoes: [
      { simbolo: '📍', app: 'Google Maps / Waze', descricao: 'Alfinete vermelho — marca um endereço no mapa.' },
      { simbolo: '🧭', app: 'GPS ativo', descricao: 'Bússola — o GPS está sendo usado para te guiar.' },
      { simbolo: '🔵', app: 'Sua posição no mapa', descricao: 'Ponto azul pulsando — mostra onde você está agora.' },
      { simbolo: '📌', app: 'Compartilhar localização', descricao: 'Alfinete — enviar seu endereço atual para alguém no WhatsApp.' },
      { simbolo: '↗️', app: 'GPS ligado (barra de status)', descricao: 'Seta diagonal — aparece no topo do celular quando o GPS está ativo.' },
      { simbolo: '🗺️', app: 'Mapa offline', descricao: 'Mapa dobrado — área baixada para usar o GPS sem internet.' },
    ],
  },
  {
    Icone: MdWifi,
    cor: '#0891b2',
    nome: 'Sinal / Wi-Fi',
    dica: 'Mostra se o celular está conectado à internet.',
    variacoes: [
      { simbolo: '📶', app: 'Sinal de celular (barra de status)', descricao: 'Barrinhas crescentes — intensidade do sinal de celular.' },
      { simbolo: '🛜', app: 'Wi-Fi (rede sem fio)', descricao: 'Semicírculos em arco — conectado ao Wi-Fi.' },
      { Icone: MdWifiOff, cor: '#dc2626', app: 'Sem conexão com a internet', descricao: 'Wi-Fi riscado — sinal cortado. Verifique se o Wi-Fi está ligado ou se tem sinal de celular.' },
      { simbolo: '✈️', app: 'Modo avião', descricao: 'Avião — desliga Wi-Fi e dados. Use em voos.' },
      { Icone: MdDataUsage, cor: '#059669', app: 'Economizador de dados', descricao: 'Gráfico circular — reduz o consumo de internet para a conta de dados durar mais.' },
    ],
  },
  {
    Icone: MdEdit,
    cor: '#d97706',
    nome: 'Editar',
    dica: 'Permite alterar ou escrever algo na tela.',
    variacoes: [
      { simbolo: '✏️', app: 'WhatsApp / Notas', descricao: 'Lápis — toque para editar texto ou criar nova mensagem.' },
      { simbolo: '🖊️', app: 'Formulários / Cadastros', descricao: 'Caneta — preencher ou corrigir um campo.' },
      { simbolo: '📝', app: 'Bloco de notas / Lembretes', descricao: 'Bloco com linhas — escrever ou revisar anotações.' },
      { simbolo: '✂️', app: 'Recortar texto', descricao: 'Tesoura — cortar um trecho para mover para outro lugar.' },
      { simbolo: '📋', app: 'Colar texto', descricao: 'Prancheta — colar texto copiado anteriormente.' },
    ],
  },
  {
    Icone: MdAddCircle,
    cor: '#059669',
    nome: 'Adicionar',
    dica: 'Cria algo novo, como um contato, foto ou mensagem.',
    variacoes: [
      { simbolo: '➕', app: 'Maioria dos apps', descricao: 'Cruz colorida — adicionar item, contato ou publicação.' },
      { simbolo: '⊕', app: 'WhatsApp / Grupos', descricao: 'Círculo com cruz — adicionar participante a um grupo.' },
      { simbolo: '🎬', app: 'TikTok / Instagram Reels', descricao: 'Claquete — criar um vídeo curto ou Reel do zero.' },
      { simbolo: '🎵', app: 'Spotify / YouTube Music', descricao: 'Nota musical — adicionar música à playlist.' },
      { simbolo: '🛒', app: 'Mercado Livre / iFood', descricao: 'Carrinho — adicionar produto ao carrinho de compras.' },
    ],
  },
  {
    Icone: MdDelete,
    cor: '#dc2626',
    nome: 'Lixeira',
    dica: 'Apaga ou exclui uma mensagem, foto ou arquivo.',
    variacoes: [
      { simbolo: '🗑️', app: 'Maioria dos apps', descricao: 'Lata de lixo — apagar o item selecionado.' },
      { simbolo: '⊗', app: 'Remover da lista', descricao: 'Círculo com X — remove um item sem precisar confirmar.' },
      { simbolo: '👈', app: 'WhatsApp (deslizar para apagar)', descricao: 'Deslize o dedo para a esquerda sobre a mensagem para ver a opção de apagar.' },
      { simbolo: '⚠️', app: 'Confirmação de exclusão', descricao: 'Alerta — o app pede confirmação antes de apagar.' },
      { simbolo: '↺', app: 'Desfazer exclusão', descricao: 'Seta circular — desfazer logo após apagar.' },
      { simbolo: '⏲️', app: 'Lixeira do Google Fotos', descricao: 'Temporizador — fotos ficam 60 dias antes de serem excluídas de vez.' },
    ],
  },
  {
    Icone: MdCreditCard,
    cor: '#1d4ed8',
    nome: 'Pagamento',
    dica: 'Indica onde pagar, transferir dinheiro ou ver o saldo.',
    variacoes: [
      { simbolo: '💳', app: 'Bancos / Nubank / Inter', descricao: 'Cartão de crédito — realizar pagamento ou ver cartão virtual.' },
      { Icone: MdBolt, cor: '#32BCAD', app: 'Pix / Transferência', descricao: 'Raio — símbolo do Pix. Toque para enviar ou receber dinheiro na hora, sem custo.' },
      { Icone: MdQrCode2, cor: '#374151', app: 'QR Code (pagamento)', descricao: 'QR Code — aponte a câmera para escanear e pagar, ou gere o seu para receber.' },
      { simbolo: '💰', app: 'Saldo / Extrato', descricao: 'Saco de dinheiro — ver o saldo disponível e extrato.' },
      { Icone: MdTapAndPlay, cor: '#1d4ed8', app: 'Pagamento por aproximação (NFC)', descricao: 'Ondas de toque — encostar o celular desbloqueado na maquininha para pagar.' },
      { simbolo: '🧾', app: 'Comprovante', descricao: 'Recibo — confirma que o pagamento foi realizado com sucesso.' },
    ],
  },
]

function BottomSheet({ icone, onFechar, altoContraste, fs }) {
  if (!icone) return null

  const bg = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const cardVar = altoContraste ? '#0f0f0f' : '#f9fafb'
  const borda = altoContraste ? '#333' : '#e5e7eb'

  const target = document.getElementById('phone-overlay-root')
  if (!target) return null

  const { Icone, cor } = icone

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
        <div className="flex justify-center mb-1">
          <div style={{ width: 44, height: 5, borderRadius: 9, background: altoContraste ? '#555' : '#d1d5db' }} />
        </div>

        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{ width: 64, height: 64, background: altoContraste ? '#222' : `${cor}18`, border: `1.5px solid ${altoContraste ? '#444' : `${cor}40`}` }}
          >
            <Icone size={fs(34)} color={altoContraste ? '#fff' : cor} />
          </div>
          <div className="flex-1">
            <p className="font-bold" style={{ fontSize: fs(20), color: texto }}>{icone.nome}</p>
            <p style={{ color: subtexto, fontSize: fs(14), lineHeight: 1.4 }}>{icone.dica}</p>
          </div>
          <button
            onClick={onFechar}
            className="flex items-center justify-center rounded-full font-bold"
            style={{ width: 40, height: 40, background: cardVar, color: subtexto, fontSize: fs(18), flexShrink: 0 }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div style={{ height: 1, background: borda }} />

        <p className="font-bold" style={{ fontSize: fs(16), color: texto }}>
          Como esse ícone aparece nos aplicativos:
        </p>

        <div className="flex flex-col gap-3">
          {icone.variacoes.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl px-4 py-4"
              style={{ background: cardVar, border: `1.5px solid ${borda}` }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 56, height: 56, background: bg, border: `1.5px solid ${borda}` }}
              >
                {v.Icone
                  ? <v.Icone size={fs(28)} color={altoContraste ? '#fff' : v.cor} />
                  : <span style={{ fontSize: fs(26), color: texto }}>{v.simbolo}</span>
                }
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{ fontSize: fs(14), color: altoContraste ? '#facc15' : '#1d4ed8' }}>{v.app}</p>
                <p style={{ color: subtexto, fontSize: fs(14), lineHeight: 1.4, marginTop: 2 }}>{v.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onFechar}
          className="w-full py-4 rounded-2xl font-bold mt-1"
          style={{
            background: altoContraste ? '#facc15' : '#1d4ed8',
            color: altoContraste ? '#000' : '#fff',
            minHeight: 64,
            fontSize: fs(18),
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
  const { altoContraste, fs } = useApp()
  const [fase, setFase] = useState('lista')
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [opcoes, setOpcoes] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [respondido, setRespondido] = useState(false)
  const [iconeDetalhes, setIconeDetalhes] = useState(null)
  const [paresJogo, setParesJogo] = useState([])

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const amarelo = altoContraste ? '#facc15' : '#1d4ed8'

  function embaralhar(arr) {
    return [...arr].sort(() => Math.random() - 0.5)
  }

  function gerarOpcoes(indice, paresDoJogo) {
    const correto = paresDoJogo[indice]
    const outros = pares.filter(p => p.nome !== correto.nome)
    return embaralhar([correto, ...embaralhar(outros).slice(0, 3)])
  }

  function iniciarJogo() {
    const selecionados = embaralhar(pares).slice(0, 10)
    setParesJogo(selecionados)
    setIndiceAtual(0)
    setAcertos(0)
    setSelecionado(null)
    setRespondido(false)
    setOpcoes(gerarOpcoes(0, selecionados))
    setFase('jogo')
  }

  function responder(opcao) {
    if (respondido) return
    setSelecionado(opcao)
    setRespondido(true)
    if (opcao.nome === paresJogo[indiceAtual].nome) {
      setAcertos(a => a + 1)
    }
  }

  function proximo() {
    const prox = indiceAtual + 1
    if (prox >= paresJogo.length) {
      setFase('resultado')
    } else {
      setIndiceAtual(prox)
      setSelecionado(null)
      setRespondido(false)
      setOpcoes(gerarOpcoes(prox, paresJogo))
    }
  }

  const atual = paresJogo[indiceAtual] ?? pares[0]

  if (fase === 'lista') {
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo="Aprender a Usar" />

        <div className="flex flex-col gap-4 px-5 py-5 pb-24">
          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold mb-2" style={{ fontSize: fs(20), color: texto }}>Ícones do celular</p>
            <p style={{ color: subtexto, fontSize: fs(16), lineHeight: 1.5 }}>
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
                  background: altoContraste ? '#1a1a1a' : `${par.cor}18`,
                  border: altoContraste ? `2px solid ${par.cor}` : `1.5px solid ${par.cor}30`,
                }}
              >
                <par.Icone size={fs(32)} color={par.cor} />
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{ fontSize: fs(18), color: texto }}>{par.nome}</p>
                <p style={{ color: subtexto, fontSize: fs(14), lineHeight: 1.4 }}>{par.dica}</p>
              </div>
              <span style={{ fontSize: fs(20), color: altoContraste ? '#facc15' : '#1d4ed8', flexShrink: 0 }}>›</span>
            </button>
          ))}

          <button
            onClick={iniciarJogo}
            className="w-full py-5 rounded-2xl font-bold mt-2"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72, fontSize: fs(20) }}
          >
            🎯 Iniciar Jogo de Associação
          </button>
        </div>

        <BottomSheet
          icone={iconeDetalhes}
          onFechar={() => setIconeDetalhes(null)}
          altoContraste={altoContraste}
          fs={fs}
        />

        <BotaoAjuda />
      </div>
    )
  }

  if (fase === 'resultado') {
    const nota = Math.round((acertos / paresJogo.length) * 100)
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
          <span style={{ fontSize: fs(80) }}>{emoji}</span>
          <div className="text-center">
            <p className="font-bold mb-2" style={{ fontSize: fs(24), color: texto }}>{nota}% de acertos</p>
            <p style={{ fontSize: fs(18), color: subtexto }}>{mensagem}</p>
          </div>
          <div className="w-full rounded-3xl p-5" style={{ background: card }}>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="font-bold" style={{ fontSize: fs(30), color: '#059669' }}>{acertos}</p>
                <p style={{ color: subtexto, fontSize: fs(16) }}>Acertos</p>
              </div>
              <div className="text-center">
                <p className="font-bold" style={{ fontSize: fs(30), color: '#dc2626' }}>{paresJogo.length - acertos}</p>
                <p style={{ color: subtexto, fontSize: fs(16) }}>Erros</p>
              </div>
              <div className="text-center">
                <p className="font-bold" style={{ fontSize: fs(30), color: texto }}>{paresJogo.length}</p>
                <p style={{ color: subtexto, fontSize: fs(16) }}>Total</p>
              </div>
            </div>
          </div>
          <button
            onClick={iniciarJogo}
            className="w-full py-5 rounded-2xl font-bold"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72, fontSize: fs(20) }}
          >
            🔄 Jogar Novamente
          </button>
          <button
            onClick={() => setFase('lista')}
            className="w-full py-4 rounded-2xl font-bold"
            style={{ background: 'transparent', color: amarelo, border: `2px solid ${amarelo}`, minHeight: 64, fontSize: fs(18) }}
          >
            Ver lista de ícones
          </button>
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Jogo de Associação" />
      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 10, background: altoContraste ? '#333' : '#e5e7eb' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(indiceAtual / paresJogo.length) * 100}%`, background: amarelo }}
            />
          </div>
          <span className="font-bold" style={{ fontSize: fs(14), color: subtexto }}>{indiceAtual + 1}/{paresJogo.length}</span>
        </div>

        <div className="rounded-3xl p-6 flex flex-col items-center" style={{ background: card }}>
          <p className="font-bold mb-4 text-center" style={{ fontSize: fs(18), color: subtexto }}>
            Qual o nome deste ícone?
          </p>
          <div
            className="flex items-center justify-center rounded-3xl mb-4"
            style={{ width: 110, height: 110, background: altoContraste ? '#1a1a1a' : `${atual.cor}15`, border: `2px solid ${atual.cor}40` }}
          >
            <atual.Icone size={fs(56)} color={atual.cor} />
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
                className="rounded-2xl px-5 py-4 font-bold text-left transition-all"
                style={{ background: bgBotao, border: `2.5px solid ${bordaBotao}`, color: corTexto, minHeight: 64, fontSize: fs(18) }}
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
            <p className="font-bold mb-1" style={{ fontSize: fs(16), color: selecionado?.nome === atual.nome ? '#059669' : '#dc2626' }}>
              {selecionado?.nome === atual.nome ? '✓ Correto!' : '✗ Quase! A resposta é: ' + atual.nome}
            </p>
            <p style={{ color: altoContraste ? '#d1d5db' : '#374151', fontSize: fs(15), lineHeight: 1.4 }}>{atual.dica}</p>
          </div>
        )}

        {respondido && (
          <button
            onClick={proximo}
            className="w-full py-5 rounded-2xl font-bold"
            style={{ background: amarelo, color: altoContraste ? '#000' : '#fff', minHeight: 72, fontSize: fs(20) }}
          >
            {indiceAtual + 1 >= paresJogo.length ? 'Ver resultado →' : 'Próximo →'}
          </button>
        )}
      </div>
      <BotaoAjuda />
    </div>
  )
}
