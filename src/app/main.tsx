import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { ConfigProvider } from 'antd'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
