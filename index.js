const inquirer = require('inquirer');
const fs = require('fs');
const gpl = require('./gpl');

// Define the questions
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "Title of your application:",
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation instructions:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage information:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'License:',
        choices: ['MIT', 'GPLv3', 'None'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Contribution guidelines:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Test instructions:',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Your GitHub username:',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Your email address:',
    },
];

//Use Node FS to write file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('File written successfully!')
    );
}


function getYear(){
    const currentDate = new Date();
    return currentDate.getFullYear()
}

// Writes a license file to be linked in the README
 function createLicense(license, name) {
    let year = getYear();
    switch (license) {
        case "MIT":
            let data = 'MIT License\n' +
                '\n' +
                `Copyright (c) ${year} ${name}
` +
                '\n' +
                'Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
                'of this software and associated documentation files (the "Software"), to deal\n' +
                'in the Software without restriction, including without limitation the rights\n' +
                'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
                'copies of the Software, and to permit persons to whom the Software is\n' +
                'furnished to do so, subject to the following conditions:\n' +
                '\n' +
                'The above copyright notice and this permission notice shall be included in all\n' +
                'copies or substantial portions of the Software.\n' +
                '\n' +
                'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
                'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
                'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
                'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
                'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
                'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
                'SOFTWARE.';
             writeToFile("LICENSE", data);
            break;

        case "GPLv3":
            console.log(gpl);
             writeToFile("LICENSE", gpl);
            break;

        case "None":
            break;
    }
}



// Function to start the app
function init() {
    inquirer.prompt(questions).then((answers) => {
        let licenseString = 'This application is not provided with any license.'
        if (answers.license !== "None") {
            createLicense(answers.license, answers.github)
            licenseString = `![License](https://img.shields.io/badge/license-${answers.license}-blue.svg)  
This application is covered under the [${answers.license}](LICENSE) license.`
        }
        // Generate the README content based on user input
        const readmeContent = `
# ${answers.title}
f
## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseString}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions, you can reach out to me via GitHub or email:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
`;

        // Write the README file
        writeToFile('README.md', readmeContent);
    });
}



// Function call to initialize the application
init();
