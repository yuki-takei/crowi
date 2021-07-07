import {
  Controller, Get, Inject, UseBefore,
} from '@tsed/common';

import createError from 'http-errors';

import { CustomHttpError } from '~/models/errors';
import { InstallerService } from '~/services/InstallerService';


const middleware3 = () => {
  throw new Error('This page is NOT processed by CustomHttpErrorFilter');
};

const middleware4 = () => {
  throw new CustomHttpError(createError(404, 'Resource 4 does not exist!'));
};

const middleware5 = (req, res, next) => {
  return next(createError(404, 'Resource 5 does not exist!'));
};


@Controller('/http-errors-test')
export class TopCtrl {

  @Inject()
  installerService: InstallerService;

  @Get('/1')
  async testCustomHttpError1(): Promise<any> {
    throw new Error('This page is NOT processed by CustomHttpErrorFilter');
  }

  @Get('/2')
  async testCustomHttpError2(): Promise<any> {
    throw new CustomHttpError(createError(404, 'Resource 2 does not exist!'));
  }

  @Get('/3')
  @UseBefore(middleware3)
  async testCustomHttpError3(): Promise<any> {
    return true;
  }

  @Get('/4')
  @UseBefore(middleware4)
  async testCustomHttpError4(): Promise<any> {
    return true;
  }

  @Get('/5')
  @UseBefore(middleware5)
  async testCustomHttpError5(): Promise<any> {
    return true;
  }

}
