export default function (context, inject ) {
    const accessToken = context.$config.igToken;
   
    // console.log(accessToken);
    inject('instaApi', {
        getFeed
    })

    async function getFeed(count) {
        try {
            return unWrap(await fetch(`https://graph.instagram.com/me/media?access_token=${accessToken}&fields=media_url,media_type&limit=${count}`))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json();
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText
        }

    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}
