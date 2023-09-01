import enTranslations from '@shopify/polaris/locales/en.json'
import {
  AppProvider,
} from '@shopify/polaris'
import {
  useEffect,
} from 'react'
import axios from 'axios'
import {
  Dashboard,
} from './pages'

export default () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    const hmac = searchParams.get('hmac')
    const shop = searchParams.get('shop')
    const state = searchParams.get('state')
    const timestamp = searchParams.get('timestamp')
    const host = new URLSearchParams(window.location.search).get('host')

    axios.post('http://localhost:3000/api/v1/auth', {
      code,
      hmac,
      shop,
      state,
      timestamp,
      host,
      queryString: window.location.search,
    }).then((res) => {
      window.console.log(res.data.data)
    })
  }, [])
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <Dashboard />
      </AppProvider>
    </>
  )
}
