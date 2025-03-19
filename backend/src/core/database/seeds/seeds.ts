import bcrypt from 'bcrypt';
import {User} from '../../database/schemas/mongodbSchemas';
import mongoose from 'mongoose';
import dbConnection from '../../database/DBConnection';

async function main() {

  dbConnection();

  const adminUsername = process.env.ADMIN_USERNAME || 'Admin1234';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = new User({
    name: adminUsername,
    email: adminEmail,
    password: hashedPassword,
    role: 'ADMIN',
  });

 
  await adminUser.save();

  console.log('Admin user created successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding superuser:', error);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.connection.close();
  });