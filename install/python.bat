powershell -Command winget install -e --id Python.Python.3.13
pip install uv
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"