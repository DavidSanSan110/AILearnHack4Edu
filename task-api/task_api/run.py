import threading


from flask_cors import CORS
from flask import Flask, Blueprint, redirect, request

from task_api import config
from task_api.api.v1 import api
from task_api.api import namespaces
from task_api.core import cache, limiter
from task_api import events
from . import socketio

from task_api.model.task_daemon import TaskDaemon


app = Flask(__name__)

VERSION = (1, 0)
AUTHOR = 'Hack4Edu'


def get_version():
    """
    This function returns the API version that is being used.
    """

    return '.'.join(map(str, VERSION))


def get_authors():
    """
    This function returns the API's author name.
    """

    return str(AUTHOR)


__version__ = get_version()
__author__ = get_authors()
    

@app.route('/')
def register_redirection():
    """
    Redirects to dcoumentation page.
    """

    return redirect(f'{request.url_root}/{config.URL_PREFIX}', code=302)

def run_task_daemon():
    """
    This function runs the task daemon.
    """

    def _f():
        task_daemon = TaskDaemon(polling_interval=15)
        task_daemon.run()
    t = threading.Thread(target=_f)
    t.start()

def initialize_app(flask_app):
    """
    This function initializes the Flask Application, adds the namespace and registers the blueprint.
    """

    CORS(flask_app)

    v1 = Blueprint('api', __name__, url_prefix=config.URL_PREFIX)
    api.init_app(v1)

    limiter.exempt(v1)
    cache.init_app(flask_app)

    flask_app.register_blueprint(v1)
    flask_app.config.from_object(config)

    for ns in namespaces:
        api.add_namespace(ns)


def main():
    run_task_daemon()
    initialize_app(app)
    separator_str = ''.join(map(str, ["=" for i in range(175)]))
    print(separator_str)
    print(f'Debug mode: {config.DEBUG_MODE}')
    print(f'Authors: {get_authors()}')
    print(f'Version: {get_version()}')
    print(f'Base URL: http://localhost:{config.PORT}{config.URL_PREFIX}')
    print(separator_str)
    #app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG_MODE)
    socketio.init_app(app)
    socketio.run(app, host=config.HOST, port=config.PORT, debug=config.DEBUG_MODE, allow_unsafe_werkzeug=True)




if __name__ == '__main__':
    main()