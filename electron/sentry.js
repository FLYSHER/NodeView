const sentry = require('@sentry/electron/main');
const { app } = require('electron');
const sentryRenderer = require("@sentry/electron/renderer");
const { rewriteFramesIntegration } = require('@sentry/integrations');

const sentryMainInit = () => sentry.init({
    dsn : 'https://84d805b8c03d8b956113b4e8567cad0d@o4506908221112320.ingest.us.sentry.io/4506908226813952',
    release : `${app.getName()}@${app.getVersion()}`,
    integrations : [ rewriteFramesIntegration() ],
});

const sentryRendererInit = () => sentryRenderer.init({
    dsn : 'https://84d805b8c03d8b956113b4e8567cad0d@o4506908221112320.ingest.us.sentry.io/4506908226813952',
    release : `${app.getName()}@${app.getVersion()}`,
    integrations : [ rewriteFramesIntegration() ],
});

module.exports = { sentryMainInit, sentryRendererInit };
