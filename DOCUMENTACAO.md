# Navega+ — Documentação do Protótipo

## Visão Geral

Protótipo de interface (front-end estático, sem backend) do **Ecossistema Navega+**, um aplicativo de inclusão digital voltado para pessoas idosas (60+). O objetivo é oferecer um ambiente simulado e seguro para que o usuário pratique o uso de serviços digitais sem risco de erros reais.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Biblioteca de interface e gerenciamento de estado local |
| Vite | 8 | Bundler e servidor de desenvolvimento |
| Tailwind CSS | 3 | Estilização utilitária responsiva |
| Context API (React) | — | Gerenciamento de estado global (tela ativa, acessibilidade) |
| react-icons | 5.7.0 | Ícones de marcas (Simple Icons) e UI (Material Design) |
| JavaScript (ESM) | — | Linguagem principal |
| Node.js | 26 | Ambiente de execução local |

---

## O que foi Implementado

### Estrutura e Navegação
- Sistema de roteamento próprio baseado em Context API, sem biblioteca externa
- Histórico de navegação com botão "Voltar" funcional em todas as telas
- Frame de smartphone simulado no browser (390×844px)
- Overlays (bottom sheets, modais) renderizados via `createPortal` diretamente no elemento raiz do PhoneFrame, fora do container scrollável — garante que painéis flutuantes sejam exibidos na posição correta independentemente do scroll da tela
- `BarraTopo` aceita prop `onVoltar` opcional para sobrescrever o comportamento padrão do botão "Voltar" — usado em telas com navegação interna por estado local (ex: detalhe de documento), evitando que o botão pule níveis indevidos no histórico

### Acessibilidade

#### Tamanho de Fonte Global (`fs()`)
- Três opções de fonte na tela de Acessibilidade: Normal (14px base), Grande (18px base) e Muito Grande (21px base)
- O tamanho escolhido é propagado globalmente via Context API e aplicado em **todas as telas e componentes** sem exceção, incluindo conteúdo renderizado via `createPortal`
- Implementação: função `fs(n)` exposta pelo contexto — `Math.round(n * fontSizePx / 18)` — escala qualquer valor de pixel proporcionalmente ao tamanho base selecionado. Todo `fontSize` inline no código usa `fs(n)` em vez de valor fixo; classes Tailwind de texto (`text-xl`, `text-base` etc.) foram removidas e substituídas por estilos inline escaláveis
- A abordagem `fs()` foi escolhida sobre CSS `zoom` porque: (1) `zoom` causava clipping horizontal ao ultrapassar 1× e (2) não afetava conteúdo renderizado via `createPortal`, enquanto `fs()` funciona em qualquer contexto por ser uma função JavaScript chamada em tempo de render

