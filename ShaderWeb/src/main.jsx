import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ShaderPage from './Pages/ShaderPage.jsx'
import Glsl from './Pages/GlslPage'
import GlslArtPlane from './Pages/GlslArtPlane.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlslArtPlane />
  </React.StrictMode>,
)
