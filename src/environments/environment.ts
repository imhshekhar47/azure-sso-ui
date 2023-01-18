export const environment = {
    production: false,
    title: "Azure SSO UI",
    base_url: "https://localhost:4200",
    azure: {
        clientId: '',
        tenantId: '',
        issuerUrl: 'https://login.microsoftonline.com',
        clientScope: '',                                        // example api://<app-id>/<app-scope>
    },
    apiEndpoints : {
        roleApi: "http://localhost:8080"
    }
}