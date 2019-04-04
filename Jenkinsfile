pipeline {
  environment {
    registry = "amrutarajiv/docker-test"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/amrutarajiv/mocha-chai-sample'
      }
    }
    stage('Build') {
       steps {
         bat 'npm install'
       }
    }
    stage('Test') {
      steps {
        bat 'npm test'
      }
    }
    stage('Building image') {
      steps{
        timeout(time: 1, unit: 'HOURS') {
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        } }
      }
    }
    stage('Deploy Image') {
      steps{
        timeout(time: 1, unit: 'HOURS') {
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            } }
        }
      }
    }
  }
}
