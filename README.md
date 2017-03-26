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
bind_address = 192.168.1.40
; Options for the MochiWeb HTTP server.
;server_options = [{backlog, 128}, {acceptor_pool_size, 16}]
; For more socket options, consult Erlang's module 'inet' man page.
;socket_options = [{recbuf, 262144}, {sndbuf, 262144}, {nodelay, true}]
enable_cors = true

[cors]
origins = *
