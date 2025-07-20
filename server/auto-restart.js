const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let retryCount = 0;
let serverProcess = null;
let isConnected = false;

console.log('Auto-restart service started...');
console.log('This will keep trying npm start until database connects successfully');
console.log('Press Ctrl+C to stop\n');

function startServer() {
    retryCount++;
    console.log(`[${new Date().toLocaleTimeString()}] Attempt ${retryCount}: Starting server...`);
    
    // Kill existing process if any
    if (serverProcess) {
        serverProcess.kill();
        serverProcess = null;
    }
    
    // Start npm start
    serverProcess = spawn('npm', ['start'], {
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true
    });
    
    let outputBuffer = '';
    
    // Monitor stdout for success messages
    serverProcess.stdout.on('data', (data) => {
        const output = data.toString();
        outputBuffer += output;
        
        // Check for database connection success
        if (output.includes('MongoDB database connection established successfully') || 
            output.includes('Server is running on port')) {
            
            if (!isConnected) {
                isConnected = true;
                console.log(`[${new Date().toLocaleTimeString()}] SUCCESS: Database connected!`);
                console.log(`[${new Date().toLocaleTimeString()}] Server is now running successfully`);
                console.log('Press Ctrl+C to stop the server\n');
                
                // Forward all output to console once connected
                serverProcess.stdout.pipe(process.stdout);
                serverProcess.stderr.pipe(process.stderr);
            }
            return;
        }
        
        // If not connected yet, show minimal output
        if (!isConnected) {
            process.stdout.write('.');
        }
    });
    
    // Monitor stderr for errors
    serverProcess.stderr.on('data', (data) => {
        const error = data.toString();
        
        if (!isConnected) {
            // Check for connection errors
            if (error.includes('MongoServerSelectionError') || 
                error.includes('connection failed') ||
                error.includes('ECONNREFUSED') ||
                error.includes('timeout')) {
                
                console.log(`\n[${new Date().toLocaleTimeString()}] Database connection failed, retrying in 3 seconds...`);
                
                setTimeout(() => {
                    if (!isConnected) {
                        startServer();
                    }
                }, 3000);
                
                return;
            }
        }
        
        // Forward other errors
        if (isConnected) {
            process.stderr.write(error);
        }
    });
    
    // Handle process exit
    serverProcess.on('exit', (code, signal) => {
        if (!isConnected && signal !== 'SIGTERM') {
            console.log(`\n[${new Date().toLocaleTimeString()}] Server exited with code ${code}, restarting in 3 seconds...`);
            setTimeout(() => {
                if (!isConnected) {
                    startServer();
                }
            }, 3000);
        }
    });
    
    // Handle process errors
    serverProcess.on('error', (error) => {
        if (!isConnected) {
            console.log(`\n[${new Date().toLocaleTimeString()}] Process error: ${error.message}, retrying in 3 seconds...`);
            setTimeout(() => {
                if (!isConnected) {
                    startServer();
                }
            }, 3000);
        }
    });
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n\nShutting down auto-restart service...');
    if (serverProcess) {
        serverProcess.kill();
    }
    process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.message);
    if (!isConnected) {
        setTimeout(() => {
            startServer();
        }, 3000);
    }
});

// Start the first attempt
startServer();
