import { hashPassword } from '../utils/password';

const run = async () => {
  const password = process.argv[2];
  
  if (!password) {
    console.error('Usage: ts-node src/scripts/hashAdminPassword.ts <password>');
    process.exit(1);
  }

  try {
    const hash = await hashPassword(password);
    console.log('\n--- ADMIN PASSWORD HASH ---');
    console.log(`Password: ${password}`);
    console.log(`Hash:     ${hash}`);
    console.log('---------------------------\n');
    console.log('Copy the hash above and paste it into your .env file as ADMIN_PASSWORD_HASH');
  } catch (error) {
    console.error('Error hashing password:', error);
    process.exit(1);
  }
};

run();
