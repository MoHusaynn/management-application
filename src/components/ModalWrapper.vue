<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ModalWrapper'
}
</script>