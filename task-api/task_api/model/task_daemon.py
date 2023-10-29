import datetime
import requests
from time import sleep

from task_api import config, logger, events
from task_api.model.task_model import Task
from task_api.model.tasks_model import TasksModel

class TaskDaemon:

    def __init__(self, polling_interval: int = 5):
        self.model = TasksModel()
        self.polling_interval = polling_interval

    def run(self):

        logger.info('Task daemon started')

        while True:
            try:
                #Select the pending task with the oldest created_at value
                task = self.model.find_pending()
                if task is not None:
                    #sleep(self.polling_interval)
                    self.runTask(task)
                else:
                    logger.info('No pending tasks')
                    sleep(self.polling_interval)
            except Exception as e:
                logger.error(e)
                sleep(self.polling_interval)

    def runTask(self, task: Task):

        logger.info(f'Running task {task.id}')

        try:
            if task.method == 'GET':
                r = requests.get(task.url, params=task.params, timeout=1800)
            elif task.method == 'POST':
                r = requests.post(task.url, json=task.params, timeout=1800)

            if r.status_code == 200:
                task.status = 'completed'
                task.result = r.json()
            else:
                task.status = 'failed'
                task.result = r.json()
            
            update = self.model.update_task(task)
            if update is None:
                logger.error(f'Failed to update task {task.id}')
            else:
                events.emit_finished_task(task.id)
                logger.info(f'Updated task {task.id}')

        except Exception as e:
            logger.error(e)
            task.status = 'failed'
            task.result = str(e)
            update = self.model.update_task(task)
            if update is None:
                logger.error(f'Failed to update errored task {task.id}')

        logger.info(f'Finished task {task.id}')

