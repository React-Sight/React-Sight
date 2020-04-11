module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '75',
          firefox: '68',
        },
      },
    ],
  ],
};
