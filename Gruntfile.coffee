'use strict'

module.exports = (grunt) ->

  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    # Shell Task
    shell:
      npm:
        command: 'npm install'

    # Sass Task
    sass:
      options:
        style: 'expanded'
        precision: 10
        update: true

      dev:
        expand: true
        cwd: 'src/scss'
        src: [
          '*.{scss,sass}'
          '!_*.{scss,sass}'
        ]
        dest: 'css'
        ext: '.css'

    # CSSComb Task
    csscomb:
      dev:
        options:
          config: 'src/.csscomb.json'
        expand: true
        cwd: 'css'
        src: [
          '*.css'
          '!*.min.css'
          '!*.map'
        ]
        dest: 'css'
        ext: '.css'

    # PostCSS Task
    postcss:
      dev:
        options:
          map: true
          processors: [
            require('autoprefixer')({
              browsers: [
                'last 10 versions'
                'ie 11'
                'ie 10'
                'ie 9'
                'ie 8'
              ]
            })
          ]
        src: ['**/*.css']

    # CSSmin Task
    cssmin:
      dev:
        options:
          sourcemap: true
        expand: true
        cwd: 'css'
        src: ['*.css', '!*.map']
        dest: 'css'
        ext: '.css'

    # Coffee Task
    coffee:
      dev:
        expand: true
        base: true
        cwd: 'src/coffee'
        src: ['*.coffee']
        dest: 'js'
        ext: '.js'

    # Coffeelint Task
    coffeelint:
      dev:
        options:
          configFile: 'src/.coffeelint.json'
        files:
          src: ['src/**/*.coffee', 'Gruntfile.coffee']

    # Watch Task
    watch:
      options:
        livereload: true
        dateFormat: (time) ->
          grunt.log.writeln('Grunt has finished in ' + time + 'ms!')
          grunt.log.writeln('Waiting...')
        event: ['all']
        interrupt: true

      npm:
        files: ['package.json']
        task: ['shell:npm']

      configFiles:
        options:
          reload: true
        files: ['Gruntfile.coffee']
        task: ['coffeelint']

      sass:
        files: '**/*.{scss,sass}'
        tasks: ['sass']

      coffee:
        files: [
          '**/*.coffee'
          '!Gruntfile.coffee'
        ]
        tasks: ['coffee']

      js:
        files: '**/*.js'

  # Build Task
  grunt.registerTask 'sass-build', [
    'sass'
    'csscomb'
    'postcss'
    'cssmin'
  ]
  grunt.registerTask 'coffee-build', [
    'coffee'
    'coffeelint'
  ]

  # Default Task
  grunt.registerTask 'default', [
    'sass-build'
    'coffee-build'
    'watch'
  ]