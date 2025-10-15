#!/bin/bash

USER='dm77338'
HOST='dm77338.domenomania.eu'
REMOTE_DIR='/home/dm77338/demo.szwagrzak.pl/'
PORT=22

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami

echo "Starting file transfer..."
rsync -avzh -e "ssh -p $PORT" --delete --stats --progress dist/browser/ $USER@$HOST:$REMOTE_DIR

if [ $? -eq 0 ]; then
    echo "✓ Upload successful!"
    echo "Copying .env file..."
    ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env-angular-base $REMOTE_DIR/.env"
    
    if [ $? -eq 0 ]; then
        echo "✓ Deployment completed successfully!"
    else
        echo "✗ Error copying .env file"
        exit 1
    fi
else
    echo "✗ Upload failed!"
    exit 1
fi