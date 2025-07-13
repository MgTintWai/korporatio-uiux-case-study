<template>
  <div>
    <h2 class="text-xl font-semibold text-white mb-2">Shareholders</h2>
    <p class="text-slate-400 text-sm mb-6">
      List all shareholders of the company. Each shareholder must own at least one share.
      The total percentage must equal 100%. You can add multiple shareholders by clicking "Add Shareholder".
    </p>

    <div class="space-y-6">
      <!-- Shareholders List -->
      <div v-for="(shareholder, index) in (Array.isArray(formData) ? formData : [])" :key="index" class="bg-slate-600 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-white">Shareholder {{ index + 1 }}</h3>
          <button 
            v-if="(Array.isArray(formData) ? formData : []).length > 1"
            @click="removeShareholder(index)"
            class="text-red-400 hover:text-red-300 text-sm"
          >
            Remove
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Shareholder Type -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-300 mb-2">Shareholder Type</label>
            <div class="flex space-x-6">
              <label class="flex items-center">
                <input
                  v-model="shareholder.type"
                  type="radio"
                  value="individual"
                  class="mr-2 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">Individual</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="shareholder.type"
                  type="radio"
                  value="corporate"
                  class="mr-2 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">Corporate Entity</span>
              </label>
            </div>
            <div v-if="errors[`shareholder_${index}_type`]" class="mt-1 text-red-400 text-sm">
              {{ errors[`shareholder_${index}_type`] }}
            </div>
          </div>

          <!-- Individual Fields -->
          <template v-if="shareholder.type === 'individual'">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
              <input
                v-model="shareholder.fullName"
                type="text"
                class="form-input"
                placeholder="John Smith"
                :class="{ 'border-red-500': errors[`shareholder_${index}_fullName`] }"
              />
              <div v-if="errors[`shareholder_${index}_fullName`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_fullName`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Date of Birth *</label>
              <input
                v-model="shareholder.dateOfBirth"
                type="date"
                class="form-input"
                :class="{ 'border-red-500': errors[`shareholder_${index}_dateOfBirth`] }"
              />
              <div v-if="errors[`shareholder_${index}_dateOfBirth`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_dateOfBirth`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Nationality *</label>
              <select
                v-model="shareholder.nationality"
                class="form-select"
                :class="{ 'border-red-500': errors[`shareholder_${index}_nationality`] }"
              >
                <option value="">Select nationality</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`shareholder_${index}_nationality`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_nationality`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                v-model="shareholder.email"
                type="email"
                class="form-input"
                placeholder="john@example.com"
                :class="{ 'border-red-500': errors[`shareholder_${index}_email`] }"
              />
              <div v-if="errors[`shareholder_${index}_email`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_email`] }}
              </div>
            </div>
          </template>

          <!-- Corporate Fields -->
          <template v-else-if="shareholder.type === 'corporate'">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
              <input
                v-model="shareholder.companyName"
                type="text"
                class="form-input"
                placeholder="ABC Corporation Ltd"
                :class="{ 'border-red-500': errors[`shareholder_${index}_companyName`] }"
              />
              <div v-if="errors[`shareholder_${index}_companyName`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_companyName`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Registration Number</label>
              <input
                v-model="shareholder.registrationNumber"
                type="text"
                class="form-input"
                placeholder="12345678"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Country of Incorporation *</label>
              <select
                v-model="shareholder.countryOfIncorporation"
                class="form-select"
                :class="{ 'border-red-500': errors[`shareholder_${index}_countryOfIncorporation`] }"
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="BVI">British Virgin Islands</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`shareholder_${index}_countryOfIncorporation`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`shareholder_${index}_countryOfIncorporation`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Contact Email</label>
              <input
                v-model="shareholder.contactEmail"
                type="email"
                class="form-input"
                placeholder="contact@company.com"
              />
            </div>
          </template>

          <!-- Shareholding Information -->
          <div class="md:col-span-2 border-t border-slate-500 pt-4">
            <h4 class="text-md font-medium text-white mb-4">Shareholding Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Number of Shares *</label>
                <input
                  v-model.number="shareholder.numberOfShares"
                  type="number"
                  min="1"
                  class="form-input"
                  placeholder="100"
                  :class="{ 'border-red-500': errors[`shareholder_${index}_numberOfShares`] }"
                />
                <div v-if="errors[`shareholder_${index}_numberOfShares`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`shareholder_${index}_numberOfShares`] }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Percentage Ownership *</label>
                <input
                  v-model.number="shareholder.percentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-input"
                  placeholder="25.00"
                  :class="{ 'border-red-500': errors[`shareholder_${index}_percentage`] }"
                />
                <div v-if="errors[`shareholder_${index}_percentage`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`shareholder_${index}_percentage`] }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Share Class</label>
                <select
                  v-model="shareholder.shareClass"
                  class="form-select"
                >
                  <option value="ordinary">Ordinary Shares</option>
                  <option value="preferred">Preferred Shares</option>
                  <option value="non-voting">Non-Voting Shares</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Shareholder Button -->
      <button 
        @click="addShareholder"
        class="w-full py-3 border-2 border-dashed border-slate-500 rounded-lg text-slate-400 hover:border-slate-400 hover:text-slate-300 transition-colors"
      >
        + Add Another Shareholder
      </button>

      <!-- Total Percentage Display -->
      <div class="bg-slate-600 rounded-lg p-4">
        <div class="flex justify-between items-center">
          <span class="text-slate-300">Total Ownership Percentage:</span>
          <span 
            :class="[
              'font-semibold',
              totalPercentage === 100 ? 'text-green-400' : 
              totalPercentage > 100 ? 'text-red-400' : 'text-yellow-400'
            ]"
          >
            {{ totalPercentage.toFixed(2) }}%
          </span>
        </div>
        <div v-if="totalPercentage !== 100" class="mt-2 text-sm text-slate-400">
          {{ totalPercentage < 100 ? 'Remaining: ' + (100 - totalPercentage).toFixed(2) + '%' : 'Exceeds 100% by ' + (totalPercentage - 100).toFixed(2) + '%' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shareholders',
  props: {
    formData: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:formData'],
  computed: {
    totalPercentage() {
      const currentData = Array.isArray(this.formData) ? this.formData : []
      return currentData.reduce((total, shareholder) => {
        return total + (Number(shareholder.percentage) || 0)
      }, 0)
    }
  },
  methods: {
    addShareholder() {
      const newShareholder = {
        type: 'individual',
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        email: '',
        companyName: '',
        registrationNumber: '',
        countryOfIncorporation: '',
        contactEmail: '',
        numberOfShares: null,
        percentage: null,
        shareClass: 'ordinary'
      }
      
      // Ensure formData is an array before spreading
      const currentData = Array.isArray(this.formData) ? this.formData : []
      const updatedShareholders = [...currentData, newShareholder]
      this.$emit('update:formData', updatedShareholders)
    },
    
    removeShareholder(index) {
      // Ensure formData is an array before filtering
      const currentData = Array.isArray(this.formData) ? this.formData : []
      const updatedShareholders = currentData.filter((_, i) => i !== index)
      this.$emit('update:formData', updatedShareholders)
    }
  },
  
  mounted() {
    // Initialize with one shareholder if none exist
    const currentData = Array.isArray(this.formData) ? this.formData : []
    if (currentData.length === 0) {
      this.addShareholder()
    }
  }
}
</script>
