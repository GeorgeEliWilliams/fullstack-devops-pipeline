import "@/styles/globals.css";
import '@/styles/nprogress.css'; // Path to your custom styles

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: true, speed: 300, minimum: 0.2});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function App({Component, pageProps}) {
    return <Component {...pageProps} />;
}
