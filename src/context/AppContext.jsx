import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

const FONT_SIZE_PX = { normal: 14, grande: 18, 'muito-grande': 21 }

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('onboarding')
  const [history, setHistory] = useState([])
  const [fontSize, setFontSize] = useState('grande')
  const [altoContraste, setAltoContraste] = useState(false)

  const fontSizePx = FONT_SIZE_PX[fontSize] ?? 18
  const fs = (n) => Math.round(n * fontSizePx / 18)

  function navegar(para) {
    setHistory(h => [...h, screen])
    setScreen(para)
  }

  function voltar() {
    setHistory(h => {
      const nova = [...h]
      const anterior = nova.pop()
      setScreen(anterior || 'home')
      return nova
    })
  }

  return (
    <AppContext.Provider value={{ screen, navegar, voltar, history, fontSize, setFontSize, altoContraste, setAltoContraste, fontSizePx, fs }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
