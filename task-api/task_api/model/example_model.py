from typing import Any, Dict

from task_api import config, logger



class ExampleModel:

    def example_function(self, username: str, password: str) -> str:
        """
        This function is an example of how to create a model.
        """
        if username == 'admin' and password == 'admin':
            return 'Hello admin!'
        else:
            return 'Hello user!'
