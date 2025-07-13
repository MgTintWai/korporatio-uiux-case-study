<template>
  <div>
    <!-- Point of Contact Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-2">Point of contact</h2>
      <p class="text-slate-400 text-sm mb-6">
        This is the individual that we will communicate with. Communications
        related to this form but soon to the company once incorporated will be sent to
        the same email address (but will change if needed).
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Full name</label>
          <input
            v-model="formData.pointOfContact.fullName"
            type="text"
            class="form-input"
            placeholder="Stefano Covolan"
            :class="{ 'border-red-500': errors.fullName }"
          />
          <div v-if="formData.pointOfContact.fullName && !errors.fullName" class="mt-1">
            <span class="text-green-400 text-sm">✓</span>
          </div>
          <div v-if="errors.fullName" class="mt-1 text-red-400 text-sm">
            {{ errors.fullName }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            v-model="formData.pointOfContact.email"
            type="email"
            class="form-input"
            placeholder="korporatio@email.com"
            :class="{ 'border-red-500': errors.email }"
          />
          <div v-if="formData.pointOfContact.email && !errors.email" class="mt-1">
            <span class="text-green-400 text-sm">✓</span>
          </div>
          <div v-if="errors.email" class="mt-1 text-red-400 text-sm">
            {{ errors.email }}
          </div>
        </div>
      </div>
    </div>

    <!-- Company Information Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-2">Company information</h2>
      <p class="text-slate-400 text-sm mb-6">
        Every company must have a name and a designation. For the company name you
        can use both letters and numbers, but not special symbols. For the designation,
        there are no actual difference between one or another.
      </p>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Company name</label>
          <input
            v-model="formData.companyInformation.companyName"
            type="text"
            class="form-input"
            placeholder="The name you want your company to have"
            :class="{ 'border-red-500': errors.companyName }"
          />
          <div v-if="errors.companyName" class="mt-1 text-red-400 text-sm">
            {{ errors.companyName }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Alternative company name</label>
          <input
            v-model="formData.companyInformation.alternativeCompanyName"
            type="text"
            class="form-input"
            placeholder="The name to use if the first name is not available"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Company designation</label>
          <select
            v-model="formData.companyInformation.companyDesignation"
            class="form-select"
            :class="{ 'border-red-500': errors.companyDesignation }"
          >
            <option value="">Select the option that you prefer</option>
            <option value="Ltd">Ltd</option>
            <option value="Limited">Limited</option>
            <option value="Inc">Inc</option>
            <option value="Corporation">Corporation</option>
            <option value="Corp">Corp</option>
          </select>
          <div v-if="errors.companyDesignation" class="mt-1 text-red-400 text-sm">
            {{ errors.companyDesignation }}
          </div>
        </div>
      </div>
    </div>

    <!-- Countries of Interest Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-2">Countries of interest</h2>
      <p class="text-slate-400 text-sm mb-6">
        We are required to check that the company will not be interesting with
        forbidden locations. For jurisdictions you need to inform us of the county of
        residency. If you have more stakeholders, pick the most relevant. For "Target"
        jurisdictions refer to countries that are relevant. For more information
        clients from other countries.
      </p>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Jurisdiction of operation</label>
          <select
            v-model="formData.countriesOfInterest.jurisdictionOfOperation"
            class="form-select"
            :class="{ 'border-red-500': errors.jurisdictionOfOperation }"
          >
            <option value="">Select the country where you are located</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="CH">Switzerland</option>
            <option value="SG">Singapore</option>
            <option value="HK">Hong Kong</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
            <option value="other">Other</option>
          </select>
          <div v-if="errors.jurisdictionOfOperation" class="mt-1 text-red-400 text-sm">
            {{ errors.jurisdictionOfOperation }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Target jurisdictions</label>
          <select
            v-model="formData.countriesOfInterest.targetJurisdictions"
            class="form-select"
            multiple
            :class="{ 'border-red-500': errors.targetJurisdictions }"
          >
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="CH">Switzerland</option>
            <option value="SG">Singapore</option>
            <option value="HK">Hong Kong</option>
            <option value="JP">Japan</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
          </select>
          <p class="text-slate-400 text-xs mt-1">Hold Cmd/Ctrl to select multiple countries</p>
          <div v-if="errors.targetJurisdictions" class="mt-1 text-red-400 text-sm">
            {{ errors.targetJurisdictions }}
          </div>
        </div>
      </div>
    </div>

    <!-- Shares Structure Section -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-2">Shares structure</h2>
      <p class="text-slate-400 text-sm mb-6">
        All companies must have at least 1 share. Apart from that, you can set as many as
        you like. Issued shares are shares that you will be distributed on day 1. Unissued shares are shares that
        you can distribute later on day 2+. You can also set the value of each share, so if you want to build stock, the
        smallest number.
      </p>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Number of shares</label>
          <select
            v-model="formData.sharesStructure.numberOfShares"
            class="form-select"
            :class="{ 'border-red-500': errors.numberOfShares }"
          >
            <option value="">Select how many shares you wish to have</option>
            <option value="1">1 share</option>
            <option value="100">100 shares</option>
            <option value="1000">1,000 shares</option>
            <option value="10000">10,000 shares</option>
            <option value="100000">100,000 shares</option>
            <option value="1000000">1,000,000 shares</option>
            <option value="custom">Custom amount</option>
          </select>
          <div v-if="errors.numberOfShares" class="mt-1 text-red-400 text-sm">
            {{ errors.numberOfShares }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Are all shares issued?</label>
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                v-model="formData.sharesStructure.areAllSharesIssued"
                type="radio"
                :value="true"
                class="mr-3 text-primary-600 focus:ring-primary-600"
              />
              <span class="text-slate-300">Yes</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="formData.sharesStructure.areAllSharesIssued"
                type="radio"
                :value="false"
                class="mr-3 text-primary-600 focus:ring-primary-600"
              />
              <span class="text-slate-300">No</span>
            </label>
          </div>
          <div v-if="errors.areAllSharesIssued" class="mt-1 text-red-400 text-sm">
            {{ errors.areAllSharesIssued }}
          </div>
        </div>

        <div v-if="formData.sharesStructure.areAllSharesIssued === false">
          <label class="block text-sm font-medium text-slate-300 mb-2">Number of issued shares</label>
          <input
            v-model="formData.sharesStructure.numberOfIssuedShares"
            type="text"
            class="form-input"
            placeholder="Write how many shares you wish to issue on day 1"
            :class="{ 'border-red-500': errors.numberOfIssuedShares }"
          />
          <div v-if="errors.numberOfIssuedShares" class="mt-1 text-red-400 text-sm">
            {{ errors.numberOfIssuedShares }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Value per shares</label>
          <select
            v-model="formData.sharesStructure.valuePerShares"
            class="form-select"
            :class="{ 'border-red-500': errors.valuePerShares }"
          >
            <option value="">Select how much each share is worth</option>
            <option value="0.01">$0.01 per share</option>
            <option value="0.10">$0.10 per share</option>
            <option value="1.00">$1.00 per share</option>
            <option value="10.00">$10.00 per share</option>
            <option value="100.00">$100.00 per share</option>
            <option value="custom">Custom amount</option>
          </select>
          <div v-if="errors.valuePerShares" class="mt-1 text-red-400 text-sm">
            {{ errors.valuePerShares }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyDetails',
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
  emits: ['update:formData']
}
</script>
