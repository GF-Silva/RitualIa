# ============================================================
#  conectar-bt.ps1
#  Conecta na caixa de som Bluetooth e define como saida padrao
#  Uso: .\conectar-bt.ps1
# ============================================================

# --- CONFIGURE AQUI ---
$NOME_DISPOSITIVO = "DSPlayerTotem431d"   # parte do nome exibido no Windows
# ----------------------

Add-Type -AssemblyName System.Runtime.WindowsRuntime

# Helper para converter tarefas assincronas do WinRT em sincrono
function Await($task) {
    $task.GetAwaiter().GetResult()
}

Write-Host "`n[BT] Procurando dispositivo: '$NOME_DISPOSITIVO'..." -ForegroundColor Cyan

# ----- 1. Localizar o dispositivo pareado -----
$dispositivos = Get-PnpDevice -Class Bluetooth -Status OK |
    Where-Object { $_.FriendlyName -like "*$NOME_DISPOSITIVO*" }

if (-not $dispositivos) {
    Write-Host "[ERRO] Nenhum dispositivo encontrado com o nome '$NOME_DISPOSITIVO'." -ForegroundColor Red
    Write-Host "       Verifique se a caixa esta pareada em: Configuracoes > Bluetooth e dispositivos"
    exit 1
}

$dispositivo = $dispositivos | Select-Object -First 1
Write-Host "[OK] Dispositivo encontrado: $($dispositivo.FriendlyName)" -ForegroundColor Green

# ----- 2. Conectar via COM API do Windows -----
Write-Host "[BT] Tentando conectar..." -ForegroundColor Cyan

try {
    # Usa o Windows.Devices.Bluetooth API
    $btAssembly  = [Windows.Devices.Bluetooth.BluetoothDevice,Windows.Devices.Bluetooth,ContentType=WindowsRuntime]
    $deviceId    = $dispositivo.DeviceId

    # Reconectar: desabilita e reabilita o dispositivo (forca reconexao A2DP)
    Disable-PnpDevice -InstanceId $deviceId -Confirm:$false -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Enable-PnpDevice  -InstanceId $deviceId -Confirm:$false

    Write-Host "[OK] Comando de conexao enviado." -ForegroundColor Green
} catch {
    Write-Host "[AVISO] Nao foi possivel reconectar automaticamente: $_" -ForegroundColor Yellow
    Write-Host "        Tente conectar manualmente e rode o script novamente para definir o audio."
}

# ----- 3. Aguardar o dispositivo aparecer como saida de audio -----
Write-Host "[AUDIO] Aguardando caixa aparecer como saida de audio..." -ForegroundColor Cyan

$audioDevice = $null
$tentativas  = 0
$maxTentativas = 15

while (-not $audioDevice -and $tentativas -lt $maxTentativas) {
    Start-Sleep -Seconds 2
    $tentativas++

    # Busca nos dispositivos de audio de reproducao
    $audioDevice = Get-PnpDevice -Class AudioEndpoint -Status OK |
        Where-Object { $_.FriendlyName -like "*$NOME_DISPOSITIVO*" }

    Write-Host "   Tentativa $tentativas/$maxTentativas..." -ForegroundColor Gray
}

if (-not $audioDevice) {
    Write-Host "[ERRO] Caixa nao apareceu como saida de audio em $maxTentativas tentativas." -ForegroundColor Red
    Write-Host "       Verifique se ela esta ligada e proxima."
    exit 1
}

Write-Host "[OK] Saida de audio encontrada: $($audioDevice.FriendlyName)" -ForegroundColor Green

# ----- 4. Definir como saida de audio padrao via PowerShell + nircmd -----
# Verifica se o nircmd esta disponivel (ferramenta gratuita da NirSoft)
$nircmd = "$PSScriptRoot\nircmd.exe"

if (Test-Path $nircmd) {
    Write-Host "[AUDIO] Definindo como saida padrao via nircmd..." -ForegroundColor Cyan
    & $nircmd setdefaultsounddevice $NOME_DISPOSITIVO
    Write-Host "[OK] Saida de audio padrao definida!" -ForegroundColor Green
} else {
    # Fallback: abre as configuracoes de som para o usuario definir manualmente
    Write-Host "[AVISO] nircmd.exe nao encontrado na pasta do script." -ForegroundColor Yellow
    Write-Host "        Abrindo configuracoes de som... selecione a caixa manualmente."
    Start-Process "ms-settings:sound"
}

Write-Host "`n[PRONTO] Processo concluido.`n" -ForegroundColor Green
