// import React, { useEffect, useRef } from 'react';
// import {
//   LoadingIndicatorPage,
//   request,
//   useNotification,
//   useAutoReloadOverlayBlocker,
//   useAppInfos,
//   useTracking,
//   useStrapiApp,
// } from '@strapi/helper-plugin';
// import { Header } from '@buffetjs/custom';
// import { useIntl } from 'react-intl';
// import { useHistory } from 'react-router-dom';
// import { useFetchPluginsFromMarketPlace } from '../../hooks';
// import PageTitle from '../../components/PageTitle';
// import PluginCard from './PluginCard';
// import Wrapper from './Wrapper';
// import PluginBanner from './PluginBanner';

// const MarketPlacePage = () => {
//   const toggleNotification = useNotification();
//   const { lockAppWithAutoreload, unlockAppWithAutoreload } = useAutoReloadOverlayBlocker();
//   const history = useHistory();
//   const { trackUsage } = useTracking();
//   const { autoReload, currentEnvironment } = useAppInfos();
//   const { formatMessage } = useIntl();
//   const { plugins } = useStrapiApp();

//   const { error, isLoading, data } = useFetchPluginsFromMarketPlace();

//   const emitEventRef = useRef(trackUsage);

//   useEffect(() => {
//     emitEventRef.current('didGoToMarketplace');
//   }, []);

//   if (isLoading || error) {
//     return <LoadingIndicatorPage />;
//   }

//   const handleDownloadPlugin = async pluginId => {
//     trackUsage('willInstallPlugin', { plugin: pluginId });
//     // Force the Overlayblocker to be displayed
//     const overlayblockerParams = {
//       enabled: true,
//       title: 'app.components.InstallPluginPage.Download.title',
//       description: 'app.components.InstallPluginPage.Download.description',
//     };
//     // Lock the app
//     lockAppWithAutoreload(overlayblockerParams);

//     try {
//       const opts = {
//         method: 'POST',
//         body: {
//           plugin: pluginId,
//           port: window.location.port,
//         },
//       };
//       const response = await request('/admin/plugins/install', opts, overlayblockerParams);

//       if (response.ok) {
//         trackUsage('didInstallPlugin', { plugin: pluginId });
//         // Reload the app
//         window.location.reload();
//       }
//     } catch (err) {
//       unlockAppWithAutoreload();
//       toggleNotification({
//         type: 'warning',
//         message: { id: 'notification.error' },
//       });
//     }
//   };

//   return (
//     <div>
//       <PageTitle
//         title={formatMessage({
//           id: 'app.components.InstallPluginPage.helmet',
//         })}
//       />
//       <Wrapper>
//         <Header
//           title={{
//             label: formatMessage({
//               id: 'app.components.InstallPluginPage.title',
//             }),
//           }}
//           content={formatMessage({
//             id: 'app.components.InstallPluginPage.description',
//           })}
//         />
//         <PluginBanner />
//         <div className="row" style={{ paddingTop: '4.1rem' }}>
//           {data.map(plugin => {
//             return (
//               <PluginCard
//                 autoReload={autoReload}
//                 currentEnvironment={currentEnvironment}
//                 downloadPlugin={handleDownloadPlugin}
//                 key={plugin.id}
//                 history={history}
//                 plugin={plugin}
//                 showSupportUsButton={false}
//                 isAlreadyInstalled={plugins[plugin.id] !== undefined}
//               />
//             );
//           })}
//         </div>
//       </Wrapper>
//     </div>
//   );
// };

// export default MarketPlacePage;
import React from 'react';
import { CheckPagePermissions } from '@strapi/helper-plugin';
import adminPermissions from '../../permissions';

export default () => (
  <CheckPagePermissions permissions={adminPermissions.marketplace.main}>
    MarketplacePage
  </CheckPagePermissions>
);