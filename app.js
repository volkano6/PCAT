const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

//MiddleWares
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
