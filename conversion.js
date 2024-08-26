const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// 读取Excel文件
const workbook = xlsx.readFile(path.join(__dirname, 'database.xlsx'));
const sheetName = workbook.SheetNames[0]; // 假设使用第一个工作表
const worksheet = workbook.Sheets[sheetName];

// 将工作表数据转换为JSON格式
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// 将JSON数据写入文件
fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(jsonData, null, 2));

console.log('Excel文件已成功转换为JSON文件！');
