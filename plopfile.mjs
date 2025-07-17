export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // create your generators here
  plop.setGenerator('widgetComponent', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name your widget: ',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/widgets/{{titleCase name}}/{{titleCase name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: './src/widgets/{{titleCase name}}/index.ts',
        templateFile: 'plop-templates/componentIndex.hbs',
      },
      {
        type: 'add',
        path: './src/widgets/{{titleCase name}}/styles.module.scss',
        templateFile: 'plop-templates/componentStyles.hbs',
      },
      {
        type: 'add',
        path: './src/widgets/{{titleCase name}}/{{titleCase name}}.types.ts',
        templateFile: 'plop-templates/componentTypes.hbs',
      },
    ], // array of actions
  });

  plop.setGenerator('pageComponent', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name your page: ',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{titleCase name}}/{{titleCase name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{titleCase name}}/index.ts',
        templateFile: 'plop-templates/componentIndex.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{titleCase name}}/styles.module.scss',
        templateFile: 'plop-templates/componentStyles.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{titleCase name}}/{{titleCase name}}.types.ts',
        templateFile: 'plop-templates/componentTypes.hbs',
      },
    ], // array of actions
  });

  plop.setGenerator('uiComponent', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name your ui component: ',
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: 'src/shared/ui/{{titleCase name}}/{{titleCase name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/ui/{{titleCase name}}/index.ts',
        templateFile: 'plop-templates/componentIndex.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/ui/{{titleCase name}}/styles.module.scss',
        templateFile: 'plop-templates/componentStyles.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/ui/{{titleCase name}}/{{titleCase name}}.types.ts',
        templateFile: 'plop-templates/componentTypes.hbs',
      },
    ], // array of actions
  });

  plop.setHelper('titleCase', (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  });

  plop.setHelper('kebabCase', (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2') // разбивает camelCase → camel-Case
      .replace(/\s+/g, '-') // пробелы → дефисы
      .replace(/_/g, '-') // подчёркивания → дефисы
      .replace(/([A-Z]{2,})(?=[A-Z][a-z]+)/g, (match) => match.toLowerCase()) // ABBRCase → abbr-Case
      .replace(/([A-Z]+)/g, '-$1') // оставшиеся заглавные → с дефисом
      .toLowerCase()
      .replace(/^-+|-+$/g, '') // обрезаем дефисы по краям
      .replace(/--+/g, '-'); // заменяем множественные дефисы на один
  });

  // plop.setHelper('snakeCase', (str) => {
  //   return str
  //     .replace(/\W+/g, ' ')
  //     .split(/ |\B(?=[A-Z])/)
  //     .map((word) => word.toLowerCase())
  //     .join('_');
  // });
}
