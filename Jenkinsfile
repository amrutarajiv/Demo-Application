pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/amrutarajiv/mocha-chai-sample'
      }
    }
        
    stage('Install dependencies') {
      steps {
        bat 'npm install'
      }
    }