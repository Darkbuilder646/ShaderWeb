import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ShaderPage from './Pages/ShaderPage.jsx'
import Glsl from './Pages/GlslPage'
import GlslArtPlane from './Pages/GlslArtPlane.jsx'
import GlslRayMarching from './Pages/GlslRayMarching.jsx'
import GlslRubixCube from './Pages/GlslRubixCube.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Shader Plane */}
    {/* <GlslArtPlane /> */}

    {/* Floting Cube */}
    {/* <ShaderPage />    */}

    {/* Waves */}
    {/* <Glsl /> */}

    {/* Raymarching */}
    {/* <GlslRayMarching /> */}

    {/* Rubix Cube */}
    <GlslRubixCube />
  </React.StrictMode>,
)
