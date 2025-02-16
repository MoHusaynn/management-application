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
            :class="{ 'border-red-500': errors.date }"
          />
          <p v-if="errors.date" class="mt-1 text-sm text-red-600">{{ errors.date }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Customer</label>
          <input
            v-model="job.customer"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base focus:ring-red-500 focus:border-red-500"
            :class="{ 'border-red-500': !job.customer }"
            placeholder="Start typing customer name..."
          />
          <p v-if="errors.customer" class="mt-1 text-sm text-red-600">{{ errors.customer }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Job Opening Day</label>
          <input
            v-model="job.job_opening_day"
            type="date"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            :class="{ 'border-red-500': errors.job_opening_day }"
          />
          <p v-if="errors.job_opening_day" class="mt-1 text-sm text-red-600">{{ errors.job_opening_day }}</p>
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
            :class="{ 'border-red-500': errors.location }"
            placeholder="Enter location or click to use current location"
          />
          <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
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
            :class="{ 'border-red-500': errors.description }"
            placeholder="Brief description of the job"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
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
            :class="{ 'border-red-500': errors.unit }"
          />
          <p v-if="errors.unit" class="mt-1 text-sm text-red-600">{{ errors.unit }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Material Expense</label>
          <input
            v-model.number="job.material_expense"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            :class="{ 'border-red-500': errors.material_expense }"
          />
          <p v-if="errors.material_expense" class="mt-1 text-sm text-red-600">{{ errors.material_expense }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Commissions Expense</label>
          <input
            v-model.number="job.commissions_expense"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            :class="{ 'border-red-500': errors.commissions_expense }"
          />
          <p v-if="errors.commissions_expense" class="mt-1 text-sm text-red-600">{{ errors.commissions_expense }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Manpower Cost</label>
          <input
            v-model.number="job.man_power"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            :class="{ 'border-red-500': errors.man_power }"
          />
          <p v-if="errors.man_power" class="mt-1 text-sm text-red-600">{{ errors.man_power }}</p>
        </div>

        <div>
          <label class="block text-base font-medium text-gray-700 mb-2">Paid</label>
          <input
            v-model.number="job.paid"
            type="number"
            min="0"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 text-base"
            :class="{ 'border-red-500': errors.paid }"
          />
          <p v-if="errors.paid" class="mt-1 text-sm text-red-600">{{ errors.paid }}</p>
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
      errors: {},
      job: {
        job_number: '',
        invoice_number: '',
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
    async generateJobNumber() {
      try {
        console.log('Generating new job number...')
        const nextNumber = await this.getNextNumber('job_number', 'JOB')
        console.log('Setting job number to:', nextNumber)
        this.job.job_number = nextNumber
      } catch (error) {
        console.error('Error in generateJobNumber:', error)
        this.job.job_number = 'JOB-0001'
      }
    },

    async generateInvoiceNumber() {
      try {
        console.log('Generating new invoice number...')
        const nextNumber = await this.getNextNumber('invoice_number', 'INV')
        console.log('Setting invoice number to:', nextNumber)
        this.job.invoice_number = nextNumber
      } catch (error) {
        console.error('Error in generateInvoiceNumber:', error)
        this.job.invoice_number = 'INV-0001'
      }
    },

    async getNextNumber(field, prefix) {
      try {
        console.log(`Getting next ${field}...`)
        
        // Get all jobs ordered by the number field in descending order
        const { data: jobs, error } = await supabase
          .from('jobs')
          .select(field)
          .order(field, { ascending: false })
          .limit(1)

        if (error) {
          console.error(`Error getting ${field}:`, error)
          return `${prefix}-0001`
        }

        // Log the result for debugging
        console.log(`Latest ${field}:`, jobs?.[0]?.[field] || 'No records found')

        if (jobs && jobs.length > 0) {
          const lastNumber = jobs[0][field]
          const currentNum = parseInt(lastNumber.split('-')[1], 10)
          const nextNum = currentNum + 1
          const nextNumber = `${prefix}-${String(nextNum).padStart(4, '0')}`
          console.log(`Generated next ${field}:`, nextNumber)
          return nextNumber
        }

        console.log(`No existing records, starting with ${prefix}-0001`)
        return `${prefix}-0001`
      } catch (error) {
        console.error(`Error in getNextNumber for ${field}:`, error)
        return `${prefix}-0001`
      }
    },
    validateForm() {
      this.errors = {}
      let isValid = true

      // Check all required fields
      const requiredFields = {
        customer: 'Customer Name',
        mobile: 'Mobile Number',
        location: 'Location',
        date: 'Date',
        job_opening_day: 'Job Opening Day',
        description: 'Description',
        unit: 'Unit',
        material_expense: 'Material Expense',
        man_power: 'Manpower Cost',
        commissions_expense: 'Commissions Expense',
        paid: 'Paid Amount'
      }

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!this.job[field] && this.job[field] !== 0) {
          this.errors[field] = `${label} is required`
          isValid = false
        }
      }

      // Validate numeric fields are not negative
      const numericFields = {
        unit: 'Unit',
        material_expense: 'Material Expense',
        man_power: 'Manpower Cost',
        commissions_expense: 'Commissions Expense',
        paid: 'Paid Amount'
      }

      for (const [field, label] of Object.entries(numericFields)) {
        if (this.job[field] < 0) {
          this.errors[field] = `${label} cannot be negative`
          isValid = false
        }
      }

      // Validate mobile number format
      if (!/^\d{10}$/.test(this.job.mobile)) {
        this.errors.mobile = 'Mobile number must be 10 digits'
        isValid = false
      }

      // Validate dates
      const currentDate = new Date().toISOString().split('T')[0]
      if (this.job.date > currentDate) {
        this.errors.date = 'Date cannot be in the future'
        isValid = false
      }
      if (this.job.job_opening_day < this.job.date) {
        this.errors.job_opening_day = 'Job Opening Day cannot be before Date'
        isValid = false
      }

      if (!isValid) {
        throw new Error('Please fix the validation errors')
      }
    },

    async submitForm() {
      try {
        // Validate all fields
        this.validateForm()

        // Save current job
        const { error: saveError } = await supabase
          .from('jobs')
          .insert([{
            ...this.job,
            total_expense: this.totalExpense,
            total_amount: this.totalAmount,
            balance: this.balance
          }])
        
        if (saveError) throw saveError

        // Get next numbers
        const nextJobNumber = await this.getNextNumber('job_number', 'JOB')
        const nextInvoiceNumber = await this.getNextNumber('invoice_number', 'INV')

        // Show success notification
        this.notify({
          group: 'default',
          title: 'Success',
          text: 'Job created successfully',
          type: 'success'
        })

        // Reset form with new numbers
        this.job = {
          job_number: nextJobNumber,
          invoice_number: nextInvoiceNumber,
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
    async resetForm(newJobNumber = null, newInvoiceNumber = null) {
      let jobNumber, invoiceNumber;
      
      if (newJobNumber && newInvoiceNumber) {
        // Use provided numbers (after submission)
        jobNumber = newJobNumber;
        invoiceNumber = newInvoiceNumber;
      } else {
        // Generate new numbers (for manual reset)
        await this.generateJobNumber();
        await this.generateInvoiceNumber();
        jobNumber = this.job.job_number;
        invoiceNumber = this.job.invoice_number;
      }

      // Reset form with appropriate numbers
      this.job = {
        job_number: jobNumber,
        invoice_number: invoiceNumber,
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
    },

    async checkDatabaseConnection() {
      try {
        // Try to fetch a single record from the jobs table
        const { data, error } = await supabase
          .from('jobs')
          .select('id')
          .limit(1)

        if (error) {
          console.error('❌ Database connection failed:', error.message)
          return false
        }

        console.log('✅ Database connected successfully!')
        console.log('Database connection details:', {
          timestamp: new Date().toISOString(),
          status: 'connected',
          table: 'jobs',
          testQuery: 'successful'
        })
        return true
      } catch (error) {
        console.error('❌ Database connection error:', error.message)
        return false
      }
    }
  },
  async created() {
    // Check database connection
    await this.checkDatabaseConnection()
    
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
