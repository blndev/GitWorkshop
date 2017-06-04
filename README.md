# GitWorkshop
Sample Repository to explain how to work with Git.

There is s continuous integration implemented, which publishes the master branch to http://gitworkshopnodeservice.azurewebsites.net/
You can check the deployed version by using the following call:  http://gitworkshopnodeservice.azurewebsites.net/version

## Feature requests

A list of features for different branches which can be implemented as example of Versioning, documentation Maintenance etc.

### Feature - Simple Web client

"/" will not longer return a static text. It will return instead the files located in html directory.

* source has to be changed
* minor version change
* technical documentation has to be changed
* new client documentation
* release notes

### Feature - Introduce API Versioning

Results in App Version 2.0 because the service will not longer be compatible with existing clients.
API Path will be changed from /messages to /api/1/messages

* apipath variable changing
* major version update
* documentation change

# Technical Hints

## Supported Calls

* GET http://localhost:8080/
* GET http://localhost:8080/version


* GET http://localhost:8080/messges/
* POST http://localhost:8080/messges/
* DELETE http://localhost:8080/messges/all


Sample Data to send.
````json
{
"title": "Maintenance Window",
"body": "The System will shut down on Thursday, 11.03 10pm - 11pm to install a new Version for Application A",
"sender": "John Doe"
}
````
