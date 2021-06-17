/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GrowiUriInjector } from './GrowiUriInjector';

export class GrowiUriInjectionModalDelegator implements GrowiUriInjector {


  inject(body: any, growiUri:string): void {
    if (body.view != null) {
      const parsedView = JSON.parse(body.view as string);
      parsedView.private_metadata = JSON.stringify({ growiUri });
      body.view = JSON.stringify(parsedView);
    }
  }

  extract(body: any): string {
    return body;
  }

}