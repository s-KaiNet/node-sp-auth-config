import * as inquirer from 'inquirer';

import { IUserCredentials } from 'node-sp-auth';
import { IAuthContext, IAuthConfigSettings } from '../../interfaces';
import { defaultPasswordMask } from '../../utils';

const wizard = (authContext: IAuthContext, answersAll: inquirer.Answers = {}, _settings: IAuthConfigSettings = {}): Promise<inquirer.Answers> => {
  const userCredentials: IUserCredentials = (authContext.authOptions as IUserCredentials);
  const promptFor: inquirer.Question[] = [
    {
      name: 'username',
      message: 'User name',
      type: 'input',
      default: userCredentials.username,
      validate: (answer: string) => answer.length > 0
    }, {
      name: 'password',
      message: 'Password',
      type: 'password',
      default: userCredentials.password ? defaultPasswordMask : null,
      validate: (answer: string) => answer.length > 0
    }
  ];
  return inquirer.prompt(promptFor).then(answers => {
    return {
      ...answersAll,
      ...answers,
      password: answers.password === defaultPasswordMask
        ? userCredentials.password
        : answers.password
    };
  });
};

export default wizard;
