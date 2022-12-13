import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({
    environment: process.env.REACT_APP_ENVIRONMENT_NAME,
    dsn: process.env.REACT_APP_SENTRY_URL,

    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
