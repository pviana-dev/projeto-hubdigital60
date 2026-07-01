import { useState } from 'react'
import { useApp } from '../context/AppContext'
import BarraTopo from '../components/BarraTopo'
import BotaoAjuda from '../components/BotaoAjuda'

const CORES_DISPONIVEIS = [
  { cor: '#7c3aed', nome: 'Roxo' },
  { cor: '#1d4ed8', nome: 'Azul' },
  { cor: '#059669', nome: 'Verde' },
  { cor: '#d97706', nome: 'Âmbar' },
  { cor: '#dc2626', nome: 'Vermelho' },
  { cor: '#0891b2', nome: 'Petróleo' },
]

const FORM_VAZIO = {
  tipo: '',
  nome: '',
  numero: '',
  cor: '#1d4ed8',
  campos: [
    { label: '', valor: '' },
    { label: '', valor: '' },
  ],
}

const documentosFixos = [
  {
    id: 'fixo-rg',
    tipo: 'RG Digital',
    emoji: '🪪',
    nome: 'Maria Aparecida Silva',
    numero: '12.345.678-9',
    validade: '31/12/2030',
    nascimento: '15/03/1958',
    cor: '#7c3aed',
    corClara: '#ede9fe',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida Silva' },
      { label: 'Número do RG', valor: '12.345.678-9' },
      { label: 'Data de nascimento', valor: '15/03/1958' },
      { label: 'Validade', valor: '31/12/2030' },
      { label: 'Naturalidade', valor: 'Natal - RN' },
    ],
  },
  {
    id: 'fixo-cpf',
    tipo: 'CPF',
    emoji: '📋',
    nome: 'Maria Aparecida Silva',
    numero: '123.456.789-00',
    validade: null,
    cor: '#1d4ed8',
    corClara: '#dbeafe',
    campos: [
      { label: 'Nome completo', valor: 'Maria Aparecida Silva' },
      { label: 'Número do CPF', valor: '123.456.789-00' },
      { label: 'Situação', valor: 'Regular ✓' },
    ],
  },
  {
    id: 'fixo-vacina',
    tipo: 'Carteira de Vacinação',
    emoji: '💉',
    nome: 'Maria Aparecida Silva',
    numero: null,
    cor: '#059669',
    corClara: '#d1fae5',
    campos: [
      { label: 'Covid-19 (3ª dose)', valor: '10/04/2023 ✓' },
      { label: 'Influenza', valor: '05/05/2025 ✓' },
      { label: 'Febre Amarela', valor: '20/08/2018 ✓' },
      { label: 'Próxima vacina', valor: 'Influenza - Mai/2026' },
    ],
  },
]

