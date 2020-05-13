# SENSO Trail App

## Develop & Build

### Prerequisites

You need to have node, npm installed

### Getting Started

To get Started with developing clone the repository, install the dependencies and you are ready to go.


#### Install Dependencies
Go to the project folder and install the dependencies

´´´
npm i
´´´

#### Local Dev Server
To start the local development server go to the project folder and execute
```
npm start
```
The App is serve on http://localhost:3000/ 

#### Run Tests locally
To run the tests on your local machine go to the project folder and execute
```
npm run test
```

#### Build the project
To build the Project go to the project folder and execute
```
npm run build
```
A Production Version is build into the folder "build/"

## Trail Ink files
The Ink file describes the dialog structure of the trail. 

[Ink Website](https://www.inklestudios.com/ink/)

There are some guidelines to ensure compatibility with the SENSO Trail App:

## Tags

Additional Data beyond the dialog text is provided via Tags.
Tags are defined with a leading hashtag
```
# tag
```
There are two relevant types of tags.
#### Global Tags
Global Tags are not associated with a specific dialog line.
Global tags are in normal ink files defined at the top of the ink file.
In our structure we define all Global tags in the data.ink file and include it at the top of the main ink file. 
It is essential to include no other file before including the data File
#### Local Tags
Lokal Files are associated with a specific dialog line.
They are positioned at the end of the corresponding dialog line.
```
Hello I say some dialog text # tag1 # tag2
```
It is possible to define multiple tags for a corresponding dialog line.
#### Structure
To ensure that the App understands what to do with the additional data provided by the Tag we follow some guidlines. Every type of data has its own structure
All tags first define their type of data (station, audio, image). Followed by an colon and the actual data.
```
# <datatype>:<data>
```
##### Station Tag
The station Tag is defined as a global Tag.
It follows the folowing structur
```
# station:knotname latitude longitude
```
##### Audio Tag
```
# audio:audio-file.mp3
```
##### Image Tag
```
# image:image-file.jpg
```
### Preload data
To tell the App which files to preload every image or audiofile that is associated with a dialog line should be defined as a global tag as well.
