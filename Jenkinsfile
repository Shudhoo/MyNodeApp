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
        stage('Update-k8s-Manifest-Repo') {
            environment {
                GIT_REPO_NAME = "MyNodeApp"
                GIT_USER_NAME = "Shudhoo"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'github')]) {
                    sh '''
                        rm -r MyNodeApp
                        git clone https://${github}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
                        cd ${GIT_REPO_NAME}
                        
                        git config user.email "shudhowani@gmail.com"
                        git config user.name "Shudhoo"
                        BUILD_NUMBER=${BUILD_NUMBER}
                        sed -i "s/ImageTag/${BUILD_NUMBER}/g" 06-client.yml
                        sed -i "s/ImageTag/${BUILD_NUMBER}/g" 07-server.yml
                        git add 06-client.yml 07-server.yml
                        git commit -m "Update deployments image to version ${BUILD_NUMBER}"
                        git push https://${github}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:master
                    '''
                }
            }
        }
    }
}
