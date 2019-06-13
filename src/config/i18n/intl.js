/**
 *
 *  zh.json 数据格式化
 *  1.cd到i18n目录下
 *  2.执行 node intl.js命令 （在当前文件件生成initlOut.text文件）
 *
 * */

const arguments = process.argv.splice(2);
const fs = require("fs-extra");
const path = require("path");

const base = ".";
const matchs = {
  name: /zh.json$/ //path
};
const deleteBase = "src";
const findFile = (base, matchs) => {
  // 层级遍历
  let r = [];
  const baseFiles = fs.readdirSync(base);
  baseFiles.forEach(file => {
    const fullpath = path.join(base, file);
    const target = { filepath: fullpath };
    const state = fs.lstatSync(fullpath);
    let tmp = [];
    if (state.isDirectory()) {
      tmp = findFile(fullpath, matchs);
    } else if (state.isFile() && match(target, matchs)) {
      tmp = tmp.concat(fullpath);
    }
    r = [...r, ...tmp];
  });
  return r;
};
function match({ filepath }, { name, code }) {
  // 必须这么做 不然文件会查不全  似乎是并发导致的
  name.lastIndex = 0;
  // const filename = filepath.split(path.sep).pop();
  const lines = fs
    .readFileSync(filepath, "utf8")
    .split("\n")
    .join("###");
  if (name && !name.exec(filepath)) {
    return false;
  }
  return true;
}
function replace(path, targets, arrows) {
  let lines = fs
    .readFileSync(path, "utf8")
    .split("\n")
    .join("###");
  targets.forEach((target, idx) => {
    lines = lines.replace(target, arrows[idx]);
  });
  const r = lines.split("###");
  fs.writeFileSync(path, r.join("\n"));
}
function deleteFolder(path, boolean) {
  fs.removeSync(path);
  boolean && fs.mkdirsSync(path);
}
function writeFile(path, content) {
  fs.writeFileSync(path, content, "utf8");
}
const handle = () => {
  deleteFolder(deleteBase, true); //删除entry目录
  const files = findFile(base, matchs); //所有的configs
  // writeFile('framework/scripts/list.js', files.join('\n'));
  // return;
  files.forEach(i => {
    const exist = /const name = '([^']+)'/.exec(fs.readFileSync(i));
    const filename = exist[1];
    const content = `export { default } from '${i
      .replace("src/", "../")
      .replace(".js", "")}';`;
    writeFile(`src/entry/${filename}.js`, content);
  });
};
//平铺对象
const flatObj = (msg, crumb = []) => {
  let r = {};
  const keys = Object.keys(msg);
  keys.forEach(i => {
    crumb.push(i);
    if (typeof msg[i] === "string") {
      r[crumb.join(".")] = msg[i];
    } else {
      Object.assign(r, flatObj(msg[i], crumb));
    }
    crumb.pop();
  });
  return r;
};
function setValueByPath(obj, keyPath, value) {
  // console.log('-', obj, keyPath, value);
  //匹配出属性名
  var array = keyPath.match(/\w+/g);
  //遍历属性名数组
  var cur = array[0];
  var next = array[1];
  if (array.length > 1) {
    if (!obj[cur]) {
      obj[cur] = setValueByPath({}, array.slice(1).join("."), value);
    } else {
      //obj指向新创建的对象
      obj[cur] = setValueByPath(obj[cur], array.slice(1).join("."), value);
    }
  } else {
    obj[cur] = value;
  }
  //最后一步赋值
  return obj;
}
const handleReverse = () => {
  const files = findFile(base, {
    name: /initlOut.text$/
  })[0];
  let lines = fs.readFileSync(files, "utf8");
  let arr = lines.split("\n");
  let result = arr.reduce(function(r, cur) {
    if (!cur) {
      return r;
    }
    const execR = /(.*?)\s*=\s*(.*)/.exec(cur);
    const keyStr = execR[1];
    const valueStr = execR[2];
    r = setValueByPath(r, keyStr, valueStr);
    return r;
  }, {});
  console.log(result);
  writeFile(`initlReverse.json`, JSON.stringify(result));
};
const handle2 = () => {
  const files = findFile(base, matchs)[0]; //所有的configs
  let lines = fs.readFileSync(files, "utf8");
  let faltLines = flatObj(JSON.parse(lines));
  //homePage
  let delKeys = [
    "homePage.mess",
    "homePage.kljs",
    "wxInvite.vTalk",
    "wxInvite.intr3",
    "wxInvite.dashIntr2",
    "wxInvite.congrationText",
    "wxInvite.person"
  ];
  delKeys.forEach(function(i) {
    delete faltLines[i];
  });

  let linesStr = JSON.stringify(faltLines);
  linesStr = linesStr.replace(/(\{)(.*)(\})/, "$2");
  let result = linesStr.replace(/"(.*?)":(\s)*"(.*?)",?/g, "$1 = $3\n");
  writeFile(`initlOut.text`, result);

  // files.forEach(i => {
  //   let lines = fs
  //     .readFileSync(i, 'utf8')
  //     .split('\n')
  //     .join('###');
  //   lines = "import { M } from 'whaleex/components';\n" + lines;
  //   const matchs = lines.match(/id[:=]\s?['"](.*?)\.(.*?)['"]/g) || [];
  //   matchs.forEach(i => {
  //     const exist = /id[:=]\s?['"](.*?)\.(.*?)['"]/g.exec(i);
  //     content.push(exist[1] + '.' + exist[2]);
  //   });
  //
  //   // replace(
  //   //   i,
  //   //   [/['"]?\|\|\|\+(.*?)\+(.*?)\|\|\|['"]?/g, /import/],
  //   //   ["<M id='$1' />", "import { M } from 'whaleex/components';\nimport"]
  //   // );
  //   // const exist = /\|\|\|\+(.*?)\+(.*?)\|\|\|/g.exec();
  //   // content.push(JSON.stringify(exist));
  //   // content.push({ key: exist[1], value: exist[2] });
  //   // replace(i, [/['"]?\|\|\|\+(.*)\+(.*)\|\|\|['"]?/], ["<M id='$1' />"]);
  // });
  // for (var i = 0; i < content.length - 1; i++) {
  //   if (newArr.indexOf(content[i]) === -1) {
  //     newArr.push(content[i]);
  //   }
  // }
  // for (var i = 0; i < newArr.length - 1; i++) {
  //   newArr2.push(a[newArr[i]] || newArr[i]);
  // }
  // // const contentStr = content.join(',');
  // const contentStr = newArr2.join(',\n');
  // writeFile(`initlOut.js`, '[' + contentStr + ']');
};
if (arguments[0] === "reverse") {
  handleReverse();
} else {
  handle2();
}
