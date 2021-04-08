const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const log = console.log
const download = require('download-git-repo')
const ora = require('ora');
let spinner = ora('downloading...');
const init = (res) => {
    log(chalk.green('------开始初始化-------'))
    // 远程管理template
    spinner.start()
    download('flippidippi/download-git-repo-fixture', 'test/tmp', function (err) {
        !err &&(()=> {
            spinner.text = 'completed'
            spinner.succeed()
            setTimeout(()=>{
                log(chalk.green('------初始化完毕-------'))
            })
        })()
    })
    // 本地管理template

    // log({...res})
    // /* 找到template文件夹下的模版项目 */
    // const packageJsonPath = path.resolve(__dirname, '..')
    // const sourcePath = packageJsonPath + '/template'
    // log(chalk.red('当前路径:'+ sourcePath))
    // /* 修改package.json*/
    // initPackageJsonFile(res ,sourcePath ).then(()=>{
    //     // copy( sourcePath , process.cwd() ,npm() )
    // })

}
/**
 * 初始化package.json
 * @param {*} res 
 * @param {*} sourcePath 
 */
const initPackageJsonFile = (res,sourcePath) => {
    return new Promise((resolve)=>{
      /* 读取文件 */
        fs.readFile(sourcePath + '/package.json',(err, data)=>{
            if(err) throw err
            const { author , 
                    pro_name,
                    email,
                    template } = res
            const json = JSON.parse(data.toString()) 
            /* 替换模版 */
            json.name = pro_name.trim()
            json.author = author.trim()
            json.email = email.trim()
            json.template = template.trim()
            console.log("view package.json")
            console.log(JSON.stringify(json))
            const path = sourcePath + '/package.json'
            /* 写入文件 */
            fs.writeFile(path, Buffer.from(JSON.stringify(json)) ,(data)=>{
                resolve()
            })
        })
    })
}
module.exports = {
    init
}