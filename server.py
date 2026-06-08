import asyncio
import websockets
import json
import numpy as np

async def generate_signal(websocket):
    t = 0
    while True:
        # Generate sine wave + random hardware noise
        signal_value = np.sin(t) + np.random.normal(0, 0.1)
        
        # Package the data and send it through the WebSocket
        await websocket.send(json.dumps({"time": t, "value": signal_value}))
        t += 0.1
        await asyncio.sleep(0.05) # Runs 20 times per second

async def main():
    async with websockets.serve(generate_signal, "localhost", 8765):
        print("PulseVision Engine running on ws://localhost:8765")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
