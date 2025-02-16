<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search and filter controls -->
    <div class="flex items-center justify-between mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search jobs..."
        class="px-4 py-2 border rounded-lg w-1/3"
      />
      
      <div class="flex gap-4">
        <select v-model="filters.status" class="px-4 py-2 border rounded-lg">
          <option value="">All Statuses</option>
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>

        <input
          v-model="filters.startDate"
          type="date"
          class="px-4 py-2 border rounded-lg"
        />
        <input
          v-model="filters.endDate"
          type="date"
          class="px-4 py-2 border rounded-lg"
        />
      </div>
    </div>

    <!-- Jobs table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Number
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="job in paginatedJobs" :key="job.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ job.job_number || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ job.customer }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ job.location }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(job.job_opening_day) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="statusClass(job.status)">
                {{ job.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                @click="viewJob(job)"
                class="text-blue-600 hover:text-blue-900"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Showing {{ startItem }} to {{ endItem }} of {{ filteredJobs.length }} results
        </div>
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Job Details Modal -->
  <job-details-modal ref="jobDetailsModal" />
</template>

<script>
import { supabase } from '../supabase'
import { notify } from 'notiwind'
import JobDetailsModal from '../components/JobDetailsModal.vue'

export default {
  components: {
    JobDetailsModal
  },
  setup() {
    return { notify }
  },
  data() {
    return {
      jobs: [],
      searchQuery: '',
      filters: {
        status: '',
        startDate: '',
        endDate: ''
      },
      statusOptions: ['Pending', 'Active', 'Completed'],
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    filteredJobs() {
      return this.jobs.filter(job => {
        const matchesSearch =
          (job.job_number?.toLowerCase() || '').includes(this.searchQuery.toLowerCase()) ||
          (job.customer?.toLowerCase() || '').includes(this.searchQuery.toLowerCase()) ||
          (job.location?.toLowerCase() || '').includes(this.searchQuery.toLowerCase())

        const matchesStatus = this.filters.status ? 
          job.status === this.filters.status : true

        const matchesDateRange = (this.filters.startDate && this.filters.endDate) ?
          new Date(job.job_opening_day) >= new Date(this.filters.startDate) &&
          new Date(job.job_opening_day) <= new Date(this.filters.endDate) : true

        return matchesSearch && matchesStatus && matchesDateRange
      })
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredJobs.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage)
    },
    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    endItem() {
      const end = this.currentPage * this.itemsPerPage
      return end > this.filteredJobs.length ? this.filteredJobs.length : end
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    },
    formatDate(date) {
      if (!date || isNaN(new Date(date))) {
        return 'N/A'
      }
      return new Date(date).toLocaleDateString()
    },
    statusClass(status) {
      return {
        'px-2 py-1 rounded-full text-sm': true,
        'bg-yellow-100 text-yellow-800': status === 'Pending',
        'bg-blue-500 text-white': status === 'Active',
        'bg-green-100 text-green-800': status === 'Completed'
      }
    },
    async viewJob(job) {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', job.id)
          .single();
        
        if (error) throw error;
        
        // Open job details modal
        this.$refs.jobDetailsModal.open(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        notify({
          group: 'default',
          title: 'Error',
          text: 'Failed to fetch job details. Please try again.',
          type: 'error'
        });
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  },
  async created() {
    try {
      console.log('Fetching jobs from Supabase...');
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Jobs data received:', data);
      this.jobs = data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      this.notify({
        group: 'default',
        title: 'Error',
        text: 'Failed to load jobs. Please try again.',
        type: 'error'
      });
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
