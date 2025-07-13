// API service for handling form data with JSON Server
const API_BASE_URL = 'http://localhost:3001'

class ApiService {
  // Save form data as draft
  async saveDraft(formData) {
    try {
      const draftData = {
        id: Date.now(), // Simple ID generation
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...formData
      }

      const response = await fetch(`${API_BASE_URL}/drafts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData)
      })

      if (!response.ok) {
        throw new Error('Failed to save draft')
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving draft:', error)
      // Fallback to localStorage if server is not available
      localStorage.setItem('bviCompanyFormDraft', JSON.stringify(formData))
      throw error
    }
  }

  // Update existing draft
  async updateDraft(id, formData) {
    try {
      const draftData = {
        ...formData,
        updatedAt: new Date().toISOString()
      }

      const response = await fetch(`${API_BASE_URL}/drafts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData)
      })

      if (!response.ok) {
        throw new Error('Failed to update draft')
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating draft:', error)
      // Fallback to localStorage if server is not available
      localStorage.setItem('bviCompanyFormDraft', JSON.stringify(formData))
      throw error
    }
  }

  // Submit final form
  async submitForm(formData) {
    try {
      const submissionData = {
        id: Date.now(),
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...formData
      }

      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      
      // Clear localStorage draft after successful submission
      localStorage.removeItem('bviCompanyFormDraft')
      
      return result
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    }
  }

  // Get all drafts
  async getDrafts() {
    try {
      const response = await fetch(`${API_BASE_URL}/drafts`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch drafts')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching drafts:', error)
      // Fallback to localStorage if server is not available
      const localDraft = localStorage.getItem('bviCompanyFormDraft')
      return localDraft ? [JSON.parse(localDraft)] : []
    }
  }

  // Get all submitted companies
  async getCompanies() {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch companies')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching companies:', error)
      return []
    }
  }

  // Get specific draft by ID
  async getDraft(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/drafts/${id}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch draft')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching draft:', error)
      return null
    }
  }

  // Delete draft
  async deleteDraft(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/drafts/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete draft')
      }

      return true
    } catch (error) {
      console.error('Error deleting draft:', error)
      throw error
    }
  }

  // Check if server is available
  async checkServerStatus() {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
      
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'HEAD',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      return response.ok
    } catch (error) {
      console.log('Server unavailable:', error.message)
      return false
    }
  }
}

export default new ApiService()
