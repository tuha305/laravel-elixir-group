var gutil = require('gulp-util');

var ElixirGroup = {
	// task container, KV: taskName => taskFuncion()
	tasks   : {},
	// register task group.
	register: function (taskName, taskFuncion) {
		this.tasks[taskName] = taskFuncion;
		gutil.log(gutil.colors.white('Register Group:', taskName));
	},
	// run task group.
	run     : function (taskName) {
		gutil.log(gutil.colors.white('Starting Group:', taskName));
		var taskFuncion = this.tasks[taskName];
		if (typeof(taskFuncion) == 'function') {
			taskFuncion();
		}
		gutil.log(gutil.colors.white('Finished Group:', taskName));
		this.finally();
	},
	// run all task group.
	runAll  : function () {
		for (var taskName in this.tasks) {
			this.run(taskName);
		}
		this.finally();
	},
	// deal something should be shared.
	finally : function () {
	}
};


ElixirGroup.start = function () {
	// if the args contain the taskName with -- prefix, then run the task.
	var hasGroup = false;
	for (var arg in gutil.env) {
		if (!!ElixirGroup.tasks[arg]) {
			ElixirGroup.run(arg);
			hasGroup = true;
		}
	}

	// otherwise, args don't contain any taskName then run all tasks by default. it's maybe useful for deployment.
	if (!hasGroup) {
		ElixirGroup.runAll();
	}
}

module.exports = ElixirGroup;