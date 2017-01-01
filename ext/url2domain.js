/*!
 * B.S. Detector v0.2.7 (http://bsdetector.tech)
 * Copyright 2016 The B.S. Detector Authors (https://github.com/selfagency/bs-detector/graphs/contributors)
 * Licensed under LGPL-3.0 (https://github.com/selfagency/bs-detector/blob/master/LICENSE)
 */

module.exports = url => {
	if (url) {
		url = url.toString().replace(/^(?:https?|ftp):\/\//i, '');
		url = url.toString().replace(/^www\./i, '');
		url = url.toString().replace(/\/.*/, '');
		return url;
	}
};
