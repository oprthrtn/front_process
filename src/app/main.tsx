import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { ConfigProvider } from 'antd'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import ru_RU from 'antd/locale/ru_RU'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={ru_RU}>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
