# Component Documentation

This document provides detailed information about the components used in the Calendar Booking Form.

## Main Components

### BookingForm (`booking-form.tsx`)

The primary component that orchestrates the entire booking flow.

#### Props
\`\`\`typescript
// No props required - self-contained component
\`\`\`

#### State Management
\`\`\`typescript
const [selectedBookingType, setSelectedBookingType] = useState("Sales")
const [selectedPropertyAccess, setSelectedPropertyAccess] = useState("Meet Onsite")
const [selectedDate, setSelectedDate] = useState<string | null>(null)
const [selectedTime, setSelectedTime] = useState<string | null>(null)
const [currentMonth, setCurrentMonth] = useState("July 2025")
const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false)
\`\`\`

#### Key Features
- **Booking Type Selection**: Radio-style buttons for different booking types
- **Property Details**: Form inputs for property information
- **Calendar Interface**: Date and time selection with flexi options
- **Collapse/Expand**: Calendar summary view after selection

#### Methods
\`\`\`typescript
handleDateSelect(date: string): void
handleTimeSelect(time: string): void
handleSaveAndContinue(): void
handleEditCalendar(): void
getSelectedDayName(): string
formatSelectedTime(): string
\`\`\`

## UI Components (shadcn/ui)

### Button (`components/ui/button.tsx`)

Versatile button component with multiple variants.

#### Variants
- `default` - Primary button style
- `outline` - Outlined button
- `ghost` - Transparent button
- `link` - Link-styled button

#### Sizes
- `default` - Standard size (h-10)
- `sm` - Small size (h-9)
- `lg` - Large size (h-11)
- `icon` - Square icon button (h-10 w-10)

#### Usage
\`\`\`typescript
<Button variant="outline" size="sm" onClick={handleClick}>
  Click me
</Button>
\`\`\`

### Card (`components/ui/card.tsx`)

Container component for grouping related content.

#### Sub-components
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardContent` - Main content area

#### Usage
\`\`\`typescript
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
\`\`\`

### Input (`components/ui/input.tsx`)

Form input component with consistent styling.

#### Features
- Built-in focus states
- Disabled state support
- Consistent border and padding
- Responsive text sizing

#### Usage
\`\`\`typescript
<Input
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={handleChange}
/>
\`\`\`

### Label (`components/ui/label.tsx`)

Accessible label component for form inputs.

#### Usage
\`\`\`typescript
<Label htmlFor="input-id">
  Label text
</Label>
\`\`\`

## Calendar Components

### Calendar Grid

The calendar uses a 5-column grid layout for displaying available dates.

#### Structure
\`\`\`typescript
<div className="grid grid-cols-5 gap-3">
  {calendarDays.map((day) => (
    <div key={day.date} className="text-center space-y-2">
      {/* Date header */}
      <div className="border rounded-lg p-2 bg-gray-50">
        <div className="text-xs font-medium text-gray-600">{day.day}</div>
        <div className="text-lg font-bold">{day.date}</div>
      </div>
      
      {/* Time options */}
      <div className="space-y-1">
        {/* Flexi option */}
        <Button size="sm" variant="outline">Flexi</Button>
        
        {/* Time slots */}
        {timeSlots.map((time) => (
          <Button key={time} size="sm" variant="outline">
            {time}
          </Button>
        ))}
      </div>
    </div>
  ))}
</div>
\`\`\`

### Calendar Navigation

Month navigation with previous/next buttons.

\`\`\`typescript
<div className="flex items-center gap-2">
  <Button variant="ghost" size="sm">
    <ChevronLeft className="h-4 w-4" />
  </Button>
  <span className="text-lg font-medium">{currentMonth}</span>
  <Button variant="ghost" size="sm">
    <ChevronRight className="h-4 w-4" />
  </Button>
</div>
\`\`\`

## Form Sections

### Booking Type Section

Radio-style button group for selecting booking type.

\`\`\`typescript
<div className="grid grid-cols-2 gap-4">
  {bookingTypes.map((type) => (
    <Button
      key={type}
      variant={selectedBookingType === type ? "default" : "outline"}
      onClick={() => setSelectedBookingType(type)}
    >
      {type}
    </Button>
  ))}
</div>
\`\`\`

### Property Details Section

Form inputs with icons and labels.

\`\`\`typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      <Building className="h-4 w-4" />
      Bedrooms
      <Info className="h-4 w-4 text-gray-400" />
    </Label>
    <Input type="number" placeholder="0" />
  </div>
  {/* More inputs... */}
</div>
\`\`\`

### Property Access Section

Three-column button layout for access options.

\`\`\`typescript
<div className="grid grid-cols-3 gap-4">
  {propertyAccessOptions.map((option) => (
    <Button
      key={option}
      variant={selectedPropertyAccess === option ? "default" : "outline"}
      onClick={() => setSelectedPropertyAccess(option)}
    >
      {option}
    </Button>
  ))}
</div>
\`\`\`

## Responsive Design

### Breakpoints

The components use Tailwind's responsive prefixes:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

### Mobile Adaptations

- Grid layouts stack on mobile
- Button sizes adjust for touch targets
- Text sizes scale appropriately
- Spacing reduces on smaller screens

## Accessibility Features

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Enter/Space activate buttons

### Screen Readers

- Proper ARIA labels and roles
- Semantic HTML structure
- Screen reader only text where needed

### Focus Management

- Visible focus indicators
- Focus trapping in modal states
- Logical focus order

## Styling System

### CSS Variables

Custom properties defined in `globals.css`:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --border: 0 0% 89.8%;
  /* ... more variables */
}
\`\`\`

### Utility Classes

Common utility patterns:

\`\`\`typescript
// Spacing
"space-y-4"     // Vertical spacing
"gap-3"         // Grid/flex gap
"p-6"           // Padding

// Layout
"grid grid-cols-5"  // Grid layout
"flex items-center" // Flexbox
"max-w-4xl mx-auto" // Container

// Typography
"text-xl font-semibold"  // Headings
"text-sm text-gray-600"  // Secondary text

// Interactive states
"hover:bg-gray-100"      // Hover effects
"focus:ring-2"           // Focus states
"disabled:opacity-50"    // Disabled states
\`\`\`

## Component Customization

### Extending Components

To customize existing components:

1. **Override styles** using Tailwind classes
2. **Extend props** with additional TypeScript interfaces
3. **Compose components** to create new variants

### Creating New Components

Follow the established patterns:

1. Use TypeScript for type safety
2. Implement proper accessibility
3. Follow naming conventions
4. Include responsive design
5. Add proper documentation

## Performance Considerations

### Optimization Techniques

- **React.memo** for expensive components
- **useCallback** for event handlers
- **useMemo** for computed values
- **Lazy loading** for large components

### Bundle Size

- Tree-shaking enabled for unused code
- Dynamic imports for code splitting
- Optimized icon imports from Lucide React
