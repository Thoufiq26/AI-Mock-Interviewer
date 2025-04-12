/** @type {import('drizzle-kit').Config} */
export default{
    schema: "./utils/schema.js",          // Your schema files
    
    
    dialect: "postgresql",    
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_zUbe5lTW8ymD@ep-wandering-star-a5i10smx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };
  