const express = require("express");
const cors = require("cors");
const app = express();
require("./server/config/mongoose.config");

// allow cross-origin requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/routes/pet.routes")(app);

const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
