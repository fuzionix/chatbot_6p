# 6P Pedagogical Framework

The chatbot aims to provide personalized guidance for academic writing aligned with the six phases of the 6P Pedagogical Framework: planning, previewing, prompting, producing, peer reviewing and portfolio tracking (Kong and Lee, 2023).

## Installation

### Local Development

#### Prerequisites

Before you can set up the project locally, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)
- [Git](https://git-scm.com/)

#### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/TaylonChan/chatbot_6p.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chatbot_6p
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Create `.env` file with `VITE_APP_REPLICATE_API_TOKEN=[YOUR_API_TOKEN]`

#### Start Development Server

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to `http://localhost:5173`. You should see the application running.

### Docker

#### Prerequisites

Before you can set up the project using Docker, make sure you have the following software installed:

- [Docker](https://www.docker.com/)

#### Build Docker Image

1. Navigate to the project directory:

   ```bash
   cd chatbot_6p
   ```

2. Build the Docker image:

   ```bash
   docker build -t chatbot6p .
   ```

3. Create `.env` file with `VITE_APP_REPLICATE_API_TOKEN=[YOUR_API_TOKEN]`

#### Start Docker Container

1. Start the Docker container:

   ```bash
   docker run --rm -p --name chatbot6p_c 5173:5173 chatbot6p
   ```
   or with bind mount
   ```bash
   docker run -it --rm --name chatbot6p_c -v "%cd%":/app -v /app/node_modules -p 5173:5173 chatbot6p
   ```

2. Open your web browser and navigate to `http://localhost:5173`. You should see the application running.