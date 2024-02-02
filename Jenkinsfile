pipeline {
    agent any

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
        stage('SonarQube analysis') {
        environment {
            scannerHome = tool 'SonarQube_4.3.0'
        }
        steps {
            withSonarQubeEnv('sonar-scanner') {
                sh '''
                ${scannerHome}/bin/sonar-scanner \
                -D sonar.sources=.project/src \
                '''
            }
        }
    }
    }
}