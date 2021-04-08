#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const fs = require('fs');
const path = require('path')
const packageJsonPath = path.resolve(__dirname, '..')
const inquirer = require('inquirer');
const log = console.log
const packageJsonFile = fs.readFileSync(packageJsonPath + '/package.json')
                          .toString()
const jsonConfig = JSON.parse(packageJsonFile)  

const { init }  = require("../command/init") // 初始化项目
const question = [
    {
        name:'init',            
        type:'confirm',
        message:'初始化新项目?'
    },
    {
        name:'pro_name',
        message:'请输入项目名称',
        type: 'input',
        when: res => Boolean(res.init) /* 是否进行 */
    },
    {
        name:'template',
        message:'请选择模版',
        type: 'list',
        choices: ['react', 'vue'],
        when: res => Boolean(res.pro_name) /* 是否进行 */
    },
    {
        name:'author',
        message:'请输入作者',
        type: 'input',
        when: res => Boolean(res.template) /* 是否进行 */
    },
    {
        name:'email',
        message:'请输入邮箱',
        type: 'input',
        when: res => Boolean(res.author) /* 是否进行 */
    },
    {
        name:'ready',
        message:'准备开启🐨之旅?',
        type: 'confirm',
        when: res => Boolean(res.email) /* 是否进行 */
    }
]
program
    .version(jsonConfig.version)
    .parse(process.argv);   
program
    .command('init')
    .description('init a kolar project')
    .action(() => {
        log(chalk.blue('init a 🐨 project'))
        inquirer.prompt(question).then(answer=>{
            // log(answer) // 输出交互结果
            if(!answer.init) return;
            init(answer)
        })
    })
program.command('start')
       .description('start a kolar project')
       .action(()=>{
            log(chalk.red('start'))
        })
program.command('build')
       .description('start a kolar project')
       .action(()=>{
            log(chalk.red('build'))
        })
program.parse(process.argv)    