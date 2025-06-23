pipeline {
    agent any
    environment {
        SONAR_HOME = tool "SonarQube"
    }
    stages {
        stage('Code-Checkout') {
            steps {
                git url: "https://github.com/Shudhoo/MyNodeApp.git", branch: "master"
            }
        }

        stage('Sonar-Qube-Code-Quality-Analysis') {
            steps {
                withSonarQubeEnv("SonarQube") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=MyNodeApp -Dsonar.projectKey=MyNodeApp"
                }
            }
        }

        stage('Docker-Build-Push & Scan-Docker-Images') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker_cred', url: 'https://index.docker.io/v1/') {
                        dir('client') {
                            sh """
                                docker build -f Dockerfile -t shudhodhan/nodeappclient:${BUILD_NUMBER} .
                                trivy image --severity HIGH,CRITICAL shudhodhan/nodeappclient:${BUILD_NUMBER}
                                docker push shudhodhan/nodeappclient:${BUILD_NUMBER}
                            """
                        }
                        dir('server') {
                            sh """
                                docker build -f Dockerfile -t shudhodhan/nodeappserver:${BUILD_NUMBER} .
                                trivy image --severity HIGH,CRITICAL shudhodhan/nodeappserver:${BUILD_NUMBER}
                                docker push shudhodhan/nodeappserver:${BUILD_NUMBER}
                            """
                        }
                    }
                }
            }
        }
        stage('Update-k8s-Manifest-Repo') {
            environment {
                GIT_REPO_NAME = "MyNodeApp-Manifests"
                GIT_USER_NAME = "Shudhoo"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'github')]) {
                    sh '''
                        git clone https://${github}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
                        cd ${GIT_REPO_NAME}
                        
                        git config user.email "shudhowani@gmail.com"
                        git config user.name "Shudhoo"
                        BUILD_NUMBER=${BUILD_NUMBER}
                        sed -i "s|shudhodhan/nodeappclient:[^ ]*|shudhodhan/nodeappclient:${BUILD_NUMBER}|g" 06-client.yml
                        sed -i "s|shudhodhan/nodeappserver:[^ ]*|shudhodhan/nodeappserver:${BUILD_NUMBER}|g" 07-server.yml
                        git add 06-client.yml 07-server.yml
                        git commit -m "Update deployments image to version ${BUILD_NUMBER}"
                        git push https://${github}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:master
                    '''
                }
            }
        }
    }
}
