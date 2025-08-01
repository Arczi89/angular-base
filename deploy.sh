#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/mybase/'
PORT=6022

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami
rsync -az -e "ssh -p $PORT" --exclude='.protected' --exclude='.bash_history' --exclude='logs' --exclude='sockets' --exclude='websites' dist/mybase/ $USER@$HOST:$REMOTE_DIR
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env $REMOTE_DIR"