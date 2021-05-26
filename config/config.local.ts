import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.cluster = {
    listen: {
      port: 7002,
      hostname: 'localhost'
      // hostname: '10.20.49.23'
      // hostname: '172.20.10.12'
      // hostname: '172.19.28.172'
    }
  }

  return config;
};
