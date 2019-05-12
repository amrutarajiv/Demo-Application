node {
    try {
     notifyBuild('STARTED')
        stage('SCM Checkout') {
            git credentialsId: 'github', url: 'https://github.com/amrutarajiv/DevOps-Demo-Application'
        }
    } catch (e) {
     // If there was an exception thrown, the build failed
            currentBuild.result = "FAILED"
            throw e
        } finally {
            // Success or failure, always send notifications
            notifyBuild(currentBuild.result)
        }

   /* stage('Build Application'){
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
    */
}

def notifyBuild(String buildStatus = 'STARTED') {
   // build status of null means successful
   buildStatus =  buildStatus ?: 'SUCCESSFUL'
 
   // Default values
   def colorName = 'RED'
   def colorCode = '#FF0000'
   def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
   def summary = "${subject} (${env.BUILD_URL})"
   def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
     <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>"""
 
   // Override default values based on build status
   if (buildStatus == 'STARTED') {
     color = 'YELLOW'
     colorCode = '#FFFF00'
   } else if (buildStatus == 'SUCCESSFUL') {
     color = 'GREEN'
     colorCode = '#00FF00'
   } else {
     color = 'RED'
     colorCode = '#FF0000'
   }
 
   // Send Slack notifications
   slackSend (color: colorCode, message: summary)
   /*slackSend baseUrl: 'https://hooks.slack.com/services/', 
                    channel: '#devops-pipeline', 
                    color: colorCode, 
                    message: summary, 
                    teamDomain: 'DevOps Team', 
                    tokenCredentialId: 'slack'*/
 
 }
