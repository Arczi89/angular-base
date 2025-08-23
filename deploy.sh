#!/bin/bash

USER='dm77338'
HOST='dm77338.domenomania.eu'
REMOTE_DIR='/home/dm77338/demo.szwagrzak.pl/mybase/'
PORT=22

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami

# Bezpieczne użycie --delete w dedykowanym folderze mybase
rsync -az -e "ssh -p $PORT" --delete dist/mybase/ $USER@$HOST:$REMOTE_DIR

# Kopiuj .env-angular-base do .env w folderze aplikacji
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env-angular-base $REMOTE_DIR/.env"