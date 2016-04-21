#Learn2Gather
This is an application being developed for use by RWTH Aachen University, and the University of Waterloo. 

The developer is Sarah Pearce, co-advised by Igor Ivkovic(uWaterloo) and Thorsten Sommer(RWTH Aachen) as a design project/undergraduate thesis at the University of Waterloo.

##Environment Requirements

To run this application on your computer, you need to have the latest version of NodeJS installed. You can download it [here](https://nodejs.org/en/download/). Remember where you have placed the file, because you will have to add Learn2Gather in that folder as well!

You will also need to have MongoDB on your computer, which you can download [here](https://www.mongodb.org/). The latest version will work.

## Moving Learn2Gather into NodeJS

You will have to download the file from this GitHub to a folder inside the NodeJS folder you just installed. Then, you must downaload the dependencies in the server. To do this, you have to open up the command prompt and change the directory (using the cd command) to the NodeJS folder. Then, change directories into the folder you downloaded the GitHub file to, and type the following command lines:
> npm install express monk jwt cookies morgan

This command is just listing the external resources that this application uses. If you find that you recieve errors, try typing in the installed modules one at a time (ie, npm install express, then npm install cookies) until all the modules listen are installed.

## Preparing the Database

Now, open a second command prompt (Do not close the other command prompt, you will need two open at once!) and enter the directory that you installed MongoDB in. In the directory, change to the bin directory and execute the following command:
.../bin/>mongod --dbpath (the path to Learn2Gather within your NodeJS directory)\data\

This creates a MongoDB connection to the \data\ folder in Learn2Gather. If you don't have this open, the application will not be able to access any data about study groups or users. Now, move back to the other command prompt, and type in the command:
>npm start

You should recieve a little bit of feedback in the command line (you can ignore it unless the screen is filled with errors). The application is set to run in localhost:3000/. Go to that address in your web browser of choice (I used Google Chrom), and enjoy!

