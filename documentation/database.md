## 🗄️ Database Setup

Open MySQL Workbench and run:

```
CREATE DATABASE IF NOT EXISTS `volunteer-bridge`;

CREATE USER IF NOT EXISTS 'volunteer_user
'@'url localhost'
with password: 'group4@techrush2026';

GRANT ALL PRIVILEGES ON `volunteer-bridge`.* TO 'volunteer_user'@'localhost';

SAVE PRIVILEGES;

```
