const dataFilePath = "./app/data",
  fs = require("fs"), path = require('path');

function readFileData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(`${dataFilePath}/${filePath}.json`), function (err, data) {
      if (err) reject([]);
      else resolve(JSON.parse(data));
    });
  });
}

async function appendFileData(data, filePath) {
  var _data = [];
  try {
    _data = await readFileData(filePath);
  } catch (error) {
    console.error(error);
  }
  _data.push(data);
  fs.writeFile(
    `${dataFilePath}/${filePath}.json`,
    JSON.stringify(_data),
    function (err) {
      if (err) throw err;
    }
  );
}

async function deleteFileData(dataId, filePath) {
  var _data = [];
  try {
    _data = await readFileData(filePath);
    _data = _data.filter((e) => e.id != dataId);
  } catch (error) {
    console.error(error);
  }
  fs.writeFile(
    `${dataFilePath}/${filePath}.json`,
    JSON.stringify(_data),
    function (err) {
      if (err) throw err;
    }
  );
  return _data;
}

async function updateFileData(data, filePath) {
  var _data = [];
  try {
    _data = await readFileData(filePath);
    var oldData = _data.find((e) => e.id == data.id);
    oldData = data;
  } catch (error) {
    console.error(error);
  }
  fs.writeFile(
    `${dataFilePath}/${filePath}.json`,
    JSON.stringify(_data),
    function (err) {
      if (err) throw err;
    }
  );
  return _data;
}

module.exports = {
  readFileData,
  appendFileData,
  deleteFileData,
  updateFileData,
};
