import { download, getURL } from "./imageHandler";

async function main() {
  try {
    const imageURL = await getURL();
    download(imageURL);

    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();