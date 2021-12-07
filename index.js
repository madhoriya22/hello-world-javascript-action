const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs').promises;

try {
  // `base-directory` input defined in action metadata file
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
  //destinationJson.sourceValue = sourceJson.value;

  sourceJson.results[0].suites[0].tests.forEach(element => {
    if(destinationJson.items.hasOwnProperty(element.title)) {
      destinationJson.items[element.title].learner_prompt = element.fullTitle;
      destinationJson.items[element.title].graded_assertion = element.pass;
      destinationJson.items[element.title].err = element.err;
      destinationJson.items[element.title].Status = element.state;
    }
  })
  console.log('destination after copy -> '+JSON.stringify(destinationJson));

  let destinationFileName = baseDirectory + '/destination - ' + Date.now() + '.json';
  console.log('destination file name -> '+destinationFileName);
  //write to destination file
  await fs.writeFile(destinationFileName, JSON.stringify(destinationJson));

  //Read the updated destination file
  destinationData = await fs.readFile(baseDirectory + destination);
  console.log('after write: '+destinationData);
  core.setOutput("result", "Successfully Copied Source Json To Destination Json");
}