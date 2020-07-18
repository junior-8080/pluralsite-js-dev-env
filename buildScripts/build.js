import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env._NODE_DEV = 'production';

console.log(chalk.blue('Generating bundle for productio.This will take a moment...'));
webpack(webpackConfig).run((err,stats)=>{
  if(err){ // if fatal error occur stop here.
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(error));
  }

  if(jsonStats.hasWarnings){
    console.log(chalk.yellow('webpack generated the following warnings'));
    return jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`webpack status:,${stats}`);

  //if the production build succeeds ?

  console.log(chalk.green('App has successfully build for production and written in the ./dist'));

 return 0;

});
