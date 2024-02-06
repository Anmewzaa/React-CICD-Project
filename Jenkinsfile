pipeline {
    agent any

    environment {
      SONARSCANNER = 'sonarscanner'
      SONARSERVER = 'sonarserver'
      DOCKER_USER = 'punyakon'
      IMAGE_NAME = 'react-pipeline-image'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Github-token', url: 'https://github.com/Anmewzaa/React-CICD-Project']])
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
        stage('Build and Push Docker Image') {
            steps {
                script {
                  env.VERSION = "v0.0.${BUILD_NUMBER}"
                  sh('''
                    sudo docker build -t ${DOCKER_USER}/${IMAGE_NAME}:${VERSION} ./project/
                    sudo docker push ${DOCKER_USER}/${IMAGE_NAME}:${VERSION}
                  ''')
                }
            }
        }
        stage('Trivy Image scan') {
          steps {
            sh('''
              sudo trivy image punyakon/react-pipeline-image:v0.0.${BUILD_NUMBER}
            ''')
          }
        }
        stage('Clean up Docker Image') {
          steps {
            sh('''
              sudo docker rmi ${DOCKER_USER}/${IMAGE_NAME}:${VERSION}
            ''')
          }
        }
        stage("Deploy to Kubernetes") {
            steps {
              sh('''
                  cat k8s/deployment.yaml | envsubst | sudo kubectl apply -f -
                  sudo kubectl apply -f k8s/service.yaml
                  echo "Deploy Version:${VERSION}"
              ''')
            }
        }
    }
}