#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

console.log('Starting Shared Expense Splitter Development Environment');
console.log('');

// Helper functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, { 
            shell: true, 
            cwd,
            stdio: 'inherit'
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
    });
}

function openBrowser(url) {
    const command = isWindows ? `start ${url}` : 
                   isMac ? `open ${url}` : 
                   `xdg-open ${url}`;
    exec(command);
}

function startInNewTerminal(command, title, cwd) {
    if (isWindows) {
        spawn('cmd', ['/k', `cd /d ${cwd} && ${command}`], {
            detached: true,
            stdio: 'ignore'
        });
    } else if (isMac) {
        exec(`osascript -e 'tell app "Terminal" to do script "cd ${cwd} && ${command}"'`);
    } else {
        // Linux
        exec(`gnome-terminal --title="${title}" --working-directory="${cwd}" -- bash -c "${command}; exec bash"`);
    }
}

async function main() {
    try {
        console.log('Checking environment...');
        const serverPath = path.join(process.cwd(), 'server');
        const envPath = path.join(serverPath, '.env');
        
        if (!fs.existsSync(envPath)) {
            console.error('ERROR: .env file not found! Please create one based on .env.example');
            console.error('NOTE: Copy .env.example to .env and update with your values');
            process.exit(1);
        }
        console.log('Environment file found');

        console.log('Step 1: Installing dependencies...');
        console.log('Installing server dependencies...');
        await runCommand('npm install', serverPath);
        
        console.log('Installing client dependencies...');
        const clientPath = path.join(process.cwd(), 'client');
        await runCommand('npm install', clientPath);

        console.log('');
        console.log('Step 2: Starting the backend server with auto-restart...');
        startInNewTerminal('node start.js', 'Expense Splitter Server (Auto-Restart)', serverPath);

        console.log('');
        console.log('Waiting 5 seconds for server to establish connection...');
        await sleep(5000);

        console.log('');
        console.log('Step 3: Testing environment setup...');
        await runCommand('node test-setup.js', serverPath);
        
        console.log('');
        console.log('Step 4: Testing API endpoints...');
        await runCommand('node test-api.js', serverPath);

        console.log('');
        console.log('Step 5: Starting the frontend...');
        startInNewTerminal('npm run dev', 'Expense Splitter Client', clientPath);

        console.log('');
        console.log('Step 6: Opening browser windows...');
        await sleep(2000);
        openBrowser('http://localhost:3000');
        openBrowser('http://localhost:5173');

        console.log('');
        console.log('Development environment is ready!');
        console.log('');
        console.log('Server: http://localhost:3000 (Auto-Restart Enabled)');
        console.log('Client: http://localhost:5173');
        console.log('API Tests: Available in server directory');
        console.log('');
        console.log('The server will automatically restart if database connection fails.');
        
    } catch (error) {
        console.error('ERROR:', error.message);
        process.exit(1);
    }
}

main();
