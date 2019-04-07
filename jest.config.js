module.exports = {
  setupFilesAfterEnv: [
    // this adds custom jest matchers from jest-dom
    'jest-dom/extend-expect',
    // Cleanup the dom after each test
    'react-testing-library/cleanup-after-each',
  ],
}