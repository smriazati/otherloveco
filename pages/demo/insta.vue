<template>
  <div class="instagram-wrapper">
    <div v-if="insta">
      <Instafeed :insta="insta.data" />
    </div>
    <div v-else>
      <p>Instagram feed can not be loaded due to your browser's privacy features or extensions.</p>
    </div>
  </div>
</template>

<script>
// CORS ERRORS IN FF / Adblocking
// https://github.com/stevenschobert/instafeed.js/issues/690
export default {
  async asyncData({ $instaApi, error }) {
    const responses = await Promise.all([$instaApi.getFeed(15)]);
    const badResponse = responses.find((response) => !response.ok);
    
    if (badResponse) {
      // return error({
      //   statusCode: badResponse.status,
      //   message: badResponse.statusText,
      // });
      return error = {
        statusCode: badResponse.status,
        message: badResponse.statusText,
      };
    }

    return {
      insta: responses[0].json,
    };
  }, 
}
</script>
