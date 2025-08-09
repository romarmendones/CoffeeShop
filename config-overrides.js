module.exports = function override(config, env) {
  // Ignore the critical dependency warning for Supabase realtime-js
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    {
      module: /node_modules\/@supabase\/realtime-js/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ];

  return config;
};
