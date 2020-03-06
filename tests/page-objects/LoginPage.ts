const loginCommands = {
    login: async function(): Promise<void> {
        return this.waitForElementVisible('@loginButton', 10000).click('@loginButton');
    },
};

export = {
    commands: [loginCommands],
    url: 'http://localhost:9000',
    elements: {
        loginButton: {
            selector: '.button--orcid',
        },
    },
};
