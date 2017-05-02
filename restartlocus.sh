#!/bin/sh

ps cax | grep node > /dev/null
if [ $? -eq 0 ]; then
echo “Locus is running.”
else
echo “Locus is down. Restarting...”
nohup node /home/pi/locus/node/app.js > /home/pi/locus.log &
fi
