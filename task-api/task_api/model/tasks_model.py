from bson import ObjectId
from uuid import uuid4
from task_api.model.db_model import PostgresSingleton
from task_api.model.task_model import Task
import psycopg2.extras

db = PostgresSingleton.getInstance()
db.connect()
class TasksModel:
    def create_task(self, url, method, params, course_id):
        try:
            print(url, method, params, course_id)
            task = Task(url=url, method=method, params=params, course_id=course_id)
            task_id = str(uuid4())
            query = """INSERT INTO task (id, course_id, url, method, params) VALUES (%s, %s, %s, %s, %s)"""
            params = (task_id, task.course_id, task.url, task.method, psycopg2.extras.Json(task.params) if task.params is not None else None)
            db.execute(query, params)
            return task_id
        except Exception as e:
            print("Create task error: ", e)
            return None
        
    def find_pending(self) -> Task:
        try:
            query = """SELECT * FROM task WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1"""
            db.execute(query)
            row = db.fetchOne()
            if row is None:
                return None
            task = Task.deserialize(data={
                'id': row[0],
                'course_id': row[1],
                'url': row[3],
                'method': row[4],
                'params': row[6],
                'created_at': row[2],
                'status': row[5],
                'result': row[7]
            })
            return task
        except Exception as e:
            print("Find pending error: ", e)
            return None
        
    def update_task(self, task: Task):
        try:
            query = """UPDATE task SET status = %s, result = %s WHERE id = %s"""
            params = (task.status, psycopg2.extras.Json(task.result), task.id)
            db.execute(query, params)
            return True
        except Exception as e:
            print("Update task error: ", e)
            return False