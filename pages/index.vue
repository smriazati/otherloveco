<template>
  <div class="landing-page container">
    <div ref="igLink" class="instagram-link">
      <button>
        <a href="https://www.instagram.com/otherlove.co" target="_blank"
          >Instagram</a
        >
      </button>
    </div>
    <header ref="header">
      <h1 class="visually-hidden">Otherlove</h1>
      <div class="logo">
        <img src="/Otherlove-Logo-white.png" alt="Otherlove logo" />
      </div>
      <p class="small">
        Say hi at <a href="mailto:hello@otherlove.co">hello@otherlove.co</a>
      </p>
    </header>
    <footer ref="footer">
      <p>
        Otherlove is a woman-owned, independent design studio specializing in
        visual identities, content creation, and experiences for conscious
        brands ready to push boundaries.
      </p>
    </footer>
  </div>
</template>


<script>
export default {
  layout: "landing",
  mounted() {
    this.$nextTick(function () {
      this.setAnimations();
    });
  },
  methods: {
    setAnimations() {
      if (!gsap) {
        console.log("cancelling animation, no gsap");
        return;
      }
      console.log("animation start");
      const header = this.$refs.header;
      if (header) {
        const logo = header.querySelector(".logo");
        const par = header.querySelector("p");
        const footer = this.$refs.footer;
        const igLink = this.$refs.igLink;
        // // console.log(logo, par);

        gsap.set(logo, {
          opacity: 0,
          scale: 0.8,
        });
        gsap.set(par, {
          opacity: 0,
          scale: 0.8,
        });
        gsap.set(footer, {
          opacity: 0,
        });
        gsap.set(igLink, {
          opacity: 0,
        });
        if (logo && par && footer && igLink) {
          var tl = new TimelineMax();
          tl.to(logo, 1.5, {
            scale: 1,
            opacity: 1,
            ease: Circ.easeOut,
          })
            .to(
              par,
              1.5,
              {
                scale: 1,
                opacity: 1,
                ease: Circ.easeOut,
              },
              1.5
            )
            .to(
              footer,
              2,
              {
                opacity: 1,
                ease: Circ.easeOut,
              },
              2
            )
            .to(
              igLink,
              2,
              {
                opacity: 1,
                ease: Circ.easeOut,
              },
              2
            );
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  background: black;
  color: white;
  width: 100%;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  font-family: "DM Sans", sans-serif;
}

.logo {
  filter: brightness(100);
}
p.small {
  font-size: 14px;
}

.instagram-link {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

header {
  flex: 1;
  display: flex;
  max-width: 566px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 10px;
    font-size: 16px;
  }
}

footer {
  justify-self: flex-end;
  text-align: center;
  width: 100%;
  p {
    width: 710px;
    margin: 0 auto;
    font-size: 14px;
    @media (max-width: 710px) {
      width: 90%;
    }
  }
}
</style>