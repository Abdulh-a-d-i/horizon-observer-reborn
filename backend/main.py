
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from pydantic import BaseModel
import uuid
from datetime import datetime
from typing import List, Optional
import socket
import json
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store active WebSocket connections
active_connections: List[WebSocket] = []

def get_machine_id():
    try:
        return socket.gethostname()
    except:
        return "unknown-machine"

# Sample log messages for simulation
SAMPLE_LOGS = [
    "ERROR: Database connection timeout after 30 seconds",
    "WARNING: High memory usage detected: 85% of available RAM",
    "CRITICAL: Disk space low on /var partition: 95% full",
    "ERROR: Failed to authenticate user: invalid credentials",
    "WARNING: API response time exceeded threshold: 2.5s",
    "ERROR: Network connection lost to service mesh",
    "CRITICAL: Service health check failed 3 consecutive times",
    "WARNING: Cache hit ratio below optimal: 45%",
    "ERROR: Failed to parse configuration file",
    "WARNING: SSL certificate expires in 7 days"
]

SEVERITIES = ["ERROR", "WARNING", "CRITICAL", "INFO"]
MACHINES = ["web-server-01", "api-server-02", "db-server-01", "cache-server-01", "load-balancer-01"]

async def generate_sample_logs():
    """Generate sample logs for demonstration"""
    while True:
        if active_connections:
            # Generate a random log entry
            log_entry = {
                "machine_id": random.choice(MACHINES),
                "log": random.choice(SAMPLE_LOGS),
                "timestamp": datetime.now().isoformat(),
                "severity": random.choice(SEVERITIES),
                "source": "system"
            }
            
            # Send to all connected clients
            disconnected = []
            for connection in active_connections:
                try:
                    await connection.send_text(json.dumps(log_entry))
                except:
                    disconnected.append(connection)
            
            # Remove disconnected clients
            for conn in disconnected:
                if conn in active_connections:
                    active_connections.remove(conn)
        
        # Wait before generating next log (random interval between 1-5 seconds)
        await asyncio.sleep(random.uniform(1, 5))

@app.websocket("/ws/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    print(f"Client connected. Total connections: {len(active_connections)}")

    try:
        # Keep connection alive and listen for client messages
        while True:
            try:
                # Wait for client message or timeout after 30 seconds
                message = await asyncio.wait_for(websocket.receive_text(), timeout=30.0)
                print(f"Received message from client: {message}")
            except asyncio.TimeoutError:
                # Send ping to keep connection alive
                await websocket.send_text(json.dumps({"type": "ping"}))
            except WebSocketDisconnect:
                break
            except Exception as e:
                print(f"Error in websocket: {e}")
                break
                
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        if websocket in active_connections:
            active_connections.remove(websocket)
        print(f"Client removed. Total connections: {len(active_connections)}")

class Ticket(BaseModel):
    machine_id: str
    log: str
    timestamp: str
    title: str
    description: str
    status: Optional[str] = "OPEN"

# In-memory storage for tickets
tickets_db = []

@app.post("/create-ticket")
async def create_ticket(ticket: Ticket):
    ticket_id = str(uuid.uuid4())
    ticket_entry = {
        "id": ticket_id,
        "machine_id": ticket.machine_id,
        "log": ticket.log,
        "timestamp": ticket.timestamp,
        "title": ticket.title,
        "description": ticket.description,
        "status": ticket.status,
        "created_at": datetime.now().isoformat()
    }
    tickets_db.append(ticket_entry)
    
    # Broadcast new ticket to all connected clients
    ticket_message = {
        "type": "new_ticket",
        "ticket": ticket_entry
    }
    
    disconnected = []
    for connection in active_connections:
        try:
            await connection.send_text(json.dumps(ticket_message))
        except:
            disconnected.append(connection)
    
    # Remove disconnected clients
    for conn in disconnected:
        if conn in active_connections:
            active_connections.remove(conn)
    
    return {"message": "Ticket created successfully", "ticket_id": ticket_id}

@app.get("/tickets")
async def get_tickets():
    return tickets_db

@app.get("/tickets/{machine_id}")
async def get_tickets_by_machine(machine_id: str):
    return [ticket for ticket in tickets_db if ticket["machine_id"] == machine_id]

@app.put("/tickets/{ticket_id}")
async def update_ticket_status(ticket_id: str, status: str):
    for ticket in tickets_db:
        if ticket["id"] == ticket_id:
            ticket["status"] = status
            return {"message": "Ticket status updated successfully"}
    return {"message": "Ticket not found"}, 404

@app.on_event("startup")
async def startup_event():
    # Start the log generation task
    asyncio.create_task(generate_sample_logs())
    print("FastAPI server started with sample log generation")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
