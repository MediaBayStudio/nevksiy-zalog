let { src, dest } = require('gulp'),
  fs = require('fs'),
  path = require('path').posix,
  argv = require('yargs').argv,
  config = require('../config.js'),
  createFile = require('../start/create-file.js'),
  createInc = function(cb) {
    let filename = argv.src,
      functionsPHPFilepath = path.join(config.src.path, 'functions.php'),
      filepath,
      comment = '',
      requireStr,
      requireText;

    if (filename) {
      if (filename.indexOf('.php') === -1) {
        filename += '.php';
      }
      filepath = path.join(config.src.inc, filename);

      // Проверяем существует ли уже файл
      try {
        let fileExists = fs.existsSync(filepath);

        if (fileExists) {
          console.error('Файл ' + filepath + ' уже существует!');
        } else {
          // Если файл не существует, то создать его и вставить в functions.php
          createFile(filepath, '');
          console.log('Создан файл ' + filepath);

          // Строка коммента, если он передан
          if (argv.comment) {
            comment = '// ' + argv.comment + '\n';
          }

          // Строка require в functions.php
          requireStr = 'require $template_directory . \'/inc/' + filename + '\'';

          try {
            let functionsPHPContent = fs.readFileSync(functionsPHPFilepath).toString();

            // Проверим есть ли уже подключение такого файла
            functionsPHPContent = functionsPHPContent.replace(comment + requireStr, '')
              .replace(requireStr, '');

            if (argv.admin) {
              // Вставляем только к функциям админа
              let matches = functionsPHPContent.match(/is_admin_bar_showing\(\)\s?\)\s?{[\s\S]*?(?=})/),
                firstRequirePosition = matches[0].length + matches.index;

              requireText = '\t' + comment + '\t' + requireStr;

              if (firstRequirePosition) {
                let firstPartContent = functionsPHPContent.slice(0, firstRequirePosition),
                  secondPartContent = functionsPHPContent.slice(firstRequirePosition),
                  functionsPHPNewContent = firstPartContent + requireText + '\n' + secondPartContent;

                createFile(functionsPHPFilepath, functionsPHPNewContent);
                console.log(requireText + ' Вставлено в functions.php');
              } else {
                // Если позиция не найдена, то вставим просто в конец файла
                functionsPHPContent += '\n' + requireText;
                console.log(requireText + ' Вставлено в конец functions.php');
              }

            } else {
              // Вставляем просто вначало
              // ищем самый первый require без комментария или с ним
              let firstRequirePosition = functionsPHPContent.search(/\n?(?:(?:\/\/ .*?\n|\n)require)/);

              requireText = comment + requireStr;

              if (firstRequirePosition) {
                let firstPartContent = functionsPHPContent.slice(0, firstRequirePosition),
                  secondPartContent = functionsPHPContent.slice(firstRequirePosition),
                  functionsPHPNewContent = firstPartContent + requireText + '\n' + secondPartContent;

                createFile(functionsPHPFilepath, functionsPHPNewContent);
                console.log(requireText + ' Вставлено в functions.php');
              } else {
                // Если позиция не найдена, то вставим просто в конец файла
                functionsPHPContent += '\n' + requireText;
                console.log(requireText + ' Вставлено в конец functions.php');
              }
            }

          } catch (err) {
            console.error(err);
          }
        }

      } catch (err) {
        console.error(err);
      }

    } else {
      console.error('gulp createinc --src name [--comment "text", --admin]');
    }

    cb();
  };


module.exports = createInc;