import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '172.19.28.172'
    }
  }

  return config;
};
