# DaViToMo
The project's objective is to provide a web-based tool that can evaluate, study, and display a Topic Model that has been trained on a dataset like Wikipedia.

Instructions to run:
First, cd into the client directory and run this command: npm install
Second, cd into the database directory and run: npm install

Now, to run the python script in a local server, cd into the server directory, change line 26 to say: const python = spawn('python', ['download.py']);
  This will run the 'download.py' script to download the articles. It may take a while.
  Once the terminal says: "child process close all stdio with code 1", go to the browser and go to "http://localhost:3001/api"
  There you will see the output of the 'download.py' script.
 
Next, change line 26 to say: const python = spawn('python', ['topic.py']);
  This will run 'topic.py' which is the actual topic model. This will take a while as well.
  Once the terminal says: "child process close all stdio with code 0", reload the page in the browser.
  There you will see the output of the 'topic.py' script.
  
Now, to run the unfinished react app, cd into the client directory, and run the command: npm start.
  the browser should automatically open to the default react app website.
  
The database directory is not finished, but that will be where we store the articles instead of the /data directory. 
  This will make our program a little faster.
  
  
Some questions we should ask ourselves:
  How can we make this faster?
