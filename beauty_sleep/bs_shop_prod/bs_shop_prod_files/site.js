/**
 * Основная точка входа в приложение
 */
(function () {
  'use strict';

  /**
   * @author Arthur Shevchenko (https://t.me/ShevArtV)
   * @class Site - основной класс приложения
   * @property {Object} config - подлючаемые модули и их конфигурации
   * @method {void} initialize() - подключение всех модулей
   * @method {void} importModule() - импорт отдельного модуля̆
   */
  class Site {
    static appName = 'beautysleep';
    static config = {
      Helpers: {
        pathToScripts: './modules/helpers.js'
      },
      Events: {
        pathToScripts: './modules/events.js',
        cookies: {
          subscribed: 'mail_popup_true',
          accepted: 'coockies-hide'
        },
        ids: {
          cookie: 'cookie'
        },
        modals:{
          subscribeFirst: {
            id: 'mailing_first_popup',
            delay: 15000
          },
          subscribeSecond: {
            id: 'mailing_second_popup',
            delay: 85000
          },
          subscribeThanks: {
            id: 'mailing-thanks',
            delay: 0
          },
        },
      },
      Libraries: {
        pathToScripts: './modules/libraries.js',
        libs: {
          fancybox: {
            callbackName: 'fancyboxManage',
            selector: '[data-fancybox]',
            pathToLibJs: 'assets/components/'+Site.appName+'/js/web/libs/fancybox.min.js',
            pathToLibCss: 'assets/components/'+Site.appName+'/css/web/libs/fancybox.min.css',
            force: true
          },
          skrollr: {
            callbackName: 'skrollrManage',
            selector: '#structure',
            pathToLibJs: 'assets/components/'+Site.appName+'/js/web/libs/skrollr.min.js'
          }
        }
      },
      CarouselFactory: {
        pathToScripts: './modules/carousel.js',
        pathToLibJs: 'assets/components/'+Site.appName+'/js/web/libs/swiper.min.js',
        pathToLibCss: 'assets/components/'+Site.appName+'/css/web/libs/swiper.min.css',
      },
      Switch: {
        pathToScripts: './modules/switch.js',
      },
      Animate: {
        pathToScripts: './modules/animate.js',
        pathToLibCss: 'assets/components/'+Site.appName+'/css/web/libs/animate.min.css',
      },
      LazyLoad: {
        pathToScripts: './modules/lazyload.js'
      },
      Expand: {
        pathToScripts: './modules/expand.js'
      },
    };

    constructor() {
      if (window.Site) return window.Site;
      this.initialize().then(() => {});
      window.Site = this;
    }

    /**
     * @returns {Promise<void>}
     */
    async initialize() {
      for (let k in Site.config) {
        await this.importModule(Site.config[k]['pathToScripts'], k);
      }
    }

    /**
     *
     * @param {string} pathToModule
     * @param {string} property
     * @returns {Promise<void>}
     */
    async importModule(pathToModule, property) {
      /* @vite-ignore */
      const {default: moduleName} = await import(pathToModule);
      if (property === "config") {
        this[property] = moduleName();
      } else {
        this[property] = new moduleName(Site.config[property])
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Site();
  })
})();
