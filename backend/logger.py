
import os
import asyncio

# Use your preferred log file path here
LOG_FILE_PATH = "/var/log/syslog"
SEVERITIES = ["ERROR", "WARNING", "CRITICAL"]

def get_filtered_logs():
    filtered_logs = []
    try:
        with open(LOG_FILE_PATH, "r") as file:
            for line in file:
                if any(sev in line.upper() for sev in SEVERITIES):
                    filtered_logs.append(line.strip())
        return filtered_logs[-100:]  # Return latest 100 logs
    except PermissionError:
        return ["Permission denied - cannot read log file"]
    except Exception as e:
        print(f"Error reading log file: {e}")
        return []

async def tail_log_file():
    with open(LOG_FILE_PATH, "r") as file:
        file.seek(0, os.SEEK_END)  # Go to the end of the file
        while True:
            line = file.readline()
            if not line:
                await asyncio.sleep(0.5)
                continue
            if any(sev in line.upper() for sev in SEVERITIES):
                yield line.strip()
