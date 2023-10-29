import os


def handle400error(ns, message):
    """
    Function to handle a 400 (bad arguments code) error.
    """

    return ns.abort(400, status=message, statusCode="400")


def handle404error(ns, message):
    """
    Function to handle a 404 (not found) error.
    """

    return ns.abort(404, status=message, statusCode="404")


def handle500error(ns, message=None):
    """
    Function to handle a 500 (unknown) error.
    """

    if message is None:
        message = "Unknown error, please contact administrator."

    return ns.abort(500, status=message, statusCode="500")
