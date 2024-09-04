import { AtpAgent } from "@atproto/api";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const agent = new AtpAgent({
  service: "https://bsky.social",
});

export async function createPost() {
  try {
    await agent.login({
      identifier: process.env.IDENTIFIER!,
      password: process.env.PASSWORD!,
    });

    const imageBuffer = fs.readFileSync(process.env.IMAGE_PATH!);
    const imageBlob = await agent.uploadBlob(imageBuffer, {
      encoding: process.env.IMAGE_MIMETYPE!,
    });

    await agent.post({
      $type: "app.bsky.feed.post",
      text: "🐶",
      createdAt: new Date().toISOString(),
      embed: {
        $type: "app.bsky.embed.images",
        images: [
          {
            alt: process.env.IMAGE_ALT_TEXT!,
            image: imageBlob.data.blob,
          },
        ],
      },
    });

    console.log("Post created successfully!");
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}
