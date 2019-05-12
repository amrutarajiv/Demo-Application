pipeline {
    agent any
    stages {
    stage('SCM Checkout') {
        git credentialsId: 'github', url: 'https://github.com/amrutarajiv/DevOps-Demo-Application'
    }
	    post {
       // only triggered when build is successful
       success {
                    slackSend baseUrl: 'https://hooks.slack.com/services/', 
                    channel: '#devops-pipeline', 
                    color: 'good', 
                    message: 'Jenkins stage ran successfully', 
                    teamDomain: 'DevOps Team', 
                    tokenCredentialId: 'slack'
       }
       // triggered when build fails
       failure {
                    slackSend baseUrl: 'https://hooks.slack.com/services/', 
                    channel: '#devops-pipeline', 
                    color: 'danger', 
                    message: 'Jenkins stage failed', 
                    teamDomain: 'DevOps Team', 
                    tokenCredentialId: 'slack'
        }

    }

    stage('Build Application'){
        def mvnHome = tool name: 'maven-3', type: 'maven'
        bat "\"${mvnHome}\"\\bin\\mvn install"
    }
    
    stage('Test Application'){
        nodejs('node') {
            bat 'npm test'
        }
    }

    stage('Sonarqube') {
        def scannerHome = tool 'SonarQubeScanner'
    
        withSonarQubeEnv('Sonar') {
            bat "\"${scannerHome}\"\\bin\\sonar-scanner"
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
    
    /*	stage('Run Container on the server'){
		def dockerRun = "docker run -p 8000:8000 -d --name Node-Docker-App amrutarajiv/docker-test:${env.BUILD_ID}" 
		sshagent(['dev-server']) {
			bat "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-224-16-156.us-east-2.compute.amazonaws.com ${dockerRun}"
		}
	} */
	}
}
