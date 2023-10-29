from . import socketio
from task_api import logger
from flask_socketio import join_room, leave_room

@socketio.on('connect')
def handle_connect():
    logger.info(f'Client connected')

@socketio.on('join')
def handle_join(data):
    logger.info(f'Client subscribed to task {data["task_id"]}')
    join_room(data['task_id'])

def emit_finished_task(task_id):
    logger.info(f'Emitting task finished event for task {task_id}')
    socketio.emit('task_finished', {'task_id': task_id, 'message': 'Task finished'}, room=task_id)

