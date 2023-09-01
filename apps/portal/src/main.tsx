import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
} from 'react-router-dom'
import {
  Provider,
} from 'react-redux'
import {
  store,
} from './store'

import App from './App'
import './main.css'

import '@shopify/polaris/build/esm/styles.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
