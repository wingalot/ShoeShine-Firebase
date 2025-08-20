# ShoeCare UI

This is a Next.js application for controlling a shoe disinfection cabinet, integrated with Home Assistant.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Running on a local machine or Raspberry Pi

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wingalot/ShoeShine-Firebase.git
    cd ShoeShine-Firebase
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and add your Home Assistant URL and a Long-Lived Access Token.
    ```env
    HA_URL="http://your-home-assistant-ip:8123"
    HA_TOKEN="your-long-lived-access-token"
    ```

4.  **Build the application:**
    ```bash
    npm run build
    ```

5.  **Run the application:**
    ```bash
    npm start
    ```

The application will be available at `http://<your-raspberry-pi-ip>:3000`.
