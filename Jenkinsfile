pipeline {
    agent any

    environment {
      SONARSCANNER = 'sonarscanner'
      SONARSERVER = 'sonarserver'
      DOCKER_USER = 'punyakon'
      IMAGE_NAME = 'react-pipeline-image'
      IMAGE_TAG = 'v0.0.${BUILD_NUMBER}'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Github-token', url: 'https://github.com/Anmewzaa/React-pipeline-master']])
            }
        }
        stage('SonarQube Analysis') {
          environment {
            scannerHome = tool "${SONARSCANNER}"
          }
          steps {
            withSonarQubeEnv("${SONARSERVER}") {
            sh ("""
              ${scannerHome}/bin/sonar-scanner \
                -D sonar.projectKey=React-pipeline \
                -D sonar.projectName=React-pipeline \
                -D sonar.projectVersion=1.0.0 \
                -D sonar.sources=./project/src \
                -D sonar.test.inclusions=/ \
                -D sonar.exclusions=/
            """)
            }
          }
        }
        stage('Build Docker Image') {
            steps {
                sh('''
                  whoami
                  sudo docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG} ./project/
                ''')
            }
        }
    }
}