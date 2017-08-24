/********************************************************/
/*------GLOBAL_VARS-------------------------------------*/
/* These variables can be accessed anywhere in the      */
/* application using the GLOBAL_VARS object.            */
/* NOTE: If not using SILO data, set datasetId to null. */
/********************************************************/

module.exports = {
  appName: JSON.stringify(require('./package.json').name),
  campaign: 'LinkNYC Starter Bundle',
  datasetID: 'com.intersection.linknyc.locationdata',
  placeholderID: 'placeholder',
  logglyToken: '',
  logglyUsername: '',
	logglyPassword: '',
	logglyTag: '',
	logglySubdomain: '',
	ad_id: '',
	baseURL: ''
};
