import bcrypt from 'bcrypt';

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || 'adminuser';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

}

main()
  .catch((error) => {
    console.error('Error seeding superuser:', error);
    process.exit(1);
  })
  .finally(async () => {
    
  });
