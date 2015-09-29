exports.layoutBrowser = function (req, res, next, force, showLegacyToast, page, route) {
  var routes = null;

  var host = req.session.uri.host;
  var site = null;
  var url = req.path;
  var title = "";
  if(UtilityService.isDefined(route) && UtilityService.isDefined(route.sitetitle)) title = route.sitetitle;

  MultisiteService.getCurrentSiteConfig(host, function (err, config) {
    if(err) return res.serverError(err);
    site = config.name;
    async.parallel([
      function(callback) {
        RoutesService.find(host, {}, function(err, routes) {
          callback(err, routes);
        });
      }
    ], function (err, results) {
      if(err) return res.serverError(err);

      routes = results[0];

      return ThemeService.view(req.session.uri.host, 'views/fallback/browser.jade', res, {
        showLegacyToast: showLegacyToast,
        force: force,
        host: host,
        url: url,
        routes: routes,
        useragent: req.useragent,
        title: title,
        config: {paths: sails.config.paths},
        isFallback: true,
        isModern: false,
        authenticated: false
      });
    });
  });
};

exports.layoutBackend = function (req, res, next, force, showLegacyToast, page, route) {
  sails.log.debug("fallbackBackend");
  var page = 'layout.backend';
  MultisiteService.getCurrentSiteConfig(req.session.uri.host, function (err, config) {
    if(err) { return res.serverError(err); }
    CmsService.infoUser(function (err, cmsInfo) {
      DocsService.parseAll({highlight: true, lang: 'javascript'},function (err, jsDocObjs) {
        if(err) { return res.serverError(err); }
        // sails.log.debug(jsDocObjs);
        return ThemeService.view(req.session.uri.host, 'views/fallback/backend/index.jade', res, {
          showLegacyToast: showLegacyToast,
          force: force,
          host: req.host,
          url: req.path,
          docs: jsDocObjs,
          useragent: req.useragent,
          title: 'JumpLink CMS Documentation',
          config: {paths: sails.config.paths},
          cmsInfo: cmsInfo
        });
      });
    });
  });
};

exports.layoutStart = function (req, res, next, force, showLegacyToast, page, route) {
  var links = null;
  var options;
  MultisiteService.getCurrentSiteConfig(req.session.uri.host, function (err, config) {
    if(err) { return res.serverError(err); }
    var options = {
      toHTML: true,
    }
    MarkdownService.load(req.session.uri.host, 'GettingStarted.md', options, function (err, start) {
      if(err) { return res.serverError(err); }
      CmsService.infoUser(function (err, cmsInfo) {
        if(err) { return res.serverError(err); }
        return ThemeService.view(req.session.uri.host, 'views/fallback/start/index.jade', res, {
          showLegacyToast: showLegacyToast,
          force: force,
          host: req.host,
          url: req.path,
          useragent: req.useragent,
          title: 'JumpLink CMS - Getting started',
          config: {paths: sails.config.paths},
          cmsInfo: cmsInfo,
          start: start
        });
      });
    });
  });
}

exports.layoutCms = function (req, res, next, force, showLegacyToast, page, route) {
  var links = null;
  MultisiteService.getCurrentSiteConfig(req.session.uri.host, function (err, config) {
    if(err) { return res.serverError(err); }
    CmsService.infoUser(function (err, cmsInfo) {
      if(err) { return res.serverError(err); }
      return ThemeService.view(req.session.uri.host, 'views/fallback/cms/index.jade', res, {
        showLegacyToast: showLegacyToast,
        force: force,
        host: req.host,
        url: req.path,
        useragent: req.useragent,
        title: 'JumpLink CMS - Backend Docs',
        config: {paths: sails.config.paths},
        cmsInfo: cmsInfo
      });
    });
  });
};