import 'bootstrap/dist/css/bootstrap.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
      <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer />
      </Provider>
  )
}
