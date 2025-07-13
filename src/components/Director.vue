<template>
  <div>
    <h2 class="text-xl font-semibold text-white mb-2">Director</h2>
    <p class="text-slate-400 text-sm mb-6">
      Every BVI company must have at least one director. Directors are responsible for the management 
      and operation of the company. Directors can be individuals or corporate entities, and there are 
      no residency requirements for BVI companies.
    </p>

    <div class="space-y-6">
      <!-- Directors List -->
      <div v-for="(director, index) in (Array.isArray(formData) ? formData : [])" :key="index" class="bg-slate-600 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-white">Director {{ index + 1 }}</h3>
          <button 
            v-if="(Array.isArray(formData) ? formData : []).length > 1"
            @click="removeDirector(index)"
            class="text-red-400 hover:text-red-300 text-sm"
          >
            Remove
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Director Type -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-300 mb-2">Director Type *</label>
            <div class="flex space-x-6">
              <label class="flex items-center">
                <input
                  v-model="director.type"
                  type="radio"
                  value="individual"
                  class="mr-2 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">Individual</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="director.type"
                  type="radio"
                  value="corporate"
                  class="mr-2 text-primary-600 focus:ring-primary-600"
                />
                <span class="text-slate-300">Corporate Director</span>
              </label>
            </div>
            <div v-if="errors[`director_${index}_type`]" class="mt-1 text-red-400 text-sm">
              {{ errors[`director_${index}_type`] }}
            </div>
          </div>

          <!-- Individual Director Fields -->
          <template v-if="director.type === 'individual'">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Full Legal Name *</label>
              <input
                v-model="director.fullName"
                type="text"
                class="form-input"
                placeholder="John Smith"
                :class="{ 'border-red-500': errors[`director_${index}_fullName`] }"
              />
              <div v-if="errors[`director_${index}_fullName`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_fullName`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Date of Birth *</label>
              <input
                v-model="director.dateOfBirth"
                type="date"
                class="form-input"
                :class="{ 'border-red-500': errors[`director_${index}_dateOfBirth`] }"
              />
              <div v-if="errors[`director_${index}_dateOfBirth`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_dateOfBirth`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Nationality *</label>
              <select
                v-model="director.nationality"
                class="form-select"
                :class="{ 'border-red-500': errors[`director_${index}_nationality`] }"
              >
                <option value="">Select nationality</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`director_${index}_nationality`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_nationality`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Country of Residence *</label>
              <select
                v-model="director.countryOfResidence"
                class="form-select"
                :class="{ 'border-red-500': errors[`director_${index}_countryOfResidence`] }"
              >
                <option value="">Select country of residence</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`director_${index}_countryOfResidence`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_countryOfResidence`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Occupation</label>
              <input
                v-model="director.occupation"
                type="text"
                class="form-input"
                placeholder="Business Executive"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
              <input
                v-model="director.email"
                type="email"
                class="form-input"
                placeholder="john@example.com"
                :class="{ 'border-red-500': errors[`director_${index}_email`] }"
              />
              <div v-if="errors[`director_${index}_email`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_email`] }}
              </div>
            </div>
          </template>

          <!-- Corporate Director Fields -->
          <template v-else-if="director.type === 'corporate'">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
              <input
                v-model="director.companyName"
                type="text"
                class="form-input"
                placeholder="ABC Directors Ltd"
                :class="{ 'border-red-500': errors[`director_${index}_companyName`] }"
              />
              <div v-if="errors[`director_${index}_companyName`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_companyName`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Registration Number</label>
              <input
                v-model="director.registrationNumber"
                type="text"
                class="form-input"
                placeholder="123456789"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Country of Incorporation *</label>
              <select
                v-model="director.countryOfIncorporation"
                class="form-select"
                :class="{ 'border-red-500': errors[`director_${index}_countryOfIncorporation`] }"
              >
                <option value="">Select country</option>
                <option value="BVI">British Virgin Islands</option>
                <option value="UK">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors[`director_${index}_countryOfIncorporation`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_countryOfIncorporation`] }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Registered Address</label>
              <textarea
                v-model="director.registeredAddress"
                class="form-input h-20 resize-none"
                placeholder="Enter the registered address of the corporate director"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Contact Person</label>
              <input
                v-model="director.contactPerson"
                type="text"
                class="form-input"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Contact Email *</label>
              <input
                v-model="director.contactEmail"
                type="email"
                class="form-input"
                placeholder="contact@company.com"
                :class="{ 'border-red-500': errors[`director_${index}_contactEmail`] }"
              />
              <div v-if="errors[`director_${index}_contactEmail`]" class="mt-1 text-red-400 text-sm">
                {{ errors[`director_${index}_contactEmail`] }}
              </div>
            </div>
          </template>

          <!-- Common Fields for Address -->
          <div class="md:col-span-2 border-t border-slate-500 pt-4">
            <h4 class="text-md font-medium text-white mb-4">
              {{ director.type === 'individual' ? 'Residential Address' : 'Principal Business Address' }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-slate-300 mb-2">Street Address *</label>
                <input
                  v-model="director.address.street"
                  type="text"
                  class="form-input"
                  placeholder="123 Main Street, Apt 4B"
                  :class="{ 'border-red-500': errors[`director_${index}_address_street`] }"
                />
                <div v-if="errors[`director_${index}_address_street`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`director_${index}_address_street`] }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">City *</label>
                <input
                  v-model="director.address.city"
                  type="text"
                  class="form-input"
                  placeholder="New York"
                  :class="{ 'border-red-500': errors[`director_${index}_address_city`] }"
                />
                <div v-if="errors[`director_${index}_address_city`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`director_${index}_address_city`] }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Postal/ZIP Code</label>
                <input
                  v-model="director.address.postalCode"
                  type="text"
                  class="form-input"
                  placeholder="10001"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">State/Province</label>
                <input
                  v-model="director.address.state"
                  type="text"
                  class="form-input"
                  placeholder="New York"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Country *</label>
                <select
                  v-model="director.address.country"
                  class="form-select"
                  :class="{ 'border-red-500': errors[`director_${index}_address_country`] }"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="SG">Singapore</option>
                  <option value="HK">Hong Kong</option>
                  <option value="other">Other</option>
                </select>
                <div v-if="errors[`director_${index}_address_country`]" class="mt-1 text-red-400 text-sm">
                  {{ errors[`director_${index}_address_country`] }}
                </div>
              </div>
            </div>
          </div>

          <!-- Director Roles and Responsibilities -->
          <div class="md:col-span-2 border-t border-slate-500 pt-4">
            <h4 class="text-md font-medium text-white mb-4">Director Role</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Director Position</label>
                <select
                  v-model="director.position"
                  class="form-select"
                >
                  <option value="director">Director</option>
                  <option value="managing_director">Managing Director</option>
                  <option value="executive_director">Executive Director</option>
                  <option value="non_executive_director">Non-Executive Director</option>
                  <option value="chairman">Chairman</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Appointment Date</label>
                <input
                  v-model="director.appointmentDate"
                  type="date"
                  class="form-input"
                />
              </div>
            </div>

            <div class="mt-4">
              <label class="flex items-center">
                <input
                  v-model="director.hasSigningAuthority"
                  type="checkbox"
                  class="mr-3 text-primary-600 focus:ring-primary-600 rounded"
                />
                <span class="text-slate-300">This director has signing authority for the company</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Director Button -->
      <button 
        @click="addDirector"
        class="w-full py-3 border-2 border-dashed border-slate-500 rounded-lg text-slate-400 hover:border-slate-400 hover:text-slate-300 transition-colors"
      >
        + Add Another Director
      </button>

      <!-- Summary -->
      <div class="bg-slate-600 rounded-lg p-4">
        <div class="flex justify-between items-center">
          <span class="text-slate-300">Total Directors:</span>
          <span class="font-semibold text-white">{{ (Array.isArray(formData) ? formData : []).length }}</span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-slate-300">Directors with Signing Authority:</span>
          <span class="font-semibold text-white">{{ directorsWithSigningAuthority }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Director',
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
    directorsWithSigningAuthority() {
      const currentData = Array.isArray(this.formData) ? this.formData : []
      return currentData.filter(director => director.hasSigningAuthority).length
    }
  },
  methods: {
    addDirector() {
      const newDirector = {
        type: 'individual',
        fullName: '',
        dateOfBirth: '',
        nationality: '',
        countryOfResidence: '',
        occupation: '',
        email: '',
        companyName: '',
        registrationNumber: '',
        countryOfIncorporation: '',
        registeredAddress: '',
        contactPerson: '',
        contactEmail: '',
        address: {
          street: '',
          city: '',
          postalCode: '',
          state: '',
          country: ''
        },
        position: 'director',
        appointmentDate: '',
        hasSigningAuthority: false
      }
      
      // Ensure formData is an array before spreading
      const currentData = Array.isArray(this.formData) ? this.formData : []
      const updatedDirectors = [...currentData, newDirector]
      this.$emit('update:formData', updatedDirectors)
    },
    
    removeDirector(index) {
      // Ensure formData is an array before filtering
      const currentData = Array.isArray(this.formData) ? this.formData : []
      const updatedDirectors = currentData.filter((_, i) => i !== index)
      this.$emit('update:formData', updatedDirectors)
    }
  },
  
  mounted() {
    // Initialize with one director if none exist
    const currentData = Array.isArray(this.formData) ? this.formData : []
    if (currentData.length === 0) {
      this.addDirector()
    }
  }
}
</script>
