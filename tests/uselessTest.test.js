const app = require('../app')

test('Test useless function', () => {
    expect(app.uselessFuncForTesting(true)).toBeTruthy();
})