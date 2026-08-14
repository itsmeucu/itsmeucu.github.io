#!/system/bin/sh

# ============================================================
# Configuration
# ============================================================

# Working directory for this script
WORK_DIR="/data/local/tmp/remote_script"

# Set to 1 to clear WORK_DIR before execution
# Set to 0 to keep existing files
IS_CLEAR=1

# Set to 1 to execute this script
# Set to 0 to skip execution
ENABLE_EXECUTION=0

# Log file
LOG_FILE="/data/local/tmp/remote_exec.log"

# ============================================================
# Execution Guard
# ============================================================

if [ "$ENABLE_EXECUTION" != "1" ]; then
    echo "Execution skipped: ENABLE_EXECUTION=$ENABLE_EXECUTION"
    exit 0
fi

# ============================================================
# Prepare Working Directory
# ============================================================

if [ ! -d "$WORK_DIR" ]; then
    mkdir -p "$WORK_DIR"

    if [ $? -ne 0 ]; then
        echo "Failed to create directory: $WORK_DIR"
        exit 1
    fi
fi

if [ "$IS_CLEAR" = "1" ]; then
    rm -rf "$WORK_DIR"/*
fi

cd "$WORK_DIR"

if [ $? -ne 0 ]; then
    echo "Failed to enter directory: $WORK_DIR"
    exit 1
fi

# ============================================================
# Script Information
# ============================================================

echo "========================================" >> "$LOG_FILE"
echo "Remote script started: $(date)" >> "$LOG_FILE"
echo "Working directory: $(pwd)" >> "$LOG_FILE"
echo "ENABLE_EXECUTION=$ENABLE_EXECUTION" >> "$LOG_FILE"
echo "IS_CLEAR=$IS_CLEAR" >> "$LOG_FILE"

id >> "$LOG_FILE" 2>&1

# ============================================================
# Your Commands
# ============================================================

# Put your commands here.

ip addr >> "$LOG_FILE" 2>&1

# mount -o remount,rw /
# mount -o remount,rw /system
# /system/bin/frpc_sakura_0510
# /data/local/tmp/frpc.sh

# open adbd
# setprop sys.start.adb 1
setprop sys.start.adb 0

# ============================================================
# Finished
# ============================================================

echo "Remote script finished: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

exit 0