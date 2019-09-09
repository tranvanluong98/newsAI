module.exports = {
  aliases: {
    styles: './{filename}.js',
  },
  environments: ['node'],
  stripFileExtensions: ['.js'],
  useRelativePaths: false,
  declarationKeyword: 'import',
  moduleNameFormatter: function moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    //if (/^app\/admin\/src/.test(moduleName)) {
    //return moduleName.replace(/^app\/admin\/src/gi, '~');
    //} else if (/^app\/data-genenerator\/src/.test(moduleName)) {
    //return moduleName.replace(/^app\/data-generator\/src/gi, 'data-generator');
    //} else if (/^package\/(?:\d|-|\w)+\/\S*/.test(moduleName)) {
    //return 'react-admin';
    //}
    if (
      /^(?:src\/(?:core|e2e|layouts|locales|services|utils|components|containers|config|pages))\/(?:\d|\w|\/)*/.test(
        moduleName
      )
    ) {
      return `@/${moduleName.replace('src/', '')}`;
    }
    return moduleName;
  },
};
