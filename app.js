const express = require('express')

const app = express()

app.use(express.static('./module'))
app.use(express.static('./node_modules'))

app.listen(3000, err => {
    console.log("服务已启动")
})