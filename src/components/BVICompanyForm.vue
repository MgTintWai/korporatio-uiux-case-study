<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-white mb-4">Time to start your BVI company!</h1>
      <p class="text-slate-300 max-w-2xl mx-auto">
        All questions below must be answered. Take your time, and if you need to
        take a break the form will save automatically and you can continue later.
        Good luck!
      </p>
    </div>

    <!-- Step Indicator -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center space-x-4">
        <div v-for="step in steps" :key="step.number" class="flex items-center">
          <div 
            :class="[
              'step-indicator',
              currentStep === step.number ? 'step-active' : 
              currentStep > step.number ? 'step-completed' : 'step-inactive'
            ]"
          >
            {{ step.number }}
          </div>
          <span 
            :class="[
              'ml-2 text-sm font-medium',
              currentStep === step.number ? 'text-white' : 
              currentStep > step.number ? 'text-green-400' : 'text-slate-400'
            ]"
          >
            {{ step.name }}
          </span>
          <div v-if="step.number < steps.length" class="ml-4 w-8 h-px bg-slate-600"></div>
        </div>
      </div>
    </div>

    <!-- Server Status Indicator -->
    <div class="flex justify-center mb-4">
      <div class="flex items-center space-x-2 text-sm">
        <div 
          :class="[
            'w-2 h-2 rounded-full',
            isServerAvailable ? 'bg-green-400' : 'bg-yellow-400'
          ]"
        ></div>
        <span class="text-slate-300">
          {{ isServerAvailable ? 'Server connected' : 'Offline mode (local save)' }}
        </span>
      </div>
    </div>

    <!-- Form Steps -->
    <div class="bg-slate-700 rounded-lg p-8">
      <!-- Step 1: Company Details -->
      <div v-if="currentStep === 1">
        <CompanyDetails 
          v-model:formData="formData.companyDetails" 
          :errors="errors.companyDetails"
        />
      </div>
      <!-- Step 2: Shareholders -->
        <div v-if="currentStep === 2">
          <Shareholders 
            v-model:formData="formData.shareholders" 
            :errors="errors.shareholders"
          />
        </div>

        <!-- Step 3: Beneficial Owner -->
        <div v-if="currentStep === 3">
          <BeneficialOwner 
            v-model:formData="formData.beneficialOwner"
            :errors="errors.beneficialOwner"
          />
        </div>

        <!-- Step 4: Director -->
        <div v-if="currentStep === 4">
          <Director 
            v-model:formData="formData.directors"
            :errors="errors.director"
          />
        </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button 
          v-if="currentStep > 1"
          @click="previousStep"
          class="btn-secondary flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          BACK
        </button>
        <div v-else></div>

        <div class="flex space-x-4">
          <button 
            @click="saveAndExit"
            :disabled="isLoading"
            class="btn-secondary flex items-center"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'SAVING...' : 'SAVE & EXIT' }}
          </button>
          <button 
            v-if="currentStep < steps.length"
            @click="nextStep"
            :disabled="isLoading"
            class="btn-primary flex items-center"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            NEXT
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          <button 
            v-else
            @click="submitForm"
            :disabled="isLoading"
            class="btn-primary flex items-center"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'SUBMITTING...' : 'SUBMIT' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyDetails from './CompanyDetails.vue'
import Shareholders from './Shareholders.vue'
import BeneficialOwner from './BeneficialOwner.vue'
import Director from './Director.vue'
import ApiService from '../services/api.js'
import Swal from 'sweetalert2'

