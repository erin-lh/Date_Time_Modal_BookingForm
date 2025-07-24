# API Integration Guide

This document outlines how to integrate the Calendar Booking Form with backend APIs.

## Overview

The current implementation uses static data. This guide shows how to replace static data with API calls for a fully functional booking system.

## API Endpoints

### Required Endpoints

#### 1. Property Search
\`\`\`
GET /api/properties/search?query={searchTerm}
\`\`\`

**Purpose**: Search for properties by address
**Response**:
\`\`\`json
{
  "properties": [
    {
      "id": "prop_123",
      "address": "333 Adelaide Street, BRISBANE CITY QLD 4000",
      "formatted_address": "333 Adelaide Street, BRISBANE CITY QLD 4000",
      "coordinates": {
        "lat": -27.4698,
        "lng": 153.0251
      }
    }
  ]
}
\`\`\`

#### 2. Available Time Slots
\`\`\`
GET /api/bookings/availability?date={YYYY-MM-DD}&property_id={id}
\`\`\`

**Purpose**: Get available time slots for a specific date
**Response**:
\`\`\`json
{
  "date": "2025-07-25",
  "available_slots": [
    {
      "time": "08:30",
      "available": true,
      "booking_type": "specific"
    },
    {
      "time": "11:00",
      "available": false,
      "booking_type": "specific"
    }
  ],
  "flexi_available": true,
  "flexi_slots_remaining": 3
}
\`\`\`

#### 3. Create Booking
\`\`\`
POST /api/bookings
\`\`\`

**Purpose**: Create a new booking
**Request Body**:
\`\`\`json
{
  "booking_type": "Sales",
  "property_address": "333 Adelaide Street, BRISBANE CITY QLD 4000",
  "property_details": {
    "bedrooms": 2,
    "bathrooms": 1,
    "car_spaces": 1,
    "size_sqm": 160
  },
  "property_access": "Meet Onsite",
  "booking_date": "2025-07-25",
  "booking_time": "08:30",
  "is_flexi": false,
  "contact_details": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+61400000000"
  }
}
\`\`\`

**Response**:
\`\`\`json
{
  "booking_id": "book_456",
  "status": "confirmed",
  "confirmation_code": "ABC123",
  "message": "Booking confirmed successfully"
}
\`\`\`

## Implementation

### 1. API Client Setup

Create an API client utility:

\`\`\`typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }

  async searchProperties(query: string) {
    return this.request<PropertySearchResponse>(
      `/properties/search?query=${encodeURIComponent(query)}`
    )
  }

  async getAvailability(date: string, propertyId?: string) {
    const params = new URLSearchParams({ date })
    if (propertyId) params.append('property_id', propertyId)
    
    return this.request<AvailabilityResponse>(
      `/bookings/availability?${params.toString()}`
    )
  }

  async createBooking(bookingData: BookingRequest) {
    return this.request<BookingResponse>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }
}

export const apiClient = new ApiClient()
\`\`\`

### 2. Type Definitions

\`\`\`typescript
// types/api.ts
export interface PropertySearchResponse {
  properties: Property[]
}

export interface Property {
  id: string
  address: string
  formatted_address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface AvailabilityResponse {
  date: string
  available_slots: TimeSlot[]
  flexi_available: boolean
  flexi_slots_remaining: number
}

export interface TimeSlot {
  time: string
  available: boolean
  booking_type: 'specific' | 'flexi'
}

export interface BookingRequest {
  booking_type: string
  property_address: string
  property_details: {
    bedrooms?: number
    bathrooms?: number
    car_spaces?: number
    size_sqm?: number
  }
  property_access: string
  booking_date: string
  booking_time: string
  is_flexi: boolean
  contact_details: {
    name: string
    email: string
    phone: string
  }
}

export interface BookingResponse {
  booking_id: string
  status: string
  confirmation_code: string
  message: string
}
\`\`\`

### 3. Custom Hooks

Create hooks for API operations:

\`\`\`typescript
// hooks/use-property-search.ts
import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'
import { Property } from '@/types/api'

export function usePropertySearch() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchProperties = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProperties([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.searchProperties(query)
      setProperties(response.properties)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    properties,
    loading,
    error,
    searchProperties,
  }
}
\`\`\`

\`\`\`typescript
// hooks/use-availability.ts
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { AvailabilityResponse } from '@/types/api'

export function useAvailability(date: string, propertyId?: string) {
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!date) return

    const fetchAvailability = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient.getAvailability(date, propertyId)
        setAvailability(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load availability')
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [date, propertyId])

  return {
    availability,
    loading,
    error,
  }
}
\`\`\`

### 4. Updated BookingForm Component

Integrate API calls into the main component:

\`\`\`typescript
// booking-form.tsx (updated sections)
import { usePropertySearch } from '@/hooks/use-property-search'
import { useAvailability } from '@/hooks/use-availability'
import { apiClient } from '@/lib/api-client'

export default function BookingForm() {
  // ... existing state ...
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const { properties, loading: searchLoading, searchProperties } = usePropertySearch()
  const { availability, loading: availabilityLoading } = useAvailability(
    selectedDate || '',
    selectedProperty?.id
  )

  // Property search with debouncing
  const handlePropertySearch = useCallback(
    debounce((query: string) => {
      searchProperties(query)
    }, 300),
    [searchProperties]
  )

  // Update calendar data based on availability
  const calendarDays = useMemo(() => {
    if (!availability) return []
    
    return availability.available_slots.map(slot => ({
      day: format(new Date(availability.date), 'EEE'),
      date: format(new Date(availability.date), 'd'),
      available: slot.available,
      time: slot.time,
    }))
  }, [availability])

  // Handle booking submission
  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedProperty) return

    setSubmitting(true)

    try {
      const bookingData = {
        booking_type: selectedBookingType,
        property_address: selectedProperty.address,
        property_details: {
          bedrooms: parseInt(bedroomsValue) || undefined,
          bathrooms: parseInt(bathroomsValue) || undefined,
          car_spaces: parseInt(carSpacesValue) || undefined,
          size_sqm: parseInt(sizeValue) || undefined,
        },
        property_access: selectedPropertyAccess,
        booking_date: selectedDate,
        booking_time: selectedTime,
        is_flexi: selectedTime === 'flexi',
        contact_details: {
          name: 'John Doe', // Get from form
          email: 'john@example.com', // Get from form
          phone: '+61400000000', // Get from form
        },
      }

      const response = await apiClient.createBooking(bookingData)
      
      // Handle success
      console.log('Booking created:', response)
      // Redirect to confirmation page or show success message
      
    } catch (error) {
      console.error('Booking failed:', error)
      // Show error message to user
    } finally {
      setSubmitting(false)
    }
  }

  // ... rest of component
}
\`\`\`

### 5. Error Handling

Implement comprehensive error handling:

\`\`\`typescript
// components/error-boundary.tsx
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We're sorry, but there was an error loading the booking form.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
\`\`\`

### 6. Loading States

Add loading indicators:

\`\`\`typescript
// components/loading-spinner.tsx
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
  )
}
\`\`\`

## Environment Variables

Set up environment variables for different environments:

\`\`\`bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# .env.production (production)
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
\`\`\`

## Testing API Integration

### Unit Tests

\`\`\`typescript
// __tests__/api-client.test.ts
import { apiClient } from '@/lib/api-client'

// Mock fetch
global.fetch = jest.fn()

describe('ApiClient', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  it('should search properties', async () => {
    const mockResponse = {
      properties: [
        { id: '1', address: 'Test Address', formatted_address: 'Test Address' }
      ]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await apiClient.searchProperties('test')
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/properties/search'),
      expect.any(Object)
    )
    expect(result).toEqual(mockResponse)
  })
})
\`\`\`

### Integration Tests

\`\`\`typescript
// __tests__/booking-form.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BookingForm from '@/booking-form'

// Mock API client
jest.mock('@/lib/api-client')

describe('BookingForm Integration', () => {
  it('should complete booking flow', async () => {
    render(<BookingForm />)
    
    // Test property search
    const searchInput = screen.getByPlaceholderText(/property address/i)
    fireEvent.change(searchInput, { target: { value: 'test address' } })
    
    await waitFor(() => {
      expect(screen.getByText('Test Property')).toBeInTheDocument()
    })
    
    // Test booking submission
    fireEvent.click(screen.getByText('Save & Continue'))
    
    await waitFor(() => {
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument()
    })
  })
})
\`\`\`

## Security Considerations

### API Security

1. **Authentication**: Implement proper authentication tokens
2. **Rate Limiting**: Protect against abuse
3. **Input Validation**: Validate all inputs on the server
4. **CORS**: Configure proper CORS policies
5. **HTTPS**: Use HTTPS in production

### Client-Side Security

1. **Environment Variables**: Never expose sensitive data
2. **Input Sanitization**: Sanitize user inputs
3. **Error Messages**: Don't expose sensitive information in errors
4. **CSP**: Implement Content Security Policy headers

## Performance Optimization

### Caching

\`\`\`typescript
// lib/cache.ts
const cache = new Map()

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
    return cached.data
  }
  return null
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}
\`\`\`

### Request Optimization

1. **Debouncing**: Debounce search inputs
2. **Pagination**: Implement pagination for large datasets
3. **Compression**: Enable gzip compression
4. **CDN**: Use CDN for static assets

This API integration guide provides a complete foundation for connecting your booking form to a backend service. Adjust the endpoints and data structures according to your specific API requirements.
