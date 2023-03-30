# DaViToMo
The project's objective is to provide a web-based tool that can evaluate, study, and display a Topic Model that has been trained on a dataset like Wikipedia.

Instructions to run:
First, cd into the client directory and run this command: npm install
Second, cd into the server directory and run: npm install

Now, cd into the server directory and run: npm start. This will start the server, and you will see what port the server is running on. If you want to see if it worked, in a browser, go to "localhost:5000/api" and {message: "Hello from server"} should be on the screen.

Next, do the same with the client directory. This will bring up the react app in the browser automatically. To get to the initial article selection page, hit "Get Started." In order to run the script, you must first set up your local environment in a .env file in the root directory. This is where you put DB_URI:<your credentials>.
  Then you can put any article in, and it will run the python scripts for you. The output of the topic model will be shown in the black box on the screen, still unformatted.
  
