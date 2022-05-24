// import { Module } from '@nestjs/common';
// import { ConfigService } from './config.service';

// @Module({
//   providers: [
//     {
//       provide: ConfigService,
//       useValue: new ConfigService(".env"),
//     },
//   ],
//   exports: [ConfigService],
// })
// export class ConfigModule {}

import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

export interface ConfigModuleOptions {
  folder: string;
}

@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}