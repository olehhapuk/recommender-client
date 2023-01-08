const fs = require('fs').promises;
const path = require('path');

const configPath = path.join(process.cwd(), 'generate.json');

function compileComponentTemplate(componentName, useTypescript) {
  const stylesImportTemplate = `import styles from './${componentName}.module.css';

`;
  const propsTypeTemplate = `interface ${componentName}Props {}

`;
  const template = `const ${componentName} = (${
    useTypescript ? `{}: ${componentName}Props` : undefined
  }) => {
  return <div>${componentName}</div>
};

export default ${componentName};
`;

  return useTypescript
    ? stylesImportTemplate + propsTypeTemplate + template
    : stylesImportTemplate + template;
}

function compileIndexTemplate(componentName) {
  return `export { default } from './${componentName}';
`;
}

async function main(type, name) {
  const config = JSON.parse(await fs.readFile(configPath));

  const parentDirPath = path.join(process.cwd(), config.types[type]);
  await createFiles(name, parentDirPath, config.ext);
}

async function createFiles(componentName, parentDirPath, ext) {
  const componentExt = ext;
  const fileExt = ext.slice(0, 2);

  const componentFilename = `${componentName}.${componentExt}`;
  const stylesFilename = `${componentName}.module.css`;

  await fs.mkdir(path.join(parentDirPath, componentName));
  await fs.writeFile(
    path.join(parentDirPath, componentName, componentFilename),
    compileComponentTemplate(componentName, ext[0] === 't')
  );
  await fs.writeFile(
    path.join(parentDirPath, componentName, stylesFilename),
    ''
  );
  await fs.writeFile(
    path.join(parentDirPath, componentName, `index.${fileExt}`),
    compileIndexTemplate(componentName)
  );
}

try {
  const [, , type, name] = process.argv;

  main(type, name);
} catch (error) {
  console.log(error);
  process.exit(1);
}
