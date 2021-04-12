const chalk = require('chalk');
const fs = require('fs');
const download = require('download-git-repo')
const ora = require('ora');
const handlebars = require('handlebars');
const symbols = require('log-symbols');
const init = (answer) => {
    const spinner = ora('start download.....');
    spinner.start();
    download('github:LhLoveZgg/test-template', answer.name, {clone: true}, function (err) {
        if(err){
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
        } else {
            spinner.succeed('init successed!');
            const meta = {
                name: answer.name,
                description: answer.description,
                author: answer.author,
                email:answer.email
            }
            const fileName = `${answer.name}/package.json`;
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
        }    
    })
}
module.exports = {
    init
}