# 6P Pedagogical Framework

The chatbot aims to provide personalized guidance for academic writing aligned with the six phases of the 6P Pedagogical Framework: planning, previewing, prompting, producing, peer reviewing and portfolio tracking (Kong and Lee, 2023).

[![Demostration Video](https://github.com/user-attachments/assets/0e28279c-99ec-4aa2-bd89-99d0c2b89821)](https://www.youtube.com/watch?v=ZwRgK51tsLs)

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

2. Create `.env` file with `VITE_APP_REPLICATE_API_TOKEN=[YOUR_API_TOKEN]`

3. Build the Docker image:

   ```bash
   docker build -t chatbot6p .
   ```

#### Start Docker Container

1. Start the Docker container:

   ```bash
   docker run --rm -p 5173:5173 --name chatbot6p_c chatbot6p
   ```
   or with bind mount
   ```bash
   docker run -it --rm --name chatbot6p_c -v "%cd%":/app -v /app/node_modules -p 5173:5173 chatbot6p
   ```

2. Open your web browser and navigate to `http://localhost:5173`. You should see the application running.


## Change API Provider

If you need to change the API provider, follow these steps:

1. Update the `.env` file:
   - Replace the existing API token with the new one from your chosen provider:
     ```
     VITE_APP_REPLICATE_API_TOKEN=[NEW_API_TOKEN]
     ```
   > Notice: Environment variable name must be started with `VITE_APP_`

2. Update the proxy in `vite.config.js`:
   - Modify the server.proxy configuration to point to the new API endpoints. For example:
      ```javascript
      server: {
         proxy: {
            '/api': {
               target: 'https://new-api-provider.com/endpoint',
               changeOrigin: true,
               secure: false,
               rewrite: (path) => path.replace(/^\/api/, ''),
            },
         },
         watch: {
            usePolling: true
         }
      },
     ```

3. Update API request methods in .vue files:
   - Modify the API request methods in Vue components to match the new API provider's requirements.
      ```javascript
      axios({
         method: 'post',
         url: '/api',
         data: {
            //
         },
         headers: {
            'Authorization': `Bearer ${api_key}`,
            'Content-Type': 'application/json'
         },
      }).then(async (response) => {
         // Handle response
      }).catch((error) => {
         //
      }).finally(() => {
         //
      })
      ```

## Related Documentation

| Technology | Description |
| --- | --- |
| [Vue](https://v3.vuejs.org/guide/introduction.html) | Vue.js is a progressive JavaScript framework for building user interfaces. It is primarily focused on the view layer, making it easy to integrate with other libraries or existing projects. Vue provides a reactive and composable way to build components. |
| [Vite](https://vitejs.dev/guide/) | Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It utilizes native ES modules, enabling faster cold starts and more efficient bundling. Vite supports various features, such as hot module replacement (HMR), code splitting, and more. |
| [Tailwind CSS](https://tailwindcss.com/docs/installation) | Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to style your application. It encourages a component-based approach to styling, allowing you to quickly build responsive and customizable user interfaces. |
| [Pinia](https://pinia.vuejs.org/introduction.html) | Pinia is a state management library for Vue.js. It provides a simple and powerful way to manage the state of your application, with features like store composition, state sharing, and time-travel debugging. |
| [Vue Router](https://router.vuejs.org/guide/) | Vue Router is the official routing library for Vue.js. It allows you to create single-page applications (SPAs) by mapping URLs to Vue components, handling navigation, and managing the browser history. |
| [shadcn/vue](https://www.shadcn-vue.com/docs/introduction.html) | shadcn/vue is a collection of accessible and customizable Vue.js components built using Tailwind CSS. It provides a set of high-quality UI components that can be easily integrated into your Vue.js projects. |
| [Axios](https://axios-http.com/docs/intro) | Axios is a popular HTTP client library for JavaScript. It provides a simple and consistent API for making HTTP requests, handling responses, and handling errors, making it easier to work with APIs in your Vue.js applications. |
| [Docker](https://docs.docker.com/get-started/) | Docker is a platform for building, deploying, and managing containerized applications. It allows you to package your application and all its dependencies into a single container, ensuring consistent and reliable deployments across different environments. |
