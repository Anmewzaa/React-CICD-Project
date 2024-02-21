pipeline {
    agent any

    environment {
      SONARSCANNER = 'sonarscanner'
      SONARSERVER = 'sonarserver'
      HOST_NAME = 'asia.gcr.io'
      PROJECT_ID = 'project-punyakon'
      IMAGE_NAME = 'react-image'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from SCM') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Anmewzaa/React-CICD-Project']])
            }
        }
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''--scan project --format HTML''', odcInstallation: 'OWASP-Dependency-Check'
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
                  env.VERSION = "v0.1.${BUILD_NUMBER}"
                  sh('''
                    whoami
                    sudo docker build -t ${HOST_NAME}/${PROJECT_ID}/${IMAGE_NAME}:${VERSION} ./project/
                    sudo docker push ${HOST_NAME}/${PROJECT_ID}/${IMAGE_NAME}:${VERSION}
                  ''')
                }
            }
        }
        stage('Trivy Image scan') {
          steps {
            sh('''
              sudo trivy image ${HOST_NAME}/${PROJECT_ID}/${IMAGE_NAME}:${VERSION}
            ''')
          }
        }
        stage('Clean up Docker Image') {
          steps {
            sh('''
              sudo docker rmi ${HOST_NAME}/${PROJECT_ID}/${IMAGE_NAME}:${VERSION}
            ''')
          }
        }
        stage('Trigger Manifest Update') {
          steps {
            build job:'Manifestfile',parameters: [string(name:'DOCKERTAG',value: "v0.1.${BUILD_NUMBER}")]
          }
        }
    }
}