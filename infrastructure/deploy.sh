#!/bin/bash
CURRENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
PARENT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd )
PACKAGE_VERSION=$(node -pe "require('$PARENT_DIR/package.json').version")
IMAGE_TAG=${2:-v$PACKAGE_VERSION}
NAMESPACE=${1:-staging}

read -p "Deploying $IMAGE_TAG to $NAMESPACE. Press [enter] to continue..."

set -x

helm upgrade --install --atomic ms-templates-${NAMESPACE} \
  --set "env=$NAMESPACE" \
  --set "image.tag=$IMAGE_TAG" \
  --set "environment.DATABASE_MONGODB_DBNAME=$DATABASE_MONGODB_DBNAME" \
  --set "environment.DATABASE_MONGODB_URI=$DATABASE_MONGODB_URI" \
  --set "environment.MS_TEMPLATES_AZURE_STORAGE_ACCOUNT_NAME=$MS_TEMPLATES_AZURE_STORAGE_ACCOUNT_NAME" \
  --set "environment.MS_TEMPLATES_AZURE_STORAGE_ACCOUNT_ACCESS_KEY=$MS_TEMPLATES_AZURE_STORAGE_ACCOUNT_ACCESS_KEY" \
  --namespace $NAMESPACE \
  $CURRENT_DIR/ms-templates
