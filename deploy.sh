#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/mybase/'
PORT=6022

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami

# Bezpieczne użycie --delete w dedykowanym folderze mybase
rsync -az -e "ssh -p $PORT" --delete dist/mybase/ $USER@$HOST:$REMOTE_DIR

# Kopiuj .env-angular-base do .env w folderze aplikacji
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env-angular-base $REMOTE_DIR/.env"