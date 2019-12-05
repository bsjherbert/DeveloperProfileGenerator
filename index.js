const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const createHTML = require('create-html');

const client_id = "51a029b972e0b63da4fb";
const client_secret = "92ded2dee8393d85d3ccad77425cafc03006ef84";

inquirer.prompt([
    {
        type: "input",
        message: "What is your github user name?",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["red", "blue", "pink", "purple", "green", "orange"],
        name: "preferredColor"
    }
]).then(function (answers) {
    console.log(answers)
    axios.get(`https://api.github.com/users/${answers.username}?client_id=${client_id}&client_secret=${client_secret}`)
        .then(function (response) {
            console.log(response.data);
            let name = response.data.name;
            let profileImage = response.data.avatar_url;
            let githubProfile = response.data.url;
            let location = response.data.location;
            let userBio = response.data.bio;
            let publicRepo = response.data.public_repos;
            let followers = response.data.followers;
            let following = response.data.following;

            console.log(name, profileImage, githubProfile, location, userBio, publicRepo, followers, following);

            var markdown = `# ${name}\n ![alt text](${profileImage})\n [title](${githubProfile})\n ### ${location}\n ### ${userBio}\n ### ${publicRepo}\n ### ${followers}\n ### ${following}`

            fs.writeFile('profile.md', markdown, function (err) {
                if (err) console.log(err)
            });

        });
});


