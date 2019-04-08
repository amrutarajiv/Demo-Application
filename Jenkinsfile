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
        bat "docker build -t amrutarajiv/docker-test:${env.BUILD_ID} ."
    }
    
    stage('Push Docker image'){
        withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
            bat "docker login -u amrutarajiv -p ${dockerHubPwd}"
        }        
        
        bat "docker push amrutarajiv/docker-test:${env.BUILD_ID}"
        
    }
    
    	stage('Run Container on Dev server'){
		def dockerRun = "docker run -p 8080:8080 -d --name Node-Docker-App amrutarajiv/docker-test:${env.BUILD_ID}" 
		sshagent(['dev-server']) {
			bat "ssh -o StrictHostKeyChecking=no ec2-user@172.31.16.163 ${dockerRun}"
		}
	}
}
