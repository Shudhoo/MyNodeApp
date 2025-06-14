pipeline {
    agent any
    environment {
        SONAR_HOME = tool "SonarQube"
    }
    stages {
        stage('Code-Checkout') {
            steps {
                git url: "https://github.com/Shudhoo/React-Login-Page.git", branch: "master"
            }
        }

        stage('Sonar-Qube-Quality-Analysis') {
            steps {
                withSonarQubeEnv("SonarQube") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=React-Login-Page -Dsonar.projectKey=React-Login-Page"
                }
            }
        }

        stage('Docker-Build-Push & Scan-Docker-Images') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker_cred', url: 'https://index.docker.io/v1/') {
                        dir('client') {
                            sh """
                                docker build -f Dockerfile -t shudhodhan/nodeapp:client${BUILD_NUMBER} .
                                trivy image --severity HIGH,CRITICAL shudhodhan/nodeapp:client${BUILD_NUMBER}
                                docker push shudhodhan/nodeapp:client${BUILD_NUMBER}
                           """
                        }
                        dir('server') {
                            sh """
                                docker build -f Dockerfile -t shudhodhan/nodeapp:server${BUILD_NUMBER} .
                                trivy image --severity HIGH,CRITICAL shudhodhan/nodeapp:server${BUILD_NUMBER}
                                docker push shudhodhan/nodeapp:server${BUILD_NUMBER}
                            """
                        }
                    }
                }
            }
        }
    }
}
