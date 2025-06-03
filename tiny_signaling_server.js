// tiny_signaling_server.js (from previous step, should be suitable for Render)
const WebSocket = require('ws');

const port = process.env.PORT || 8080; // Render sets PORT
// For WebSocket server on Render, it's often better to not specify host,
// or ensure it listens on 0.0.0.0. `ws` library handles this well by default.
const wss = new WebSocket.Server({ port });

const rooms = {};
const clientRooms = new Map();

console.log(`Tiny signaling server started on port ${port}`);

wss.on('connection', (ws) => {
    let currentRoomId = null;
    let peerIndex = -1;

    console.log('Client attempting to connect...');

    ws.on('message', (messageString) => {
        // ... (rest of the message handling logic is the same as the Glitch version)
        let message;
        try {
            message = JSON.parse(messageString);
        } catch (e) {
            console.error("Failed to parse message:", messageString, e);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON message' }));
            return;
        }

        console.log('Received:', message);

        switch (message.type) {
            case 'join_room':
                currentRoomId = message.roomId || generateRoomId();
                ws.roomId = currentRoomId;
                clientRooms.set(ws, currentRoomId);

                if (!rooms[currentRoomId]) {
                    rooms[currentRoomId] = [];
                }

                if (rooms[currentRoomId].length < 2) {
                    rooms[currentRoomId].push(ws);
                    peerIndex = rooms[currentRoomId].indexOf(ws);
                    console.log(`Client (peer ${peerIndex}) joined room ${currentRoomId}. Clients in room: ${rooms[currentRoomId].length}`);
                    ws.send(JSON.stringify({
                        type: 'room_joined',
                        roomId: currentRoomId,
                        peerIndex: peerIndex,
                        numClients: rooms[currentRoomId].length
                    }));

                    if (rooms[currentRoomId].length === 2) {
                        console.log(`Room ${currentRoomId} is full. Notifying clients.`);
                        rooms[currentRoomId][0].send(JSON.stringify({ type: 'peer_ready', initiator: true, roomId: currentRoomId }));
                        rooms[currentRoomId][1].send(JSON.stringify({ type: 'peer_ready', initiator: false, roomId: currentRoomId }));
                    }
                } else {
                    console.log(`Room ${currentRoomId} is full. Client denied.`);
                    ws.send(JSON.stringify({ type: 'room_full', roomId: currentRoomId }));
                    ws.close();
                }
                break;

            case 'offer':
            case 'answer':
            case 'candidate':
                if (currentRoomId && rooms[currentRoomId]) {
                    rooms[currentRoomId].forEach(client => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(message));
                        }
                    });
                }
                break;
            default:
                console.log('Unknown message type:', message.type);
                ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
        }
    });

    ws.on('close', () => {
        const closedRoomId = ws.roomId;
        if (closedRoomId && rooms[closedRoomId]) {
            rooms[closedRoomId] = rooms[closedRoomId].filter(client => client !== ws);
            clientRooms.delete(ws);
            console.log(`Client (peer ${peerIndex}) disconnected from room ${closedRoomId}. Clients remaining: ${rooms[closedRoomId].length}`);
            if (rooms[closedRoomId].length === 1) {
                rooms[closedRoomId][0].send(JSON.stringify({ type: 'peer_disconnected', roomId: closedRoomId }));
            }
            if (rooms[closedRoomId].length === 0) {
                delete rooms[closedRoomId];
                console.log(`Room ${closedRoomId} is empty and closed.`);
            }
        } else {
            console.log('Client disconnected (was not in a room or room already cleaned up).');
        }
    });
    ws.on('error', (error) => {
        console.error(`WebSocket error for peer ${peerIndex} in room ${currentRoomId}:`, error);
    });
});
function generateRoomId() { return Math.random().toString(36).substring(2, 8); }