
import asyncio
import websockets
import json
import subprocess
from datetime import datetime
import time
import socket
import os

def get_machine_id():
    """Get a unique identifier for this machine"""
    try:
        return socket.gethostname()
    except:
        return "unknown-machine"

def get_log_severity(log_line):
    """Determine log severity based on common patterns"""
    log_line = log_line.lower()
    if any(level in log_line for level in ['error', 'err', 'failed', 'failure']):
        return 'ERROR'
    elif any(level in log_line for level in ['warn', 'warning']):
        return 'WARNING'
    elif any(level in log_line for level in ['info', 'information']):
        return 'INFO'
    elif any(level in log_line for level in ['debug']):
        return 'DEBUG'
    return 'INFO'

async def monitor_logs():
    uri = "ws://localhost:8000/ws/logs"
    machine_id = get_machine_id()
    
    while True:
        try:
            async with websockets.connect(uri) as websocket:
                print(f"Connected to WebSocket server as {machine_id}")
                
                # Monitor system logs using journalctl with more detailed output
                process = subprocess.Popen(
                    ['journalctl', '-f', '-n', '0', '--output=short-precise'],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    universal_newlines=True
                )
                
                while True:
                    line = process.stdout.readline()
                    if line:
                        # Create a log entry with more details
                        log_entry = {
                            "machine_id": machine_id,
                            "log": line.strip(),
                            "timestamp": datetime.now().isoformat(),
                            "severity": get_log_severity(line),
                            "source": "system"
                        }
                        
                        # Send the log through WebSocket
                        await websocket.send(json.dumps(log_entry))
                        print(f"Sent log: {log_entry['severity']} - {log_entry['log'][:100]}...")
                    
                    # Small delay to prevent CPU overuse
                    await asyncio.sleep(0.1)
                    
        except Exception as e:
            print(f"Connection error: {e}")
            print("Retrying in 5 seconds...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    print("Starting system log monitor...")
    asyncio.run(monitor_logs())
