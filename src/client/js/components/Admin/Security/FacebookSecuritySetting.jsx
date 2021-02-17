/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { withUnstatedContainers } from '../../UnstatedUtils';

import AdminGeneralSecurityContainer from '../../../services/AdminGeneralSecurityContainer';

class FacebookSecurityManagement extends React.Component {

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>

        <h2 className="alert-anchor border-bottom">
          Facebook OAuth { t('security_setting.configuration') }
        </h2>

        <p className="well">(TBD)</p>

      </React.Fragment>
    );
  }

}


FacebookSecurityManagement.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  adminGeneralSecurityContainer: PropTypes.instanceOf(AdminGeneralSecurityContainer).isRequired,
};

const TwitterSecurityManagementWrapper = withUnstatedContainers(FacebookSecurityManagement, [AdminGeneralSecurityContainer]);

export default withTranslation()(TwitterSecurityManagementWrapper);
