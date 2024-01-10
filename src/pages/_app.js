import Head from 'next/head';
function MyApp({ Component, pageProps }) {
    return (<>
        <Head
            rel="stylesheet"
            href="https://unpkg.com/modern-css-reset/dist/reset.min.css"
        />
        <Component {...pageProps} />
    </>)

}
export default MyApp;