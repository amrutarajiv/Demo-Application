node {
    
    stage('SCM Checkout') {
        git credentialsId: 'github', url: 'https://github.com/amrutarajiv/DevOps-Demo-Application'
    }

    stage('Build Application'){
        def mvnHome = tool name: 'maven-3', type: 'maven'
        bat "${mvnHome}/bin/mvn install"
    }
    
    stage('Build and Test'){
        nodejs('node') {
            //bat 'npm install'
            bat 'npm test'
        }
    }

    stage('Sonarqube') {
        def scannerHome = tool 'SonarQubeScanner'
    
        withSonarQubeEnv('Sonar') {
            bat "${scannerHome}/bin/sonar-scanner"
        }
        timeout(time: 10, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
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
		def dockerRun = "docker run -p 8000:8000 -d --name Node-Docker-App amrutarajiv/docker-test:${env.BUILD_ID}" 
		sshagent(['dev-server']) {
			bat "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-224-16-156.us-east-2.compute.amazonaws.com ${dockerRun}"
		}
	}
}
