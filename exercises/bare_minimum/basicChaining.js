/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
let {pluckFirstLineFromFileAsync} = require('./promiseConstructor.js');
let {getGitHubProfileAsync} = require('./promisification.js');






var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => {
      return getGitHubProfileAsync(user);
    })
    .then(profile => {
      return new Promise((resolve, reject) => {
        profile = JSON.stringify(profile);
        fs.writeFile(writeFilePath, profile, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
