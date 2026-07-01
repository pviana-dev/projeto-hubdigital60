# Navega+

Protótipo de aplicativo de inclusão digital voltado para pessoas idosas (60+). O Navega+ oferece um ambiente seguro para que o usuário aprenda e pratique o uso de serviços digitais — como agendar consultas, organizar documentos e reconhecer ícones do celular — sem risco de erros reais.

---

## Sobre o projeto

A maioria dos aplicativos governamentais e de saúde foi projetada sem considerar pessoas com baixa familiaridade digital. O Navega+ inverte essa lógica: linguagem simples, botões amplos, fontes ajustáveis e um ambiente onde errar não tem consequências.

O protótipo roda no browser com aparência de smartphone (390×844 px) e cobre os fluxos mais comuns que um idoso enfrentaria no dia a dia digital.

---

## Funcionalidades

### Acessibilidade
- Tamanho de fonte ajustável em três níveis: Normal, Grande e Muito Grande — aplicado globalmente em todas as telas via função `fs()` no contexto
- Modo Alto Contraste com fundo escuro e destaque em amarelo
- Prévia em tempo real das configurações antes de salvar
- Área de toque mínima de 64px em todos os elementos interativos

### Simulador de Saúde
- Agendamento de consulta em 3 passos: especialidade → data → horário
- Datas geradas dinamicamente para os próximos 7 dias
- Lista de medicamentos com nome, finalidade, instruções e horários destacados

### Meus Documentos
- Repositório pessoal de documentos: RG Digital, CPF e Carteira de Vacinação pré-cadastrados
- Adição de novos documentos com nome, número, campos livres e cor customizável
- Exclusão de documentos adicionados pelo usuário
- Dados mantidos em memória durante a sessão

### Praticar Aplicativos
- Hub de acesso aos simuladores de apps reais: WhatsApp, Google Maps, YouTube, iFood e Gov.br
- Ícones reais de cada marca via `react-icons/si`
- Link discreto no rodapé da tela ("Ver telas com fonte ampliada") para a galeria de telas estáticas de acessibilidade visual

### Telas de Acessibilidade Visual (galeria estática)
- Versões estáticas da primeira tela de alguns apps simulados (WhatsApp e Gov.br), com fonte, ícones e áreas de toque bem maiores que o padrão do app
- Página índice (galeria) com cards de acesso a cada tela
- Totalmente desacoplada do roteamento principal (`AppContext`/`App.jsx`): acessível via parâmetro de URL `?acessivel=galeria` (ou `whatsapp` / `govbr`), resolvido em `main.jsx`
- Serve como protótipo visual para avaliação, antes de decidir como integrá-la ao fluxo do app

### Aprender a Usar (Alfabetização Visual)
- Glossário de 20 ícones do celular com nome e explicação em linguagem simples
- Ícones reais do Material Design via `react-icons/md`
- Bottom sheet por ícone mostrando como ele aparece em diferentes aplicativos reais, com ícones reais nas variações onde disponível
- Jogo de associação: 10 ícones sorteados aleatoriamente a cada rodada, 4 opções de resposta, feedback imediato e tela de resultado com percentual de acertos

### Navegação
- Roteamento próprio via Context API, sem biblioteca externa
- Histórico de navegação com botão "Voltar" funcional em todas as telas
- Botão flutuante "? Ajuda" com dica contextual específica por tela

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Interface e estado local |
| Vite | 8 | Bundler e servidor de desenvolvimento |
| Tailwind CSS | 3 | Estilização utilitária |
| Context API | — | Estado global (tela ativa, fonte, contraste) |
| react-icons | 5.7.0 | Ícones de marcas (Simple Icons) e UI (Material Design) |
| Node.js | 26 | Ambiente de execução |

---

## Como executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Estrutura do projeto

```
navega-plus/
├── src/
│   ├── context/
│   │   └── AppContext.jsx           # Estado global: tela ativa, fonte (fs), contraste
│   ├── components/
│   │   ├── PhoneFrame.jsx           # Frame visual do smartphone no browser
│   │   ├── BarraTopo.jsx            # Cabeçalho com título e botão Voltar
│   │   └── BotaoAjuda.jsx           # Botão flutuante de ajuda contextual
│   ├── screens/
│   │   ├── Onboarding.jsx           # Tela de boas-vindas
│   │   ├── Acessibilidade.jsx       # Configuração de fonte e contraste
│   │   ├── Home.jsx                 # Hub de categorias
│   │   ├── Saude.jsx                # Submenu de saúde
│   │   ├── Agendamento.jsx          # Simulador de consulta (3 passos)
│   │   ├── Medicamentos.jsx         # Lista de medicamentos
│   │   ├── Documentos.jsx           # Repositório de documentos
│   │   ├── SimuladorHub.jsx         # Hub de entrada dos simuladores
│   │   └── AlfabetizacaoVisual.jsx  # Glossário de ícones + jogo
│   ├── simuladores/                 # Telas individuais de cada app simulado
│   ├── paginas-acessiveis/          # Galeria de telas estáticas com fonte ampliada (fora do roteamento principal)
│   ├── App.jsx                      # Roteador principal
│   └── main.jsx                     # Decide entre <App/> e as páginas acessíveis via query param
├── DOCUMENTACAO.md                  # Documentação técnica detalhada
└── package.json
```

---

## Status

Protótipo de front-end estático, sem backend. Não há autenticação, banco de dados nem persistência entre sessões. Os documentos adicionados pelo usuário e todos os dados de simulação (agendamentos, medicamentos) são perdidos ao encerrar o aplicativo.

Veja `DOCUMENTACAO.md` para a documentação técnica completa e o roadmap de próximas etapas.

---

## Licença

Projeto acadêmico / portfólio. Uso livre para fins educacionais.
