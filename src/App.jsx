import { AppProvider, useApp } from './context/AppContext'
import PhoneFrame from './components/PhoneFrame'
import Onboarding from './screens/Onboarding'
import Acessibilidade from './screens/Acessibilidade'
import Home from './screens/Home'
import Saude from './screens/Saude'
import Agendamento from './screens/Agendamento'
import Medicamentos from './screens/Medicamentos'
import Documentos from './screens/Documentos'
import AlfabetizacaoVisual from './screens/AlfabetizacaoVisual'
import SimuladorHub from './screens/SimuladorHub'
import SimuladorWhatsApp from './simuladores/SimuladorWhatsApp'
import SimuladorMaps from './simuladores/SimuladorMaps'
import SimuladorYouTube from './simuladores/SimuladorYouTube'
import SimuladorIfood from './simuladores/SimuladorIfood'
import SimuladorGovBr from './simuladores/SimuladorGovBr'
import './index.css'

function Router() {
  const { screen } = useApp()

  const telas = {
    onboarding: <Onboarding />,
    acessibilidade: <Acessibilidade />,
    home: <Home />,
    saude: <Saude />,
    agendamento: <Agendamento />,
    medicamentos: <Medicamentos />,
    documentos: <Documentos />,
    aprender: <AlfabetizacaoVisual />,
    simuladores: <SimuladorHub />,
    'sim-whatsapp': <SimuladorWhatsApp />,
    'sim-maps': <SimuladorMaps />,
    'sim-youtube': <SimuladorYouTube />,
    'sim-ifood': <SimuladorIfood />,
    'sim-govbr': <SimuladorGovBr />,
  }

  return telas[screen] || <Home />
}

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', background: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 0' }}>
        <PhoneFrame>
          <Router />
        </PhoneFrame>
      </div>
    </AppProvider>
  )
}
