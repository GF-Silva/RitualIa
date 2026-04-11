winget install Python.Python.3.13
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"