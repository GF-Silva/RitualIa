@echo off
:: Ativa o ambiente virtual (precisa do call no Windows)
call "C:\Users\Aluno\Ritualia\backend\.venv\Scripts\activate.bat"

:: Executa o servidor FastAPI
fastapi dev "C:\Users\Aluno\Ritualia\backend\main.py"

pause
