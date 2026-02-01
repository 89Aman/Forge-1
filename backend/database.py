import os
import mysql.connector

DB_HOST = os.getenv("DB_HOST", "104.198.176.109")
DB_USER = os.getenv("DB_USER", "root")
DB_PASS = os.getenv("DB_PASS", "admin")
DB_NAME = os.getenv("DB_NAME", "skillsnap")

def get_db_connection(database=None):
    """Create a database connection with error handling."""
    try:
        return mysql.connector.connect(
            host=DB_HOST, 
            user=DB_USER, 
            password=DB_PASS, 
            database=database,
            connect_timeout=10
        )
    except mysql.connector.Error as e:
        print(f"❌ Database connection error: {e}")
        return None

def init_db():
    """Initialize the database and create required tables."""
    try:
        # Create DB if not exists
        conn = get_db_connection()
        if conn:
            c = conn.cursor()
            c.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            conn.close()

        # Create Table
        conn = get_db_connection(database=DB_NAME)
        if conn:
            c = conn.cursor()
            c.execute('''CREATE TABLE IF NOT EXISTS certificates
                         (id VARCHAR(255) PRIMARY KEY, 
                          user_name TEXT, 
                          code TEXT, 
                          audit TEXT, 
                          timestamp TEXT)''')
            conn.commit()
            conn.close()
            print("✅ Connected to Google Cloud SQL (MySQL)")
        else:
            print("⚠️ DB Connection Failed. Running in offline mode.")
    except Exception as e:
        print(f"❌ DB Init Error: {e}")