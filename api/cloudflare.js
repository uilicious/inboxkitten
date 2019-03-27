addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request))
  })
  
  const mailGetKey = require("./src/cloudflare-api/mailGetKey")
  const mailGetHtml = require("./src/cloudflare-api/mailGetHtml")
  const mailList = require("./src/cloudflare-api/mailList")
  
  async function fetchAndApply(request) {
    let url = new URL(request.url)
    if (request.method === "OPTIONS") {
      return handleOptions(request)
    } else if(url.pathname === "/api/v1/mail/list"){
        return mailList(url)
    } else if(url.pathname === "/api/v1/mail/getKey") {
        return mailGetKey(url)
    } else if (url.pathname === "/api/v1/mail/getHtml") {
        return mailGetHtml(url)
    }

    return new Response('Invalid endpoint - ' + url.pathname,
        { status: 400, statusText: 'INVALID_ENDPOINT' });
  }

  let config = require("./config/mailgunConfig")

  const corsHeaders = {
    "Access-Control-Allow-Origin": config.corsOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }

  function handleOptions(request) {
    if (request.headers.get("Origin") !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null) {
      // Handle CORS pre-flight request.
      return new Response(null, {
        headers: corsHeaders
      })
    } else {
      // Handle standard OPTIONS request.
      return new Response(null, {
        headers: {
          "Allow": "GET, POST, OPTIONS",
        }
      })
    }
  }