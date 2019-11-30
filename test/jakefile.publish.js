var fs = require('fs')
  , utils = require('utilities');

fs.writeFileSync('package.json', '{"version": "0.0.1"}');
utils.file.mkdirP('tmp_publish');
fs.writeFileSync('tmp_publish/foo.txt', 'FOO');

publishTask('zerb', function () {
  this.packageFiles.include([
    'package.json'
    , 'tmp_publish/**'
  ]);
  this.publishCmd = 'node -p -e "\'%filename\'"';
  this.gitCmd = 'echo'
  this.scheduleDelay = 0;

  this._ensureRepoClean = function () {};
  this._getCurrentBranch = function () {
    return 'v0.0'
  };
});

jake.setTaskTimeout(5000);

jake.Task['publish'].on('complete', function () {
  utils.file.rmRf('tmp_publish', {silent: true});
  utils.file.rmRf('package.json', {silent: true});
});

