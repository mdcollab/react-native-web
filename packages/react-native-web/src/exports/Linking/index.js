/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Linking
 * @flow
 */

import memoize from 'memoizee';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const initialURL = canUseDOM ? window.location.href : '';

const withRenamedField = memoize(f => (event: Object) => f({...event, url: event.newURL}));

const Linking = {
  addEventListener(eventType: string, func: Function) {
    eventType === 'url' && window.addEventListener('hashchange', withRenamedField(func), false);
  },
  removeEventListener(eventType: string, func: Function) {
    eventType === 'url' && window.removeEventListener('hashchange', withRenamedField(func));
  },
  canOpenURL(): Promise<boolean> {
    return Promise.resolve(true);
  },
  getInitialURL(): Promise<string> {
    return Promise.resolve(initialURL);
  },
  openURL(url: string, target: string = '_blank'): Promise<Object | void> {
    try {
      open(url, target);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

const open = (url: string, target: string) => {
  const anchor = document.createElement('a');
  anchor.target = target; // :(
  anchor.rel = 'noopener';
  anchor.href = url;
  anchor.click();
};

export default Linking;
