require("dotenv").config();
const pool = require("../src/shared/config/database");

const createGroupsTable = `
    CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_by VARCHAR(50) NOT NULL,
        participants_count INTEGER NOT NULL DEFAULT 0,
        whatsapp_group_invite_link TEXT,
        whatsapp_group_id VARCHAR(100) UNIQUE,
        is_active BOOLEAN DEFAULT false,
        is_full BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_groups_created_by ON groups(created_by);
    CREATE INDEX IF NOT EXISTS idx_groups_is_active ON groups(is_active);
`;

async function runMigrations() {
  console.log("🔄 Running database migrations...");

  try {
    await pool.query(createGroupsTable);
    console.log("✅ Groups table created successfully!");

    // Testar se funcionou
    const result = await pool.query("SELECT COUNT(*) FROM groups");
    console.log(`📊 Groups table is ready (${result.rows.count} records)`);
  } catch (error) {
    console.error("❌ Migration error:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
