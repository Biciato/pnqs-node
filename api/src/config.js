export const config = {
    production: {
        port: process.env.PORT || 9000,
        domain: 'abes-app.org.br'
    },
    development: {
        port: process.env.PORT || 9000,
        domain: 'localhost'
    }
};