export default function Documentos() {
  const { altoContraste, fs } = useApp()
  const [docAberto, setDocAberto] = useState(null)
  const [documentosUsuario, setDocumentosUsuario] = useState([])
  const [adicionando, setAdicionando] = useState(false)
  const [form, setForm] = useState(FORM_VAZIO)
  const [erro, setErro] = useState('')

  const bg = altoContraste ? '#000' : '#f9fafb'
  const card = altoContraste ? '#1a1a1a' : '#fff'
  const texto = altoContraste ? '#fff' : '#111827'
  const subtexto = altoContraste ? '#d1d5db' : '#6b7280'
  const borda = altoContraste ? '#333' : '#e5e7eb'

  const todosDocumentos = [...documentosFixos, ...documentosUsuario]

  function abrirDoc(doc) {
    setDocAberto(doc)
  }

  function fecharDoc() {
    setDocAberto(null)
  }

  function excluirDoc(id) {
    setDocumentosUsuario(prev => prev.filter(d => d.id !== id))
    setDocAberto(null)
  }

  function salvarDoc() {
    if (!form.tipo.trim()) {
      setErro('O nome do documento é obrigatório.')
      return
    }
    const camposPreenchidos = form.campos.filter(c => c.label.trim() && c.valor.trim())
    const novoDoc = {
      id: `usuario-${Date.now()}`,
      tipo: form.tipo.trim(),
      emoji: '📄',
      nome: form.nome.trim() || null,
      numero: form.numero.trim() || null,
      cor: form.cor,
      corClara: `${form.cor}20`,
      campos: [
        ...(form.nome.trim() ? [{ label: 'Nome completo', valor: form.nome.trim() }] : []),
        ...(form.numero.trim() ? [{ label: 'Número', valor: form.numero.trim() }] : []),
        ...camposPreenchidos,
      ],
      isUsuario: true,
    }
    setDocumentosUsuario(prev => [...prev, novoDoc])
    setForm(FORM_VAZIO)
    setErro('')
    setAdicionando(false)
  }

  function cancelarForm() {
    setForm(FORM_VAZIO)
    setErro('')
    setAdicionando(false)
  }

  function atualizarCampo(i, chave, valor) {
    setForm(prev => {
      const campos = prev.campos.map((c, idx) => idx === i ? { ...c, [chave]: valor } : c)
      return { ...prev, campos }
    })
  }

  // ── Detalhe do documento ──────────────────────────────────────────────────
  if (docAberto) {
    const doc = docAberto
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo={doc.tipo} onVoltar={fecharDoc} />
        <div className="flex flex-col gap-4 px-5 py-5 pb-24">

          <div
            className="rounded-3xl p-5 shadow-md"
            style={{
              background: altoContraste
                ? '#1a1a1a'
                : `linear-gradient(135deg, ${doc.cor}, ${doc.cor}cc)`,
              border: altoContraste ? `2px solid ${doc.cor}` : 'none',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontSize: fs(40) }}>{doc.emoji}</span>
              <div>
                <p className="font-bold text-white" style={{ fontSize: fs(20) }}>{doc.tipo}</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: fs(14) }}>
                  {doc.isUsuario ? 'Documento Adicionado' : 'Documento Digital Simulado'}
                </p>
              </div>
            </div>
            {doc.numero && (
              <p className="font-bold text-white tracking-widest" style={{ fontSize: fs(24) }}>{doc.numero}</p>
            )}
          </div>

          {doc.campos.length > 0 && (
            <div className="rounded-3xl p-5 shadow-sm" style={{ background: card }}>
              <p className="font-bold mb-4" style={{ fontSize: fs(18), color: texto }}>Informações do documento:</p>
              <div className="flex flex-col gap-4">
                {doc.campos.map((campo, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: i < doc.campos.length - 1 ? `1px solid ${borda}` : 'none',
                      paddingBottom: i < doc.campos.length - 1 ? 16 : 0,
                    }}
                  >
                    <p style={{ color: subtexto, fontSize: fs(14) }}>{campo.label}</p>
                    <p className="font-bold mt-1" style={{ fontSize: fs(18), color: texto }}>{campo.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl px-4 py-3" style={{ background: altoContraste ? '#1a1a00' : '#fef3c7' }}>
            <p style={{ color: altoContraste ? '#fde68a' : '#92400e', fontSize: fs(14), lineHeight: 1.4 }}>
              ⚠️ Este é um documento fictício para fins de treinamento. Não use para fins reais.
            </p>
          </div>

          <button
            onClick={fecharDoc}
            className="w-full py-5 rounded-2xl font-bold"
            style={{
              background: altoContraste ? '#facc15' : '#1d4ed8',
              color: altoContraste ? '#000' : '#fff',
              minHeight: 72,
              fontSize: fs(20),
            }}
          >
            ← Voltar aos documentos
          </button>

          {doc.isUsuario && (
            <button
              onClick={() => excluirDoc(doc.id)}
              className="w-full py-4 rounded-2xl font-bold"
              style={{
                background: 'transparent',
                color: '#dc2626',
                border: '2px solid #dc2626',
                minHeight: 64,
                fontSize: fs(18),
              }}
            >
              🗑️ Excluir este documento
            </button>
          )}
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  // ── Formulário de adição ──────────────────────────────────────────────────
  if (adicionando) {
    return (
      <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
        <BarraTopo titulo="Novo Documento" onVoltar={cancelarForm} />
        <div className="flex flex-col gap-4 px-5 py-5 pb-24">

          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold mb-1" style={{ fontSize: fs(18), color: texto }}>Nome do documento</p>
            <p style={{ color: subtexto, fontSize: fs(14), marginBottom: 10 }}>Ex: Cartão do Plano de Saúde, Título de Eleitor</p>
            <input
              type="text"
              placeholder="Nome do documento *"
              value={form.tipo}
              onChange={e => { setForm(p => ({ ...p, tipo: e.target.value })); setErro('') }}
              className="w-full rounded-2xl px-4 py-4 outline-none"
              style={{
                fontSize: fs(17),
                background: altoContraste ? '#111' : '#f9fafb',
                color: texto,
                border: `2px solid ${erro ? '#dc2626' : borda}`,
              }}
            />
            {erro && (
              <p style={{ color: '#dc2626', fontSize: fs(14), marginTop: 6 }}>{erro}</p>
            )}
          </div>

          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold mb-3" style={{ fontSize: fs(18), color: texto }}>Informações (opcionais)</p>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                className="w-full rounded-2xl px-4 py-4 outline-none"
                style={{ fontSize: fs(17), background: altoContraste ? '#111' : '#f9fafb', color: texto, border: `2px solid ${borda}` }}
              />
              <input
                type="text"
                placeholder="Número do documento"
                value={form.numero}
                onChange={e => setForm(p => ({ ...p, numero: e.target.value }))}
                className="w-full rounded-2xl px-4 py-4 outline-none"
                style={{ fontSize: fs(17), background: altoContraste ? '#111' : '#f9fafb', color: texto, border: `2px solid ${borda}` }}
              />
            </div>
          </div>

          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold mb-3" style={{ fontSize: fs(18), color: texto }}>Campos extras (opcionais)</p>
            <div className="flex flex-col gap-3">
              {form.campos.map((campo, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder={`Rótulo ${i + 1} — ex: Validade`}
                    value={campo.label}
                    onChange={e => atualizarCampo(i, 'label', e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 outline-none"
                    style={{ fontSize: fs(16), background: altoContraste ? '#111' : '#f9fafb', color: texto, border: `2px solid ${borda}` }}
                  />
                  <input
                    type="text"
                    placeholder={`Valor ${i + 1} — ex: 31/12/2030`}
                    value={campo.valor}
                    onChange={e => atualizarCampo(i, 'valor', e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 outline-none"
                    style={{ fontSize: fs(16), background: altoContraste ? '#111' : '#f9fafb', color: texto, border: `2px solid ${borda}` }}
                  />
                  {i < form.campos.length - 1 && (
                    <div style={{ height: 1, background: borda, marginTop: 4 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-5" style={{ background: card }}>
            <p className="font-bold mb-3" style={{ fontSize: fs(18), color: texto }}>Cor do documento</p>
            <div className="flex gap-3 flex-wrap">
              {CORES_DISPONIVEIS.map(({ cor, nome }) => (
                <button
                  key={cor}
                  onClick={() => setForm(p => ({ ...p, cor }))}
                  className="flex flex-col items-center gap-1"
                  aria-label={nome}
                >
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      background: cor,
                      border: form.cor === cor ? `4px solid ${altoContraste ? '#facc15' : '#000'}` : '4px solid transparent',
                      boxShadow: form.cor === cor ? `0 0 0 2px ${cor}` : 'none',
                    }}
                  >
                    {form.cor === cor && (
                      <span style={{ color: '#fff', fontSize: fs(20), fontWeight: 900 }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontSize: fs(12), color: subtexto }}>{nome}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={salvarDoc}
            className="w-full py-5 rounded-2xl font-bold"
            style={{
              background: altoContraste ? '#facc15' : '#1d4ed8',
              color: altoContraste ? '#000' : '#fff',
              minHeight: 72,
              fontSize: fs(20),
            }}
          >
            Salvar documento
          </button>

          <button
            onClick={cancelarForm}
            className="w-full py-4 rounded-2xl font-bold"
            style={{
              background: 'transparent',
              color: altoContraste ? '#facc15' : '#1d4ed8',
              border: `2px solid ${altoContraste ? '#facc15' : '#1d4ed8'}`,
              minHeight: 64,
              fontSize: fs(18),
            }}
          >
            Cancelar
          </button>
        </div>
        <BotaoAjuda />
      </div>
    )
  }

  // ── Lista de documentos ───────────────────────────────────────────────────
  return (
    <div className="relative flex flex-col min-h-full" style={{ background: bg }}>
      <BarraTopo titulo="Meus Documentos" />

      <div className="flex flex-col gap-4 px-5 py-5 pb-24">
        {todosDocumentos.map(doc => (
          <button
            key={doc.id}
            onClick={() => abrirDoc(doc)}
            className="flex items-center gap-5 rounded-3xl px-5 py-5 shadow-sm text-left w-full"
            style={{
              background: card,
              border: altoContraste ? `2px solid ${doc.cor}` : 'none',
              minHeight: 100,
            }}
          >
            <div
              className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                width: 72,
                height: 72,
                background: altoContraste ? 'transparent' : (doc.corClara ?? `${doc.cor}20`),
                border: altoContraste ? `2px solid ${doc.cor}` : 'none',
                fontSize: fs(36),
              }}
            >
              {doc.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold" style={{ fontSize: fs(20), color: altoContraste ? '#fff' : doc.cor }}>{doc.tipo}</p>
              {doc.nome && (
                <p className="mt-1" style={{ fontSize: fs(16), color: subtexto }}>{doc.nome}</p>
              )}
              {doc.numero && (
                <p className="mt-1 font-mono" style={{ fontSize: fs(14), color: subtexto }}>{doc.numero}</p>
              )}
            </div>
            <span style={{ fontSize: fs(24), color: altoContraste ? '#fff' : '#9ca3af' }}>›</span>
          </button>
        ))}

        <button
          onClick={() => setAdicionando(true)}
          className="flex items-center gap-5 rounded-3xl px-5 py-5 text-left w-full"
          style={{
            background: 'transparent',
            border: `2px dashed ${altoContraste ? '#facc15' : '#1d4ed8'}`,
            minHeight: 100,
          }}
        >
          <div
            className="flex items-center justify-center rounded-2xl flex-shrink-0"
            style={{
              width: 72,
              height: 72,
              background: altoContraste ? '#1a1a1a' : '#eff6ff',
              fontSize: fs(36),
            }}
          >
            ➕
          </div>
          <div className="flex-1">
            <p className="font-bold" style={{ fontSize: fs(20), color: altoContraste ? '#facc15' : '#1d4ed8' }}>
              Adicionar documento
            </p>
            <p style={{ fontSize: fs(15), color: subtexto, marginTop: 2 }}>
              Cartão de plano de saúde, título de eleitor e outros
            </p>
          </div>
        </button>
      </div>

      <BotaoAjuda />
    </div>
  )
}
