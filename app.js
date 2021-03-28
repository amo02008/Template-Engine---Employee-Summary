const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

const promptUser = async () => {
    const input = await inquirer.prompt([
     {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      
  
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
        when: (input) => input.role === "Manager",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's ID?",
        when: (input) => input.role === "Manager",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
        when: (input) => input.role === "Manager",
      },
      {
        type: "input",
        name: "office",
        message: "What is the manager's office number?",
        when: (input) => input.role === "Manager",
      },
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub Username:",
        when: (input) => input.role === "Engineer",
      },
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
        when: (input) => input.role === "Intern",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's ID?",
        when: (input) => input.role === "Intern",
      },
      {
        type: "input",
        name: "email",
        message: "What the intern's email address?",
        when: (input) => input.role === "Intern",
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?",
        when: (input) => input.role === "Intern",
      },
      {
        type: "confirm",
        name: "new",
        message: "Do you have another employee to add?",
      },
     
    ]);
//   };

  
  function addEmployee() {
    if (input.role === "Engineer") {
      const engineer = new Engineer(input.name, input.id, input.email, input.github);
      employees.push(engineer);
    }
    else if (input.role === "Manager") {
      const manager = new Manager(input.name, input.id, input.email, input.office);
      employees.push(manager);
    }
    else if (input.role === "Intern") {
      const intern = new Intern(input.name, input.id, input.email, input.school);
      employees.push(intern);
    }
    else {
      throw new Error(`Role type ${input.role} is not supported.`);
    }
    if (input.new) {
      return promptUser();
    }
  }

  return addEmployee();
};


const init = async () => {
  try {
    await promptUser();

    const html = await render(employees);

    console.log("Your file is ready.")

    fs.writeFileSync(outputPath, html)

  } catch (err) {
    console.log(err);
  }
};

init();