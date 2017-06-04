#!/bin/bash

curl -H "Content-type: application/json" 'http://localhost:8080/messages' | python -m json.tool
