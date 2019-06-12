@ECHO OFF
ECHO BUILD CLIENT APP TO DOCKER IMAGE
E:
CD E:\ClientApp
CALL docker build --rm -t clientapp:latest .
ECHO DEPLOY IMAGE TO NGINX DOCKER CONTAINER
CALL docker rm clientprod --force
CALL docker run --rm -d -p 90:80/tcp --name clientprod clientapp:latest
ECHO CODE WAS DEPLOYED
PAUSE
