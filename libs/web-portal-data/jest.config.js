module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/web-portal-data',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'web-portal-data',
};
