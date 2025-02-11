<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-4xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ isEditing ? 'Edit Job' : 'Job Details' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>

      <div v-if="!isEditing" class="space-y-4">
        <div v-for="(value, key) in job" :key="key" class="flex justify-between mb-3">
          <span class="font-medium capitalize">{{ key.replace('_', ' ') }}:</span>
          <span>{{ value || 'N/A' }}</span>
        </div>
      </div>

      <form v-else @submit.prevent="saveChanges" class="space-y-6 max-h-[70vh] overflow-y-auto pr-4 pb-4">
        <div v-for="(value, key) in editableFields" :key="key" class="flex items-center">
          <label class="w-1/3 font-medium capitalize">{{ key.replace('_', ' ') }}:</label>
          <template v-if="key === 'job_type'">
            <select
              v-model="editableFields[key]"
              class="w-2/3 px-3 py-2 border rounded-lg"
            >
              <option value="Installation">Installation</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Repair">Repair</option>
            </select>
          </template>
          <template v-else-if="key === 'quality'">
            <select
              v-model="editableFields[key]"
              class="w-2/3 px-3 py-2 border rounded-lg"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
            </select>
          </template>
          <template v-else>
            <input
              v-model="editableFields[key]"
              :disabled="nonEditableFields.includes(key)"
              class="w-2/3 px-3 py-2 border rounded-lg"
              :class="{ 'bg-gray-100': nonEditableFields.includes(key) }"
            />
          </template>
        </div>
      </form>

      <div class="mt-6 flex justify-end gap-2">
        <button
          v-if="!isEditing"
          @click="exportJob"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export
        </button>
        <button
          @click="toggleEdit"
          class="px-4 py-2"
          :class="{
            'bg-green-500 text-white hover:bg-green-600': isEditing,
            'bg-yellow-500 text-white hover:bg-yellow-600': !isEditing
          }"
        >
          {{ isEditing ? 'Save Changes' : 'Update' }}
        </button>
        <button
          @click="close"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
/* Add any custom styles here */
</style>