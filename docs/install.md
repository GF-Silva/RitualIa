# Como instalar e preparar o ambiente

**Notice:** This guide was written in portuguese and just portuguese, if u speak another language, please use the translator build-in your browser, appreciate.

**AVISO**: Meu computador é o CachyOS (Arch) e tem pouca RAM, não consegui validar os comandos em testes praticos e seus usos podem estar incorretos, consultem a documentação das aplicações caso de erro.
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
sudo pacman -S git mariadb

# Instalar o python com paru:
paru -S python314

# Instalar com yay
yay -S python314

# Copie o repo
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Instale o servidor mariadb se não tiver
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb

# Prepare o database
# O comando pedirá senha, insíra a senha que você usar ou nada se não tiver uma
mariadb -u root -p"sua_database_senha_aqui" < ./mysql/database.sql
mariadb -u root -p"sua_database_senha_aqui" < ./mysql/insert_data.sql

# Instale o python
python3.14 -m venv .venv

# Se usar fish como terminal:
source ./.venv/bin/activate.fish

# Caso contrario:
source ./.venv/bin/activate

pip install .
```

#### Ubuntu / derivados

``` bash
sudo apt update
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install mariadb-server mariadb-client python3.14 python3.14-venv git -y
sudo systemctl start mariadb

git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

mariadb -u root -p"sua_database_senha_aqui" < ./mysql/database.sql
mariadb -u root -p"sua_database_senha_aqui" < ./mysql/insert_data.sql

python3.14 -m venv .venv
source ./.venv/bin/activate
pip install .
```

### Windows

Abra um novo terminal powershell e digite os comandos:

``` powershell
# Instala o mariaDB
winget install --id MariaDB.MariaDB -e --source winget

# Instala o python 3.14
winget install --id Python.Python.3.14 -e --source winget

# Instale o git
winget install --id Git.Git -e --source winget

# Instale o repo
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Prepare o .venv python
py -3.14 -m venv .venv

# Necessario para impedir erros de execução de scripts

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
.\.venv\Scripts\Activate.ps1
pip install .
```

A partir daqui não consigo orientar a instalação do database, nunca consegui usar o mysql corretamente no windows, os comandos a seguir são baseados em pesquisas:

- Abra o cliente CLI mariadb na pesquisa de aplicativos e execute os seguintes comandos:

**Importante:* No CLI mariadb, os caminhos utilizam barras normais (/), certifique-se que seu caminho esteja formatado como: caminho/divertido/foo

``` sql
source caminho_para_pasta_ritualia/mysql/database.sql
-- Exemplo: C:/Usuarios/Eu/mysql/database.sql
source caminho_para_pasta_ritualia/mysql/insert_data.sql
```

Alternativamente você pode usar algum editor SQL para executar os comandos
