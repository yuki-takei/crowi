import {
  Catch, ExceptionFilterMethods, PlatformContext, PlatformResponse,
} from '@tsed/common';

import { CustomHttpError } from '~/models/errors';

@Catch(CustomHttpError)
export class CustomHttpErrorFilter implements ExceptionFilterMethods {

  async catch(exception: CustomHttpError, ctx: PlatformContext): Promise<PlatformResponse<any>> {
    const { response } = ctx;

    return response
      .status(exception.httpError.status)
      .body({ title: 'CustomHttpError catched.', httpError: exception.httpError });
  }

}
