import numpy as np

class PerceptionEngine:
    def __init__(self, camera_fov=60, range_meters=10.0):
        self.camera_fov = camera_fov
        self.range_meters = range_meters

    def generate_depth_map(self, rover_pos, hazards):
        grid = np.ones((16, 16)) * self.range_meters
        rx, rz = rover_pos[0], rover_pos[2]

        for h in hazards:
            dx = h['x'] - rx
            dz = h['z'] - rz
            dist = np.sqrt(dx**2 + dz**2)
            if dist < self.range_meters:
                gx = int(np.clip((dx + 5) * 1.6, 0, 15))
                gz = int(np.clip((dz + 5) * 1.6, 0, 15))
                grid[gz, gx] = round(dist, 2)

        return grid.tolist()