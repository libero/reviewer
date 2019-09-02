module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/test-utils/setup.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test-utils/fileTransform.js',
        '\\.(css|scss)$': '<rootDir>/test-utils/styleTransform.js',
    },
    globals: {
        API_HOST: '',
    },
};
