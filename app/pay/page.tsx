"use client"

import MobileLayout from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function Pay() {
  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Pay Someone</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or @username" className="pl-10 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label>Recent</Label>
          <div className="flex gap-4 overflow-x-auto py-2">
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 mb-1">
                <AvatarImage src="/placeholder.svg" alt="@sarah" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <span className="text-xs">Sarah</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 mb-1">
                <AvatarImage src="/placeholder.svg" alt="@mike" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <span className="text-xs">Mike</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 mb-1">
                <AvatarImage src="/placeholder.svg" alt="@jessica" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <span className="text-xs">Jessica</span>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-14 w-14 mb-1">
                <AvatarImage src="/placeholder.svg" alt="@david" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <span className="text-xs">David</span>
            </div>
          </div>
        </div>

        <Card className="p-4 rounded-xl space-y-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" alt="@sarah" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">@sarahj</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground">$</span>
              </div>
              <Input id="amount" type="number" placeholder="0.00" className="pl-8 text-2xl h-14 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Input id="note" placeholder="What's it for?" className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-method">Pay From</Label>
            <Select>
              <SelectTrigger id="payment-method" className="rounded-xl">
                <SelectValue placeholder="Select payment source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit Card (•••• 4242)</SelectItem>
                <SelectItem value="bank">Bank Account (•••• 5678)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Send Payment</Button>
        </Card>
      </div>
    </MobileLayout>
  )
}
