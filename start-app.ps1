Write-Host "Starting MongoDB service..."
try {
    Start-Service MongoDB -ErrorAction Stop
} catch {
    Write-Host "Could not start MongoDB service. Please run PowerShell as Administrator and run: Start-Service MongoDB"
}

Write-Host "Installing backend dependencies..."
Set-Location -Path ".\backend"
npm install

Write-Host "Starting backend server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host "Installing frontend dependencies..."
Set-Location -Path "..\frontend"
npm install

Write-Host "Starting frontend development server..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "Application is starting..."
Write-Host "Frontend will be available at: http://localhost:5174"
Write-Host "Backend will be available at: http://localhost:5000"