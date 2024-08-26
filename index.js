const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// 解析JSON文件
function loadJSONData(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

const data = loadJSONData(path.join(__dirname, 'database.json'));

// 使用JSON中间件来解析POST请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 查找姓名对应的位置
app.post('/find-location', (req, res) => {
    const { name } = req.body;
    const user = data.find(entry => entry.name === name);

    if (user) {
        res.send(`${name}: ${user.location}`);
    } else {
        res.send(`没找到${name}`);
    }
});

// 服务器监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
