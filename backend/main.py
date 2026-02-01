import os
import mysql.connector
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import uuid
from datetime import datetime
from gemini_audit import audit_code
from contextlib import asynccontextmanager
import database


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown events."""
    # Startup
    database.init_db()
    print("🚀 SkillSnap API is ready!")
    yield
    # Shutdown
    print("👋 SkillSnap API shutting down...")

app = FastAPI(
    title="SkillSnap API",
    description="AI-Verified Skill Proof Platform - Defying the gravity of traditional gatekeeping",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSubmission(BaseModel):
    code: str
    username: str
    audit: str | None = None

class HealthResponse(BaseModel):
    status: str
    database: str
    timestamp: str

@app.get("/", tags=["Health"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": "SkillSnap API",
        "tagline": "Defying the gravity of traditional gatekeeping with AI-verified skill proof",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    db_status = "connected"
    conn = database.get_db_connection(database=database.DB_NAME)
    if not conn:
        db_status = "disconnected"
    else:
        conn.close()
    
    return {
        "status": "healthy",
        "database": db_status,
        "timestamp": str(datetime.now())
    }

@app.post("/api/run", tags=["Code Execution"])
async def run_code(submission: CodeSubmission):
    """
    Execute code in a secure sandbox and validate against test cases.
    Uses Piston API for isolated Docker container execution.
    """
    # Test case: function should sum two numbers
    test_case = "\n\nprint(sum(5, 10))"
    full_code = submission.code + test_case
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post("https://emkc.org/api/v2/piston/execute", json={
                "language": "python",
                "version": "3.10.0",
                "files": [{"content": full_code}]
            })
            result = response.json()
            output = result.get('run', {}).get('stdout', '').strip()
            stderr = result.get('run', {}).get('stderr', '').strip()
        except httpx.TimeoutException:
            return {"passed": False, "output": "Execution timed out", "audit": None}
        except Exception as e:
            return {"passed": False, "output": f"Runner Error: {str(e)}", "audit": None}
    
    # Expected output is 15
    passed = output == "15"
    audit_report = None
    
    if passed:
        # Get AI code review from Gemini
        audit_report = audit_code(submission.code)

    return {
        "passed": passed, 
        "output": output, 
        "error": stderr if stderr else None,
        "audit": audit_report
    }

@app.post("/api/certify", tags=["Certificates"])
async def create_certificate(submission: CodeSubmission):
    """
    Mint a verifiable certificate for a passed code submission.
    Stores the exact code snapshot and AI audit in Cloud SQL.
    """
    cert_id = str(uuid.uuid4())[:8].upper()  # Short, readable certificate ID
    
    try:
        conn = database.get_db_connection(database=database.DB_NAME)
        if not conn:
            raise HTTPException(status_code=503, detail="Database unavailable")
        
        c = conn.cursor()
        c.execute(
            "INSERT INTO certificates VALUES (%s, %s, %s, %s, %s)", 
            (cert_id, submission.username, submission.code, submission.audit, str(datetime.now()))
        )
        conn.commit()
        conn.close()
        
        return {
            "cert_id": cert_id,
            "message": f"Certificate {cert_id} minted successfully!",
            "verify_url": f"/api/verify/{cert_id}"
        }
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/verify/{cert_id}", tags=["Certificates"])
def verify_cert(cert_id: str):
    """
    Verify a certificate by its ID.
    Returns the complete proof including code snapshot and AI audit.
    """
    conn = database.get_db_connection(database=database.DB_NAME)
    if not conn:
        raise HTTPException(status_code=503, detail="Database unavailable")
    
    c = conn.cursor()
    c.execute("SELECT * FROM certificates WHERE id=%s", (cert_id.upper(),))
    row = c.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Certificate not found")
    
    return {
        "id": row[0], 
        "user": row[1], 
        "code_proof": row[2], 
        "ai_audit": row[3], 
        "timestamp": row[4], 
        "verified": True,
        "platform": "SkillSnap",
        "message": "✅ This certificate is authentic and verified."
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)