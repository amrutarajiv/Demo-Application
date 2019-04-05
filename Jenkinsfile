node {
    
    stage('SCM Checkout') {
        git credentialsId: 'github', url: 'https://github.com/amrutarajiv/mocha-chai-sample'
    }
    
    stage('Build and Test'){
        nodejs('node') {
            bat 'npm install'
            bat 'npm test'
        }
    }
    
    stage('Build Docker image'){
        bat 'docker build -t amrutarajiv/docker-test:1.0 .'
    }
    
    stage('Push Docker image'){
        withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
            bat "docker login -u amrutarajiv -p ${dockerHubPwd}"
        }        
    bat 'docker push amrutarajiv/docker-test:1.0'
        
    }
}
