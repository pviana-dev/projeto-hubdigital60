import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GaleriaAcessivel from './paginas-acessiveis/GaleriaAcessivel.jsx'
import TelaAcessivelWhatsApp from './paginas-acessiveis/TelaAcessivelWhatsApp.jsx'
import TelaAcessivelGovBr from './paginas-acessiveis/TelaAcessivelGovBr.jsx'

const paginasAcessiveis = {
  galeria: GaleriaAcessivel,
  whatsapp: TelaAcessivelWhatsApp,
  govbr: TelaAcessivelGovBr,
}

const idPagina = new URLSearchParams(window.location.search).get('acessivel')
const PaginaAcessivel = paginasAcessiveis[idPagina]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {PaginaAcessivel ? <PaginaAcessivel /> : <App />}
  </StrictMode>,
)
