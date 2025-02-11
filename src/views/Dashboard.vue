<template>
  <div class="container m-auto p-3.5">
    <h1 class="text-2xl font-bold mb-4">Job Tracking Dashboard</h1>
    
    <!-- Main Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Job Analytics -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 class="text-xl font-bold mb-4">Job Analytics</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span>Total Jobs</span>
            <span class="font-semibold">{{ analytics.totalJobs }}</span>
          </div>
          <div class="flex justify-between">
            <span>Pending Jobs</span>
            <span class="font-semibold">{{ analytics.pendingJobs }}</span>
          </div>
          <div class="flex justify-between">
            <span>Average Progress</span>
            <span class="font-semibold">{{ analytics.avgProgress }}%</span>
          </div>
          <div class="flex justify-between">
            <span>Success Rate</span>
            <span class="font-semibold">{{ analytics.successRate }}%</span>
          </div>
        </div>
      </div>

      <!-- Financial Analytics -->
      <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 class="text-xl font-bold mb-4">Financial Analytics</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span>Total Revenue</span>
            <span class="font-semibold">{{ formatCurrency(analytics.totalRevenue) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Total Expenses</span>
            <span class="font-semibold">{{ formatCurrency(analytics.totalExpenses) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Gross Profit</span>
            <span class="font-semibold">{{ formatCurrency(analytics.grossProfit) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Outstanding</span>
            <span class="font-semibold">{{ formatCurrency(analytics.totalOutstanding) }}</span>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 class="text-xl font-bold mb-4">Filters</h3>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <select v-model="filters.location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option value="">All Locations</option>
              <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select v-model="filters.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option value="">All Statuses</option>
              <option v-for="stat in statuses" :key="stat" :value="stat">{{ stat }}</option>
            </select>
          </div>
        </div>
      </div>

      </div>
      
      <!-- Main Content -->
      <div class="flex-1">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <div class="max-h-[600px] overflow-y-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Job ID</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Job Title</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Client</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Location</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Start Date</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">End Date</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Status</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Total Cost</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Payment Status</th>
                  <th class="px-4 py-3 text-left text-base font-bold text-gray-500 uppercase tracking-wider font-poppins">Progress</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="job in filteredJobs"
                  :key="job.jobNumber"
                  class="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  @click="showJobDetails(job)"
                >
                  <td class="px-4 py-3 text-sm">{{ job.job_number }}</td>
                  <td class="px-4 py-3 text-sm max-w-[200px] truncate">{{ job.description }}</td>
                  <td class="px-4 py-3 text-sm">{{ job.customer }}</td>
                  <td class="px-4 py-3 text-sm">{{ job.location }}</td>
                  <td class="px-4 py-3 text-sm">{{ formatDate(job.start_date) }}</td>
                  <td class="px-4 py-3 text-sm">{{ formatDate(job.end_date) }}</td>
                  <td class="px-4 py-3">
                    <span :class="statusClass(job.payment_type === 'Paid' ? 'Completed' : 'Pending')">
                      {{ job.payment_type === 'Paid' ? 'Completed' : 'Pending' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ formatCurrency((job.material_expense || 0) + (job.man_power || 0) + (job.commissions_expense || 0)) }}</td>
                  <td class="px-4 py-3">
                    <span :class="paymentStatusClass(job.payment_type)">
                      {{ job.payment_type }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div class="w-24 bg-gray-200 rounded-full h-2.5">
                        <div 
                          class="bg-blue-600 h-2.5 rounded-full" 
                          :style="{ width: `${job.progress || 0}%` }"
                        ></div>
                      </div>
                      <span class="text-sm text-gray-600">{{ job.progress || 0 }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Job Details Modal -->
  <transition name="fade">
    <JobDetails
      v-if="showDetailsModal && selectedJob"
      :job="selectedJob"
      @close="showDetailsModal = false"
      @update-progress="handleProgressUpdate"
      @save="handleSaveChanges"
    />
  </transition>
</template>

<script>
import { supabase } from '../supabase'
import JobDetails from '../components/JobDetails.vue'

export default {
  components: {
    JobDetails
  },
  data() {
    return {
      jobs: [],
      filters: {
        location: '',
        status: '',
        paymentStatus: ''
      },
      locations: [],
      statuses: ['Open', 'In Progress', 'Completed'],
      paymentStatuses: ['Paid', 'Unpaid', 'Pending']
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        const locationMatch = this.filters.location ? job.location === this.filters.location : true
        const statusMatch = this.filters.status ? job.status === this.filters.status : true
        return locationMatch && statusMatch
      })
    },
    analytics() {
      const totalJobs = this.jobs.length
      const pendingJobs = this.jobs.filter(j => j.status === 'Pending').length
      const completedJobs = this.jobs.filter(j => j.status === 'Completed').length
      const totalRevenue = this.jobs.reduce((sum, j) => {
        const jobTotal = (j.material_expense || 0) +
                        (j.man_power || 0) +
                        (j.commissions_expense || 0)
        return sum + jobTotal
      }, 0)
      
      const totalExpenses = this.jobs.reduce((sum, j) => sum + (j.material_expense || 0), 0)
      const totalOutstanding = this.jobs.reduce((sum, j) => {
        const jobTotal = (j.material_expense || 0) +
                        (j.man_power || 0) +
                        (j.commissions_expense || 0)
        return sum + (jobTotal - (j.paid || 0))
      }, 0)
      
      return {
        totalJobs,
        pendingJobs,
        avgProgress: totalJobs > 0 ? 
          (this.jobs.reduce((sum, j) => sum + j.progress, 0) / totalJobs).toFixed(1) : 0,
        successRate: totalJobs > 0 ? 
          ((completedJobs / totalJobs) * 100).toFixed(1) : 0,
        totalRevenue,
        totalExpenses,
        grossProfit: totalRevenue - totalExpenses,
        totalOutstanding
      }
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
    statusClass(status) {
      return {
        'px-2 py-1 rounded-full text-sm': true,
        'bg-yellow-100 text-yellow-800': status === 'Pending',
        'bg-blue-100 text-blue-800': status === 'In Progress',
        'bg-green-100 text-green-800': status === 'Completed'
      }
    },
    paymentStatusClass(status) {
      return {
        'px-2 py-1 rounded-full text-sm': true,
        'bg-green-100 text-green-800': status === 'Paid',
        'bg-red-100 text-red-800': status === 'Unpaid',
        'bg-yellow-100 text-yellow-800': status === 'Pending'
      };
    },
    handleProgressUpdate(progress) {
      this.selectedJob.progress = progress
    },
    async handleSaveChanges({ status, progress }) {
      try {
        const { error } = await supabase
          .from('jobs')
          .update({ status, progress })
          .eq('job_number', this.selectedJob.job_number)
        
        if (error) throw error
        
        // Update local job data
        const jobIndex = this.jobs.findIndex(j => j.job_number === this.selectedJob.job_number)
        this.jobs[jobIndex].status = status
        this.jobs[jobIndex].progress = progress
      } catch (error) {
        console.error('Error updating job:', error)
      }
    },
    showJobDetails(job) {
      console.log('Showing job details for:', job)
      this.selectedJob = job
      this.showDetailsModal = true
      console.log('Modal state:', this.showDetailsModal)
      console.log('Selected job:', this.selectedJob)
    }
  },
    async created() {
      try {
        console.log('Fetching jobs from Supabase...')
        const { data: jobs, error } = await supabase
          .from('jobs')
          .select('*')
          .order('end_date', { ascending: false })
        
        if (error) throw error
        
        console.log('Jobs fetched:', jobs)
        
        this.jobs = jobs
        
        console.log('Mapped jobs:', this.jobs)
        
        // Get unique locations
        this.locations = [...new Set(jobs.map(job => job.location))].filter(Boolean)
        console.log('Unique locations:', this.locations)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  max-width: 1200px;
}

/* Right-align currency values */
.font-semibold {
  text-align: right;
  display: inline-block;
  width: 100%;
}
</style>
