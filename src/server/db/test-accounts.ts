import { db } from "./index";
import { accounts, users } from "./schema";
import { eq } from "drizzle-orm";

// Test function to verify accounts table integration
export async function testAccountsTable() {
  try {
    // Test that we can query the accounts table
    const allAccounts = await db.select().from(accounts);
    console.log("✅ Accounts table is accessible");
    console.log(`Found ${allAccounts.length} accounts`);
    
    // Test that we can query users table
    const allUsers = await db.select().from(users);
    console.log("✅ Users table is accessible");
    console.log(`Found ${allUsers.length} users`);
    
    // Test the relationship between users and accounts
    const usersWithAccounts = await db
      .select({
        userId: users.id,
        userName: users.name,
        userEmail: users.email,
        accountProvider: accounts.provider,
        accountType: accounts.type,
      })
      .from(users)
      .leftJoin(accounts, eq(users.id, accounts.userId));
    
    console.log("✅ Users-Accounts relationship is working");
    console.log(`Found ${usersWithAccounts.length} user-account relationships`);
    
    return true;
  } catch (error) {
    console.error("❌ Error testing accounts table:", error);
    return false;
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAccountsTable()
    .then((success) => {
      if (success) {
        console.log("🎉 All tests passed!");
        process.exit(0);
      } else {
        console.log("💥 Some tests failed!");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Test execution failed:", error);
      process.exit(1);
    });
} 