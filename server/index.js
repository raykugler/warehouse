const app = require("./loader");
const config = require("config");
const PORT = process.env.PORT || config.get("port");

app.listen(config.get("port"), () => console.info(`Server run on http://127.0.0.1:${PORT}`));