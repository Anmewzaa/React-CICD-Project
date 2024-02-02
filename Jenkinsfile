pipeline {
    agent any

    environment {
      SONARSCANNER = 'sonarscanner'
      SONARSERVER = 'sonarserver'
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
    }
}