__author__ = 'Hack4Edu'
__version__ = '1.0'

from flask_socketio import SocketIO
from .log import serve_application_logger
logger = serve_application_logger()
socketio = SocketIO()
