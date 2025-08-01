#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/mybase/'
PORT=6022

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami

# Bezpieczne użycie --delete w dedykowanym folderze mybase
rsync -az -e "ssh -p $PORT" --delete dist/mybase/ $USER@$HOST:$REMOTE_DIR

# Kopiuj .env tylko jeśli istnieje
ssh -p $PORT $USER@$HOST "if [ -f $REMOTE_DIR/../.env ]; then cp $REMOTE_DIR/../.env $REMOTE_DIR; fi"