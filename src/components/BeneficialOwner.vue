<template>
  <div>
    <h2 class="text-xl font-semibold text-white mb-2">Beneficial Owner</h2>
    <p class="text-slate-400 text-sm mb-6">
      A beneficial owner is an individual who ultimately owns or controls more than 25% of the company's shares 
      or voting rights, or otherwise exercises control over the company. This information is required for compliance 
      with anti-money laundering regulations.
    </p>

    <div class="space-y-6">
      <!-- Beneficial Owner Declaration -->
      <div class="bg-slate-600 rounded-lg p-6">
        <h3 class="text-lg font-medium text-white mb-4">Beneficial Ownership Declaration</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Are there any beneficial owners who own or control more than 25% of the company? *
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="formData.hasBeneficialOwners"
                  type="radio"
                  :value="true"
                  class="mr-3 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">Yes, there are beneficial owners</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="formData.hasBeneficialOwners"
                  type="radio"
                  :value="false"
                  class="mr-3 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">No beneficial owners (all ownership is less than 25%)</span>
              </label>
            </div>
            <div v-if="errors.hasBeneficialOwners" class="mt-1 text-red-400 text-sm">
              {{ errors.hasBeneficialOwners }}
            </div>
          </div>
        </div>
      </div>

      <!-- Beneficial Owners List (if applicable) -->
      <div v-if="formData.hasBeneficialOwners" class="space-y-6">
        <div v-for="(owner, index) in formData.beneficialOwners" :key="index" class="bg-slate-600 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-white">Beneficial Owner {{ index + 1 }}</h3>
            <button 
              v-if="formData.beneficialOwners.length > 1"
              @click="removeBeneficialOwner(index)"
              class="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Personal Information -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Full Legal Name *</label>
              <input
                v-model="owner.fullName"
                type="text"
                class="form-input"
                placeholder="John Doe"
                :class="{ 'border-red-500': errors[`beneficial_${index}_fullName`] }"
              />
              <div v-if="errors[`beneficial_${index}_fullName`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`beneficial_${index}_fullName`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Date of Birth *</label>
              <input
                v-model="owner.dateOfBirth"
                type="date"
                class="form-input"
                :class="{ 'border-red-500': errors[`beneficial_${index}_dateOfBirth`] }"
              />
              <div v-if="errors[`beneficial_${index}_dateOfBirth`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`beneficial_${index}_dateOfBirth`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Nationality *</label>
              <select
                v-model="owner.nationality"
                class="form-select"
                :class="{ 'border-red-500': errors[`beneficial_${index}_nationality`] }"
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
              <div v-if="errors[`beneficial_${index}_nationality`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`beneficial_${index}_nationality`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Country of Residence *</label>
              <select
                v-model="owner.countryOfResidence"
                class="form-select"
                :class="{ 'border-red-500': errors[`beneficial_${index}_countryOfResidence`] }"
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`beneficial_${index}_countryOfResidence`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`beneficial_${index}_countryOfResidence`] }}
              </div>
            </div>

            <!-- Contact Information -->
            <div class="md:col-span-2 border-t border-slate-500 pt-4">
              <h4 class="text-md font-medium text-white mb-4">Contact Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    v-model="owner.email"
                    type="email"
                    class="form-input"
                    placeholder="john@example.com"
                    :class="{ 'border-red-500': errors[`beneficial_${index}_email`] }"
                  />
                  <div v-if="errors[`beneficial_${index}_email`]" class="mt-1 text-red-400 text-sm">
                    {{ errors[`beneficial_${index}_email`] }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <input
                    v-model="owner.phoneNumber"
                    type="tel"
                    class="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <!-- Ownership Details -->
            <div class="md:col-span-2 border-t border-slate-500 pt-4">
              <h4 class="text-md font-medium text-white mb-4">Ownership & Control Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Percentage of Ownership *</label>
                  <input
                    v-model.number="owner.ownershipPercentage"
                    type="number"
                    min="25"
                    max="100"
                    step="0.01"
                    class="form-input"
                    placeholder="50.00"
                    :class="{ 'border-red-500': errors[`beneficial_${index}_ownershipPercentage`] }"
                  />
                  <div v-if="errors[`beneficial_${index}_ownershipPercentage`]" class="mt-1 text-red-400 text-sm">
                    {{ errors[`beneficial_${index}_ownershipPercentage`] }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">Nature of Control</label>
                  <select
                    v-model="owner.controlType"
                    class="form-select"
                  >
                    <option value="direct_shareholding">Direct Shareholding</option>
                    <option value="indirect_shareholding">Indirect Shareholding</option>
                    <option value="voting_rights">Voting Rights Control</option>
                    <option value="board_control">Board of Directors Control</option>
                    <option value="other">Other Control Mechanism</option>
                  </select>
                </div>
              </div>

              <div v-if="owner.controlType === 'other'" class="mt-4">
                <label class="block text-sm font-medium text-slate-300 mb-2">Describe Other Control Mechanism</label>
                <textarea
                  v-model="owner.otherControlDescription"
                  class="form-input h-20 resize-none"
                  placeholder="Please describe how this person exercises control over the company..."
                ></textarea>
              </div>
            </div>

            <!-- PEP Declaration -->
            <div class="md:col-span-2 border-t border-slate-500 pt-4">
              <h4 class="text-md font-medium text-white mb-4">Politically Exposed Person (PEP) Declaration</h4>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  Is this person a Politically Exposed Person (PEP) or related to a PEP? *
                </label>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="owner.isPEP"
                      type="radio"
                      :value="true"
                      class="mr-3 text-primary-600 focus:ring-primary-600"
                    />
                    <span class="text-slate-300">Yes</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="owner.isPEP"
                      type="radio"
                      :value="false"
                      class="mr-3 text-primary-600 focus:ring-primary-600"
                    />
                    <span class="text-slate-300">No</span>
                  </label>
                </div>
                <div v-if="errors[`beneficial_${index}_isPEP`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`beneficial_${index}_isPEP`] }}
                </div>
              </div>

              <div v-if="owner.isPEP" class="mt-4">
                <label class="block text-sm font-medium text-slate-300 mb-2">PEP Details</label>
                <textarea
                  v-model="owner.pepDetails"
                  class="form-input h-20 resize-none"
                  placeholder="Please provide details about the PEP status, position held, country, etc..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Beneficial Owner Button -->
        <button 
          @click="addBeneficialOwner"
          class="w-full py-3 border-2 border-dashed border-slate-500 rounded-lg text-slate-400 hover:border-slate-400 hover:text-slate-300 transition-colors"
        >
          + Add Another Beneficial Owner
        </button>
      </div>

      <!-- No Beneficial Owners Confirmation -->
      <div v-else-if="formData.hasBeneficialOwners === false" class="bg-slate-600 rounded-lg p-6">
        <h3 class="text-lg font-medium text-white mb-4">Confirmation</h3>
        <div class="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-yellow-100 text-sm">
                <strong>Important:</strong> By selecting this option, you confirm that no individual person owns or controls 
                more than 25% of the company's shares or voting rights. This declaration is legally binding and subject to verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeneficialOwner',
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
  methods: {
    addBeneficialOwner() {
      if (!this.formData.beneficialOwners) {
        this.$emit('update:formData', { ...this.formData, beneficialOwners: [] })
      }
      
      const newOwner = {
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        countryOfResidence: '',
        email: '',
        phoneNumber: '',
        ownershipPercentage: null,
        controlType: 'direct_shareholding',
        otherControlDescription: '',
        isPEP: null,
        pepDetails: ''
      }
      
      const updatedOwners = [...(this.formData.beneficialOwners || []), newOwner]
      this.$emit('update:formData', { 
        ...this.formData, 
        beneficialOwners: updatedOwners 
      })
    },
    
    removeBeneficialOwner(index) {
      const updatedOwners = this.formData.beneficialOwners.filter((_, i) => i !== index)
      this.$emit('update:formData', { 
        ...this.formData, 
        beneficialOwners: updatedOwners 
      })
    }
  },
  
  watch: {
    'formData.hasBeneficialOwners'(newValue) {
      if (newValue === true && (!this.formData.beneficialOwners || this.formData.beneficialOwners.length === 0)) {
        this.addBeneficialOwner()
      } else if (newValue === false) {
        this.$emit('update:formData', { 
          ...this.formData, 
          beneficialOwners: [] 
        })
      }
    }
  }
}
</script>
