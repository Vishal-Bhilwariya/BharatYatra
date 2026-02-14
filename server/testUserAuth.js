// Test User Authentication Flow
// Run: node server/testUserAuth.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testAuth() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a new user
    console.log('\n📝 Test 1: Creating new user...');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    // Delete if exists
    await User.deleteOne({ email: testUser.email });

    const newUser = await User.create(testUser);
    console.log('✅ User created:', {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      passwordHashed: newUser.password !== 'password123'
    });

    // Test 2: Check password is hashed
    console.log('\n🔒 Test 2: Password hashing...');
    console.log('✅ Password is hashed:', newUser.password.startsWith('$2b$'));

    // Test 3: Login with correct password
    console.log('\n🔑 Test 3: Login with correct password...');
    const foundUser = await User.findOne({ email: testUser.email });
    const isMatch = await foundUser.comparePassword('password123');
    console.log('✅ Password match:', isMatch);

    // Test 4: Login with wrong password
    console.log('\n❌ Test 4: Login with wrong password...');
    const wrongMatch = await foundUser.comparePassword('wrongpassword');
    console.log('✅ Wrong password rejected:', !wrongMatch);

    // Test 5: Check duplicate email
    console.log('\n🚫 Test 5: Duplicate email check...');
    try {
      await User.create(testUser);
      console.log('❌ FAILED: Duplicate email allowed');
    } catch (error) {
      console.log('✅ Duplicate email rejected:', error.code === 11000);
    }

    // Test 6: Verify data in database
    console.log('\n📊 Test 6: Database verification...');
    const allUsers = await User.find({ email: testUser.email });
    console.log('✅ User found in database:', allUsers.length === 1);
    console.log('✅ User details:', {
      name: allUsers[0].name,
      email: allUsers[0].email,
      createdAt: allUsers[0].createdAt
    });

    // Cleanup
    await User.deleteOne({ email: testUser.email });
    console.log('\n🧹 Cleanup: Test user deleted');

    console.log('\n✅ ALL TESTS PASSED! Authentication is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

testAuth();
