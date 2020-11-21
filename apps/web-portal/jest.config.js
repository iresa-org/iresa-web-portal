module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/web-portal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'web-portal',
};
