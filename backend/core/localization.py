import math, random

class LocalizationTracker:
    def __init__(self):
        self.cumulative_drift = 0.0

    def compute_telemetry(self, current_pos, heading_angle):
        drift_factor = random.uniform(0.01, 0.05)
        self.cumulative_drift += drift_factor

        pitch = round(math.sin(current_pos[0] * 0.1) * 3.5, 2)
        roll = round(math.cos(current_pos[1] * 0.1) * 2.1, 2)

        return {
            "x": round(current_pos[0], 2),
            "y": round(0.5 + pitch * 0.02, 2),
            "z": round(current_pos[1], 2),
            "pitch": pitch,
            "roll": roll,
            "heading": round(heading_angle, 1),
            "drift_percentage": round(self.cumulative_drift, 3)
        }