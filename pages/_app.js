import 'tailwindcss/tailwind.css'
import { Provider } from "next-auth/client";
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
