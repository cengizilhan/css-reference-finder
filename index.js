const fs = require('fs');
const path = require('path');

// Function to recursively search for files and extract CSS references
function searchFiles(directory, fileExt) {
  let result = [];
  let idCounter = 1; // Initialize index counter

  // Function to recursively search directories
  function walkDir(currentDirPath) {
    const files = fs.readdirSync(currentDirPath);

    files.forEach((file) => {
      const filePath = path.join(currentDirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath); // Recurse into subdirectory
      } else if (stat.isFile() && filePath.endsWith(fileExt)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Regular expression to find .css file references in various formats
        const cssRegex = /(["'])([^"']*?\.css)(?:\?[^"']*?)?\1/gi;
        let match;

        while ((match = cssRegex.exec(fileContent)) !== null) {
          const cssFileName = match[2]; // Group 2 contains the .css file name

          result.push({
            id: idCounter++,
            htmlFullPath: filePath,
            htmlFileName: path.basename(filePath),
            htmlFilePath: path.relative(directory, filePath),
            cssFileName: path.basename(cssFileName),
            cssFullPath: cssFileName,
          });
        }
      }
    });
  }

  // Start searching from the specified directory
  walkDir(directory);

  return result;
}

// Get directories and output file path from command line arguments
const args = process.argv.slice(2);
const defaultDirectory = './'; // Default directory if not provided
const defaultFileExt = '.cshtml'; // Default file extension if not provided

const directoryToSearch = args[0] || defaultDirectory;
const fileExtensionToSearch = args[1] || defaultFileExt;

//check first parameter is null or not
if (args[0] == '-h' || args[0] == '--help') {
    console.log('Usage: node index.js [directory] [fileExtension]');
    console.log('Example: node index.js ./ .cshtml');
    process.exit(1);
}
if (args[0] == null) {
  console.log('You didnt provide the directory to search, defaulting to current directory');
  //process.exit(1);
}
if (args[1] == null) {
  console.log('You didnt provide the file extension to search, defaulting to .cshtml');
  //process.exit(1);
}

// Search for .css file references in the specified files
const cssReferences = searchFiles(directoryToSearch, fileExtensionToSearch);

// Path to the JSON file to write the result
const outputJsonFilePath = './cssReferences.json';

// Write the result to a JSON file
fs.writeFileSync(outputJsonFilePath, JSON.stringify(cssReferences, null, 2), 'utf8');

console.log(`CSS file references have been written to ${outputJsonFilePath}`);
