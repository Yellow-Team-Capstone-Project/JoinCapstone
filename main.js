const app = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Join server is running on ${PORT}, the ${__dirname}`);
});
