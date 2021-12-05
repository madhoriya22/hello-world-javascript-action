const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs').promises;

try {
  // `who-to-greet` input defined in action metadata file
  const baseDirectory = core.getInput('base-directory');
  console.log(`Base path:  ${baseDirectory}!`);
  

  //Copy json values
  copyJsonContent(baseDirectory, '/source.json', '/destination.json');

} catch (error) {
  core.setFailed(error.message);
}

async function copyJsonContent(baseDirectory, source, destination) {
  //Read source file
  let sourceData = await fs.readFile(baseDirectory + source);
  let sourceJson = JSON.parse(sourceData);

  //Read destination file
  let destinationData = await fs.readFile(baseDirectory + destination);
  let destinationJson = JSON.parse(destinationData);

  //Copy to destination file
  destinationJson.sourceValue = sourceJson.value;
  console.log('destination after copy -> '+JSON.stringify(destinationJson));

  //write to destination file
  await fs.writeFile(baseDirectory + destination, JSON.stringify(destinationJson));

  //Read the updated destination file
  destinationData = await fs.readFile(baseDirectory + destination);
  console.log('after write: '+destinationData);
  core.setOutput("result", "Successfully Copied Source Json To Destination Json");
}