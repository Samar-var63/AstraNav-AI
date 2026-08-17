from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json, asyncio
from backend.core.planner import PathPlanner
from backend.core.hazard_engine import DynamicHazardEngine
from backend.core.localization import LocalizationTracker

app = FastAPI()
planner = PathPlanner()
hazard_engine = DynamicHazardEngine()
tracker = LocalizationTracker()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

active_session = {"planet": "mars", "rover": "curiosity", "target": {"x": 18, "z": 18}}

@app.get("/api/space-catalog")
def get_catalog():
    with open("backend/data/space_db.json") as f:
        return json.load(f)

@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await websocket.accept()
    current_pos = (0, 0)
    hazards_list = []

    while True:
        if len(hazards_list) < 8:
            new_hazard = hazard_engine.generate_meteor_drop()
            hazards_list.append(new_hazard)
            planner.update_obstacles([new_hazard])

        goal = (active_session["target"]["x"], active_session["target"]["z"])
        path = planner.d_star_lite_reroute(current_pos, goal)

        if len(path) > 1:
            if path[1][0] < current_pos[0] or path[1][1] < current_pos[1]:
                status = "REVERSING_DEAD_END_TRAP"
            else:
                status = "D* Lite Reroute Active"
            current_pos = path[1]
        else:
            status = "Target Reached"

        telemetry_data = tracker.compute_telemetry(current_pos, 45.2)
        telemetry_data["status"] = status
        telemetry_data["speed"] = "0.14 km/h"

        await websocket.send_json({
            "telemetry": telemetry_data,
            "path": path,
            "hazards": hazards_list,
            "planet": active_session["planet"],
            "rover": active_session["rover"]
        })
        await asyncio.sleep(0.6)