module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ngx-spotify',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'ngx-spotify',
};
