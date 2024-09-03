import * as dotenv from "dotenv";
import * as fs from "fs";
import * as https from "https";

dotenv.config();

export async function getURL(): Promise<string> {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY!,
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
      requestOptions
    );
    const result: any = await response.json();
    return result[0]?.url;
  } catch (error) {
    console.error("Error fetching dog image:", error);
    throw error;
  }
}

export async function download(url: string, filepath: string = process.env.IMAGE_PATH!): Promise<string> {
  return new Promise((resolve, reject) => {
      https.get(url, (res) => {
          if (res.statusCode === 200) {
              const fileStream = fs.createWriteStream(filepath);
              
              res.pipe(fileStream)
                  .on('error', (error) => {
                      fileStream.close();
                      reject(error);
                  })
                  .once('close', () => resolve(filepath));
          } else {
              res.resume();
              reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
          }
      }).on('error', reject);
  });
}

export async function checkFileSize(filepath: string, maxSize: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
      fs.stat(filepath, (err, stats) => {
          if (err) {
              reject(err);
          } else {
              resolve(stats.size <= maxSize);
          }
      });
  });
}
