
# Resolvix Backend

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Scripts

- `main.py` - Main FastAPI server
- `logger.py` - Log file handling utilities
- `log_client.py` - Client script to forward logs from remote machines
- `log_forwarder.py` - Simple log forwarder
- `monitor_logs.py` - System log monitor using journalctl

## Usage

1. Start the main server: `python -m uvicorn main:app --reload`
2. On remote machines, run: `python log_client.py` to forward logs
3. Use `monitor_logs.py` to monitor system logs locally

## API Endpoints

- `GET /tickets` - Get all tickets
- `POST /create-ticket` - Create a new ticket
- `PUT /tickets/{ticket_id}` - Update ticket status
- `WS /ws/logs` - WebSocket for real-time logs
