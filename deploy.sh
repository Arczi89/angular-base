#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/mybase/'
PORT=6022

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami
rsync -az -e "ssh -p $PORT" --delete mybase/dist/mybase/browser/ $USER@$HOST:$REMOTE_DIR
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env $REMOTE_DIR"