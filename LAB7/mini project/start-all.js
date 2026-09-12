const { spawn, execSync } = require('child_process');
const path = require('path');

// Helper to kill any stale process listening on a port (Windows / Unix)
function ensurePortFree(port) {
  try {
    if (process.platform === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const lines = output.split('\n');
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`) && parts[3] === 'LISTENING') {
          const pid = parts[4];
          if (pid && pid !== '0' && pid !== String(process.pid)) {
            try {
              execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
            } catch {}
          }
        }
      }
    }
  } catch {
    // Port is free, ignore
  }
}

console.log('==============================================');
console.log('CartNest Full Stack Application');
console.log(' - Backend API:  http://localhost:5000');
console.log(' - Frontend App: http://localhost:5173');
console.log('==============================================\n');

// Clean up stale listeners if any
ensurePortFree(5000);
ensurePortFree(5173);

// 1. Start Server
const serverProcess = spawn('npm run dev', {
  cwd: path.join(__dirname, 'server'),
  shell: true,
  stdio: 'inherit'
});

// 2. Start Client
const clientProcess = spawn('npm run dev', {
  cwd: path.join(__dirname, 'client'),
  shell: true,
  stdio: 'inherit'
});

function killProcessTree(proc) {
  if (!proc || !proc.pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /F /T /PID ${proc.pid}`, { stdio: 'ignore' });
    } else {
      proc.kill('SIGTERM');
    }
  } catch {}
}

function cleanup() {
  console.log('\nStopping CartNest services...');
  killProcessTree(serverProcess);
  killProcessTree(clientProcess);
  ensurePortFree(5000);
  ensurePortFree(5173);
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', () => {
  killProcessTree(serverProcess);
  killProcessTree(clientProcess);
});
