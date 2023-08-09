var http = require("http");

//create a server object:
http
  .createServer(function (req, res) {
    const hostLocation = req?.headers?.host;

    // https://frontendguruji.com/blog/how-to-parse-post-request-in-node-js-without-expressjs-body-parser/
    let chunks = [];
    // 'data' event is emitted on every chunk received
    req.on("data", (chunk) => {
      // collecting the chunks in array
      chunks.push(chunk);
    });

    // when all chunks are received, 'end' event is emitted.
    req.on("end", () => {
      // joining all the chunks received
      const data = Buffer.concat(chunks);
      // data.toString() converts Buffer data to querystring format
      const querystring = data.toString();
      // URLSearchParams: takes querystring
      // & returns a URLSearchParams object instance.
      const parsedData = new URLSearchParams(querystring);
      const dataObj = {};
      // entries() method returns an iterator
      // allowing iteration through all key/value pairs
      for (var pair of parsedData.entries()) {
        dataObj[pair[0]] = pair[1];
      }
      // Now request data is accessible using dataObj

      // console.log(JSON.stringify(dataObj));
      if (dataObj.log) {
        console.log("  LOG: " + dataObj.log);
      } else if (dataObj.warn) {
        console.warn(" WARN: " + dataObj.warn);
      } else if (dataObj.error) {
        console.error("ERROR: " + dataObj.error);
      }

      res.write("You log is displayed @ " + hostLocation); //write a response to the client
      res.end(); //end the response

      // console.log(">>>>> all set");

      res.end();
    });

    // res.write("Hello from CodeSandbox!"); //write a response to the client
    // res.end(); //end the response
    // console.log(">>>>> all set");
  })
  .listen(8080); //the server object listens on port 8080
