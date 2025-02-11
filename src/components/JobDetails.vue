<template>
  <ModalWrapper>
    <div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
      <div class="p-4 flex-1 overflow-y-auto">
        <!-- Job Information -->
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold">Job Details</h2>
            <span class="text-sm text-gray-500">ID: {{ job.job_number }}</span>
          </div>

          <!-- Editable Fields Section -->
          <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div class="grid grid-cols-2 gap-3">
              <!-- Status Field -->
              <div>
                <label class="block text-sm font-medium text-blue-900">Status</label>
                <select
                  v-model="localStatus"
                  class="mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  @change="handleStatusChange"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              <!-- Progress Field -->
              <div>
                <label class="block text-sm font-medium text-blue-900">Progress</label>
                <div class="mt-1 block w-full">
                  <div class="flex items-center gap-2 h-[38px] rounded-md border border-blue-300 shadow-sm bg-white px-3">
                    <input
                      type="range"
                      v-model.number="localProgress"
                      min="0"
                      max="100"
                      step="5"
                      class="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      @input="handleProgressChange"
                    >
                    <span class="text-sm font-medium text-blue-900 w-12 text-right">{{ localProgress }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Left Column -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-500">Job Title</label>
                <p class="text-sm text-gray-900">{{ job.description }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Client</label>
                <p class="text-sm text-gray-900">{{ job.customer }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Location</label>
                <p class="text-sm text-gray-900">{{ job.location }}</p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-500">Start Date</label>
                <p class="text-sm text-gray-900">{{ formatDate(job.start_date) }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">End Date</label>
                <p class="text-sm text-gray-900">{{ formatDate(job.end_date) }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Payment Status</label>
                <span :class="paymentStatusClass(job.payment_type)">
                  {{ job.payment_type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Financial Information -->
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-500">Material Expense</label>
                <p class="text-sm text-gray-900">{{ formatCurrency(job.material_expense || 0) }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Man Power</label>
                <p class="text-sm text-gray-900">{{ formatCurrency(job.man_power || 0) }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Commissions</label>
                <p class="text-sm text-gray-900">{{ formatCurrency(job.commissions_expense || 0) }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Total Cost</label>
                <p class="text-sm text-gray-900 font-semibold">{{ formatCurrency(totalCost) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-2 p-3 border-t border-gray-200">
          <button
            @click="closeModal"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
          <button
            @click="saveChanges"
            class="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper.vue'

export default {
  components: {
    ModalWrapper
  },
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localProgress: this.job.progress || 0,
      localStatus: this.job.status || 'Pending',
      hasChanges: false
    }
  },
  computed: {
    totalCost() {
      return (this.job.material_expense || 0) +
             (this.job.man_power || 0) +
             (this.job.commissions_expense || 0)
    }
  },
  watch: {
    'job.progress'(newVal) {
      this.localProgress = newVal
    },
    'job.status'(newVal) {
      this.localStatus = newVal
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
    paymentStatusClass(status) {
      return {
        'px-2 py-1 rounded-full text-sm': true,
        'bg-green-100 text-green-800': status === 'Paid',
        'bg-red-100 text-red-800': status === 'Unpaid',
        'bg-yellow-100 text-yellow-800': status === 'Pending'
      }
    },
    handleProgressChange() {
      this.hasChanges = true
      this.$emit('update-progress', this.localProgress)
    },
    handleStatusChange() {
      this.hasChanges = true
      this.$emit('update-status', this.localStatus)
    },
    closeModal() {
      if (this.hasChanges) {
        if (confirm('You have unsaved changes. Are you sure you want to close?')) {
          this.$emit('close')
        }
      } else {
        this.$emit('close')
      }
    },
    async saveChanges() {
      try {
        await this.$emit('save', {
          status: this.localStatus,
          progress: this.localProgress
        })
        this.hasChanges = false
        this.closeModal()
      } catch (error) {
        console.error('Error saving changes:', error)
      }
    }
  }
}
</script>