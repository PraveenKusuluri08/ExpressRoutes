const express = require("express")
const app = express()

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', require('./routes/api/Members'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is started at ${PORT}`))
