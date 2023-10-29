FROM python:3.8

RUN mkdir /app

WORKDIR /app

ADD /task-api /app/task-api

RUN pip install -r ./task-api/requirements.txt

RUN pip install ./task-api/ --upgrade

EXPOSE 10003

CMD ["task_api"]

