<template>
  <div class="instagram-container">

  </div>
</template>

<script>
export default {
  async asyncData({ $instaApi, error }) {
    const responses = await Promise.all([$instaApi.getFeed(15)]);
    const badResponse = responses.find((response) => !response.ok);
    if (badResponse) {
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });
    }
    return {
      insta: responses[0].json,
    };
  }, 
}
</script>
