import { app } from "./app";

const port = 9000;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));