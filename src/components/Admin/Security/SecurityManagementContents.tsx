import React, {
  FC, Fragment, useMemo, useState,
} from 'react';
// import PropTypes from 'prop-types';
import { TabContent, TabPane } from 'reactstrap';
import { useTranslation } from '~/i18n';

import LdapSecuritySetting from '~/client/js/components/Admin/Security/LdapSecuritySetting';
import LocalSecuritySetting from '~/client/js/components/Admin/Security/LocalSecuritySetting';
import SamlSecuritySetting from '~/client/js/components/Admin/Security/SamlSecuritySetting';
import OidcSecuritySetting from '~/client/js/components/Admin/Security/OidcSecuritySetting';
import SecuritySetting from '~/client/js/components/Admin/Security/SecuritySetting';
import BasicSecuritySetting from '~/client/js/components/Admin/Security/BasicSecuritySetting';
import GoogleSecuritySetting from '~/client/js/components/Admin/Security/GoogleSecuritySetting';
import GitHubSecuritySetting from '~/client/js/components/Admin/Security/GitHubSecuritySetting';
import TwitterSecuritySetting from '~/client/js/components/Admin/Security/TwitterSecuritySetting';
import FacebookSecuritySetting from '~/client/js/components/Admin/Security/FacebookSecuritySetting';
import ShareLinkSetting from '~/client/js/components/Admin/Security/ShareLinkSetting';

import CustomNav from '~/client/js/components/CustomNavigation/CustomNav';

type Props = {
};

export const SecurityManagementContents: FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('passport_local');
  const [activeComponents, setActiveComponents] = useState(new Set(['passport_local']));

  const switchActiveTab = (selectedTab) => {
    setActiveTab(selectedTab);
    setActiveComponents(activeComponents.add(selectedTab));
  };

  const navTabMapping = useMemo(() => {
    return {
      passport_local: {
        Icon: () => <i className="fa fa-users" />,
        i18n: 'ID/Pass',
        index: 0,
      },
      passport_ldap: {
        Icon: () => <i className="fa fa-sitemap" />,
        i18n: 'LDAP',
        index: 1,
      },
      passport_saml: {
        Icon: () => <i className="fa fa-key" />,
        i18n: 'SAML',
        index: 2,
      },
      passport_oidc: {
        Icon: () => <i className="fa fa-key" />,
        i18n: 'OIDC',
        index: 3,
      },
      passport_basic: {
        Icon: () => <i className="fa fa-lock" />,
        i18n: 'BASIC',
        index: 4,
      },
      passport_google: {
        Icon: () => <i className="fa fa-google" />,
        i18n: 'Google',
        index: 5,
      },
      passport_github: {
        Icon: () => <i className="fa fa-github" />,
        i18n: 'GitHub',
        index: 6,
      },
      passport_twitter: {
        Icon: () => <i className="fa fa-twitter" />,
        i18n: 'Twitter',
        index: 7,
      },
      passport_facebook: {
        Icon: () => <i className="fa fa-facebook" />,
        i18n: '(TBD) Facebook',
        index: 8,
      },
    };
  }, []);


  return (
    <Fragment>
      <div className="mb-5">
        {/* TODO: show dropdown text byGW-5142 */}
        <SecuritySetting />
      </div>

      {/* Shared Link List */}
      <div className="mb-5">
        <ShareLinkSetting />
      </div>


      {/* XSS configuration link */}
      <div className="mb-5">
        <h2 className="border-bottom">{t('security_setting.xss_prevent_setting')}</h2>
        <div className="text-center">
          <a style={{ fontSize: 'large' }} href="/admin/markdown/#preventXSS">
            <i className="fa-fw icon-login"></i> {t('security_setting.xss_prevent_setting_link')}
          </a>
        </div>
      </div>

      <div className="auth-mechanism-configurations">
        <h2 className="border-bottom">{t('security_setting.Authentication mechanism settings')}</h2>
        <CustomNav
          activeTab={activeTab}
          navTabMapping={navTabMapping}
          onNavSelected={switchActiveTab}
          hideBorderBottom
          breakpointToSwitchDropdownDown="md"
        />
        {/* TODO: show tab contents by GW-5141 */}
        <TabContent activeTab={activeTab} className="p-5">
          <TabPane tabId="passport_local">
            {/* {activeComponents.has('passport_local') && <LocalSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_ldap">
            {/* {activeComponents.has('passport_ldap') && <LdapSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_saml">
            {/* {activeComponents.has('passport_saml') && <SamlSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_oidc">
            {/* {activeComponents.has('passport_oidc') && <OidcSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_basic">
            {/* {activeComponents.has('passport_basic') && <BasicSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_google">
            {/* {activeComponents.has('passport_google') && <GoogleSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_github">
            {/* {activeComponents.has('passport_github') && <GitHubSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_twitter">
            {/* {activeComponents.has('passport_twitter') && <TwitterSecuritySetting />} */}
          </TabPane>
          <TabPane tabId="passport_facebook">
            {/* {activeComponents.has('passport_facebook') && <FacebookSecuritySetting />} */}
          </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );

};
