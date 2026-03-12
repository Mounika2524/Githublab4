const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let storageBalance = 1000.0;

function readBalance() {
  return storageBalance;
}

function writeBalance(newBalance) {
  storageBalance = newBalance;
}

function formatMoney(value) {
  return value.toFixed(2);
}

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function handleTotal() {
  const balance = readBalance();
  console.log(`Current balance: ${formatMoney(balance)}`);
}

async function handleCredit(amountInput) {
  const input = amountInput ?? (await prompt('Enter credit amount: '));
  const amount = Number(input);
  if (Number.isNaN(amount) || amount <= 0) {
    console.log('Invalid amount. Enter a positive number.');
    return false;
  }

  const current = readBalance();
  const updated = current + amount;
  writeBalance(updated);
  console.log(`Amount credited. New balance: ${formatMoney(updated)}`);
  return true;
}

async function handleDebit(amountInput) {
  const input = amountInput ?? (await prompt('Enter debit amount: '));
  const amount = Number(input);
  if (Number.isNaN(amount) || amount <= 0) {
    console.log('Invalid amount. Enter a positive number.');
    return false;
  }

  const current = readBalance();
  if (current >= amount) {
    const updated = current - amount;
    writeBalance(updated);
    console.log(`Amount debited. New balance: ${formatMoney(updated)}`);
    return true;
  } else {
    console.log('Insufficient funds for this debit.');
    return false;
  }
}

async function main() {
  let running = true;
  while (running) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        await handleTotal();
        break;
      case '2':
        await handleCredit();
        break;
      case '3':
        await handleDebit();
        break;
      case '4':
        running = false;
        console.log('Exiting the program. Goodbye!');
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  rl.close();
}

function resetBalance(value = 1000.0) {
  storageBalance = value;
}

module.exports = {
  readBalance,
  writeBalance,
  handleTotal,
  handleCredit,
  handleDebit,
  resetBalance,
  main,
};

if (require.main === module) {
  main().catch((err) => {
    console.error('Unhandled error:', err);
    rl.close();
  });
}
