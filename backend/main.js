const http = require("http");
const { formidable, errors } = require("formidable");
const fs = require("fs");
const axios = require("axios");
const { getJson } = require("serpapi");
require("dotenv").config();

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/upload" && req.method.toLowerCase() === "post") {
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);

      if (Object.keys(files).length === 0) {
        throw new Error("No files were uploaded.");
      }

      const image = files.image[0];
      const fileData = fs.readFileSync(image.filepath);
      const base64Image = Buffer.from(fileData).toString("base64");

      const formData = new URLSearchParams();
      formData.append("image", base64Image);

      const imgBBResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const imageUrl = imgBBResponse.data.data.url;
      const response = await getJson({
        engine: "google_lens",
        api_key: SERPAPI_KEY,
        url: imageUrl,
        location: "Austin, Texas",
      });

      console.log(JSON.stringify(response, null, 2));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response, null, 2));
      return;
    } catch (err) {
      if (err.code === errors.maxFieldsExceeded) {
      }
      console.error(err);
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/");
});
