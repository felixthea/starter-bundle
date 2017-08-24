require('../styles/css/global.css');
import Placeholder from './cortex/placeholder.js';
import Logger from './cortex/logger.js';
import loggly from 'loggly';
import request from 'request';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.rows = [];
    this.deviceId = '';
    this.productionEnv = process.env.NODE_ENV !== 'development';

    this.updateViewStreak = 0;
    this.renderStreak = 0;
    this.device = 'UNKNOWN'

    this.adid = GLOBAL_VARS.ad_id
    this.id = Date.now()

    this.client = loggly.createClient({
      token: GLOBAL_VARS.logglyToken,
      subdomain: GLOBAL_VARS.logglySubdomain,
      auth: {
        username: GLOBAL_VARS.logglyUsernames,
        password: GLOBAL_VARS.logglyPasswords
      },
      json: true,
      tags: [GLOBAL_VARS.logglyTag]
    });

    this.imp = (val) => (
      typeof val === 'undefined' || val === null || isNaN(val) ? 0 : val
    );

    this.request = url => {
      request.post(url, error => {
        if (error) {
          this.placeholder.show()
        } 
      })
    }

    this.params = (method, count, id = this.id) => ({
      'method': method,
      'play_id': id,
      'calls_without_crashing': count,
      'venue': this.device,
      'ad_id': this.adid
    })

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
      this.device = this.rows[0]._index;
    }

    const id = Date.now();

    this.client.log(this.params('setData', 1, id), (err, result) => {
      console.log(result) 
    });
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
      if (this.device === 'UNKNOWN') {
        this.device = this.rows[0]._index;
      }
    }

    this.updateViewStreak++;

    this.client.log(this.params('update view', this.updateViewStreak), (err, result) => {
      console.log(result) 
    });

    let url;
    if (this.rows !== null && this.rows.length !== 0) {
      url = `${GLOBAL_VARS.baseURL}/${GLOBAL_VARS.ad_id}?site_id=${this.rows[0]._index}&imp_x=${this.imp(this.rows[0].impressions_15_sec)}&lat=${this.rows[0].latitude}&lon=${this.rows[0].longitude}`;
        
    } else {
      url = `${GLOBAL_VARS.baseURL}/${GLOBAL_VARS.ad_id}`; 
    }
    this.request(url);  
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
    this.id = Date.now();

    if (this.rows !== null && this.rows.length !== 0) {
      if (this.device === 'UNKNOWN') {
        this.device = this.rows[0]._index;
      }
    }
    this.renderStreak++;

    this.client.log(this.params('render', this.renderStreak), (err, result) => {
      console.log(result)
    });

    if (this.rows === null || this.rows.length === 0) {
      return;
    }else{
      this.placeholder.hide();
    }
  }
}

module.exports = View;

