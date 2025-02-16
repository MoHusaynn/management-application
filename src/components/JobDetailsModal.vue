<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-800">{{ isEditing ? 'Edit Job' : 'Job Details' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700 text-2xl leading-none">&times;</button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- View Mode -->
        <div v-if="!isEditing" class="grid grid-cols-2 gap-6">
          <template v-for="(value, key) in job" :key="key">
            <div class="col-span-1">
              <span class="text-sm font-semibold text-gray-600 uppercase">{{ key.replace(/_/g, ' ') }}</span>
              <p class="mt-1 text-gray-900">{{ formatValue(key, value) }}</p>
            </div>
          </template>
        </div>

        <!-- Edit Mode -->
        <form v-else @submit.prevent="saveChanges" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(value, key) in editableFields" :key="key" 
                 class="col-span-1"
                 :class="{ 'md:col-span-2': ['description', 'notes'].includes(key) }">
              <label class="block">
                <span class="text-sm font-semibold text-gray-600 uppercase">{{ key.replace(/_/g, ' ') }}</span>
                
                <template v-if="key === 'job_type'">
                  <select
                    v-model="editableFields[key]"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Installation">Installation</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                  </select>
                </template>
                
                <template v-else-if="key === 'quality'">
                  <select
                    v-model="editableFields[key]"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </template>
                
                <template v-else-if="['description', 'notes'].includes(key)">
                  <textarea
                    v-model="editableFields[key]"
                    :disabled="nonEditableFields.includes(key)"
                    rows="3"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    :class="{ 'bg-gray-100': nonEditableFields.includes(key) }"
                  ></textarea>
                </template>
                
                <template v-else>
                  <input
                    v-model="editableFields[key]"
                    :disabled="nonEditableFields.includes(key)"
                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    :class="{ 'bg-gray-100': nonEditableFields.includes(key) }"
                  />
                </template>
              </label>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t bg-gray-50 flex justify-end gap-4">
        <button
          v-if="!isEditing"
          @click="exportJob"
          class="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Export
        </button>
        <button
          @click="toggleEdit"
          class="px-6 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          :class="{
            'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500': isEditing,
            'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500': !isEditing
          }"
        >
          {{ isEditing ? 'Save Changes' : 'Update' }}
        </button>
        <button
          @click="close"
          class="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import { supabase } from '../supabase';

export default {
  data() {
    return {
      visible: false,
      job: null,
      isEditing: false,
      editableFields: {},
      nonEditableFields: ['id', 'job_number', 'invoice_number'],
      jobTypeOptions: ['Type A', 'Type B', 'Type C'],
      qualityOptions: ['High', 'Medium', 'Low']
    }
  },
  watch: {
    job: {
      handler(newJob) {
        if (newJob) {
          this.editableFields = { ...newJob };
        }
      },
      immediate: true
    }
  },
  methods: {
    formatValue(key, value) {
      if (value === null || value === undefined) return 'N/A';
      
      if (key.includes('date') || key.includes('_at')) {
        return new Date(value).toLocaleDateString();
      }
      
      if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
      }
      
      if (typeof value === 'number') {
        if (key.includes('price') || key.includes('cost')) {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value);
        }
        return value.toLocaleString();
      }
      
      return value;
    },
    open(job) {
      this.job = job;
      this.visible = true;
      this.isEditing = false;
    },
    close() {
      this.visible = false;
      this.job = null;
      this.isEditing = false;
    },
    toggleEdit() {
      if (this.isEditing) {
        this.saveChanges();
      } else {
        this.isEditing = true;
      }
    },
    async saveChanges() {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .update(this.editableFields)
          .eq('id', this.job.id);
        
        if (error) throw error;
        
        this.job = { ...this.job, ...this.editableFields };
        this.isEditing = false;
        this.$emit('job-updated');
      } catch (error) {
        console.error('Error updating job:', error);
      }
    },
    exportJob() {
      const headers = Object.keys(this.job);
      const data = headers.map(header => this.job[header]);
      
      const csvContent = [
        headers.join(','),
        data.map(value => `"${value}"`).join(',')
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `job_${this.job.job_number}.csv`);
    }
  },
  expose: ['open', 'close']
}
</script>

<style scoped>
/* Custom scrollbar styles */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 3px;
}
</style>