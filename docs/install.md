# Como instalar e preparar o ambiente

Caso encontre erros ou bugs durante a instalação, peço que busque tutoriais na web sobre como resolver.

## Requisitos

- Python v3.14 (Outras versões não foram testadas)
- Servidor mariadb
- git (Usado apenas para instalar o repo, pode instalar diretamente do github caso queira)
- Navegador Web

## Preparando o ambiente

### Linux

#### Arch

``` bash
# Instale o git se não tiver
sudo pacman -S git

# Copie o repo
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Instale o servidor mariadb se não tiver
sudo pacman -S mariadb

# Prepare o database
# O comando pedirá senha, insíra a senha que você usar ou nada se não tiver uma
mariadb -u root -p < ./mysql/database.sql
mariadb -u root -p < .mysql/insert_data.sql

# Instale o python
sudo pacman -S python
python -m venv .venv
source ./.venv/bin/activate.fish
pip install .
```

#### Ubuntu / derivados

``` bash
sudo apt update
sudo apt install mariadb
mariadb -u root -p < ./mysql/database.sql
mariadb -u root -p < .mysql/insert_data.sql
sudo apt install python
python -m venv .venv
source ./.venv/bin/activate.fish
pip install .
```

### Windows

- Instale o python 3.14 em <https://www.python.org/downloads/>
- Instale o servidor mariadb em: <https://mariadb.org/download/?t=mariadb&p=mariadb&os=windows>

Abra um novo terminal powershell e digite os comandos:

``` powershell
# Instale o git
winget install --id Git.Git -e --source winget

# Instale o repo
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Prepare o .venv python
python -m venv .venv

# Necessario para impedir erros de execução de scripts

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\.venv\Scripts\Activate.ps1
pip install .
```
