#!/bin/bash
set -e


SOURCE_REPO_REGION=eu-north-1
SOURCE_REPO_REGISTRY_ID=664269831428
SOURCE_REPO_NAME=demorp

DEST_REPO_REGION=eu-west-1
DEST_REPO_REGISTRY_ID=664269831428
DEST_REPO_NAME=demorp


#read -r -p "SOURCE_REPO_REGION: " SOURCE_REPO_REGION
#echo
#read -r -p "SOURCE_REPO_REGISTRY_ID: " SOURCE_REPO_REGISTRY_ID
#echo
#read -r -p "SOURCE_REPO_NAME: " SOURCE_REPO_NAME
#echo
#read -r -p "DEST_REPO_REGION: " DEST_REPO_REGION
#echo
#read -r -p "DEST_REPO_REGISTRY_ID: " DEST_REPO_REGISTRY_ID
#echo
#read -r -p "DEST_REPO_NAME: " DEST_REPO_NAME
#echo


echo SOURCE_REPO_REGION       "$SOURCE_REPO_REGION"
echo SOURCE_REPO_REGISTRY_ID   "$SOURCE_REPO_REGISTRY_ID"
echo SOURCE_REPO_NAME         "$SOURCE_REPO_NAME"
echo DEST_REPO_REGION       "$DEST_REPO_REGION"
echo DEST_REPO_REGISTRY_ID   "$DEST_REPO_REGISTRY_ID"
echo DEST_REPO_NAME         "$DEST_REPO_NAME"


read -p "Are these information correct y/n? " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo Please run again with correct information
    echo
    exit 1
fi

echo Logging into source docker
aws ecr get-login-password --region "$SOURCE_REPO_REGION" | docker login --username AWS --password-stdin "$SOURCE_REPO_REGISTRY_ID".dkr.ecr."$SOURCE_REPO_REGION".amazonaws.com
echo
echo Logging into destination docker
aws ecr get-login-password --region "$DEST_REPO_REGION" | docker login --username AWS --password-stdin "$DEST_REPO_REGISTRY_ID".dkr.ecr."$DEST_REPO_REGION".amazonaws.com
echo


read -p "Should we create destination repository? y/n" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo Creating repository...
    echo "$(aws ecr create-repository --repository-name "$DEST_REPO_NAME" --region "$DEST_REPO_REGION")"
fi

ORDERED_SOURCE_IMAGES=$(aws ecr describe-images --repository-name "$SOURCE_REPO_NAME" --registry-id "$SOURCE_REPO_REGISTRY_ID" --region $SOURCE_REPO_REGION --no-paginate --query 'sort_by(imageDetails,& imagePushedAt)')

ORDERED_SOURCE_IMAGE_TAGS=$(jq -n -r -c --arg m "$ORDERED_SOURCE_IMAGES"   '$m | fromjson | .[]')

#echo ORDERED_SOURCE_IMAGES
#echo "$ORDERED_SOURCE_IMAGES"

#echo ORDERED_SOURCE_IMAGE_TAGS
#echo "$ORDERED_SOURCE_IMAGE_TAGS"

# make newlines the only separator
IFS=$'\n'
for row in $ORDERED_SOURCE_IMAGE_TAGS ; do
  selectJsonKey() { echo "${row}" | jq -r ".${1}" ; } ;
  echo pulling: "$SOURCE_REPO_NAME" tag: "$(selectJsonKey 'imageTags[0]')"

  IMAGE_TO_PULL=$SOURCE_REPO_REGISTRY_ID.dkr.ecr.$SOURCE_REPO_REGION.amazonaws.com/$SOURCE_REPO_NAME:"$(selectJsonKey 'imageTags[0]')"
  IMAGE_TO_PUSH=$DEST_REPO_REGISTRY_ID.dkr.ecr.$DEST_REPO_REGION.amazonaws.com/$DEST_REPO_NAME:"$(selectJsonKey 'imageTags[0]')"

  docker pull "$IMAGE_TO_PULL"
  docker tag  "$IMAGE_TO_PULL" "$IMAGE_TO_PUSH"
  docker push "$IMAGE_TO_PUSH"
done
echo Image and all the tags transfered successfully.
