#!/bin/bash

curl -XPOST -H "Content-type: application/json" -d '{
"title": "Services Running",
"body": "The System is up and running in Version 1",
"sender": "John Doe"
}' 'http://localhost:8080/messages' | python -m json.tool


curl -XPOST -H "Content-type: application/json" -d '{
"title": "Maintenance Window",
"body": "The System will shut down on Thursday, 11.03 10pm - 11pm to install hotfixes for Appliaction",
"sender": "John Doe"
}' 'http://localhost:8080/messages' | python -m json.tool


curl -XPOST -H "Content-type: application/json" -d '{
"title": "Maintenance Window",
"body": "The System will shut down on Saturday, 17.05 10pm - 11pm to install hotfixes for Appliaction",
"sender": "John Doe"
}' 'http://localhost:8080/messages' | python -m json.tool
