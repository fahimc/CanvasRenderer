module.exports = function(grunt) {
	grunt.file.defaultEncoding = 'utf8';
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		jsdoc : {
			dist : {
				src : ['app/lib/canvas/*.js', 'README.md'],
				dest : 'pages',
				options : {
					template : 'template/default'
				}
			}
		},
		  lexicon: {
    all: {
      src: ["app/lib/canvas/*.js"],
      dest: "wiki",
      options: {
        title: "The Docs",
        format: "markdown"
      }
    }
  },
		concat : {
			options : {
				stripBanners : true,
				banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			dist : {
				src : ['app/lib/canvas/CanvasRenderer.js', 'app/lib/canvas/Canvas.js', 'app/lib/canvas/CanvasDisplayObject.js', 'app/lib/canvas/*.js'],
				dest : 'src/CanvasRenderMax.js'
			}
		},
		uglify : {
			options : {
				// the banner is inserted at the top of the output
				banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			dist : {
				files : {
					'src/CanvasRenderMax.min.js' : ['<%= concat.dist.dest %>']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-github-pages');
	grunt.loadNpmTasks('grunt-lexicon');
	// A very basic default task.
	grunt.registerTask('default', ["concat", "uglify", "jsdoc"]);
	grunt.registerTask('wiki', ["lexicon"]);

};
