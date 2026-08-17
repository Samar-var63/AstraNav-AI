import random

class DynamicHazardEngine:
    def __init__(self, bounds=(0, 20)):
        self.bounds = bounds

    def generate_meteor_drop(self):
        """Random dynamic hazards (meteor impacts / slope traps) generate karta hai"""
        return {
            "x": round(random.uniform(self.bounds[0], self.bounds[1]), 2),
            "z": round(random.uniform(self.bounds[0], self.bounds[1]), 2),
            "radius": round(random.uniform(0.5, 1.8), 2),
            "severity": random.choice(["LOW", "MEDIUM", "HIGH_RISK"])
        }