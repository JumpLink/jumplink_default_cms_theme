jumplink.cms = angular.module('jumplink.cms', [
  'ui.router'                 // AngularUI Router: https://github.com/angular-ui/ui-router
  , 'ngAnimate'               // ngAnimate: https://docs.angularjs.org/api/ngAnimate
  , 'ngSanitize'              // ngSanitize: https://docs.angularjs.org/api/ngSanitize
  , 'sails.io'                // angularSails: https://github.com/balderdashy/angularSails
  // , 'webodf'                  // custom module
  , 'FBAngular'               // angular-fullscreen: https://github.com/fabiobiondi/angular-fullscreen
  , 'mgcrea.ngStrap'          // AngularJS 1.2+ native directives for Bootstrap 3: http://mgcrea.github.io/angular-strap/
  // , 'angularMoment'           // Angular.JS directive and filters for Moment.JS: https://github.com/urish/angular-moment
  // , 'wu.masonry'              // A directive to use masonry with AngularJS: http://passy.github.io/angular-masonry/
  // , 'angular-carousel'        // An AngularJS carousel implementation optimised for mobile devices: https://github.com/revolunet/angular-carousel
  // , 'textAngular'             // A radically powerful Text-Editor/Wysiwyg editor for Angular.js: https://github.com/fraywing/textAngular
  // , 'angular-medium-editor'   // AngularJS directive for Medium.com editor clone: https://github.com/thijsw/angular-medium-editor
  // , 'ui.ace'                  // This directive allows you to add ACE editor elements: https://github.com/angular-ui/ui-ace
  // , 'leaflet-directive'       // AngularJS directive to embed an interact with maps managed by Leaflet library: https://github.com/tombatossals/angular-leaflet-directive
  , 'toaster'                 // AngularJS Toaster is a customized version of "toastr" non-blocking notification javascript library: https://github.com/jirikavi/AngularJS-Toaster
  // , 'angularFileUpload'       // Angular File Upload is a module for the AngularJS framework: https://github.com/nervgh/angular-file-upload
  , 'angular-filters'         // Useful filters for AngularJS: https://github.com/niemyjski/angular-filters
  // , 'ngDraggable'             // Drag and drop module for Angular JS: https://github.com/fatlinesofcode/ngDraggable
  , 'toggle-switch'           // AngularJS Toggle Switch: https://github.com/JumpLink/angular-toggle-switch
  , 'hljs'                    // AngularJS directive for syntax highlighting with highlight.js: https://github.com/pc035860/angular-highlightjs
  // , 'jumplink.cms.content'
  , 'jumplink.cms.sortable'
  , 'jumplink.cms.utilities'
  , 'jumplink.cms.subnavigation'
  , 'jumplink.cms.info'
  , 'jumplink.cms.config'
  // , 'jumplink.cms.event'
  , 'jumplink.cms.user'
  , 'jumplink.cms.theme'
  // , 'jumplink.cms.gallery'
  , 'jumplink.cms.admin'
  , 'jumplink.cms.session'
  , 'jumplink.cms.routes'
  , 'jumplink.cms.sidebar'
  , 'jumplink.cms.toolbar'
]);

jumplink.cms.config( function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $logProvider) {

  // see init.jade environment variable
  $logProvider.debugEnabled(environment === 'development');

  // use the HTML5 History API
  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/start');

  $stateProvider
  // LAYOUT
  .state('layout', {
    abstract: true
    , templateUrl: "/views/modern/layout.jade"
    , controller: 'LayoutController'
  })
  // Getting started 
  .state('layout.start', {
    url: '/start'
    , resolve:{
      start: function(MarkdownService) {
        return MarkdownService.resolve('GettingStarted.md');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    }
    , views: {
      'content' : {
        templateUrl: '/views/modern/start/index.jade'
        , controller: 'DocsStartController'
      },
      'toolbar' : {
        resolve: {
          routes: function(RoutesService) {
            return RoutesService.find({});
          },
        },
        template: '<jl-toolbar routes="routes", title="title", shorttitle="shorttitle", position="position", fluid="fluid", name="name"></jl-toolbar>',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: '/views/modern/footer.jade'
        , controller: 'FooterController'
      }
    }
  })
  // backend
  .state('layout.backend', {
    url: '/backend'
    , resolve:{
      docs: function(DocsService) {
        return DocsService.resolve('all');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    }
    , views: {
      'content' : {
        templateUrl: '/views/modern/backend/index.jade'
        , controller: 'DocsBackendController'
      },
      'toolbar' : {
        resolve: {
          routes: function(RoutesService) {
            return RoutesService.find({});
          },
        },
        template: '<jl-toolbar routes="routes", title="title", shorttitle="shorttitle", position="position", fluid="fluid", name="name"></jl-toolbar>',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: '/views/modern/footer.jade'
        , controller: 'FooterController'
      }
    }
  });
});
