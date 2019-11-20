import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import loggerFactory from '@alias/logger';

import { createSubscribedElement } from '../UnstatedUtils';
import { toastSuccess, toastError } from '../../util/apiNotification';

import AppContainer from '../../services/AppContainer';

import AppSetting from './App/AppSetting';
import SiteUrlSetting from './App/SiteUrlSetting';
import MailSetting from './App/MailSetting';
import AwsSetting from './App/AwsSetting';
import PluginSetting from './App/PluginSetting';

import GrowiArchiveSection from './ImportData/GrowiArchiveSection';

const logger = loggerFactory('growi:importer');

class AppSettingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <fieldset>
          <legend>{t('App Settings')}</legend>
          <AppSetting />

          <legend>{t('Site URL settings')}</legend>
          {/* サイトURL設定フォームの react componentをここで呼ぶ(GW-260) */}
          <legend>{t('app_setting.Mail settings')}</legend>
          {/* メール設定フォームの react componentをここで呼ぶ(GW-261) */}
          <legend>{t('app_setting.AWS settings')}</legend>
          {/* AWS設定フォームの react componentをここで呼ぶ(GW-262) */}
          <legend>{t('app_setting.Plugin settings')}</legend>
          {/* プラグイン設定フォームの react componentをここで呼ぶ(GW-263) */}
        </fieldset>
      </Fragment>


    //     <form action="/_api/admin/settings/siteUrl" method="post" class="form-horizontal" id="siteUrlSettingForm" role="form">
    //       <fieldset>
    //         <legend>{{ t('Site URL settings') }}</legend>
    //         <p class="well">{{ t('app_setting.Site URL desc') }}</p>
    //         {% if !getConfig('crowi', 'app:siteUrl') %}
    //           <p class="alert alert-danger"><i class="icon-exclamation"></i> {{ t('app_setting.Site URL warn') }}</p>
    //         {% endif %}

    //         <div class="col-xs-offset-3">
    //           <table class="table settings-table">
    //             <colgroup>
    //               <col class="from-db">
    //               <col class="from-env-vars">
    //             </colgroup>
    //             <thead>
    //             <tr><th>Database</th><th>Environment variables</th></tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>
    //                   <input class="form-control"
    //                         type="text"
    //                         name="settingForm[app:siteUrl]"
    //                         value="{{ getConfigFromDB('crowi', 'app:siteUrl') | default('') }}"
    //                         placeholder="e.g. https://my.growi.org">
    //                   <p class="help-block">{{ t("app_setting.siteurl_help") }}</p>
    //                 </td>
    //                 <td>
    //                   <input class="form-control"
    //                         type="text"
    //                         value="{{ getConfigFromEnvVars('crowi', 'app:siteUrl') | default('') }}"
    //                         readonly>
    //                   <p class="help-block">
    //                     {{ t("app_setting.Use env var if empty", "APP_SITE_URL") }}
    //                   </p>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>

    //         <div class="form-group">
    //           <div class="col-xs-offset-3 col-xs-6">
    //             <input type="hidden" name="_csrf" value="{{ csrf() }}">
    //             <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
    //           </div>
    //         </div>
    //       </fieldset>
    //     </form>

    //     <form action="/_api/admin/settings/mail" method="post" class="form-horizontal" id="mailSettingForm" role="form">
    //     <fieldset>
    //     <legend>{{ t('app_setting.Mail settings') }}</legend>
    //     <p class="well">{{ t("app_setting.SMTP_used") }} {{ t("app_setting.SMTP_but_AWS") }}<br>{{ t("app_setting.neihter_of") }}</p>

    //       <div class="form-group">
    //         <label for="settingForm[mail.from]" class="col-xs-3 control-label">{{ t('app_setting.From e-mail address') }}</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[mail.from]"
    //                 type="text"
    //                 name="settingForm[mail:from]"
    //                 placeholder="{{ t('eg') }} mail@growi.org"
    //                 value="{{ getConfig('crowi', 'mail:from') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <label class="col-xs-3 control-label">{{ t('app_setting.SMTP settings') }}</label>
    //         <div class="col-xs-4">
    //           <label>{{ t('app_setting.Host') }}</label>
    //           <input class="form-control"
    //                 type="text"
    //                 name="settingForm[mail:smtpHost]"
    //                 value="{{ getConfig('crowi', 'mail:smtpHost') | default('') }}">
    //         </div>
    //         <div class="col-xs-2">
    //           <label>{{ t('app_setting.Port') }}</label>
    //           <input class="form-control"
    //                 type="text"
    //                 name="settingForm[mail:smtpPort]"
    //                 value="{{ getConfig('crowi', 'mail:smtpPort') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <div class="col-xs-3 col-xs-offset-3">
    //           <label>{{ t('app_setting.User') }}</label>
    //           <input class="form-control"
    //                 type="text"
    //                 name="settingForm[mail:smtpUser]"
    //                 value="{{ getConfig('crowi', 'mail:smtpUser') | default('') }}">
    //         </div>
    //         <div class="col-xs-3">
    //           <label>{{ t('Password') }}</label>
    //           <input class="form-control"
    //                 type="password"
    //                 name="settingForm[mail:smtpPassword]"
    //                 value="{{ getConfig('crowi', 'mail:smtpPassword') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <div class="col-xs-offset-3 col-xs-6">
    //           <input type="hidden" name="_csrf" value="{{ csrf() }}">
    //           <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
    //         </div>
    //       </div>

    //     </fieldset>
    //     </form>

    //     <form action="/_api/admin/settings/aws" method="post" class="form-horizontal" id="awsSettingForm" role="form">
    //     <fieldset>
    //     <legend>{{ t('app_setting.AWS settings') }}</legend>
    //       <p class="well">{{ t("app_setting.AWS_access") }}<br>
    //       {{ t("app_setting.No_SMTP_setting") }}<br>
    //         <br>

    //         <span class="text-danger"><i class="ti-unlink"></i> {{ t("app_setting.change_setting") }}</span>
    //       </p>

    //       <div class="form-group">
    //         <label for="settingForm[app:region]" class="col-xs-3 control-label">{{ t('app_setting.region') }}</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[app:region]"
    //                 type="text"
    //                 name="settingForm[aws:region]"
    //                 placeholder="例: ap-northeast-1"
    //                 value="{{ getConfig('crowi', 'aws:region') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <label for="settingForm[aws:customEndpoint]" class="col-xs-3 control-label">{{ t('app_setting.custom endpoint') }}</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[aws:customEndpoint]"
    //                 type="text"
    //                 name="settingForm[aws:customEndpoint]"
    //                 placeholder="例: http://localhost:9000"
    //                 value="{{ getConfig('crowi', 'aws:customEndpoint') | default('') }}">
    //                 <p class="help-block">{{ t("app_setting.custom_endpoint_change") }}</p>
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <label for="settingForm[aws:bucket]" class="col-xs-3 control-label">{{ t('app_setting.bucket name') }}</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[aws:bucket]"
    //                 type="text"
    //                 name="settingForm[aws:bucket]"
    //                 placeholder="例: crowi"
    //                 value="{{ getConfig('crowi', 'aws:bucket') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <label for="settingForm[aws:accessKeyId]" class="col-xs-3 control-label">Access Key ID</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[aws:accessKeyId]"
    //                 type="text"
    //                 name="settingForm[aws:accessKeyId]"
    //                 value="{{ getConfig('crowi', 'aws:accessKeyId') | default('') }}">
    //         </div>

    //       </div>

    //       <div class="form-group">
    //         <label for="settingForm[aws:secretAccessKey]" class="col-xs-3 control-label">Secret Access Key</label>
    //         <div class="col-xs-6">
    //           <input class="form-control"
    //                 id="settingForm[aws:secretAccessKey]"
    //                 type="text"
    //                 name="settingForm[aws:secretAccessKey]"
    //                 value="{{ getConfig('crowi', 'aws:secretAccessKey') | default('') }}">
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <div class="col-xs-offset-3 col-xs-6">
    //           <input type="hidden" name="_csrf" value="{{ csrf() }}">
    //           <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
    //         </div>
    //       </div>

    //     </fieldset>
    //     </form>

    //     <form action="/_api/admin/settings/plugin" method="post" class="form-horizontal" id="pluginSettingForm" role="form">
    //     <fieldset>
    //     <legend>{{ t('app_setting.Plugin settings') }}</legend>
    //       <p class="well">{{ t('app_setting.Enable plugin loading') }}</p>

    //       <div class="form-group">
    //         <label class="col-xs-3 control-label">{{ t('app_setting.Load plugins') }}</label>
    //         <div class="col-xs-6">

    //           <div class="btn-group btn-toggle" data-toggle="buttons">
    //             <label class="btn btn-default btn-rounded btn-outline {% if getConfig('crowi', 'plugin:isEnabledPlugins') %}active{% endif %}" data-active-class="primary">
    //               <input name="settingForm[plugin:isEnabledPlugins]"
    //                     value="true"
    //                     type="radio"
    //                     {% if true === getConfig('crowi', 'plugin:isEnabledPlugins') %}checked{% endif %}>
    //               ON
    //             </label>
    //             <label class="btn btn-default btn-rounded btn-outline {% if !getConfig('crowi', 'plugin:isEnabledPlugins') %}active{% endif %}" data-active-class="default">
    //               <input name="settingForm[plugin:isEnabledPlugins]"
    //                     value="false"
    //                     type="radio"
    //                     {% if !getConfig('crowi', 'plugin:isEnabledPlugins') %}checked{% endif %}>
    //               OFF
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="form-group">
    //         <div class="col-xs-offset-3 col-xs-6">
    //           <input type="hidden" name="_csrf" value="{{ csrf() }}">
    //           <button type="submit" class="btn btn-primary">{{ t('app_setting.Update') }}</button>
    //         </div>
    //       </div>

    //     </fieldset>
    //     </form>

    //   </div>
    //   </div>
    // */}

    // {/* // <script>
    // //   $('#appSettingForm, #siteUrlSettingForm, #mailSettingForm, #awsSettingForm, #pluginSettingForm').each(function() {
    // //     $(this).submit(function()
    // //     {
    // //       function showMessage(formId, msg, status) {
    // //         $('#' + formId + ' .alert').remove();

    // //         if (!status) {
    // //           status = 'success';
    // //         }
    // //         var $message = $('<p class="alert"></p>');
    // //         $message.addClass('alert-' + status);
    // //         $message.html(msg.replace(/\n/g, '<br>'));
    // //         $message.insertAfter('#' + formId + ' legend');

    // //         if (status == 'success') {
    // //           setTimeout(function()
    // //           {
    // //             $message.fadeOut({
    // //               complete: function() {
    // //                 $message.remove();
    // //               }
    // //             });
    // //           }, 5000);
    // //         }
    // //       }

    // //       var $form = $(this);
    // //       var $id = $form.attr('id');
    // //       var $button = $('button', this);
    // //       $button.attr('disabled', 'disabled');
    // //       var jqxhr = $.post($form.attr('action'), $form.serialize(), function(data)
    // //         {
    // //           if (data.status) {
    // //             showMessage($id, '更新しました');
    // //           } else {
    // //             showMessage($id, data.message, 'danger');
    // //           }
    // //         })
    // //         .fail(function() {
    // //           showMessage($id, 'エラーが発生しました', 'danger');
    // //         })
    // //         .always(function() {
    // //           $button.prop('disabled', false);
    // //       });
    // //       return false;
    // //     });
    // //   });
    // /**
    //   * The following script sets the class name 'unused' to the cell in from-env-vars column
    //   * when the value of the corresponding cell from the database is not empty.
    //   * It is used to indicate that the system does not use a value from the environment variables by setting a css style.
    //   *
    //   * TODO The following script is duplicated from saml.html. It is desirable to integrate those in the future.
    //   */
    // //   $('.settings-table tbody tr').each(function(_, element) {
    // //     const inputElemFromDB      = $('td:nth-of-type(1) input[type="text"], td:nth-of-type(1) textarea', element);
    // //     const inputElemFromEnvVars = $('td:nth-of-type(2) input[type="text"], td:nth-of-type(2) textarea', element);

    // //     // initialize
    // //     addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars);

    // //     // set keyup event handler
    // //     inputElemFromDB.keyup(function () { addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars) });
    // //   });

    // //   function addClassToUnusedInputElemFromEnvVars(inputElemFromDB, inputElemFromEnvVars) {
    // //     if (inputElemFromDB.val() === '') {
    // //       inputElemFromEnvVars.parent().removeClass('unused');
    // //     }
    // //     else {
    // //       inputElemFromEnvVars.parent().addClass('unused');
    // //     }
    // //   };
    // // </script> */}
    );
  }

}

AppSettingPage.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
};

/**
 * Wrapper component for using unstated
 */
const AppSettingPageWrapper = (props) => {
  return createSubscribedElement(AppSettingPage, props, [AppContainer]);
};


export default withTranslation()(AppSettingPageWrapper);
