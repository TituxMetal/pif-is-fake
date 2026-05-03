import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/inter'
import '@fontsource/archivo-black'

import '~/styles/globals.css'

import { App } from '~/App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Mount point #root not found in index.html')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
