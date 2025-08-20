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
    
3.  **Build the application:**
    ```bash
    npm run build
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```

The application will be available at `http://<your-raspberry-pi-ip>:3000`.

Your Home Assistant credentials are included in the `.env` file. For a production application, you should use a `.gitignore` file to prevent this file from being committed to version control.
