module.exports = {
  apps: [
    {
      name: 'remix',
      script: './node_modules/.bin/remix-serve',
      args: 'build',
      cwd: './',
      instances: 1,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'production',
      },
      env_prod: {
        NODE_ENV: 'production',
        NODE_DEMO_1: 'NODE_DEMO_1',
      },
    },
  ],
};
