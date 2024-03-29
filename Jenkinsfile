acrUrl = "sourcery2021fall.azurecr.io"
team = "interview-helper" // Team handle
app = "frontend" // Type of application
hostname = "interview-helper.devbstaging.com" // DNS name (needs to be manually configured by DevOps)

img = "${acrUrl}/${team}/${app}"

pipeline {
  agent {
    kubernetes {
      label "build-tools"
    }
  }
  options {
    durabilityHint("PERFORMANCE_OPTIMIZED")
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
  }

  environment {
      IMAGE_TAG = sh(returnStdout: true, script: 'printf ${GIT_COMMIT:=missing}')
    }

  stages {
    stage("Build app") {
      steps {
        container("node14-slim") {
          sh("CI=true npm ci")
          sh("CI=true npm run lint")
          sh("CI=true npm run build")
        }
      }
    }
    stage("Build docker image") {
      when {
        branch "master"
      }

      steps {
        container("docker") {
          sh("set +x; docker login --username \$DOCKER_USERNAME --password \$DOCKER_PASSWORD ${acrUrl}; set -x")
          sh("docker pull ${img}:latest || true")
          sh """
              docker build \
              --cache-from ${img}:latest \
              -t ${img}:latest \
              -f "./Dockerfile" \
              "."
             """
        }
      }
    }
    stage("Deploy to ACR") {
      when {
        branch "master"
      }

      steps {
        container("docker") {
          sh("set +x; docker login --username \$DOCKER_USERNAME --password \$DOCKER_PASSWORD ${acrUrl}; set -x")
          sh("docker tag ${img}:latest ${img}:${env.IMAGE_TAG}")
          sh("docker push ${img}:latest")
          sh("docker push ${img}:${env.IMAGE_TAG}")
        }
      }
    }

    stage("Deploy to Kubernetes") {
      when {
        branch "master"
      }

      steps {
        container("kubectl") {
           sh """
             helm upgrade --install ${team}-${app} ./helm/deployment \
             -f ./helm/values.yaml --namespace ${team} \
             --set nameOverride=${app} \
             --set container.image=${img} \
             --set service.ingress.hostname=${hostname} \
             --set service.ingress.paths[0]=/
              """
        }
      }
    }
  }
}
