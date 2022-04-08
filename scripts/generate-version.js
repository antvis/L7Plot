const fs = require('fs-extra');
const path = require('path');

const packageName = 'composite-layers';

const packagePath = path.join(__dirname, '..', 'packages', packageName);

const { version } = require(path.join(packagePath, 'package.json'));

fs.writeFileSync(
  path.join(packagePath, 'src', 'version.ts'),
  `export default '${version}';
`,
  'utf8'
);
