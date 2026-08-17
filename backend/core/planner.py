import heapq
import math

class PathPlanner:
    def __init__(self, grid_size=(20, 20)):
        self.grid_size = grid_size
        self.obstacles = set([(5, 5), (5, 6), (10, 12), (10, 13)])

    def update_obstacles(self, new_hazards):
        for h in new_hazards:
            self.obstacles.add((int(h['x']), int(h['z'])))

    def heuristic(self, a, b):
        return math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2)

    def d_star_lite_reroute(self, start, goal):
        open_set = []
        heapq.heappush(open_set, (0, start))
        came_from = {}
        g_score = {start: 0}

        while open_set:
            current = heapq.heappop(open_set)[1]
            if current == goal:
                path = []
                while current in came_from:
                    path.append(current)
                    current = came_from[current]
                path.append(start)
                return path[::-1]

            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (1,1), (-1,1), (1,-1)]:
                neighbor = (current[0] + dx, current[1] + dy)
                if 0 <= neighbor[0] < self.grid_size[0] and 0 <= neighbor[1] < self.grid_size[1]:
                    if neighbor in self.obstacles:
                        continue
                    tentative_g = g_score[current] + math.hypot(dx, dy)
                    if neighbor not in g_score or tentative_g < g_score[neighbor]:
                        came_from[neighbor] = current
                        g_score[neighbor] = tentative_g
                        heapq.heappush(open_set, (tentative_g + self.heuristic(neighbor, goal), neighbor))
        return []