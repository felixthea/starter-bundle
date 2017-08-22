/* eslint-disable */
require('../styles/css/global.css');
import Placeholder from './cortex/placeholder.js';
import Logger from './cortex/logger.js';
// import Tracker from './cortex/tracker.js';
// import request from 'request';
import loggly from 'loggly';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.rows = [];
    this.deviceId = '';
    this.productionEnv = process.env.NODE_ENV !== 'development';
    this.updateViewStreak = 0;
    this.renderStreak = 0;
    this.device = 'UNKNOWN'
    this.client = loggly.createClient({
    token: "e931b39a-be1e-43eb-9314-205339375c54",
    subdomain: "alexchasejones",
    auth: {
      username: "alexander",
      password: "Bluety4508"
    },
    json: true,
    // 
    // Optional: Tag to send with EVERY log message 
    // 
    tags: ['loggly_test_8/22']
  });
    this.creativeContainer = window.document.getElementById(
    'creativeContainer');
  }

  /**
   * Set the incoming data from Silo.
   *
   * This method will only get called when the app is no longer visible on the
   * screen. The Incoming data is expected to be a non-empty array of objects
   * as retreived from Silo.
   *
   * This method is a good place to manipulate the incoming data as needed.
   *
   * It is strongly recommended to preload/cache images or any other media
   * files. Consider creating the necessary invisible DOM elements in this
   * method. In the render() method you can make the needed elements visible.
   *
   * e.g.
   * setData(rows) {
   *   for (const row of rows) {
   *     const img = new window.Image();
   *     img.src = row.image_url;
   *     img.onerror = () => {
   *       // log error
   *     }
   *     img.className = 'invisible';
   *     this.container.appendChild(img);
   *     this.images.push(img);
   *   }
   * }
   *
   * _render() {
   *   const img = this._selectImg();
   *   img.className = 'visible';
   * }
   *
   *
   * @param {array} data The data rows.
   *
   */
  setData(data) {
    // Verify that the data matches Silo structure.
    this.rows = data;

    if (data && data.length > 0) {
      this.deviceId = data[0]._device_id;
    }
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   *
   */
  render() {
    Logger.log('Rendering a new view.');
    if (!window.document.getElementById(GLOBAL_VARS.placeholderID)) {
      this.placeholder.render();
    }

    if (this.productionEnv) {
      // Tracker.track(this.deviceId, GLOBAL_VARS.campaign, 'tracked');
    }

    this._render();
  }

  /**
   * Update the view before displaying it on the screen.
   *
   * Every time the app receives a 'visible' event this method will get called.
   * This is the place to make changes to the view before it becomes visible
   * on the screen. For instance, if you want to display the current time
   * accurately, you should update the time data on this method.
   *
   * Prefer rendering the view in this._render() as much as possible as that
   * method will get called when the app is in the background. Only implement
   * this method when you need to perform some actions right before the view
   * becomes visible on the screen.
   *
   */
  updateView() {
    if (this.rows !== null && this.rows.length !== 0) {
      if (this.device === 'UNKNOWN') {}
      this.device = this.rows[0]._index;
        // const url = `${baseURL}${ad_id}?site_id=${this.rows[0]._index}&imp_x=${this.imp(this.rows[0].impressions_15_sec)}&lat=${this.rows[0].latitude}&lon=${this.rows[0].longitude}`;
        // this.request(url);
      }
    this.id = Date.now();
    this.updateViewStreak++;
    this.client.log({
      'method': 'Update View',
      'play_id': this.id,
      'calls_without_crashing': this.updateViewStreak,
      'device': this.device
    }, (err, result) => {
      console.log(result)
    });
    }

  /**
   * Handles rendering of the main view.
   *
   * This method will get called every time the app receives a 'hidden' event
   * and we have data stored in this.rows. This is the place where you actually
   * render some content on the screen based on the incoming dynamic data.
   *
   * Current implementation simply iterates over rows and displays a single row
   * every time the app is visible on the screen.
   *
   * It is important to be as efficient as possible in this method. Try to
   * make as few DOM manipulations as possible. Reusing DOM elements is better
   * than recreating them every time this method is called.
   *
   */
  _render() {
    this.renderStreak++;
    this.client.log({
      'method': '_render',
      'play_id': this.id,
      'calls_without_crashing': this.renderStreak,
      'device': this.device
    }, (err, result) => {
      console.log(result)
    });
    // this.creativeContainer.style.display = 'block';
    if (this.rows === null || this.rows.length === 0) {
      return;
    }else{
      this.placeholder.hide();
    }
  }
}

module.exports = View;
