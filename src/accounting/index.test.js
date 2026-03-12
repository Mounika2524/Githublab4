const { readBalance, writeBalance, resetBalance, handleCredit, handleDebit } = require('./index');

describe('Accounting app business logic', () => {
  beforeEach(() => {
    resetBalance(1000);
  });

  test('Initial balance should be 1000.00', () => {
    expect(readBalance()).toBe(1000);
  });

  test('Credit account increases balance', async () => {
    const result = await handleCredit('250');
    expect(result).toBe(true);
    expect(readBalance()).toBe(1250);
  });

  test('Debit account decreases balance when sufficient', async () => {
    const result = await handleDebit('400');
    expect(result).toBe(true);
    expect(readBalance()).toBe(600);
  });

  test('Debit account rejects insufficient funds', async () => {
    const result = await handleDebit('1500');
    expect(result).toBe(false);
    expect(readBalance()).toBe(1000);
  });

  test('Credit invalid amount fails', async () => {
    const result = await handleCredit('-10');
    expect(result).toBe(false);
    expect(readBalance()).toBe(1000);
  });

  test('Debit invalid amount fails', async () => {
    const result = await handleDebit('0');
    expect(result).toBe(false);
    expect(readBalance()).toBe(1000);
  });
});
