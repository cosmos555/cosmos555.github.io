// 명령어 사용법
// [user@server]$ grunt 명령어

/* 설치방법 :gruntfile.js, package.json을 복붙하고 콘솔에 명령어를 다음과 같이 입력한다.
 * 1. npm install (grunt가 설치되지 않았다면 먼저 npm install -g grunt-cli && npm install grunt --save 필요)
 * 2  아래에 있는 변수 buildPath, srcPath, projectName을 설정한다.
 * 3. grunt test를 실행하여 정상 작동하는 지 확인
 * 4. 합칠 파일들의 순서가 필요하다면 파일 명을 순서대로 변경하자.
 * 5. 잘된다면 grunt patch, grunt minor, grunt major등을 실행하여 어글리파이 한다.
 */

var buildPath = "./build/"; //js 떨궈질 폴더
var srcPath = ["./extras/","./object/","./scene/"]; //js 합칠 때 추가할 js 친구들 폴더. 여러개 가능
var readmePath = "./README.md"
var projectName = "word"; //프로젝트 이름
var isUglify = true; //어글리파이 여부
var isClean = true;
var isJshint = false; //jshint를 통해 js파일 검사 여부 grunt test시 확인 가능
var uglifyMangle = true; //변수명과 함수명의 변형 옵션 true 시 변형함
var uglifyCompress = false; //어글리파이시 압축 여부 gdapi기준 0.5kB 차이를 보임
var concatFooterComment = true; //concat할때 마지막줄에 버전 정보 주석으로 넣을지 여부
var sceneName = ["title","Ingame","wordNote"]; //Mangle시 바뀌면 안되는 변수명 배열이다. 둘 이상의 scene이 있다면 scene.change시 이름을 못찾아 에러를 뚝뚝 흘리니까 scene이 두개 이상이라면 여기 배열에 넣어주자

module.exports = function (grunt) {

  //초기설정
  var testOption = ['concat:test'];
  var patchOption = ['version::patch', 'clean:oldVersion', 'pkgReload', 'concat:release'];
  var minorOption = ['version::minor', 'clean:oldVersion', 'pkgReload', 'concat:release'];
  var majorOption = ['version::major', 'clean:oldVersion', 'pkgReload', 'concat:release'];
  var buildOption = ['clean:oldVersion', 'pkgReload','concat:release'];


  for (var i = 0; i < srcPath.length; i++) {
    srcPath[i] = srcPath[i].toString() + '*.js';
  }
  if (isUglify) {
    patchOption.push('uglify');
    minorOption.push('uglify');
    majorOption.push('uglify');
    buildOption.push('uglify');
  }

  if (isClean) {
    patchOption.push('clean:concatAndTest');
    minorOption.push('clean:concatAndTest');
    majorOption.push('clean:concatAndTest');
    buildOption.push('clean:concatAndTest');
  }

  if (isJshint) {
    testOption.push('jshint');
    patchOption.push('jshint');
    minorOption.push('jshint');
    majorOption.push('jshint');
    buildOption.push('jshint');
  }



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: {
      defaults: {
        src: ['package.json'] // 패키지 제이선에서 버전 읽기
      }
    },
    uglify: {
      options: {
        banner: 'console.log("' + projectName + ' version : <%= pkg.version %> build date : <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>");',
        // mangle: uglifyMangle,
        mangle: uglifyMangle == true ? {toplevel: true, reserved:sceneName} : false,
        compress: uglifyCompress,
      },
      build: {
        src: buildPath + projectName + '-<%= pkg.version %>.js',
        dest: buildPath + projectName + '-<%= pkg.version %>.min.js'
      }
    },
    concat: {
      release: {
        src: srcPath,
        dest: buildPath + projectName + '-<%= pkg.version %>.js',
        options: {
          footer:  (concatFooterComment == true ?  '\n//' : '\n') + projectName + '.VERSION = "<%= pkg.version %>"'
        }
      },
      test: {
        src: srcPath,
        dest: 'build/' + projectName + '-test.js',
        options: {
          footer:  (concatFooterComment == true ?  '\n//' : '\n') + projectName + '.VERSION = "Testing on <%= pkg.version %>"'
        }
      },
      options: {
        separator: '\n\n/*\n *** 파일 구분선 ***\n */\n\n',
        banner: '/*\n * build date : <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n */\n',
      }
    },
    jshint: {
      // all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      // beforeconcat: [srcPath + '*.js'],
      // afterconcat: buildPath + projectName+'-<%= pkg.version %>.js',
      all: 'build/' + projectName + '-test.js',
      options: {
        reporter: require('jshint-stylish'),
        curly: false,
        eqeqeq: false,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
        asi: true,
        force: true
      }
    },
    clean: {
      oldVersion: [buildPath + '*.js'],
      concatAndTest: [buildPath + '*.js', '!'+ buildPath +'*.min.js']
    }
    // mocha : {
    //   all : {
    //     src : ['test/testrunner.html'],
    //   },
    //   options : {
    //     run : true
    //   }
    // },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('pkgReload', function () {
    grunt.config.set('pkg', grunt.file.readJSON('package.json'));
  });

  // grunt.registerTask('sourceTest', ['mocha']);
  // grunt.registerTask('gitpatch', ['gitstash','gitcheckout','gitpull','checkout:master','gitcheckout','gitmerge','version::patch','pkgReload','gitadd','gitcommit','gitpush','concat','uglify']);

  grunt.registerTask('patch', patchOption);
  grunt.registerTask('minor', minorOption);
  grunt.registerTask('major', majorOption);
  grunt.registerTask('test', testOption);
  grunt.registerTask('build', buildOption);
};