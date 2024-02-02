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
        stage('SonarQube Analysis') {
          withSonarQubeEnv() {
            sh ("""
              sonar-scanner \
              -Dsonar.projectKey=React-pipeline \
              -Dsonar.sources=. \
              -Dsonar.host.url=http://35.213.160.121:9000 \
              -Dsonar.login=sqp_ada09d879bc0eda078dcc9396f4b8ce94386b2c2
            """)
          }
        }
    }
    }
}