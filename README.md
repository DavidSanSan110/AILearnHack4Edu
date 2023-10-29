# Hack4Edu2023

<p align="center">
    <a href="https://www.youtube.com/watch?v=tGzuL2zinH0"><img src="https://img.youtube.com/vi/tGzuL2zinH0/0.jpg" alt="IMAGE ALT TEXT"></a>
</p>

## Description
This is a project for the Hack4Edu2023 hackathon. It is a web application that allows teachers to create and manage content for their classes. It also generates personalized quizzes for students based on their performance on the content. With this application, teachers can easily create and manage content for their classes, and students can learn at their own pace.
We use AI to generate the optimal roadmap for each student, and to correct their quizzes using open-ended questions.

## Manual Installation
To install the project, you need to have Node.js and npm installed on your computer. Then, you can clone the repository and run the following commands:
For the backend:
```
cd server
npm install
npm start
```
For the frontend:
```
cd web
npm install
npm start
```
For the AI:
```
cd ailearn-ai
pip install -r requirements.txt
sudo sh launch.sh
```
For the Task Manager:
```
cd task-api
pip install -r requirements.txt
sudo sh launch.sh
```

## Docker Installation
To install the project using Docker, you need to have Docker installed on your computer. Then, you can clone the repository and run the following commands:
```
cd task-api
docker build -t task-api .
docker run -d -p 10003:10003 task-api
cd ..
cd ailearn-ai
docker build -t ailearn-ai .
docker run -d -p 10002:10002 ailearn-ai
cd ..
cd server
docker build -t server .
docker run -d -p 10000:10000 server
```

Or take a look at ./github/workflows/main.yml to see how to deploy the project on a server.
You will need to configure your own .env file with the following variables:
For the ailern-ai:
```
OPENAI_API_KEY=<your openai api key>
```
For the task-api:
```
PGHOST=<your postgres host>
PGUSER=<your postgres user>
PGPASSWORD=<your postgres password>
PGDATABASE=<your postgres database>
PGPORT=<your postgres port>
```
For the server:
```
PORT=<your server port>
JWTSECRET=<your jwt secret>
PGHOST=<your postgres host>
PGUSER=<your postgres user>
PGPASSWORD=<your postgres password>
PGDATABASE=<your postgres database>
PGPORT=<your postgres port>
HOST=<your server host>
```
For the web:
```
REACT_APP_SERVER_URL=<your server url>
```

## Authors
- [Jorge Carrasco Pollo](https://github.com/Carrask0)
- [David Sánchez Sánchez](https://github.com/DavidSanSan110)
- [Alejandro Prieto Ramírez](https://github.com/elenjendro)
- [Pablo Martín Sánchez](https://github.com/Pablo1300)
- [Juan Vázquez López](https://github.com/JuanVlo)

