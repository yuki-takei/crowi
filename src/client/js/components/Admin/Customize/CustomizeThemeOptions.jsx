import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';


import { withUnstatedContainers } from '../../UnstatedUtils';

import AppContainer from '../../../services/AppContainer';
import ThemeColorBox from './ThemeColorBox';
import AdminCustomizeContainer from '../../../services/AdminCustomizeContainer';

class CustomizeThemeOptions extends React.Component {

  render() {
    const { t, adminCustomizeContainer } = this.props;
    const { currentLayout, currentTheme } = adminCustomizeContainer.state;

    /* eslint-disable no-multi-spaces */
    const lightNDarkTheme = [{
      name: 'default',    bg: '#ffffff', topbar: '#2a2929', sidebar: '#122c55', theme: '#209fd8',
    }, {
      name: 'mono-blue',  bg: '#F7FBFD', topbar: '#2a2929', sidebar: '#00587A', theme: '#00587A',
    }, {
      name: 'hufflepuff',  bg: '#EFE2CF', topbar: '#2a2929', sidebar: '#EAAB20', theme: '#993439',
    }];

    const uniqueTheme = [{
      name: 'nature',     bg: '#f9fff3', topbar: '#234136', sidebar: '#118050', theme: '#460039',
    }, {
      name: 'wood',       bg: '#fffefb', topbar: '#2a2929', sidebar: '#aaa45f', theme: '#aaa45f',
    }, {
      name: 'island',     bg: '#cef2ef', topbar: '#2a2929', sidebar: '#0c2a44', theme: 'rgba(183, 226, 219, 1)',
    }, {
      name: 'christmas',  bg: '#fffefb', topbar: '#b3000c', sidebar: '#30882c', theme: '#d3c665',
    }, {
      name: 'antarctic',  bg: '#ffffff', topbar: '#2a2929', sidebar: '#000080', theme: '#fa9913',
    }, {
      name: 'spring',     bg: '#ffffff', topbar: '#d3687c', sidebar: '#ffb8c6', theme: '#67a856',
    }, {
      name: 'future',     bg: '#16282d', topbar: '#2a2929', sidebar: '#00b5b7', theme: '#00b5b7',
    }, {
      name: 'halloween',  bg: '#030003', topbar: '#aa4a04', sidebar: '#162b33', theme: '#e9af2b',
    }, {
      name: 'kibela',  bg: '#f4f5f6', topbar: '#1256a3', sidebar: '#5882fa', theme: '#b5cbf79c',
    }];
    /* eslint-enable no-multi-spaces */

    return (
      <div id="themeOptions" className={`${currentLayout === 'kibela' && 'disabled'}`}>
        {/* Light and Dark Themes */}
        <div>
          <h3>{t('admin:customize_setting.theme_desc.light_and_dark')}</h3>
          <div className="d-flex flex-wrap">
            {lightNDarkTheme.map((theme) => {
              return (
                <ThemeColorBox
                  key={theme.name}
                  isSelected={currentTheme === theme.name}
                  onSelected={() => adminCustomizeContainer.switchThemeType(theme.name)}
                  {...theme}
                />
              );
            })}
          </div>
        </div>
        {/* Unique Theme */}
        <div className="mt-3">
          <h3>{t('admin:customize_setting.theme_desc.unique')}</h3>
          <div className="d-flex flex-wrap">
            {uniqueTheme.map((theme) => {
              return (
                <ThemeColorBox
                  key={theme.name}
                  isSelected={currentTheme === theme.name}
                  onSelected={() => adminCustomizeContainer.switchThemeType(theme.name)}
                  {...theme}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

}

const CustomizeThemeOptionsWrapper = withUnstatedContainers(CustomizeThemeOptions, [AppContainer, AdminCustomizeContainer]);

CustomizeThemeOptions.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminCustomizeContainer: PropTypes.instanceOf(AdminCustomizeContainer).isRequired,
};

export default withTranslation()(CustomizeThemeOptionsWrapper);
