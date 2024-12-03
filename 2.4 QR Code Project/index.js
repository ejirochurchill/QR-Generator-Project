/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

async function main() {
  try {
    // Ask the user for a URL
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter the URL to turn into a QR code:',
        validate: (input) => (input ? true : 'URL cannot be empty.'),
      },
    ]);

    const url = answers.url;

    // Generate the QR code
    const qrCode = qr.image(url, { type: 'png' });
    const qrFileName = 'qr_code.png';
    const textFileName = 'url.txt';

    // Save the QR code as an image
    qrCode.pipe(fs.createWriteStream(qrFileName));
    console.log(`QR code saved as ${qrFileName}`);

    // Save the URL as a text file
    fs.writeFileSync(textFileName, url, 'utf8');
    console.log(`URL saved as ${textFileName}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
