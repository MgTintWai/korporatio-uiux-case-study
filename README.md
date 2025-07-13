# BVI Company Formation Form

A multi-step form application built with Vue 3, Vite, and Tailwind CSS for creating BVI company formation requests.

## Features

- **Multi-step Form**: 4-step process covering Company Details, Shareholders, Beneficial Owner, and Director information
- **Form Validation**: Real-time validation with error messages
- **Auto-save**: Form data is automatically saved every 30 seconds and on changes
- **Fake Server Backend**: JSON Server for data persistence and API simulation
- **Draft Management**: Save and resume forms later
- **SweetAlert2 Integration**: Beautiful, customized alert dialogs
- **Responsive Design**: Mobile-friendly interface with dark theme
- **Modern UI**: Built with Tailwind CSS for a professional appearance
- **Offline Support**: Falls back to localStorage when server is unavailable

## Tech Stack

- **Vue 3**: Modern JavaScript framework with Composition API
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **SweetAlert2**: Beautiful alert dialogs and notifications
- **JSON Server**: Fake REST API for development
- **JavaScript**: ES6+ features

## Project Structure

```
src/
├── components/
│   ├── BVICompanyForm.vue     # Main form container
│   ├── CompanyDetails.vue     # Step 1: Company Details
│   ├── Shareholders.vue       # Step 2: Shareholders
│   ├── BeneficialOwner.vue    # Step 3: Beneficial Owner
│   └── Director.vue           # Step 4: Director
├── App.vue                    # Root component
├── main.js                    # Application entry point
└── style.css                  # Global styles and Tailwind imports
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Form Steps

### Step 1: Company Details
- Point of Contact (Full name, Email)
- Company Information (Company name, Alternative name, Designation)
- Countries of Interest (Jurisdiction of operation, Target jurisdictions)
- Shares Structure (Number of shares, Issued shares, Value per share)

### Step 2: Shareholders
- **Shareholder Type**: Individual or Corporate Entity selection
- **Individual Shareholders**: Full name, date of birth, nationality, email
- **Corporate Shareholders**: Company name, registration number, country of incorporation, contact email
- **Shareholding Information**: Number of shares, percentage ownership, share class
- **Multiple Shareholders**: Add/remove shareholders dynamically
- **Validation**: Total ownership must equal 100%

### Step 3: Beneficial Owner
- **Beneficial Ownership Declaration**: Yes/No for beneficial owners (>25% ownership)
- **Individual Information**: Full legal name, date of birth, nationality, country of residence
- **Contact Details**: Email address, phone number
- **Ownership Details**: Percentage of ownership, nature of control
- **PEP Declaration**: Politically Exposed Person status and details
- **Compliance**: Anti-money laundering regulations compliance

### Step 4: Director
- **Director Type**: Individual or Corporate Director selection
- **Individual Directors**: Full legal name, date of birth, nationality, country of residence, occupation, email
- **Corporate Directors**: Company name, registration number, country of incorporation, contact person, contact email
- **Address Information**: Complete residential/business address
- **Director Role**: Position, appointment date, signing authority
- **Multiple Directors**: Add/remove directors dynamically

## Validation

The form includes comprehensive validation for all steps:

### Step 1 - Company Details
- Required field validation for all mandatory fields
- Email format validation
- Company designation selection required
- Jurisdiction and target countries selection
- Shares structure validation (number of shares, issued shares, value per share)

### Step 2 - Shareholders
- At least one shareholder required
- Shareholder type selection (individual/corporate)
- Complete information required based on shareholder type
- Number of shares and percentage validation
- Total ownership percentage must equal exactly 100%
- Email format validation where applicable

### Step 3 - Beneficial Owner
- Beneficial ownership declaration required
- If beneficial owners exist: complete personal information required
- Ownership percentage must be at least 25%
- PEP (Politically Exposed Person) status declaration required
- Email format validation

### Step 4 - Director
- At least one director required
- Director type selection (individual/corporate)
- Complete information required based on director type
- Full address information required
- Email format validation
- Visual feedback with error messages and success indicators

## Auto-save Feature

Form data is automatically saved to localStorage, allowing users to:
- Resume form completion after browser refresh
- Save progress and continue later
- Prevent data loss during form completion

## Styling

The application uses a dark theme with:
- Slate color palette for backgrounds
- Purple accent colors for interactive elements
- Responsive grid layouts
- Custom form components
- Step indicator with progress visualization

## Development

To extend the form:
1. Add new fields to the respective component
2. Update validation logic in `BVICompanyForm.vue`
3. Add corresponding error handling
4. Update the form data structure

## UI/UX Considerations

### Implemented Features
- **Progressive Disclosure**: Complex forms broken into digestible steps
- **Visual Feedback**: Real-time validation with green checkmarks for valid fields
- **Error Prevention**: Clear labeling of required fields with asterisks
- **Contextual Help**: Descriptive text explaining each form section
- **Dynamic Forms**: Add/remove functionality for shareholders and directors
- **Status Indicators**: Step progress indicator and completion status
- **Responsive Design**: Mobile-friendly layouts with proper touch targets

### Intentional Design Decisions
- **Dark Theme**: Professional appearance suitable for business applications
- **Consistent Spacing**: 6-unit spacing system for visual hierarchy
- **Color Coding**: Red for errors, green for success, yellow for warnings
- **Form Organization**: Logical grouping of related fields with visual separators
- **Button Placement**: Navigation buttons positioned consistently at form bottom
- **Auto-save Messaging**: Clear indication when data is saved automatically

### Areas for Enhancement
- **Accessibility**: Could benefit from ARIA labels and keyboard navigation improvements
- **Validation Timing**: Consider debounced validation for better user experience
- **Progress Persistence**: Visual indication of which steps have been completed
- **Field Dependencies**: Some fields could be conditionally shown/hidden based on other selections
- **Data Export**: Ability to export form data in different formats
- **Draft Versions**: Multiple saved versions of the same form

## Browser Support

Modern browsers with ES6+ support:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
