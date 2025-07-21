# Development Environment Setup

This project supports multiple ways to start the development environment for different operating systems.

## Quick Start Options

### Option 1: Windows (.bat file)
```bash
start-dev.bat
```

### Option 2: macOS/Linux (shell script)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 3: Cross-Platform (Node.js script)
```bash
node start-dev.js
```

## What Each Script Does

All scripts perform the same operations:

1. **Environment Check** - Verifies `.env` file exists in server directory
2. **Dependencies** - Installs npm packages for both server and client
3. **Server Start** - Launches backend with auto-restart in new terminal
4. **Testing** - Runs environment and API tests
5. **Client Start** - Launches frontend in new terminal
6. **Browser** - Opens localhost URLs automatically

## Requirements

- Node.js installed
- npm installed
- `.env` file in server directory (copy from `.env.example`)

## Ports

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## For Team Members

- **Windows users**: Use `start-dev.bat`
- **macOS users**: Use `start-dev.sh` or `node start-dev.js`
- **Linux users**: Use `start-dev.sh` or `node start-dev.js`
- **Any platform**: Use `node start-dev.js` (works everywhere)

## Troubleshooting

If scripts don't work:
1. Ensure you have Node.js and npm installed
2. Check that `.env` file exists in server directory
3. Run `npm install` manually in both server and client directories
4. For macOS: You may need to give Terminal permission to control other applications
