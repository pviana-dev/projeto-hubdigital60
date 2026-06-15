# Navega+

Protótipo de aplicativo de inclusão digital voltado para pessoas idosas (60+). O Navega+ oferece um ambiente simulado e seguro para que o usuário pratique o uso de serviços digitais — como agendar consultas, consultar medicamentos e visualizar documentos — sem risco de erros reais.

---

## Sobre o projeto

A maioria dos aplicativos governamentais e de saúde foi projetada sem considerar pessoas com baixa familiaridade digital. O Navega+ inverte essa lógica: linguagem simples, botões amplos, fontes ajustáveis e um simulador onde errar não tem consequências.

O protótipo roda no browser com aparência de smartphone (390×844 px) e cobre os fluxos mais comuns que um idoso enfrentaria no dia a dia digital.

---

## Funcionalidades

### Acessibilidade
- Tamanho de fonte ajustável em três níveis (Normal, Grande, Muito Grande)
- Modo Alto Contraste com fundo escuro e destaque em amarelo
- Prévia em tempo real das configurações antes de salvar
- Área de toque mínima de 64 px em todos os elementos interativos

### Simulador de Saúde
- Agendamento de consulta em 3 passos (especialidade → data → horário)
- Datas geradas dinamicamente para os próximos 7 dias
- Lista de medicamentos fictícios com nome, finalidade e horários destacados
- Tela de sucesso com resumo e aviso de simulação

### Documentos Digitais
- RG Digital, CPF e Carteira de Vacinação com cards visuais estruturados
- Tela de detalhe por documento com aviso de conteúdo fictício

### Alfabetização Visual
- Glossário de 10 ícones universais (Pesquisar, Início, Configurações, Câmera etc.) com explicação em linguagem simples
- Bottom sheet com variações do ícone em diferentes aplicativos reais
- Jogo de associação: ícone + 4 opções, feedback imediato, tela de resultado com percentual de acertos

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
│   │   └── AppContext.jsx        # Estado global: tela ativa, fonte, contraste
│   ├── components/
│   │   ├── PhoneFrame.jsx        # Frame visual do smartphone no browser
│   │   ├── BarraTopo.jsx         # Cabeçalho com título e botão Voltar
│   │   └── BotaoAjuda.jsx        # Botão flutuante de ajuda contextual
│   ├── screens/
│   │   ├── Onboarding.jsx        # Tela de boas-vindas
│   │   ├── Acessibilidade.jsx    # Configuração de fonte e contraste
│   │   ├── Home.jsx              # Hub de categorias
│   │   ├── Saude.jsx             # Submenu de saúde
│   │   ├── Agendamento.jsx       # Simulador de consulta (3 passos)
│   │   ├── Medicamentos.jsx      # Lista de medicamentos
│   │   ├── Documentos.jsx        # Documentos digitais
│   │   └── AlfabetizacaoVisual.jsx  # Glossário de ícones + jogo
│   ├── App.jsx                   # Roteador principal
│   └── main.jsx
├── DOCUMENTACAO.md               # Documentação técnica detalhada
└── package.json
```

---

## Status

Este é um protótipo de front-end estático, sem backend. Não há autenticação, banco de dados nem persistência entre sessões. Todos os dados exibidos (documentos, medicamentos, agendamentos) são fictícios.

Veja `DOCUMENTACAO.md` para a lista completa de funcionalidades implementadas e o roadmap de próximas etapas.

---

## Licença

Projeto acadêmico / portfólio. Uso livre para fins educacionais.
