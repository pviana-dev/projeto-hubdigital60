const paginas = [
  {
    id: 'whatsapp',
    titulo: 'WhatsApp',
    desc: 'Lista de conversas com fonte e botões ampliados',
    cor: '#25D366',
  },
  {
    id: 'govbr',
    titulo: 'Gov.br',
    desc: 'Documentos e serviços com fonte e botões ampliados',
    cor: '#1351B4',
  },
]

export default function GaleriaAcessivel() {
  return (
    <div className="flex flex-col items-center px-6 py-12" style={{ background: '#e5e7eb', minHeight: '100vh', width: '100%' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <div className="flex flex-col gap-5">
          {paginas.map(p => (
            <a
              key={p.id}
              href={`?acessivel=${p.id}`}
              className="flex items-center gap-5 px-6 py-6 rounded-3xl shadow-sm"
              style={{ background: '#fff', border: `2px solid ${p.cor}30`, textDecoration: 'none' }}
            >
              <div className="flex-1">
                <p className="font-bold" style={{ fontSize: 24, color: '#111827' }}>{p.titulo}</p>
                <p style={{ fontSize: 17, color: '#4b5563' }}>{p.desc}</p>
              </div>
              <span style={{ fontSize: 28, color: '#9ca3af' }}>→</span>
            </a>
          ))}
        </div>

        <a href="/" className="font-bold" style={{ fontSize: 18, color: '#111827', display: 'inline-block', marginTop: 40 }}>
          ← Voltar para o app
        </a>
      </div>
    </div>
  )
}
