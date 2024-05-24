pipeline {
    agent any

    environment {
        NODE_VERSION = '14.x' // This can be adjusted if you need a specific version in the future
        RECIPIENTS = 'your-email@gmail.com'
    }

    triggers {
        cron('H 23 * * *') // Schedule to run every day at 11 PM
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://your-repo-url.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use the system Node.js installation
                sh 'node -v'
                sh 'npm -v'
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run Playwright tests
                sh 'npx playwright test'
            }
        }

        stage('Archive Results') {
            steps {
                // Archive the test results
                archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            }
        }

        stage('Publish Report') {
            steps {
                // Publish the test report (assuming you have a reporter configured)
                publishHTML([reportDir: 'test-results', reportFiles: 'report.html', reportName: 'Test Report'])
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            script {
                emailext(
                    subject: 'Jenkins Build Success: Playwright Tests',
                    body: 'The Playwright tests ran successfully. Please find the attached test report.',
                    attachLog: true,
                    attachmentsPattern: 'test-results/report.html',
                    to: env.RECIPIENTS
                )
            }
        }
        failure {
            script {
                emailext(
                    subject: 'Jenkins Build Failure: Playwright Tests',
                    body: 'The Playwright tests failed. Please check the Jenkins job for details.',
                    attachLog: true,
                    attachmentsPattern: 'test-results/report.html',
                    to: env.RECIPIENTS
                )
            }
        }
    }
}
