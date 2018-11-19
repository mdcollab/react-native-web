/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import memoize from 'memoizee';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';

const initialURL = canUseDOM ? window.location.href : '';

const withUrlField = memoize(f => (event: Object) => f({ ...event, url: event.newURL }));

const Linking = {
  addEventListener(eventType: string, func: Function) {
    if (eventType === 'url') {
      window.addEventListener('hashchange', withUrlField(func), false);
    }
  },
  removeEventListener(eventType: string, func: Function) {
    if (eventType === 'url') {
      window.removeEventListener('hashchange', withUrlField(func));
    }
  },
  canOpenURL(): Promise<boolean> {
    return Promise.resolve(true);
  },
  getInitialURL(): Promise<string> {
    return Promise.resolve(initialURL);
  },
  openURL(url: string): Promise<Object | void> {
    try {
      open(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  _validateURL(url: string) {
    invariant(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    invariant(url, 'Invalid URL: cannot be empty');
  }
};

const open = url => {
  if (canUseDOM) {
    window.location = new URL(url, window.location).toString();
  }
};

export default Linking;
