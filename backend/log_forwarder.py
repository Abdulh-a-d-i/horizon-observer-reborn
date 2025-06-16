
import asyncio
import websockets
import json
import socket
import sys
import time
from datetime import datetime

async def forward_logs(machine_id: str, server_url: str):
    while True:
        try:
            async with websockets.connect(server_url) as websocket:
                print(f"Connected to server at {server_url}")
                
                # Simulate log generation (replace with actual log reading)
                while True:
                    # Example log message
                    log_message = {
                        "machine_id": machine_id,
                        "log": f"INFO System check completed on {machine_id}",
                        "timestamp": datetime.now().isoformat()
                    }
                    
                    # Send log to server
                    await websocket.send(json.dumps(log_message))
                    
                    # Wait for a short interval
                    await asyncio.sleep(5)
                    
        except websockets.exceptions.ConnectionClosed:
            print("Connection lost. Reconnecting...")
            await asyncio.sleep(5)
        except Exception as e:
            print(f"Error: {e}")
            await asyncio.sleep(5)

def main():
    if len(sys.argv) != 3:
        print("Usage: python log_forwarder.py <machine_id> <server_url>")
        print("Example: python log_forwarder.py machine-1 ws://localhost:8000/ws/logs")
        sys.exit(1)

    machine_id = sys.argv[1]
    server_url = sys.argv[2]

    print(f"Starting log forwarder for {machine_id}")
    print(f"Connecting to server at {server_url}")

    asyncio.run(forward_logs(machine_id, server_url))

if __name__ == "__main__":
    main()
