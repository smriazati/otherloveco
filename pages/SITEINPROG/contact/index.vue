<template>
  <div class="container page-contact">
    <section class="basic-row">
      <div class="text-wrapper">
        <h1>Get in touch</h1>
        <p>
          We work with clients small and large, local and global, new and
          established. Interested in working together, or have a question? Say
          hi below.
        </p>
      </div>
    </section>
    <section class="basic-row">
      <div class="contact-form">
        <ContactFormNetlify
          :email="true"
          :name="true"
          :message="true"
          :file="true"
          :successRoute="`/contact/success`"
        />
      </div>
      <div class="contact-info">
        <div class="text-wrapper">
          <h2>General</h2>
          <p><a href="">hello@otherlove.co</a></p>
        </div>
        <div class="text-wrapper">
          <h2>Address</h2>
          <p>
            115 Market Street, Suite 203<br />
            Durham, North Carolina 27701
          </p>
          <p><em>By appointment only</em></p>
        </div>
        <div class="text-wrapper">
          <h2 class="visually-hidden">Land acknowledgment</h2>
          <p>
            We would like to acknowledge the Traditional Owners of this Country
            and pay our respects to Elders past, present and emerging. We honor
            the Lumbee people, the traditional custodians of the land where our
            studio operates.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