export default {
  name: 'BVICompanyForm',
  components: {
    CompanyDetails,
    Shareholders,
    BeneficialOwner,
    Director
  },
  data() {
    return {
      currentStep: 1,
      isServerAvailable: false,
      currentDraftId: null,
      isLoading: false,
      saveTimeout: null,
      steps: [
        { number: 1, name: 'Company Details' },
        { number: 2, name: 'Shareholders' },
        { number: 3, name: 'Beneficial Owner' },
        { number: 4, name: 'Director' }
      ],
      formData: {
        companyDetails: {
          pointOfContact: {
            fullName: '',
            email: ''
          },
          companyInformation: {
            companyName: '',
            alternativeCompanyName: '',
            companyDesignation: ''
          },
          countriesOfInterest: {
            jurisdictionOfOperation: '',
            targetJurisdictions: []
          },
          sharesStructure: {
            numberOfShares: '',
            areAllSharesIssued: null,
            numberOfIssuedShares: '',
            valuePerShares: ''
          }
        },
        shareholders: [],
        beneficialOwner: {
          hasBeneficialOwners: null,
          beneficialOwners: []
        },
        directors: [],
      },
      errors: {
        companyDetails: {},
        shareholders: {},
        beneficialOwner: {},
        director: {}
      }
    }
  },
  methods: {
    nextStep() {
      if (this.validateCurrentStep()) {
        this.currentStep++
      }
    },
    previousStep() {
      this.currentStep--
    },
    validateCurrentStep() {
      // Reset errors for current step
      const stepKey = this.getStepKey()
      this.errors[stepKey] = {}

      // Validate based on current step
      switch (this.currentStep) {
        case 1:
          return this.validateCompanyDetails()
        case 2:
          return this.validateShareholders()
        case 3:
          return this.validateBeneficialOwner()
        case 4:
          return this.validateDirector()
        default:
          return true
      }
    },
    getStepKey() {
      const stepKeys = ['companyDetails', 'shareholders', 'beneficialOwner', 'director']
      return stepKeys[this.currentStep - 1]
    },
    validateCompanyDetails() {
      let isValid = true
      const data = this.formData.companyDetails

      // Validate Point of Contact
      if (!data.pointOfContact.fullName.trim()) {
        this.errors.companyDetails.fullName = 'Full name is required'
        isValid = false
      }

      if (!data.pointOfContact.email.trim()) {
        this.errors.companyDetails.email = 'Email is required'
        isValid = false
      } else if (!this.isValidEmail(data.pointOfContact.email)) {
        this.errors.companyDetails.email = 'The email suggested is not valid. Please provide another one.'
        isValid = false
      }

      // Validate Company Information
      if (!data.companyInformation.companyName.trim()) {
        this.errors.companyDetails.companyName = 'Company name is required'
        isValid = false
      }

      if (!data.companyInformation.companyDesignation) {
        this.errors.companyDetails.companyDesignation = 'Company designation is required'
        isValid = false
      }

      // Validate Countries of Interest
      if (!data.countriesOfInterest.jurisdictionOfOperation) {
        this.errors.companyDetails.jurisdictionOfOperation = 'Jurisdiction of operation is required'
        isValid = false
      }

      if (!data.countriesOfInterest.targetJurisdictions.length) {
        this.errors.companyDetails.targetJurisdictions = 'Target jurisdictions is required'
        isValid = false
      }

      // Validate Shares Structure
      if (!data.sharesStructure.numberOfShares) {
        this.errors.companyDetails.numberOfShares = 'Number of shares is required'
        isValid = false
      }

      if (data.sharesStructure.areAllSharesIssued === null) {
        this.errors.companyDetails.areAllSharesIssued = 'Please select if all shares are issued'
        isValid = false
      }

      if (data.sharesStructure.areAllSharesIssued === false && !data.sharesStructure.numberOfIssuedShares) {
        this.errors.companyDetails.numberOfIssuedShares = 'Number of issued shares is required'
        isValid = false
      }

      if (!data.sharesStructure.valuePerShares) {
        this.errors.companyDetails.valuePerShares = 'Value per shares is required'
        isValid = false
      }

      return isValid
    },
    validateShareholders() {
      let isValid = true
      const shareholders = this.formData.shareholders
      
      if (!shareholders || !Array.isArray(shareholders) || shareholders.length === 0) {
        this.errors.shareholders.general = 'At least one shareholder is required'
        return false
      }

      // Validate each shareholder
      shareholders.forEach((shareholder, index) => {
        if (!shareholder.type) {
          this.errors.shareholders[`shareholder_${index}_type`] = 'Shareholder type is required'
          isValid = false
        }

        if (shareholder.type === 'individual') {
          if (!shareholder.fullName?.trim()) {
            this.errors.shareholders[`shareholder_${index}_fullName`] = 'Full name is required'
            isValid = false
          }
          if (!shareholder.dateOfBirth) {
            this.errors.shareholders[`shareholder_${index}_dateOfBirth`] = 'Date of birth is required'
            isValid = false
          }
          if (!shareholder.nationality) {
            this.errors.shareholders[`shareholder_${index}_nationality`] = 'Nationality is required'
            isValid = false
          }
        } else if (shareholder.type === 'corporate') {
          if (!shareholder.companyName?.trim()) {
            this.errors.shareholders[`shareholder_${index}_companyName`] = 'Company name is required'
            isValid = false
          }
          if (!shareholder.countryOfIncorporation) {
            this.errors.shareholders[`shareholder_${index}_countryOfIncorporation`] = 'Country of incorporation is required'
            isValid = false
          }
        }

        if (!shareholder.numberOfShares || shareholder.numberOfShares <= 0) {
          this.errors.shareholders[`shareholder_${index}_numberOfShares`] = 'Number of shares must be greater than 0'
          isValid = false
        }

        if (!shareholder.percentage || shareholder.percentage <= 0) {
          this.errors.shareholders[`shareholder_${index}_percentage`] = 'Percentage must be greater than 0'
          isValid = false
        }
      })

      // Check total percentage
      const totalPercentage = shareholders.reduce((total, s) => total + (Number(s.percentage) || 0), 0)
      if (Math.abs(totalPercentage - 100) > 0.01) {
        this.errors.shareholders.totalPercentage = 'Total percentage must equal 100%'
        isValid = false
      }

      return isValid
    },
    
    validateBeneficialOwner() {
      let isValid = true
      const data = this.formData.beneficialOwner

      if (data.hasBeneficialOwners === null) {
        this.errors.beneficialOwner.hasBeneficialOwners = 'Please specify if there are beneficial owners'
        isValid = false
      }

      if (data.hasBeneficialOwners && data.beneficialOwners) {
        data.beneficialOwners.forEach((owner, index) => {
          if (!owner.fullName?.trim()) {
            this.errors.beneficialOwner[`beneficial_${index}_fullName`] = 'Full name is required'
            isValid = false
          }
          if (!owner.dateOfBirth) {
            this.errors.beneficialOwner[`beneficial_${index}_dateOfBirth`] = 'Date of birth is required'
            isValid = false
          }
          if (!owner.nationality) {
            this.errors.beneficialOwner[`beneficial_${index}_nationality`] = 'Nationality is required'
            isValid = false
          }
          if (!owner.countryOfResidence) {
            this.errors.beneficialOwner[`beneficial_${index}_countryOfResidence`] = 'Country of residence is required'
            isValid = false
          }
          if (!owner.ownershipPercentage || owner.ownershipPercentage < 25) {
            this.errors.beneficialOwner[`beneficial_${index}_ownershipPercentage`] = 'Ownership percentage must be at least 25%'
            isValid = false
          }
          if (owner.isPEP === null) {
            this.errors.beneficialOwner[`beneficial_${index}_isPEP`] = 'PEP status is required'
            isValid = false
          }
        })
      }

      return isValid
    },
    
    validateDirector() {
      let isValid = true
      const directors = this.formData.directors

      if (!directors || !Array.isArray(directors) || directors.length === 0) {
        this.errors.director.general = 'At least one director is required'
        return false
      }

      directors.forEach((director, index) => {
        if (!director.type) {
          this.errors.director[`director_${index}_type`] = 'Director type is required'
          isValid = false
        }

        if (director.type === 'individual') {
          if (!director.fullName?.trim()) {
            this.errors.director[`director_${index}_fullName`] = 'Full name is required'
            isValid = false
          }
          if (!director.dateOfBirth) {
            this.errors.director[`director_${index}_dateOfBirth`] = 'Date of birth is required'
            isValid = false
          }
          if (!director.nationality) {
            this.errors.director[`director_${index}_nationality`] = 'Nationality is required'
            isValid = false
          }
          if (!director.countryOfResidence) {
            this.errors.director[`director_${index}_countryOfResidence`] = 'Country of residence is required'
            isValid = false
          }
          if (!director.email?.trim()) {
            this.errors.director[`director_${index}_email`] = 'Email is required'
            isValid = false
          } else if (!this.isValidEmail(director.email)) {
            this.errors.director[`director_${index}_email`] = 'Invalid email format'
            isValid = false
          }
        } else if (director.type === 'corporate') {
          if (!director.companyName?.trim()) {
            this.errors.director[`director_${index}_companyName`] = 'Company name is required'
            isValid = false
          }
          if (!director.countryOfIncorporation) {
            this.errors.director[`director_${index}_countryOfIncorporation`] = 'Country of incorporation is required'
            isValid = false
          }
          if (!director.contactEmail?.trim()) {
            this.errors.director[`director_${index}_contactEmail`] = 'Contact email is required'
            isValid = false
          }
        }

        // Address validation
        if (!director.address?.street?.trim()) {
          this.errors.director[`director_${index}_address_street`] = 'Street address is required'
          isValid = false
        }
        if (!director.address?.city?.trim()) {
          this.errors.director[`director_${index}_address_city`] = 'City is required'
          isValid = false
        }
        if (!director.address?.country) {
          this.errors.director[`director_${index}_address_country`] = 'Country is required'
          isValid = false
        }
      })

      return isValid
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    async saveAndExit() {
      this.isLoading = true
      
      // Check server status before saving
      await this.checkServerConnection()
      
      try {
        if (this.isServerAvailable) {
          if (this.currentDraftId) {
            // Update existing draft
            await ApiService.updateDraft(this.currentDraftId, this.formData)
          } else {
            // Create new draft
            const draft = await ApiService.saveDraft(this.formData)
            this.currentDraftId = draft.id
          }
          
          // Show success message with SweetAlert
          await Swal.fire({
            title: 'Draft Saved!',
            text: 'Your form has been saved successfully to the server. You can continue later.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#10b981',
            background: '#1e293b',
            color: '#f1f5f9',
            timer: 3000,
            timerProgressBar: true
          })
        } else {
          // Fallback to localStorage
          localStorage.setItem('bviCompanyFormData', JSON.stringify(this.formData))
          
          // Show offline save message
          await Swal.fire({
            title: 'Saved Locally',
            text: 'Server is unavailable. Your form has been saved locally and will sync when connection is restored.',
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3b82f6',
            background: '#1e293b',
            color: '#f1f5f9'
          })
        }
      } catch (error) {
        console.error('Error saving form:', error)
        // Update server status and fallback to localStorage
        this.isServerAvailable = false
        localStorage.setItem('bviCompanyFormData', JSON.stringify(this.formData))
        
        // Show error message
        await Swal.fire({
          title: 'Save Error',
          text: 'Unable to save to server. Your form has been saved locally instead.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f59e0b',
          background: '#1e293b',
          color: '#f1f5f9'
        })
      } finally {
        this.isLoading = false
      }
    },
    
    async submitForm() {
      if (!this.validateCurrentStep()) {
        // Show validation error with SweetAlert
        await Swal.fire({
          title: 'Validation Error',
          text: 'Please complete all required fields before submitting.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#f1f5f9'
        })
        return
      }
      
      this.isLoading = true
      
      // Check server status before submitting
      await this.checkServerConnection()
      
      try {
        if (this.isServerAvailable) {
          // Submit to server
          const submission = await ApiService.submitForm(this.formData)
          console.log('Form submitted successfully:', submission)
          
          // Remove draft if it exists
          if (this.currentDraftId) {
            try {
              await ApiService.deleteDraft(this.currentDraftId)
            } catch (error) {
              console.error('Error deleting draft:', error)
            }
          }
          
          // Clear local storage
          localStorage.removeItem('bviCompanyFormData')
          
          // Show success message with SweetAlert
          await Swal.fire({
            title: 'Success!',
            text: 'Your BVI company formation request has been submitted successfully. We will review your application and contact you soon.',
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#10b981',
            background: '#1e293b',
            color: '#f1f5f9',
            timer: 5000,
            timerProgressBar: true
          })
          
          // Reset form
          this.resetForm()
        } else {
          // Show server unavailable error
          await Swal.fire({
            title: 'Server Unavailable',
            text: 'Cannot submit form: Server is not available. Please check your connection and try again later.',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#f59e0b',
            background: '#1e293b',
            color: '#f1f5f9'
          })
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        
        // Update server status
        this.isServerAvailable = false
        
        // Show error message with SweetAlert
        await Swal.fire({
          title: 'Submission Failed',
          text: 'There was an error submitting your form. Please try again or contact support if the problem persists.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ef4444',
          background: '#1e293b',
          color: '#f1f5f9'
        })
      } finally {
        this.isLoading = false
      }
    },
    
    resetForm() {
      this.currentStep = 1
      this.currentDraftId = null
      this.formData = {
        companyDetails: {
          pointOfContact: {
            fullName: '',
            email: ''
          },
          companyInformation: {
            companyName: '',
            alternativeCompanyName: '',
            companyDesignation: ''
          },
          countriesOfInterest: {
            jurisdictionOfOperation: '',
            targetJurisdictions: []
          },
          sharesStructure: {
            numberOfShares: '',
            areAllSharesIssued: null,
            numberOfIssuedShares: '',
            valuePerShares: ''
          }
        },
        shareholders: [],
        beneficialOwner: {
          hasBeneficialOwners: null,
          beneficialOwners: []
        },
        directors: [],
      }
      this.errors = {
        companyDetails: {},
        shareholders: {},
        beneficialOwner: {},
        director: {}
      }
    },
    
    async autoSave() {
      // Check server status before auto-save
      await this.checkServerConnection()
      
      if (this.isServerAvailable && this.formData) {
        try {
          if (this.currentDraftId) {
            await ApiService.updateDraft(this.currentDraftId, this.formData)
          } else {
            const draft = await ApiService.saveDraft(this.formData)
            this.currentDraftId = draft.id
          }
        } catch (error) {
          console.error('Auto-save failed:', error)
          // Update server status and fallback to localStorage
          this.isServerAvailable = false
          localStorage.setItem('bviCompanyFormData', JSON.stringify(this.formData))
        }
      } else {
        // Fallback to localStorage
        localStorage.setItem('bviCompanyFormData', JSON.stringify(this.formData))
      }
    },
    
    async checkServerConnection() {
      try {
        this.isServerAvailable = await ApiService.checkServerStatus()
      } catch (error) {
        console.error('Error checking server status:', error)
        this.isServerAvailable = false
      }
    },
    
    async loadExistingData() {
      try {
        // Check server status first
        this.isServerAvailable = await ApiService.checkServerStatus()
        
        if (this.isServerAvailable) {
          // Try to load drafts from server
          const drafts = await ApiService.getDrafts()
          if (drafts && drafts.length > 0) {
            // Load the most recent draft
            const latestDraft = drafts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0]
            this.formData = { ...this.formData, ...latestDraft }
            this.currentDraftId = latestDraft.id
            console.log('Loaded draft from server:', latestDraft.id)
          }
        } else {
          // Fallback to localStorage
          const savedData = localStorage.getItem('bviCompanyFormData')
          if (savedData) {
            this.formData = { ...this.formData, ...JSON.parse(savedData) }
            console.log('Loaded data from localStorage')
          }
        }
      } catch (error) {
        console.error('Error loading existing data:', error)
        // Fallback to localStorage
        const savedData = localStorage.getItem('bviCompanyFormData')
        if (savedData) {
          this.formData = { ...this.formData, ...JSON.parse(savedData) }
        }
      }
    }
  },
  
  async mounted() {
    await this.loadExistingData()
    
    // Set up auto-save every 30 seconds
    setInterval(() => {
      if (!this.isLoading) {
        this.autoSave()
      }
    }, 30000)
    
    // Set up server status check every 10 seconds
    setInterval(async () => {
      await this.checkServerConnection()
    }, 10000)
  },
  
  watch: {
    // Auto-save when form data changes (debounced)
    formData: {
      handler() {
        clearTimeout(this.saveTimeout)
        this.saveTimeout = setTimeout(() => {
          if (!this.isLoading) {
            this.autoSave()
          }
        }, 2000)
      },
      deep: true
    }
  }
}
</script>
