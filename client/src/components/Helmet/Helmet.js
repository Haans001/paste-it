import { Helmet as ReactHelmet } from 'react-helmet';

export const Helmet = () => {
    return (
        <ReactHelmet>
            <meta charSet="utf-8" />
            <title>Just paste it</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
                rel="stylesheet"
            />
        </ReactHelmet>
    );
};
