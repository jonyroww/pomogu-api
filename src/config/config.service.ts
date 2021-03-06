import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import Joi from '@hapi/joi';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvironmentConfig;
  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
  }

  get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.envConfig[key];
  }

  private validateInput(envVars: NodeJS.ProcessEnv) {
    const envVarsSchema = Joi.object({
      NODE_ENV: Joi.string().default('development'),
      HOST: Joi.string().default('localhost'),
      PORT: Joi.number().default(4000),

      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      BASE_URL: Joi.string()
        .uri()
        .required(),
      SMTP_URL: Joi.string().required(),
      EMAIL_FROM: Joi.string().required(),
      SMS_API_ID: Joi.string().required(),
      SMS_CODE_GEN: Joi.boolean().required(),
      SUPPORT_EMAIL: Joi.string().required(),
    }).options({
      stripUnknown: true,
    });
    const { error, value } = envVarsSchema.validate(envVars);
    if (error) {
      throw error;
    }
    return value;
  }
}

export interface EnvironmentConfig {
  PORT: number;
  HOST: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  BASE_URL: string;
  EMAIL_FROM: string;
  SMTP_URL: string;
  SMS_API_ID: string;
  SMS_CODE_GEN: boolean;
  SUPPORT_EMAIL: string;
}
