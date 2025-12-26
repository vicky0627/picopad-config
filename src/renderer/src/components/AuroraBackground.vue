<template>
  <div class="aurora-container">
    <div class="aurora-blob blob-1"></div>
    <div class="aurora-blob blob-2"></div>
    <div class="aurora-blob blob-3"></div>
  </div>
</template>

<style scoped lang="postcss">
.aurora-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background-color: #213448; /* Base dark color from palette */
  pointer-events: none;
}

.aurora-blob {
  position: absolute;
  filter: blur(80px);
  opacity: 0.5; /* Slightly increased opacity for visibility */
  border-radius: 50%;
  animation: float 20s infinite ease-in-out;
}

.blob-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(84, 119, 146, 0.6) 0%, rgba(0, 0, 0, 0) 70%); /* Secondary #547792 */
  animation-delay: 0s;
}

.blob-2 {
  bottom: -10%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(148, 180, 193, 0.4) 0%, rgba(0, 0, 0, 0) 70%); /* Primary #94b4c1 */
  animation-delay: -5s;
}

.blob-3 {
  top: 40%;
  left: 40%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(234, 224, 207, 0.15) 0%, rgba(0, 0, 0, 0) 70%); /* Accent #eae0cf */
  animation-delay: -10s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style>
