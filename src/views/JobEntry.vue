<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Create New Job</h1>
    
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Job Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Job Number</label>
          <input
            v-model="job.job_number"
            type="text"
            readonly
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Payment Type</label>
          <select
            v-model="job.payment_type"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          >
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-3">Contract Type</label>
          <div class="flex items-center space-x-6 mt-1 w-full py-3 px-4 text-base">
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="job.contract_type"
                value="Contract"
                class="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
              />
              <span class="text-gray-700">Contract</span>
            </label>
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                v-model="job.contract_type"
                value="Non-Contract"
                class="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
              />
              <span class="text-gray-700">Non-Contract</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Date</label>
          <input
            v-model="job.date"
            type="date"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Customer</label>
          <input
            v-model="job.customer"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            placeholder="Start typing customer name..."
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Job Opening Day</label>
          <input
            v-model="job.job_opening_day"
            type="date"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Mobile No.</label>
          <input
            v-model="job.mobile"
            type="tel"
            pattern="[0-9]{10}"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            placeholder="10 digit number"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Location</label>
          <input
            v-model="job.location"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            placeholder="Enter location or click to use current location"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Job Type</label>
          <select
            v-model="job.job_type"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          >
            <option value="Installation">Installation</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Repair">Repair</option>
          </select>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Quality</label>
          <select
            v-model="job.quality"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          >
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>

        <div class="col-span-2">
          <label class="block text-base font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="job.description"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            placeholder="Brief description of the job"
          ></textarea>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Unit</label>
          <input
            v-model.number="job.unit"
            type="number"
            min="1"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Material Expense</label>
          <input
            v-model.number="job.material_expense"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Commissions Expense</label>
          <input
            v-model.number="job.commissions_expense"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Manpower Cost</label>
          <input
            v-model.number="job.man_power"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Paid</label>
          <input
            v-model.number="job.paid"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Balance</label>
          <input
            :value="balance"
            type="text"
            readonly
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Total Expense</label>
          <input
            :value="totalExpense"
            type="text"
            readonly
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Total Amount</label>
          <input
            :value="totalAmount"
            type="text"
            readonly
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-3 px-4 text-base"
          />
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Invoice Number</label>
          <input
            v-model="job.invoice_number"
            type="text"
            readonly
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 py-3 px-4 text-base"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="resetForm"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Submit Job
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import { notify } from 'notiwind'

export default {
  setup() {
    return { notify }
  },
  data() {
    return {
      job: {
        job_number: 'JOB-0007',
        invoice_number: 'INV-0007',
        date: new Date().toISOString().split('T')[0],
        job_opening_day: new Date().toISOString().split('T')[0],
        payment_type: 'Cash',
        contract_type: 'Contract',
        customer: '',
        mobile: '',
        location: '',
        job_type: 'Installation',
        quality: 'Standard',
        description: '',
        unit: 1,
        material_expense: 0,
        man_power: 0,
        commissions_expense: 0,
        paid: 0
      }
    }
  },
  computed: {
    totalExpense() {
      return this.job.material_expense + this.job.man_power
    },
    totalAmount() {
      return this.totalExpense + this.job.commissions_expense
    },
    balance() {
      return this.totalAmount - this.job.paid
    }
  },
  methods: {
    async generateJobNumber(sqlId) {
      if (sqlId) {
        this.job.job_number = `JOB-${String(sqlId).padStart(4, '0')}`
        localStorage.setItem('lastJobNumber', this.job.job_number)
      } else {
        // Get last used number from localStorage or start from 0007
        const lastNumber = localStorage.getItem('lastJobNumber') || 'JOB-0007'
        this.job.job_number = lastNumber
      }
    },

    async incrementJobNumber() {
      const lastNumber = localStorage.getItem('lastJobNumber') || 'JOB-0007'
      const lastNum = parseInt(lastNumber.split('-')[1], 10)
      const newNumber = `JOB-${String(lastNum + 1).padStart(4, '0')}`
      localStorage.setItem('lastJobNumber', newNumber)
      return newNumber
    },
    async generateInvoiceNumber(sqlId) {
      if (sqlId) {
        this.job.invoice_number = `INV-${String(sqlId).padStart(4, '0')}`
        localStorage.setItem('lastInvoiceNumber', this.job.invoice_number)
      } else {
        // Get last used number from localStorage or start from 0007
        const lastNumber = localStorage.getItem('lastInvoiceNumber') || 'INV-0007'
        this.job.invoice_number = lastNumber
      }
    },

    async incrementInvoiceNumber() {
      const lastNumber = localStorage.getItem('lastInvoiceNumber') || 'INV-0007'
      const lastNum = parseInt(lastNumber.split('-')[1], 10)
      const newNumber = `INV-${String(lastNum + 1).padStart(4, '0')}`
      localStorage.setItem('lastInvoiceNumber', newNumber)
      return newNumber
    },
    async submitForm() {
      try {
        // Validate required fields
        if (!this.job.customer || !this.job.mobile || !this.job.location) {
          throw new Error('Please fill all required fields')
        }

        // Validate mobile number format
        if (!/^\d{10}$/.test(this.job.mobile)) {
          throw new Error('Mobile number must be 10 digits')
        }

        const { data: insertData, error } = await supabase
          .from('jobs')
          .insert([this.job])
          .select()
        
        if (error) throw error
        
        // Update job and invoice numbers
        this.job.job_number = await this.incrementJobNumber()
        this.job.invoice_number = await this.incrementInvoiceNumber()
        
        // Show success notification
        this.notify({
          group: 'default',
          title: 'Success',
          text: 'Job created successfully',
          type: 'success'
        })
        
        this.resetForm()
        this.$router.push('/jobs')
      } catch (error) {
        console.error('Error submitting job:', error)
        
        // Show error notification
        this.notify({
          group: 'default',
          title: 'Error',
          text: error.message || 'Failed to create job',
          type: 'error'
        })
      }
    },
    async resetForm() {
      await this.generateJobNumber()
      await this.generateInvoiceNumber()
      this.job = {
        job_number: this.job.job_number,
        invoice_number: this.job.invoice_number,
        date: new Date().toISOString().split('T')[0],
        job_opening_day: new Date().toISOString().split('T')[0],
        payment_type: 'Cash',
        contract_type: 'Contract',
        customer: '',
        mobile: '',
        location: '',
        job_type: 'Installation',
        quality: 'Standard',
        description: '',
        unit: 1,
        material_expense: 0,
        man_power: 0,
        commissions_expense: 0,
        paid: 0
      }
    }
  },
  async created() {
    // Only generate new numbers if starting fresh job
    if (!this.job.job_number) {
      await this.generateJobNumber()
      await this.generateInvoiceNumber()
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
