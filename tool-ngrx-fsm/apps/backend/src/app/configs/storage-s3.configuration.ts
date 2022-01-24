import AWS from 'aws-sdk';
import { ClientConfiguration as S3ClientConfiguration } from 'aws-sdk/clients/s3';
import { Service } from 'typedi';

import { EnvironmentConfiguration } from './environment.configuration';
import { ECSCredentialsOptions } from 'aws-sdk/lib/credentials/ecs_credentials';

@Service()
export class StorageS3Configuration {
  s3: AWS.S3;

  constructor(private environment: EnvironmentConfiguration) {
    if (!this.environment.isLocalDevelopment()) {
      AWS.config.credentials = new AWS.ECSCredentials(this.getProdEcsCredentials);
    }

    this.s3 = new AWS.S3(this.environment.isLocalDevelopment() ? this.getLocalS3Configuration : {});
  }

  async init(): Promise<void> {
    const bucketExists = await this.bucketExists();

    if (!bucketExists && this.environment.isLocalDevelopment()) {
      await this.s3.createBucket({ Bucket: this.environment.AWS_BUCKET_NAME }).promise();
    }
  }

  private async bucketExists(): Promise<boolean> {
    try {
      await this.s3.getBucketAcl({ Bucket: this.environment.AWS_BUCKET_NAME }).promise();
      return true;
    } catch (e) {
      if (e && e.code === 'NoSuchBucket') {
        return false;
      }

      throw new Error(e);
    }
  }

  get getInstance(): AWS.S3 {
    return this.s3;
  }

  private get getProdEcsCredentials(): ECSCredentialsOptions {
    return {
      httpOptions: { timeout: 5000 }, // 5 second timeout
      maxRetries: 10 // retry 10 times
    };
  }

  private get getLocalS3Configuration(): S3ClientConfiguration {
    return {
      accessKeyId: 'MINIO_ROOT_USER',
      secretAccessKey: 'MINIO_ROOT_PASSWORD',
      region: 'eu-west-1',
      s3ForcePathStyle: true,
      endpoint: 'http://localhost:9000',
      signatureVersion: 'v4'
    };
  }
}
