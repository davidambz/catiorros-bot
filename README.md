# Catiorros Bot 🐶

Catiorros Bot is a bot that shares dog photos on Bluesky. You can see the bot in action [here](https://bsky.app/profile/catiorros.bsky.social).

## Getting Started

To get started with the Catiorros Bot, follow these steps:

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:davidambz/catiorros-bot.git
   ``` 

2. **Navigate to the project directory:**

   ```bash
   cd catiorros-bot
   ```

3. **Install dependencies:**

   ```bash
   yarn
   ```

4. **Create a `.env` file:**

   Copy the `.env-example` file to a new file named `.env` and fill in the required environment variables.

   ```bash
   cp .env-example .env
   ```

   The `.env` file should contain the following variables:

   - `IDENTIFIER`: Your Bluesky account identifier.
   - `PASSWORD`: Your Bluesky app password.
   - `IMAGE_PATH`: Path to the image to be used by the bot.
   - `IMAGE_MIMETYPE`: MIME type of the image (e.g., `image/jpeg`).
   - `IMAGE_ALT_TEXT`: Alt text for the image.
   - `API_KEY`: API key for the image service.
   - `CRON_EXPRESSION`: The cron expression for post time.

### Running the Project

1. **Build the project:**

   ```bash
   yarn build
   ```

2. **Start the bot:**

   ```bash
   yarn start
   ```

### Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a new Pull Request.

### Contact

For any questions or issues, please open an issue on the repository or contact the project maintainers.

---

Happy coding! 🐶
