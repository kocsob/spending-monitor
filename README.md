# spending-monitor
SpendingMonitor NodeJS homework at Budapest University of Technology and Economics

# Using with Docker

## Build

    cd spending-monitor
    docker build -t spending-monitor .

## Run
    
     docker run -d -p 3000:3000 -v /path/to/db:/spending-monitor/db spending-monitor

# Using without Docker

## Install

    apt-get update
    apt-get install nodejs
    
    cd spending-monitor
    npm install

## Run
    
    node app.js
