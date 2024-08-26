const express = require('express');
const path = require('path');
const xlsx = require('xlsx');

const app = express();

// 解析Excel文件
function loadExcelData(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // 假设使用第一个工作表
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

const data = loadExcelData('./database.xlsx');

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
