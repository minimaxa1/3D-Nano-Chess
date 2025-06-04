# 3D Nano Chess 

![3d Nano Chess](https://github.com/user-attachments/assets/bc2ec73d-9794-4b0c-9f43-997f813580c9)


Welcome to 3D Nano Chess! This is a browser-based 3D chess game featuring:

*   **Full 3D Graphics:** Built with Three.js for an immersive chess experience.
*   **AI Opponent:** Challenge a built-in AI to test your skills.
*   **WebRTC Video Chat:** Play against a friend and see them in real-time with peer-to-peer video chat.
*   **Retro Mp3 Radio:** Enjoy some background tunes while you strategize.
*   **AI Move Suggestions:** Get hints from the AI to improve your game.

This project demonstrates the integration of various web technologies to create an interactive online game.

**Play Live:** [https://minimaxa1.github.io/3D-Nano-Chess/index.html](https://minimaxa1.github.io/3D-Nano-Chess/index.html)

*(Please note: The signaling server for WebRTC is hosted on Render's free tier and may spin down after inactivity. The first connection attempt might be slow or require a retry if the server is waking up.)*

## Features

*   Interactive 3D chessboard and pieces.
*   Standard chess rules implemented.
*   Single-player mode against an AI.
*   Two-player mode with WebRTC video chat.
*   UI for game timers, turn indication, and messages.
*   In-game retro radio Mp3 player.
*   AI move suggestions panel.
*   Dynamic particle effects for ambiance.

## Technologies Used

*   **Client-Side (Game Logic & Rendering):**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6+)
    *   **Three.js:** For 3D graphics rendering.
    *   **WebRTC:** For peer-to-peer video and audio communication.
*   **Server-Side (Signaling for WebRTC):**
    *   **Node.js:** Runtime environment.
    *   **ws (WebSocket library):** For handling signaling messages.
*   **Hosting:**
    *   **Client (Game):** GitHub Pages
    *   **Signaling Server:** Render (Free Tier)

## How to Play

1.  **Open the Game:**
    Navigate to [https://minimaxa1.github.io/3D-Nano-Chess/index.html](https://minimaxa1.github.io/3D-Nano-Chess/index.html) in a modern web browser (Chrome or Firefox recommended).

2.  **Playing Against the AI (Default):**
    *   The game starts with White's turn (you).
    *   Click on one of your white pieces to select it. Valid move squares will be highlighted.
    *   Click on a highlighted square to make your move.
    *   The AI (Black) will automatically make its move after yours.

3.  **Playing Against Another Person (with Video Chat):**
    *   **Both players** need to open the game link in their browsers.
    *   **Agree on a Room ID:**
        *   **Player 1 (Initiator):** Can leave the "Room ID" input field blank (a random ID will be used/shown) OR type a unique Room ID (e.g., "chessfriends123"). Click "Create/Join Room."
        *   **Player 2 (Joiner):** Must enter the **exact same Room ID** that Player 1 is using. Click "Create/Join Room."
    *   **Grant Permissions:** Both players will be prompted by their browser to allow access to their camera and microphone. **You must allow these permissions** for video chat to work.
    *   **Connection:**
        *   You should see your local video appear.
        *   The "Status" will update as the connection to the signaling server and then to your peer is established.
        *   Once connected, you should see your opponent's video, and the game can begin!
    *   **Gameplay:** White moves first. Game proceeds like a normal chess match.
    *   **Note on Signaling Server:** If you are the first to try and connect after a period of inactivity, there might be a ~30-60 second delay while the free Render server wakes up. If the initial connection fails, try clicking "Create/Join Room" again after a moment.

4.  **Using In-Game Features:**
    *   **Retro Radio:** Use the `|<`, `>||`, `>|` buttons at the bottom to control the background music.
    *   **AI Suggestions:** If the panel is visible, it will show the AI's top suggested moves for the current player.
    *   **Timers:** Keep an eye on your game timer and move timer.

## Local Development Setup (Optional)

If you want to run or modify the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/minimaxa1/3D-Nano-Chess.git
    cd 3D-Nano-Chess
    ```
2.  **Signaling Server:**
    *   Navigate to the project directory.
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Run the signaling server:
        ```bash
        node tiny_signaling_server.js
        ```
        This will typically start the server on `ws://localhost:8080`.
    *   In `index.html`, temporarily change the WebSocket URL in the `connectSignalingServer` function to `ws://localhost:8080` for local testing.
3.  **Client:**
    *   Serve the `index.html` file using a local web server (due to browser security policies for `file:///` access with WebRTC and potentially other features). A simple way is using Python:
        *   Python 3: `python -m http.server`
        *   Python 2: `python -m SimpleHTTPServer`
    *   Then open `http://localhost:8000/index.html` (or the port your server uses) in your browser.

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Feel free to fork, improve, and learn from this project!

Enjoy! 

Bohemai 
