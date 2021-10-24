const fs = require('fs').promises;
const path = require('path');
const plist = require('plist');

(async () => {
  const iosFontsDir = path.join(
    __dirname,
    '../',
    'ios/client_only_app/Fonts'
  );

  const fontsDir = path.join(
    __dirname,
    '../',
    'node_modules/react-native-vector-icons/Fonts'
  );

  const infoPlistPath = path.join(
    __dirname,
    '../',
    'ios/client_only_app/Info.plist'
  );

  const infoPlist = plist.parse(
    await fs.readFile(infoPlistPath, 'utf-8')
  );

  await Promise.all(
    infoPlist.UIAppFonts.map(font => {
      const fontPath = path.join(fontsDir, font);
      const fontDest = path.join(iosFontsDir, font);
      console.log(`copying font ${font}...`);
      return fs.copyFile(fontPath, fontDest);
    })
  );

  console.log('Done copying all fonts');
})();
