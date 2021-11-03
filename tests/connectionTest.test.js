const app = require('../app')

test('Test slack connection', async () => {
    await expect(app.testConnection()).resolves.toBe('Sale woke up!');
})