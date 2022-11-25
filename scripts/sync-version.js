const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const packageDirPath = path.join(__dirname, '..', 'packages');

const packageNameList = fs.readdirSync(packageDirPath).filter((item) => item !== '.DS_Store');

packageNameList.forEach((packageName) => {
  const packagePath = path.join(packageDirPath, packageName);
  const { version } = require(path.join(packagePath, 'package.json'));

  fs.writeFileSync(
    path.join(packagePath, 'src', 'version.ts'),
    `export default '${version}';
`,
    'utf8'
  );
});

exec('git add .', (error, stdout, stderr) => {
  if (error) {
    console.log(`sync version error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`sync version stderr: ${stderr}`);
    return;
  }
  console.log(`sync version success.`);
});
