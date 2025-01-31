import { AuthProvider } from "@/Context/AuthContext";
import { Provider } from "react-redux";
import store from "@/Services/store";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

export default function App({ Component, pageProps }) {
  const LazyComponent = dynamic(() => Promise.resolve(Component), {
    ssr: true,
  });
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        <LazyComponent {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
