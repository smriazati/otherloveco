<template>
    <div class="contact-info">
        <div class="text-wrapper" v-if="contactInfo">
          <SanityContent :blocks="contactInfo" />
        </div>
        <div class="text-wrapper" v-if="landAcknowledgment">
          <h2 class="visually-hidden">Land acknowledgment</h2>
          <p>{{ landAcknowledgment }}</p>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    contactInfo: {
      type: Array,
      required: false
    },
    landAcknowledgment: {
      type: String,
      required: false
    }
  }
}
</script>
