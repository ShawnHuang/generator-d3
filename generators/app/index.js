var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    var prompts = [{
      type    : 'input',
      name    : 'appname',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }];
    this.prompt(prompts, function(props){
      this.appname = props.appname; 
      done();
    }.bind(this));
  },
  app: function () {
    var context = { 
        appname: this.appname 
    };
    this.template('_bower.json', 'bower.json', context);
    this.template('_Gruntfile.js', 'Gruntfile.js', context);
    this.template('_package.json', 'package.json', context);
    this.copy('_bowerrc', '.bowerrc');
    this.copy('main.js', 'app/scripts/main.js');
    this.copy('main.css', 'app/styles/main.css');
  },
 generateApp: function(){
      var context = {
          content: "Content",
      };
   
      this.template('_index.html', 'app/index.html', context);
  },
  end: function () {
      this.installDependencies();
  }
});
