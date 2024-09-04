import fs from 'fs';

const POSTED_URLS_FILE = 'images/postedUrls.json';

export function loadPostedUrls(): string[] {
  if (fs.existsSync(POSTED_URLS_FILE)) {
    const data = fs.readFileSync(POSTED_URLS_FILE, 'utf-8');
    return JSON.parse(data) as string[];
  }
  return [];
}

export function savePostedUrls(urls: string[]): void {
  fs.writeFileSync(POSTED_URLS_FILE, JSON.stringify(urls, null, 2));
}
