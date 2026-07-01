import MolduraTelefone from './MolduraTelefone'

const documentos = [
  { id: 'cin', titulo: 'Identidade', subtitulo: 'RG Digital — CIN', emoji: '🪪', cor: '#1351B4' },
  { id: 'cpf', titulo: 'CPF', subtitulo: 'Cadastro de Pessoa Física', emoji: '📋', cor: '#2D9B42' },
  { id: 'sus', titulo: 'Cartão de Saúde', subtitulo: 'SUS', emoji: '🏥', cor: '#1E88E5' },
]

const servicos = [
  { emoji: '📊', titulo: 'Meu INSS', desc: 'Benefícios' },
  { emoji: '🚗', titulo: 'Detran', desc: 'CNH e veículo' },
  { emoji: '📝', titulo: 'Receita', desc: 'IR e restituição' },
  { emoji: '💼', titulo: 'CTPS', desc: 'Carteira de trabalho' },
]

export default function TelaAcessivelGovBr() {
  return (
    <div className="flex flex-col items-center gap-4 py-8" style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <a href="?acessivel=galeria" className="font-bold" style={{ fontSize: 18, color: '#111827' }}>
        ← Voltar para a galeria
      </a>

      <MolduraTelefone>
        <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#fff' }}>
          <div className="px-5 py-5 flex-shrink-0" style={{ background: '#1351B4' }}>
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17 }}>Bom dia,</p>
                <p className="font-bold text-white" style={{ fontSize: 26 }}>Maria Aparecida 👋</p>
              </div>
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.25)', fontSize: 28 }}
              >
                👩‍🦳
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" style={{ background: '#f5f7fa' }}>
            <div className="px-5 pt-5 mb-3">
              <p className="font-bold" style={{ color: '#111', fontSize: 24 }}>Seus documentos</p>
            </div>

            {documentos.map(doc => (
              <div
                key={doc.id}
                className="flex items-center gap-4 mx-5 mb-4 px-5 py-5 rounded-2xl shadow-sm"
                style={{ background: '#fff', border: `2px solid ${doc.cor}20`, minHeight: 110 }}
              >
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 72, height: 72, background: `${doc.cor}18`, fontSize: 38 }}
                >
                  {doc.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-bold" style={{ color: '#111', fontSize: 22 }}>{doc.titulo}</p>
                  <p style={{ fontSize: 16, color: '#6b7280' }}>{doc.subtitulo}</p>
                </div>
                <div className="flex items-center gap-1 px-3 py-2 rounded-full flex-shrink-0" style={{ background: '#dcfce7' }}>
                  <span style={{ fontSize: 14, color: '#166534', fontWeight: 700 }}>✓ Válido</span>
                </div>
              </div>
            ))}

            <div className="px-5 mb-3 mt-3">
              <p className="font-bold" style={{ color: '#111', fontSize: 24 }}>Serviços</p>
            </div>

            <div className="grid grid-cols-2 gap-4 px-5 mb-5">
              {servicos.map(s => (
                <div
                  key={s.titulo}
                  className="flex flex-col items-start gap-2 px-4 py-5 rounded-2xl"
                  style={{ background: '#fff', minHeight: 100 }}
                >
                  <span style={{ fontSize: 36 }}>{s.emoji}</span>
                  <div>
                    <p className="font-bold" style={{ color: '#111', fontSize: 19 }}>{s.titulo}</p>
                    <p style={{ fontSize: 14, color: '#6b7280' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MolduraTelefone>
    </div>
  )
}
