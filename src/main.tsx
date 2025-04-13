import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import { RouterProvider } from "react-router";
// services
import ApiProvider from './services/ApiProvider.tsx'
// router
import router from "./browserRouter.ts";
// styles
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </StrictMode>,
)