import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
