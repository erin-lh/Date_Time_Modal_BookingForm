"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Search, Info, Building, Car, Home, Ruler, Edit2, Calendar } from "lucide-react"

export default function BookingForm() {
  const [selectedBookingType, setSelectedBookingType] = useState("Sales")
  const [selectedPropertyAccess, setSelectedPropertyAccess] = useState("Meet Onsite")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState("July 2025")
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false)

  const bookingTypes = ["Sales", "Property Management", "Commercial", "Other"]
  const propertyAccessOptions = ["Meet Onsite", "Lockbox", "Key Collection"]

  const calendarDays = [
    { day: "Fri", date: "25", available: true },
    { day: "Mon", date: "28", available: true },
    { day: "Tue", date: "29", available: true },
    { day: "Wed", date: "30", available: true },
    { day: "Thu", date: "31", available: true },
  ]

  const timeSlots = ["08:30", "11:00", "13:30", "15:30"]

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time selection when date changes
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleSaveAndContinue = () => {
    if (selectedDate && selectedTime) {
      setIsCalendarCollapsed(true)
    }
  }

  const handleEditCalendar = () => {
    setIsCalendarCollapsed(false)
  }

  const getSelectedDayName = () => {
    const day = calendarDays.find((d) => d.date === selectedDate)
    return day ? day.day : ""
  }

  const formatSelectedTime = () => {
    if (selectedTime === "flexi") return "Flexible Time"
    return selectedTime
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Top Section - Booking Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Booking Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {bookingTypes.map((type) => (
              <Button
                key={type}
                variant={selectedBookingType === type ? "default" : "outline"}
                className="h-12 text-base"
                onClick={() => setSelectedBookingType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Property Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="333 Adelaide Street, BRISBANE CITY QLD 4000"
              className="pl-10 h-12 text-base"
              defaultValue="333 Adelaide Street, BRISBANE CITY QLD 4000"
            />
            <Button variant="link" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600">
              Manually enter address
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Building className="h-4 w-4" />
                Bedrooms
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
              <Input type="number" placeholder="0" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Home className="h-4 w-4" />
                Bathrooms
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
              <Input type="number" placeholder="0" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Car className="h-4 w-4" />
                Car Spaces
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
              <Input type="number" placeholder="0" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Ruler className="h-4 w-4" />
                Size
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
              <div className="flex">
                <Input type="number" placeholder="160" className="h-10 rounded-r-none" />
                <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 flex items-center text-sm">sqm</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Access */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Property Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {propertyAccessOptions.map((option) => (
              <Button
                key={option}
                variant={selectedPropertyAccess === option ? "default" : "outline"}
                className="h-12 text-base"
                onClick={() => setSelectedPropertyAccess(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center justify-between">
            {isCalendarCollapsed ? "Booking Details" : "Select Date & Time"}
            {!isCalendarCollapsed && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => {}}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{currentMonth}</span>
                <Button variant="ghost" size="sm" onClick={() => {}}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isCalendarCollapsed ? (
            /* Collapsed Summary View */
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">
                    {getSelectedDayName()}, {selectedDate} {currentMonth.split(" ")[0]} {currentMonth.split(" ")[1]}
                  </div>
                  <div className="text-sm text-gray-600">{formatSelectedTime()}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditCalendar}
                className="flex items-center gap-2 bg-transparent"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          ) : (
            /* Expanded Calendar View */
            <div className="space-y-4">
              {/* Compact Date and Time Grid */}
              <div className="grid grid-cols-5 gap-3">
                {calendarDays.map((day) => (
                  <div key={day.date} className="text-center space-y-2">
                    {/* Date Header */}
                    <div className="border rounded-lg p-2 bg-gray-50">
                      <div className="text-xs font-medium text-gray-600">{day.day}</div>
                      <div className="text-lg font-bold">{day.date}</div>
                    </div>

                    {/* Time Options */}
                    <div className="space-y-1">
                      {/* Flexi Option */}
                      <Button
                        size="sm"
                        variant={selectedDate === day.date && selectedTime === "flexi" ? "default" : "outline"}
                        className="w-full h-7 text-xs bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100 data-[state=selected]:bg-teal-600 data-[state=selected]:text-white"
                        onClick={() => {
                          handleDateSelect(day.date)
                          handleTimeSelect("flexi")
                        }}
                      >
                        Flexi
                      </Button>

                      {/* Time Slots */}
                      {timeSlots.map((time) => (
                        <Button
                          key={`${day.date}-${time}`}
                          size="sm"
                          variant={selectedDate === day.date && selectedTime === time ? "default" : "outline"}
                          className="w-full h-7 text-xs"
                          onClick={() => {
                            handleDateSelect(day.date)
                            handleTimeSelect(time)
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t space-y-4">
                <p className="text-sm text-gray-600">
                  Preferred time unavailable?{" "}
                  <Button variant="link" className="p-0 h-auto text-teal-600 underline">
                    Send an enquiry
                  </Button>
                </p>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-12 bg-teal-600 hover:bg-teal-700"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleSaveAndContinue}
                  >
                    Save & Continue
                  </Button>
                  <Button variant="outline" className="h-12 px-8 bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
