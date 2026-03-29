class MusicCache:
    def __init__(self):
        self.cache = []
    
    def add(self, data):
        self.cache.append(data)
    
    def remove(self, data):
        self.cache.remove(data)
    
    def clear(self):
        self.cache.clear()