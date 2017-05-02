sudo service dnsmasq stop
sudo apt-get update
sudo apt-get install git
git clone https://github.com/robvdv/locus.git
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
npm install serialport
sudo apt-get install couchdb
nano /etc/couchdb/local.ini
edit:
[httpd]
port = 5984
bind_address = 0.0.0.0
sudo service couchdb restart
or
sudo /etc/init.d/couchdb restart
cd locus/node
npm install


[httpd]
port = 5984
bind_address = 0.0.0.0
; Options for the MochiWeb HTTP server.
;server_options = [{backlog, 128}, {acceptor_pool_size, 16}]
; For more socket options, consult Erlang's module 'inet' man page.
;socket_options = [{recbuf, 262144}, {sndbuf, 262144}, {nodelay, true}]
enable_cors = true

[cors]
origins = *

sudo crontab -e
nano /etc/rc.local
/etc/init.d/cron start
* * * * * su pi -c "/home/pi/locus/restartlocus.sh >> /home/pi/cronlocus.log"

Full installation instructions
Raspbian Jessie (don't forget the ssh in the boot folder)
SSH into pi  pi/raspberry
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
sudo apt-get install git
git clone https://github.com/robvdv/locus.git
cd locus/node
sudo npm install   ?? sudo?
sudo apt-get install couchdb
sudo nano /etc/couchdb/local.ini

[httpd]
port = 5984
bind_address = 0.0.0.0
enable_cors = true

[cors]
origins = *

Copy ssl files to:
/home/pi/locus/node/ssl/

cd /home/pi/locus/node/
npm install serialport

cd /etc/init.d
copy start_locus.sh to this location
chmod +755 ./start_locus.sh

Honeypot
sudo apt-get install hostapd

sudo nano /etc/hostapd/hostapd.conf

interface=wlan0
driver=nl80211
ssid=locus
channel=7

sudo nano /etc/init.d/hostapd

DAMEON_CONF=/etc/hostapd/hostapd.conf

sudo apt-get install dnsmasq

sudo nano /etc/dnsmasq.conf

address=/#/10.0.0.1
interface=wlan0
dhcp-range=10.0.0.10,10.0.0.250,12h
no-resolv

sudo nano /etc/network/interfaces

auto lo
iface lo inet loopback

iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet static
address 10.0.0.1
netmask 255.255.255.0
broadcast 255.0.0.0


[cors]
origins = *

sudo crontab -e
* * * * * su pi -c "/home/pi/locus/restartlocus.sh >> /home/pi/cronlocus.log"

sudo nano /etc/rc.local
/etc/init.d/cron start

// allow node to bind to priv port
sudo sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/nodejs


Administering Couchdb
http://192.168.1.6:5984/_utils/database.html?playa