#### Modo Alto Contraste
- Fundo escuro com texto claro e destaques em amarelo (#facc15), ativável por toggle
- Bordas coloridas substituem fundos coloridos para manter contraste

#### Outras práticas
- Botões com área de toque mínima de 64px em todos os elementos interativos
- Linguagem simples, sem jargões técnicos ou estrangeirismos

---

### Telas

#### Onboarding
- Tela de boas-vindas com apresentação do propósito do aplicativo
- Três pilares destacados: segurança, passo a passo e foco no público idoso
- Dois fluxos: iniciar do zero (vai para acessibilidade) ou acessar diretamente o hub

#### Configurar Tela (Acessibilidade)
- Seleção de tamanho de fonte com indicador visual de seleção ativa
- Toggle de alto contraste com confirmação visual e prévia de como o texto ficará

#### Home — Hub de Categorias
- Três categorias em cards grandes: **Minha Saúde**, **Meus Documentos**, **Aprender a Usar**
- Ícone de configurações de acessibilidade acessível direto do cabeçalho
- Banner informativo reforçando que o ambiente é seguro e simulado

#### Minha Saúde
- Submenu com acesso a Agendar Consulta e Meus Medicamentos

#### Agendar Consulta (Simulador Sandbox)
- Fluxo de 3 passos, um por tela (redução de carga cognitiva):
  - Passo 1: seleção de especialidade médica
  - Passo 2: seleção de data (próximos 7 dias gerados dinamicamente)
  - Passo 3: seleção de horário em grade visual
- Indicador de progresso visual (etapas 1/2/3)
- Botão "Próximo" bloqueado enquanto nenhuma opção está selecionada
- Tela de sucesso com resumo do agendamento e aviso de que é uma simulação

#### Meus Medicamentos
- Lista de 4 medicamentos fictícios com nome, finalidade e instruções de uso
- Horários de tomada destacados visualmente por cor
- Aviso de simulação no topo

#### Meus Documentos
- Repositório pessoal de documentos — não é uma simulação, dados persistem durante a sessão
- Três documentos pré-cadastrados como exemplo: RG Digital, CPF e Carteira de Vacinação
- Cada documento abre uma tela de detalhe com card visual em gradiente e campos estruturados
- **Adição de documentos** pelo usuário:
  - Formulário com: nome do documento (obrigatório), nome completo, número, até 2 campos extras com rótulo livre e seletor de cor (6 opções predefinidas)
  - Documentos adicionados aparecem na lista no mesmo padrão visual dos pré-cadastrados
  - Botão "🗑️ Excluir este documento" disponível apenas nos documentos adicionados pelo usuário (os pré-cadastrados não podem ser excluídos)
  - Dados armazenados apenas em memória (`useState`) — são perdidos ao encerrar o aplicativo

#### Praticar Aplicativos (SimuladorHub)
- Hub de entrada para os simuladores de aplicativos reais
- Cinco apps disponíveis: WhatsApp, Google Maps, YouTube, iFood e Gov.br
- Ícones reais de cada marca usando `react-icons/si` (Simple Icons): `SiWhatsapp`, `SiGooglemaps`, `SiYoutube`, `SiIfood`
- Gov.br não disponível em bibliotecas de ícones — representado por componente `GovBrIcon` customizado com tipografia e cores oficiais da marca (#1351B4 + #7ee8a2)
- Link discreto no rodapé da lista ("Ver telas com fonte ampliada") que leva à galeria de telas de acessibilidade visual (`?acessivel=galeria`)

#### Telas de Acessibilidade Visual (galeria estática)
- Protótipo de versões estáticas da primeira tela de alguns apps simulados — hoje cobre WhatsApp (lista de conversas) e Gov.br (documentos e serviços) — com fonte, ícones/avatares e áreas de toque ampliados além do padrão do app
- Objetivo: servir de referência visual para avaliar uma acessibilidade ainda maior que os três níveis de `fs()`, antes de decidir como (ou se) integrar isso ao fluxo principal
- **Desacoplada de propósito** do roteamento em `AppContext`/`App.jsx` — não usa `navegar()`/`voltar()` nem o estado `screen`. Vive em `src/paginas-acessiveis/` e é resolvida em `main.jsx` via `URLSearchParams`, checando o parâmetro `acessivel` na query string (`galeria`, `whatsapp` ou `govbr`); se ausente, renderiza `<App/>` normalmente
- `MolduraTelefone.jsx` replica visualmente o `PhoneFrame` mas sem depender do `AppContext` (não lê `altoContraste`), já que essas telas não fazem parte do contexto do app
- `GaleriaAcessivel.jsx` é a página índice: cards simples com nome, descrição e link (`<a href="?acessivel=...">`) para cada tela — sem ícones, apenas texto
- Navegação entre as páginas é feita por link `<a>` com recarregamento de página (não por estado React), consistente com o desacoplamento do roteamento principal

#### Aprender a Usar (Módulo de Alfabetização Visual)

**Lista educativa com 20 ícones:**
- Cada card exibe o ícone real (Material Design via `react-icons/md`) com nome e descrição em linguagem simples
- Ícones cobertos: Pesquisar (`MdSearch`), Configurações (`MdSettings`), Início (`MdHome`), Notificações (`MdNotifications`), Perfil (`MdPerson`), Favorito (`MdFavorite`), Compartilhar (`MdShare`), Privacidade (`MdLock`), Câmera (`MdCameraAlt`), Menu (`MdMenu`), Voltar (`MdArrowBack`), Ligar (`MdPhone`), Mensagem (`MdMessage`), Galeria (`MdPhotoLibrary`), Localização (`MdLocationOn`), Sinal/Wi-Fi (`MdWifi`), Editar (`MdEdit`), Adicionar (`MdAddCircle`), Lixeira (`MdDelete`), Pagamento (`MdCreditCard`)

**Bottom Sheet de variações (ao tocar em um card):**
- Painel deslizante mostrando como o mesmo conceito aparece em diferentes aplicativos reais
- Cada variação tem um ícone próprio — quando a variação tem representação fiel em `react-icons`, usa um componente (`Icone` + `cor`); quando o unicode/emoji já representa bem, usa o caractere diretamente (`simbolo`)
- Ícones reais usados nas variações (exemplos): `MdIosShare` (compartilhar no iOS), `MdForward` (encaminhar no WhatsApp), `MdQrCode2` (QR Code), `MdDocumentScanner` (digitalizar), `MdCall`/`MdCallEnd` (atender/desligar), `MdDoneAll` azul (mensagem lida no WhatsApp), `SiGooglephotos` (Google Fotos), `MdWifiOff` (sem conexão), `MdBolt` (Pix), `MdTapAndPlay` (NFC), entre outros
- Pode ser fechado pelo botão "Entendi", pelo "✕" ou tocando no fundo escuro

**Jogo de Associação:**
- A cada rodada, **10 ícones são selecionados aleatoriamente** dos 20 disponíveis e embaralhados — a sequência é diferente a cada jogo
- Cada pergunta exibe o ícone real (Material Design) e oferece 4 opções de resposta embaralhadas
- As 3 opções erradas são sorteadas do pool completo de 20, não apenas dos 10 selecionados
- Barra de progresso mostrando questão atual vs. total (ex: 3/10)
- Feedback imediato: verde para acerto, vermelho para erro, com explicação do ícone
- Tela de resultado com acertos, erros, total e percentual
- Opções de jogar novamente (novo sorteio aleatório) ou voltar à lista

#### Assistente de Ajuda
- Botão flutuante "? Ajuda" presente em todas as telas
- Abre um modal com dica contextual específica da tela atual
- Cobre todas as telas com mensagens adaptadas ao contexto

---

## O que Falta Implementar

### Backend e Persistência
- Autenticação e criação de perfil do usuário
- Banco de dados para salvar progresso do aluno (acertos, tempo de resolução, módulos concluídos)
- Persistência dos documentos adicionados pelo usuário entre sessões (atualmente apenas em memória)
- Analytics invisível: metrificação do tempo de resolução e taxa de acertos em background
- Sincronização de dados entre sessões

### Funcionalidades do Simulador
- Módulo de simulação do Gov.br (acesso a benefícios, Meu INSS, documentos oficiais)
- Simulação de agendamento pelo SUS (consultas, exames)
- Fluxo de consulta de histórico de vacinas integrado ao sistema real (Conecte SUS)
- Módulo de farmácias: consulta de medicamentos, histórico de compras simulado

### Acessibilidade Avançada
- Compatibilidade com leitores de tela nativos (TalkBack / VoiceOver) com atributos ARIA completos
- Feedback háptico (vibração) ao confirmar ações — requer API nativa mobile
- Narração em voz dos textos de cada tela (Text-to-Speech)
- Legendas e transcrições para eventuais áudios tutoriais

### Inteligência Artificial
- Integração com assistente de voz conversacional (atalho para Meta AI no WhatsApp)
- Avatar de voz offline para orientação dentro do simulador (evolução futura)
- Perfis de acessibilidade adaptativos: "Modo Visão Reduzida", "Modo Motor Simplificado"

### Infraestrutura Mobile
- Conversão para aplicativo mobile nativo (React Native ou Flutter)
- Funcionamento offline com banco de dados local (SQLite)
- Publicação nas lojas Google Play e Apple App Store
- Notificações de horários de medicamentos

### UX e Conteúdo
- Definir como (e se) a galeria de telas de acessibilidade visual (`paginas-acessiveis/`) será exposta no fluxo principal do app — hoje só é acessível via link discreto no SimuladorHub e query param na URL
- Onboarding guiado com tutorial interativo da interface
- Mais especialidades médicas, horários e unidades de saúde no simulador de agendamento
- Tela de perfil do usuário com histórico de aprendizado
- Sistema de conquistas e progresso para motivar o aprendizado contínuo
- Módulo de atualização de conteúdo para acompanhar mudanças nos aplicativos reais

---

## Como Executar

```bash
cd navega-plus
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Estrutura de Arquivos

```
navega-plus/
├── src/
│   ├── context/
│   │   └── AppContext.jsx        # Estado global: tela ativa, fonte (fs), contraste
│   ├── components/
│   │   ├── PhoneFrame.jsx        # Frame visual do smartphone
│   │   ├── BarraTopo.jsx         # Cabeçalho com título e botão Voltar
│   │   └── BotaoAjuda.jsx        # Botão flutuante de ajuda contextual
│   ├── screens/
│   │   ├── Onboarding.jsx
│   │   ├── Acessibilidade.jsx
│   │   ├── Home.jsx
│   │   ├── Saude.jsx
│   │   ├── Agendamento.jsx
│   │   ├── Medicamentos.jsx
│   │   ├── Documentos.jsx        # Repositório de documentos com adição e exclusão
│   │   ├── SimuladorHub.jsx      # Hub de entrada dos simuladores de apps
│   │   └── AlfabetizacaoVisual.jsx  # Lista educativa + jogo de associação
│   ├── simuladores/              # Telas individuais de cada app simulado
│   ├── paginas-acessiveis/       # Galeria estática com fonte ampliada, fora do roteamento principal
│   │   ├── GaleriaAcessivel.jsx  # Página índice com cards de acesso
│   │   ├── TelaAcessivelWhatsApp.jsx
│   │   ├── TelaAcessivelGovBr.jsx
│   │   └── MolduraTelefone.jsx   # Frame de smartphone sem dependência do AppContext
│   ├── App.jsx                   # Roteador principal
│   ├── main.jsx                  # Decide entre <App/> e as páginas acessíveis via query param `acessivel`
│   └── index.css
├── DOCUMENTACAO.md
├── package.json
└── vite.config.js
```

---

## Decisões Técnicas Relevantes

### Por que `fs()` em vez de CSS `zoom`
A primeira abordagem para escala de fonte usava `zoom` no `PhoneFrame`. Isso causava dois problemas: (1) ao aplicar `zoom: 1.15` em um container de 390px, o conteúdo interno ficava com 448px efetivos, causando clipping horizontal; (2) conteúdo renderizado via `createPortal` (ex: bottom sheets) ficava fora da árvore DOM afetada pelo `zoom`, ignorando a escala. A função `fs(n)` resolve os dois problemas pois é chamada em tempo de render e o valor calculado é aplicado diretamente como `style={{ fontSize: fs(n) }}` em cada elemento.

### Estrutura de dados do jogo de associação
Cada entrada de ícone (`par`) no array `pares` de `AlfabetizacaoVisual.jsx` armazena: `Icone` (componente react-icons), `cor` (hex), `nome`, `dica`, e `variacoes[]`. Cada variação pode ter `{ Icone, cor, app, descricao }` (quando existe ícone fiel na biblioteca) ou `{ simbolo, app, descricao }` (quando o unicode/emoji já representa bem). O BottomSheet renderiza condicionalmente: `v.Icone ? <v.Icone /> : v.simbolo`.

### Documentos: memória vs. persistência
Os documentos adicionados pelo usuário são armazenados em `useState` local no componente `Documentos`. Não há uso de `localStorage` ou backend — os dados são perdidos ao encerrar a sessão. Isso é intencional para o estágio atual de protótipo; a persistência real depende de autenticação e banco de dados (pendente de implementação).
