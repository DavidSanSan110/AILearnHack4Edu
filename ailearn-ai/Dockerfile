FROM python:3.8

RUN mkdir /app

WORKDIR /app

ADD /ailearn-ai /app/ailearn-ai

RUN pip install -r ./ailearn-ai/requirements.txt

RUN pip install ./ailearn-ai/ --upgrade

EXPOSE 10002

CMD ["ailearn_ai"]