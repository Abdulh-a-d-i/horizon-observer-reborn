
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from pydantic import BaseModel
import subprocess
import uuid
from datetime import datetime
from typing import List, Optional
from logger import tail_log_file
import socket

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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

@app.websocket("/ws/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    machine_id = get_machine_id()

    try:
        # Start sending logs
        async for log_line in tail_log_file():
            log_entry = {
                "machine_id": machine_id,
                "log": log_line,
                "timestamp": datetime.now().isoformat(),
                "severity": "ERROR" if "ERROR" in log_line.upper() else "WARNING" if "WARNING" in log_line.upper() else "CRITICAL"
            }
            
            # Send the log to the connected client
            await websocket.send_json(log_entry)
            
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        active_connections.remove(websocket)
        await websocket.close()

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
    for connection in active_connections:
        try:
            await connection.send_json({
                "type": "new_ticket",
                "ticket": ticket_entry
            })
        except Exception as e:
            print(f"Error broadcasting ticket: {e}")
    
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
