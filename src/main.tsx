import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { App } from '~/modules/app'

if (import.meta.env.MODE === 'production') {
  disableReactDevTools()
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Uncomment if you want to see the Lighthouse report in the console
// import reportWebVitals from './reportWebVitals'
// reportWebVitals(console.log)
