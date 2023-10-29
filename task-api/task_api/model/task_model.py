import datetime

class Task:
    def __init__(self, course_id, url, method, params):
        self.id = None
        self.course_id = course_id
        self.created_at = None
        self.url = url
        self.method = method
        self.status = None
        self.params = params
        self.result = None

    #Create serialization method
    def serialize(self):
        seriliazed = {
            'course_id': self.course_id,
            'url': self.url,
            'method': self.method,
            'params': self.params,
        }

        if self.id is not None:
            seriliazed['id'] = self.id
        if self.result is not None:
            seriliazed['result'] = self.result
        if self.created_at is not None:
            seriliazed['created_at'] = self.created_at
        if self.status is not None:
            seriliazed['status'] = self.status
        
        return seriliazed
    
    #Create deserialization method
    @classmethod
    def deserialize(cls, data):
        try:
            t = cls(
                course_id=data['course_id'],
                url=data['url'],
                method=data['method'],
                params=data['params']
            )
            t.id = data['id'] if 'id' in data else None
            t.created_at = data['created_at'].strftime("%Y-%m-%d %H:%M:%S") if 'created_at' in data else None
            t.status = data['status'] if 'status' in data else None
            t.result = data['result'] if 'result' in data else None
            return t
        except Exception as e:
            print(e)
            return None