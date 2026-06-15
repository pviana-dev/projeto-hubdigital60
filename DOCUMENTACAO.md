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
- **Tamanho de fonte ajustável**: três opções (Normal, Grande, Muito Grande), aplicadas globalmente
- **Modo Alto Contraste**: fundo escuro com texto claro e destaque em amarelo, ativável por toggle
- **Botões amplos**: área de toque mínima de 64px em todos os elementos interativos
- **Linguagem simples**: sem jargões técnicos ou estrangeirismos em toda a interface
- **Prévia em tempo real** das configurações de acessibilidade antes de salvar

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
- Lista de 3 documentos: RG Digital, CPF e Carteira de Vacinação
- Cada documento abre uma tela de detalhe com card visual e campos estruturados
- Aviso de documento fictício em todas as telas de detalhe

#### Aprender a Usar (Módulo de Alfabetização Visual)
- **Lista educativa**: 10 ícones universais com nome e explicação em linguagem simples
- **Cards clicáveis com variações por ícone**: ao tocar em qualquer card da lista, abre um bottom sheet (painel deslizante) exibindo:
  - Cabeçalho com o ícone, nome e descrição geral
  - 4 variações visuais do ícone, cada uma identificando o app onde aparece e uma explicação em linguagem simples
  - Pode ser fechado pelo botão "Entendi", pelo botão "✕" ou tocando no fundo escuro
  - Ícones cobertos: Pesquisar, Configurações, Início, Notificações, Perfil, Favorito, Compartilhar, Privacidade, Câmera e Menu
- **Jogo de Associação**:
  - Exibe um ícone por pergunta, com 4 opções de resposta embaralhadas
  - Barra de progresso mostrando questão atual vs. total
  - Feedback imediato após resposta: verde para acerto, vermelho para erro, com explicação
  - Tela de resultado com contagem de acertos, erros e percentual
  - Opções de jogar novamente ou voltar à lista

#### Assistente de Ajuda
- Botão flutuante "? Ajuda" presente em todas as telas
- Abre um modal com dica contextual específica da tela atual
- Cobre todas as telas com mensagens adaptadas ao contexto

---

## O que Falta Implementar

### Backend e Persistência
- Autenticação e criação de perfil do usuário
- Banco de dados para salvar progresso do aluno (acertos, tempo de resolução, módulos concluídos)
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
│   │   └── AppContext.jsx        # Estado global: tela ativa, fonte, contraste
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
│   │   ├── Documentos.jsx
│   │   └── AlfabetizacaoVisual.jsx
│   ├── App.jsx                   # Roteador principal
│   ├── main.jsx
│   └── index.css
├── DOCUMENTACAO.md
├── package.json
└── vite.config.js
```
