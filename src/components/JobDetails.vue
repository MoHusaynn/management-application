<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Job Details</h2>
        
        <!-- Job Information -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Job ID</label>
            <p class="mt-1">{{ job.job_number }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Job Title</label>
            <p class="mt-1">{{ job.description }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Client</label>
            <p class="mt-1">{{ job.customer }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <p class="mt-1">{{ job.location }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Start Date</label>
            <p class="mt-1">{{ formatDate(job.start_date) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">End Date</label>
            <p class="mt-1">{{ formatDate(job.end_date) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select 
              v-model="job.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Total Cost</label>
            <p class="mt-1">{{ formatCurrency(totalCost) }}</p>
          </div>
        </div>

        <!-- Progress Section -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Progress</label>
          <div class="bg-gray-200 rounded-full h-2.5">
            <div 
              class="bg-blue-600 h-2.5 rounded-full" 
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ progress }}% Complete</p>
        </div>

        <!-- To-Do List -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-2">Tasks</h3>
          <div class="space-y-2">
            <div 
              v-for="(task, index) in tasks" 
              :key="index"
              class="flex items-center"
            >
              <input 
                type="checkbox" 
                v-model="task.completed"
                class="mr-2"
                @change="updateProgress"
              >
              <span :class="{ 'line-through': task.completed }">
                {{ task.description }}
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button 
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
          <button 
            @click="saveChanges"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tasks: [
        { description: 'Initial Consultation', completed: false },
        { description: 'Project Planning', completed: false },
        { description: 'Material Procurement', completed: false },
        { description: 'Execution', completed: false },
        { description: 'Quality Check', completed: false },
        { description: 'Final Delivery', completed: false }
      ]
    }
  },
  computed: {
    totalCost() {
      return (this.job.material_expense || 0) + 
             (this.job.man_power || 0) + 
             (this.job.commissions_expense || 0)
    },
    progress() {
      const completed = this.tasks.filter(t => t.completed).length
      return Math.round((completed / this.tasks.length) * 100)
    }
  },
  methods: {
    formatCurrency(value) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value)
      return `KWD ${formatted}`
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    updateProgress() {
      this.$emit('update-progress', this.progress)
    },
    closeModal() {
      this.$emit('close')
    },
    async saveChanges() {
      try {
        // Update job status and progress in database
        await this.$emit('save', {
          status: this.job.status,
          progress: this.progress
        })
        this.closeModal()
      } catch (error) {
        console.error('Error saving changes:', error)
      }
    }
  }
}
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
  color: #6b7280;
}
</style>