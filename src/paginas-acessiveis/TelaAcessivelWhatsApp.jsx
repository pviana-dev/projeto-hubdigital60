import MolduraTelefone from './MolduraTelefone'

const conversas = [
  { id: 'maria', nome: 'Maria (filha)', msg: 'Oi mãe, tudo bem? 😊', hora: '14:32', naoLidas: 2, avatar: '👩' },
  { id: 'joao', nome: 'João (filho)', msg: 'Chego lá às 18h', hora: '10:15', naoLidas: 0, avatar: '👦' },
  { id: 'drsilva', nome: 'Dr. Silva', msg: 'Sua consulta é amanhã às 10h', hora: 'Ontem', naoLidas: 0, avatar: '👨‍⚕️' },
  { id: 'igreja', nome: 'Igreja São José 🙏', msg: '📷 Foto', hora: 'Seg', naoLidas: 5, avatar: '⛪' },
]

export default function TelaAcessivelWhatsApp() {
  return (
    <div className="flex flex-col items-center gap-4 py-8" style={{ background: '#e5e7eb', minHeight: '100vh' }}>
      <a href="?acessivel=galeria" className="font-bold" style={{ fontSize: 18, color: '#111827' }}>
        ← Voltar para a galeria
      </a>

      <MolduraTelefone>
        <div className="relative flex flex-col flex-1 overflow-hidden" style={{ background: '#fff' }}>
          <div className="flex items-center justify-between px-5 py-5 flex-shrink-0" style={{ background: '#075E54' }}>
            <span className="font-bold text-white" style={{ fontSize: 28 }}>WhatsApp</span>
            <div className="flex gap-6">
              <span style={{ fontSize: 30, color: '#fff' }}>🔍</span>
              <span style={{ fontSize: 30, color: '#fff' }}>⋮</span>
            </div>
          </div>

          <div className="flex flex-shrink-0" style={{ background: '#075E54' }}>
            {['CONVERSAS', 'STATUS', 'LIGAÇÕES'].map((tab, i) => (
              <div
                key={tab}
                className="flex-1 text-center py-4 font-bold"
                style={{
                  fontSize: 15,
                  color: i === 0 ? '#25D366' : 'rgba(255,255,255,0.6)',
                  borderBottom: i === 0 ? '3px solid #25D366' : '3px solid transparent',
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto" style={{ background: '#fff' }}>
            {conversas.map(c => (
              <div
                key={c.id}
                className="flex items-center gap-4 px-5 py-5 w-full text-left"
                style={{ borderBottom: '1px solid #f0f0f0', minHeight: 108 }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 72, height: 72, background: '#e5e7eb', fontSize: 38 }}
                >
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold" style={{ color: '#111', fontSize: 22 }}>{c.nome}</span>
                    <span style={{ fontSize: 16, color: c.naoLidas ? '#25D366' : '#9ca3af', flexShrink: 0 }}>
                      {c.hora}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 gap-2">
                    <span
                      style={{
                        fontSize: 18,
                        color: '#4b5563',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.msg}
                    </span>
                    {c.naoLidas > 0 && (
                      <span
                        className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                        style={{ width: 28, height: 28, background: '#25D366', fontSize: 14 }}
                      >
                        {c.naoLidas}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute flex items-center justify-center rounded-full shadow-lg"
            style={{ bottom: 24, right: 24, width: 76, height: 76, background: '#25D366', fontSize: 36 }}
          >
            💬
          </div>
        </div>
      </MolduraTelefone>
    </div>
  )
}
