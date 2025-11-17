#!/bin/bash
echo "=== Stopping services ==="
systemctl stop asterisk 2>/dev/null
systemctl stop freepbx 2>/dev/null
systemctl stop httpd 2>/dev/null
systemctl stop apache2 2>/dev/null
service asterisk stop 2>/dev/null

echo "=== Killing any remaining Asterisk processes ==="
killall -9 asterisk 2>/dev/null

echo "=== Disabling services ==="
systemctl disable asterisk 2>/dev/null
systemctl disable freepbx 2>/dev/null
update-rc.d -f asterisk remove 2>/dev/null

echo "=== Removing SysV init script ==="
rm -f /etc/init.d/asterisk

echo "=== Removing Asterisk directories ==="
rm -rf /etc/asterisk
rm -rf /var/lib/asterisk
rm -rf /var/log/asterisk
rm -rf /usr/lib/asterisk
rm -rf /usr/sbin/asterisk
rm -rf /usr/src/asterisk*
rm -rf /opt/asterisk

echo "=== Removing FreePBX directories ==="
rm -rf /var/www/html/admin
rm -rf /var/www/html/freepbx
rm -rf /etc/freepbx.conf
rm -rf /etc/amportal.conf

echo "=== Removing Apache FreePBX configs ==="
rm -rf /etc/apache2/sites-available/freepbx.conf
rm -rf /etc/apache2/sites-enabled/freepbx.conf
rm -rf /etc/apache2/conf-available/freepbx.conf
rm -rf /etc/apache2/conf-enabled/freepbx.conf

echo "=== Removing Asterisk user/group ==="
killall -9 asterisk 2>/dev/null
userdel -r asterisk 2>/dev/null
groupdel asterisk 2>/dev/null

echo "=== Removing Databases (asterisk + asteriskcdrdb) ==="
mysql -u root -e "DROP DATABASE IF EXISTS asterisk;"
mysql -u root -e "DROP DATABASE IF EXISTS asteriskcdrdb;"
mysql -u root -e "DROP USER IF EXISTS 'asterisk'@'localhost';"
mysql -u root -e "DROP USER IF EXISTS 'freepbxuser'@'localhost';"

echo "=== Reloading systemd ==="
systemctl daemon-reload

echo "=== Optional: Remove Apache2 (y/n)? ==="
read remove_apache
if [[ "$remove_apache" == "y" ]]; then
    apt remove --purge apache2 -y
    apt autoremove -y
fi

echo "=== Optional: Remove PHP (y/n)? ==="
read remove_php
if [[ "$remove_php" == "y" ]]; then
    apt remove --purge php\* -y
    apt autoremove -y
fi

echo "=== Cleaning up ==="
apt autoremove -y
apt autoclean
apt clean

echo "=== DONE! FreePBX + Asterisk fully removed ==="
