#!/bin/bash

docker rm --force naverland
docker run --name naverland -p 8000:8000 --init --cap-add=SYS_ADMIN --rm ghcr.io/phillipleblanc/naverlandrobot:latest
