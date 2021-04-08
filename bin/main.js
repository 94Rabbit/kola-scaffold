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
const question = [
    {
        name:'init',            
        type:'confirm',
        message:'初始化新项目?'
    },
    {
        name:'name',
        message:'请输入项目名称?',
        when: res => Boolean(res.init) /* 是否进行 */
    },
]
program
    .version(jsonConfig.version)
    .parse(process.argv);
program
    .command('init')
    .description('init a kolar project')
    .action(function(){
        log(chalk.blue('init 🐨 project'))
        inquirer.prompt(question).then(answer=>{
            log(chalk.yellow(JSON.stringify(answer)))
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