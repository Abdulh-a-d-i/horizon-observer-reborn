
import asyncio
import websockets
import json
import socket
from datetime import datetime
import os
import subprocess
import sys

# Configuration
CENTRAL_SERVER = "ws://192.168.100.31:8000/ws/logs"  # Change this to your central server's IP
LOG_FILE_PATH = "/var/log/syslog"
SEVERITIES = ["ERROR", "WARNING", "CRITICAL"]

def get_machine_id():
    """Get a unique identifier for this machine"""
    try:
        return socket.gethostname()
    except:
        return "unknown-machine"

def get_log_severity(log_line):
    """Determine log severity based on common patterns"""
    log_line = log_line.upper()
    if "ERROR" in log_line or "ERR" in log_line:
        return "ERROR"
    elif "WARNING" in log_line or "WARN" in log_line:
        return "WARNING"
    elif "CRITICAL" in log_line:
        return "CRITICAL"
    return "INFO"

async def send_logs():
    machine_id = get_machine_id()
    print(f"Starting log client for machine: {machine_id}")
    print(f"Connecting to central server: {CENTRAL_SERVER}")

    while True:
        try:
            async with websockets.connect(CENTRAL_SERVER) as websocket:
                print("Connected to central server")
                
                # Monitor system logs
                process = subprocess.Popen(
                    ['tail', '-f', LOG_FILE_PATH],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    universal_newlines=True
                )
                
                while True:
                    line = process.stdout.readline()
                    if line:
                        # Only send logs with specified severities
                        if any(sev in line.upper() for sev in SEVERITIES):
                            log_entry = {
                                "machine_id": machine_id,
                                "log": line.strip(),
                                "timestamp": datetime.now().isoformat(),
                                "severity": get_log_severity(line)
                            }
                            
                            # Send the log through WebSocket
                            await websocket.send(json.dumps(log_entry))
                            print(f"Sent log: {log_entry['severity']} - {log_entry['log'][:100]}...")
                    
                    await asyncio.sleep(0.1)
                    
        except Exception as e:
            print(f"Connection error: {e}")
            print("Retrying in 5 seconds...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    # Check if we have permission to read the log file
    if not os.access(LOG_FILE_PATH, os.R_OK):
        print(f"Error: Cannot read {LOG_FILE_PATH}. Please run with sudo or check permissions.")
        sys.exit(1)
        
    print("Starting log client...")
    asyncio.run(send_logs())
