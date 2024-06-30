
# CSS Reference Finder

CSS Reference Finder is a Node.js script that recursively searches through specified directories for files with a given extension (default `.cshtml`) and extracts references to CSS files. The results are written to a JSON file.

https://github.com/cengizilhan/css-reference-finder

https://github.com/cengizilhan
 
## Installation

  npm i css-reference-finder
  



## Usage
Run the script with the following command:
Add your package.json this line:

```
 "css-reference-finder": "node node_modules/css-reference-finder/index.js directory fileExtension"

```
and run:

> npm run css-reference-error
> 
### Parameters

-   **directory**: (Optional) The directory to search. If not provided, defaults to the current directory (`./`).
-   **fileExtension**: (Optional) The file extension to search for. If not provided, defaults to `.cshtml`.


  ## Output

The script outputs the results to a JSON file named `cssReferences.json` in the current directory. The JSON file contains an array of objects with the following properties:

-   `id`: A unique identifier for each CSS reference.
-   `htmlFullPath`: The full path of the HTML file where the CSS reference was found.
-   `htmlFileName`: The name of the HTML file.
-   `htmlFilePath`: The relative path of the HTML file from the specified directory.
-   `cssFileName`: The name of the referenced CSS file.
-   `cssFullPath`: The full path of the referenced CSS file.

## Example Output

  

>    [ { "id": 1, 
>    "htmlFullPath": "/path/to/your/directory/file.cshtml",
> "htmlFileName": "file.cshtml", "htmlFilePath": "file.cshtml",
> "cssFileName": "styles.css", "cssFullPath": "styles.css" }, ... ]


