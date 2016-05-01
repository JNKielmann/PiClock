import gulp from 'gulp'
import changed from 'gulp-changed'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import debug from 'gulp-debug'
import scp from 'gulp-scp2'
import GulpSSH from 'gulp-ssh'

const config = {
  host: '192.168.0.14',
  port: 22,
  username: 'pi',
  password: 'raspberry',
}

const ssh = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config,
})

const BACKEND_SRC = 'src/backend/**/*.js'
const BACKEND_DEST = 'dist/backend'

const SHARED_SRC = 'src/shared/**/*.js'
const SHARED_DEST = 'dist/shared'


gulp.task('buildBackend', ['buildShared'], () => {
  return gulp.src(BACKEND_SRC)
    .pipe(changed(BACKEND_DEST))
    .pipe(debug({ title: 'buildBackend: ' }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    // Workaround https://github.com/Microsoft/vscode/issues/936
    .pipe(sourcemaps.write('.', { sourceRoot: (file) => file.cwd + '/src/backend' }))
    .pipe(gulp.dest(BACKEND_DEST))
})


gulp.task('buildShared', () => {
  return gulp.src(SHARED_SRC)
    .pipe(changed(SHARED_DEST))
    .pipe(debug({ title: 'buildShared: ' }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    // Workaround https://github.com/Microsoft/vscode/issues/936
    .pipe(sourcemaps.write('.', { sourceRoot: (file) => file.cwd + '/src/shared' }))
    .pipe(gulp.dest(SHARED_DEST))
})

gulp.task('transferToPi', ['buildBackend'], () => {
  return gulp.src(['dist/**/*.js', '!dist/frontend/**/*.js'])
    .pipe(debug({ title: 'transferToPi: ' }))
    .pipe(scp({
      host: '192.168.0.14',
      username: 'pi',
      password: 'raspberry',
      dest: '/home/pi/PiClock/dist',
    }))
    .on('error', (err) => {
      console.log(err)
    })
    .on('finish', () => {
      console.log('Finished file transfer')
    })
})

function executeCommands(commands) {
  return ssh
    .shell(commands, { filePath: 'runOnPi.log' })
    .on('ssh2Data', (data) => {
      process.stdout.write(data.toString())
    })
    .pipe(gulp.dest('logs'))
}

gulp.task('runOnPi', ['transferToPi'], () => {
  const commands = ['cd /home/pi/PiClock', 'sudo nohup node --debug dist/backend/backend.js &']
  executeCommands(commands)
})

gulp.task('runOnPiBlocking', ['transferToPi'], () => {
  const commands = ['cd /home/pi/PiClock', 'sudo node --debug dist/backend/backend.js']
  return executeCommands(commands)
})



