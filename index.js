var http = require("http");

//create a server object:
http
  .createServer(function (req, res) {
    res.write("Hello from CodeSandbox!"); //write a response to the client
    console.log("this is a test code");
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080