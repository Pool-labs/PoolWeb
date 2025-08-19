"use client"

import MobileLayout from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { AppleIcon, CreditCard, PlusCircle, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Wallet() {
  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <p className="text-muted-foreground">Manage your payment methods and pool cards</p>

        <Tabs defaultValue="cards">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="cards">Pool Cards</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="mb-6">
                <p className="text-xs opacity-80">Pool Card</p>
                <h3 className="text-lg font-bold">Lunch Group</h3>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold">$50.00</p>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                  <div className="w-6 h-6 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="mb-6">
                <p className="text-xs opacity-80">Pool Card</p>
                <h3 className="text-lg font-bold">Weekend Trip</h3>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold">$200.00</p>
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full bg-white/20"></div>
                  <div className="w-6 h-6 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Button className="w-full flex items-center gap-2">
                <AppleIcon className="h-4 w-4" />
                Add to Apple Wallet
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Add to Google Wallet
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">•••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>

            <Button variant="outline" className="w-full flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Payment Method
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  )
}
