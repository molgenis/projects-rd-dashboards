<template>
  <div class="loading-screen">
    <div class="loading-screen-content">
      <div class="loading-screen-spinner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="spinner-gear"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <p class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
// Create a loading screen while some action is being performed
export default {
  props: {
    // Specify the message to display
    message: {
      type: String,
      // `Loading`
      default: 'Loading'
    } 
  }
}
</script>

<style lang="scss">
@keyframes loadingIconSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $blue-green-200;
  color: $gray-900;
  opacity: 0.8;
  
  .loading-screen-content {
    width: 90%;
    margin: 0 auto;
    z-index: 1;
    text-align: center;
    
    $icon-size: 62px;
    .spinner-gear {
      width: $icon-size;
      height: $icon-size;
      transform-origin: center;
      animation: loadingIconSpin 6s linear infinite;
    }
    
    .loading-message {
      font-size: 18pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: bold;
    }
  }
}
</style>