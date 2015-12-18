This is an application being developed for use by RWTH Aachen University, and the University of Waterloo. 

The developer is Sarah Pearce, co-advised by Igor Ivkovic(uWaterloo) and Thorsten Sommer(RWTH Aachen).
A MongoDB server (https://www.mongodb.org/) and the latest version of Ocean (https://github.com/SommerEngineering/Ocean) as framework.

(retrieved/edited from Ocean's Example003):
After everything is set up, you must compile the entire folder by opening hte Learn2Gather repository in your file directory, and running
go install
on your command promopt. This will compile the application and place the executable in a bin folder.
After everything is fine, you are able to start your server by executing the executable. 
You will see the console logging and your handlers are available.
You can access the admin's interface by http://127.0.0.1:60000/. The public handlers are bind to your current IP address.
In order to run the Learn2Gather application, you have to upload the HTML templates. 
You must then create an archive `templates.zip` where you store all of the application's HTML templates, and upload it through the admin interface.
Afterwards, use the admin's interface of the running server (http://127.0.0.1:60000/) to upload "templates.zip"" into the distributed grid file system of the database. 
Finally, you have to restart the server to load the template. Then, you are able to access the Learn2Gather application on the public web server.
