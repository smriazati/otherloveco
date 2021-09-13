// consent.js
import CookiesEuBanner from 'cookies-eu-banner'
import { bootstrap } from 'vue-gtag'

export default (context, inject) => {
  CookiesEuBanner.prototype.setCookie = function (name, value) {
    const date = new Date()
    date.setTime(date.getTime() + this.cookieTimeout)

    document.cookie =
      name +
      '=' +
      value +
      ';expires=' +
      date.toGMTString() +
      ';path=/' +
      ';secure;SameSite=Lax'
  }

  function waitForElement(selector) {
    return new Promise(function (resolve, reject) {
      const element = document.querySelector(selector)

      if (element) {
        resolve(element)
        return
      }

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          const nodes = Array.from(mutation.addedNodes)
          for (const node of nodes) {
            if (node.matches && node.matches(selector)) {
              observer.disconnect()
              resolve(node)
              return
            }
          }
        })
      })

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      })
    })
  }
  waitForElement('#cookies-eu-banner').then(function (element) {
    CookiesEuBanner(function () {
      // Your code to launch when user accept cookies

      const checkExist = setInterval(function () {
        try {
          bootstrap().then((gtag) => {
            console.log('gtag enabled')
            context.$gtag.set('user_properties', {
              logged_in: context.app.$auth.loggedIn,
            })
          })
          clearInterval(checkExist)
        } catch (e) {
          console.log(e)
        }
      }, 100)
    }, true)
  })
}