#!/bin/bash

USER='dm77338'
HOST='dm77338.domenomania.eu'
REMOTE_DIR='/home/dm77338/demo.szwagrzak.pl/'
PORT=22

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami

rsync -az -e "ssh -p $PORT" --delete dist/ $USER@$HOST:$REMOTE_DIR

ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env-angular-base $REMOTE_DIR/.env"