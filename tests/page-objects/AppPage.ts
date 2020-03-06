const appPageCommands = {
    testUserName: async function(name: string): Promise<void> {
        await this.waitForElementVisible('@profileDropdown', 10000).click('@profileDropdown', 1000);
        await this.assert.containsText('@userName', name);
    },
};

export = {
    commands: [appPageCommands],
    elements: {
        profileDropdown: {
            selector: '.profile_dropdown__button',
        },
        userName: {
            selector: '.profile_dropdown__panel_heading',
        },
    },
};
