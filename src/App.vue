<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link 
              to="/job-entry" 
              class="inline-flex items-center px-1 pt-1 text-xl font-extrabold text-gray-500 hover:text-gray-700"
            >
              Job Entry
            </router-link>
            <router-link 
              to="/dashboard" 
              class="ml-8 inline-flex items-center px-1 pt-1 text-xl font-extrabold text-gray-500 hover:text-gray-700"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/jobs" 
              class="ml-8 inline-flex items-center px-1 pt-1 text-xl font-extrabold text-gray-500 hover:text-gray-700"
            >
              Jobs
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.router-link-exact-active {
  @apply text-blue-600 border-b-2 border-blue-600;
}

nav a {
  @apply cursor-pointer;
}
</style>
