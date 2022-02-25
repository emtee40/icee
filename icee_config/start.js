const { watchModules, copyModules, compileModules, buildModuleListFile, quoteModule } = require('./module');
const { getPackagePath } = require('./paths');
const { execCmd } = require('./utiliy');
const {createModule} = require('./createModule');
const fs = require("fs");

// 检查模式是否存在
function checkModuleExit(module) {
    let path = `${getPackagePath(module)}/package.json`;

    if (fs.existsSync(path)) {
        return true;
    }

    return false;
}

// 调试
function start(startModule, startCmd) {
    if(!checkModuleExit(startModule)){
        console.log(`${startModule}不存在，请检查模块名是否正确`);
        return;
    }

    let package = require(`${getPackagePath(startModule)}/package.json`);
    if(!package.iceeConfig){
        console.error(`请为项目${startModule}配置iceeConfig字段`);
        return;
    }

    let hoistDependencies = require(`${getPackagePath(startModule)}/package.json`).iceeConfig.hoistDependencies;

    if (hoistDependencies) {
        copyModules(startModule);
        watchModules(startModule, (module) => {
            return `${getPackagePath(startModule)}/node_modules/${module}/dist`
        });
    }
    else {
        watchModules(startModule)
    }

    execCmd(`cd ${getPackagePath(startModule)} && ${startCmd}`);
}
module.exports.start = start;

// 创建模块
module.exports.createModule = createModule;

// 编译入口模块
function compileStartModule(startModule) {
    if(!checkModuleExit(startModule)){
        console.log(`${startModule}不存在，请检查模块名是否正确`);
        return;
    }

    let package = require(`${getPackagePath(startModule)}/package.json`);
    if(!package.iceeConfig){
        console.error(`请为项目${startModule}配置iceeConfig字段`);
        return;
    }

    let hoistDependencies = require(`${getPackagePath(startModule)}/package.json`).iceeConfig.hoistDependencies;

    if(hoistDependencies){
        compileModules(startModule, () => {
            copyModules(startModule);
        });
    }
    else{
        compileModules(startModule);
    }
}
module.exports.compileStartModule = compileStartModule;

// 生成模块的 ModuleList 文件
module.exports.buildModuleListFile = function(startModule) {
    if(!checkModuleExit(startModule)){
        console.log(`${startModule}不存在，请检查模块名是否正确`);
        return;
    }

    buildModuleListFile(startModule)
}

// 入口模块引用模块
module.exports.quoteModule = function(startModule, module) {
    if(!checkModuleExit(startModule)){
        console.log(`${startModule}不存在，请检查模块名是否正确`);
        return;
    }

    if(!checkModuleExit(module)){
        console.log(`${module}不存在，请检查模块名是否正确`);
        return;
    }
    
    quoteModule(startModule, module)
}