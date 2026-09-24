# How to install and prepare the environment

**WARNING:** My computer is CachyOS (Arch) and has little RAM. I was unable to validate the commands in windows practical tests, and their uses may be incorrect. Consult the application documentation in case of errors.

If you encounter errors or bugs during installation, please search for tutorials on the web on how to resolve them.

## Requirements

- Python v3.14 (Other versions have not been tested)
- MariaDB server
- Git (Used only to install the repo; you can install directly from GitHub if you want)
- Web browser

## Preparing the environment

### Linux

#### Arch

``` bash
# Install Git if you don't have it:
sudo pacman -S git mariadb

# Install Python with paru:
paru -S python314

# Install with yay:
yay -S python314

# Copy the repo:
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Install the MariaDB server if you don't have it:
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl start mariadb

# Prepare the database
# The command will ask for a password, enter the password you use or nothing if you don't have one
mariadb -u root -p"your_database_password_here" < ./mysql/database.sql
mariadb -u root -p"your_database_password_here" < ./mysql/insert_data.sql

# Install python
python3.14 -m venv .venv

# If using fish as a terminal:
source ./.venv/bin/activate.fish

# Otherwise:
source ./.venv/bin/activate

pip install .

```

#### Ubuntu / derivatives

``` bash
sudo apt update
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install mariadb-server mariadb-client python3.14 python3.14-venv git -y
sudo systemctl start mariadb

git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

mariadb -u root -p"your_database_password_here" < ./mysql/database.sql
mariadb -u root -p"your_database_password_here" < ./mysql/insert_data.sql

python3.14 -m venv .venv
source ./.venv/bin/activate
pip install .
```

### Windows

Open a new PowerShell terminal and type the commands:

``` PowerShell
# Install MariaDB 
winget install --id MariaDB.MariaDB -e --source winget

# Install Python 3.14
winget install --id Python.Python.3.14 -e --source winget

# Install Git
winget install --id Git.Git -e --source winget

# Install the repository
git clone https://github.com/GF-Silva/RitualIa.git
cd RitualIa

# Prepare the .venv file with Python
py -3.14 -m venv .venv

# Necessary to prevent script execution errors
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned .\.venv\Scripts\Activate.ps1` `pip install .

```

From here I can't guide you a lot through the database installation; I've never been able to use MySQL correctly on Windows. The following commands are based on research:

- Open the MariaDB CLI client from the application search and run the following commands:

**Important:** In the MariaDB CLI, paths use forward slashes (/), make sure your path is formatted as: path/funny/foo

``` sql
source path_to_ritual_folder/mysql/database.sql
-- Example: C:/Users/Me/mysql/database.sql
source path_to_ritual_folder/mysql/insert_data.sql

```

Alternatively, you can use an SQL editor to execute the commands.