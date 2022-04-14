const fs = require('fs-extra');
const path = require('path');

const packageDirPath = path.join(__dirname, '..', 'packages');

const packageNameList = fs.readdirSync(packageDirPath);

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
