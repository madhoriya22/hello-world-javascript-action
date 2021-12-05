const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs').promises;

try {
  // `who-to-greet` input defined in action metadata file
  const baseDirectory = core.getInput('base-directory');
  console.log(`Hello ${baseDirectory}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  /*const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);*/
  copyJsonContent(baseDirectory, '/source.json', '/destination.json');
  /*let destinationJson;
  await fs.readFile(baseDirectory + '/source.json', (err, data) => {
    sourceJson = JSON.parse(data);
    console.log('sourceJson -> '+sourceJson);
    console.log('data -> '+data);
  });

  fs.readFile(baseDirectory + '/destination.json', (err, data) => {
    destinationJson = JSON.parse(data);
    console.log('destinationJson -> '+destinationJson);
    console.log('data -> '+data);
  });*/
  //destinationJson.sourceValue = sourceJson.value;
  /*fs.writeFile(baseDirectory + '/destination.json', JSON.stringify(destinationJson), err => {
    if(err) throw err;
    console.log('Successfully updated destination!!');
  })*/
} catch (error) {
  core.setFailed(error.message);
}

async function copyJsonContent(baseDirectory, source, destination) {
  let sourceData = await fs.readFile(baseDirectory + source);
  let sourceJson = JSON.parse(sourceData);
  let destinationData = await fs.readFile(baseDirectory + destination);
  let destinationJson = JSON.parse(destinationData);

  console.log('destionation after copy -> '+JSON.stringify(destinationJson));
  return destinationJson;
}