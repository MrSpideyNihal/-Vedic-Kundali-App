export function validateForm(formData) {
    const errors = {}

    // Validate first name
    if (!formData.firstName || formData.firstName.trim() === '') {
        errors.firstName = 'First name is required'
    }

    // Validate last name
    if (!formData.lastName || formData.lastName.trim() === '') {
        errors.lastName = 'Last name is required'
    }

    // Validate date of birth
    if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required'
    } else {
        const dob = new Date(formData.dateOfBirth)
        const today = new Date()

        if (isNaN(dob.getTime())) {
            errors.dateOfBirth = 'Invalid date format'
        } else if (dob > today) {
            errors.dateOfBirth = 'Date of birth cannot be in the future'
        } else if (dob.getFullYear() < 1900) {
            errors.dateOfBirth = 'Date of birth must be after 1900'
        }
    }

    // Validate time of birth
    if (!formData.timeOfBirth) {
        errors.timeOfBirth = 'Time of birth is required'
    } else {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/
        if (!timeRegex.test(formData.timeOfBirth)) {
            errors.timeOfBirth = 'Invalid time format (use HH:MM or HH:MM:SS)'
        }
    }

    // Validate location
    if (!formData.location) {
        errors.location = 'Please select a location from the dropdown'
    } else if (!formData.location.lat || !formData.location.lon) {
        errors.location = 'Invalid location data'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export function formatDateForDisplay(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export function formatTimeForDisplay(timeString) {
    // Ensure time has seconds
    const parts = timeString.split(':')
    if (parts.length === 2) {
        return `${timeString}:00`
    }
    return timeString
}

export function getFullName(formData) {
    const parts = [
        formData.firstName,
        formData.middleName,
        formData.lastName
    ].filter(part => part && part.trim() !== '')

    return parts.join(' ').toUpperCase()
}
