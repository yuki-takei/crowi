import { Container } from 'unstated';

import loggerFactory from '@alias/logger';

import { toastError } from '../util/apiNotification';

// eslint-disable-next-line no-unused-vars
const logger = loggerFactory('growi:services:AdminHomeContainer');

/**
 * Service container for admin home page (AdminHome.jsx)
 * @extends {Container} unstated Container
 */
export default class AdminCustomizeContainer extends Container {

  constructor(appContainer) {
    super();

    this.appContainer = appContainer;

    this.state = {
      retrieveError: null,
      version: '',
    };

  }

  /**
   * Workaround for the mangling in production build to break constructor.name
   */
  static getClassName() {
    return 'AdminHomeContainer';
  }

  /**
   * retrieve admin home data
   */
  async retrieveAdminHomeData() {
    try {
      const response = await this.appContainer.apiv3.get('/home/');
      const { adminHomeParams } = response.data;

      this.setState({
        version: adminHomeParams.version,
      });

    }
    catch (err) {
      logger.error(err);
      toastError(new Error('Failed to fetch data'));
    }
  }

}
