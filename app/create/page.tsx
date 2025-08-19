"use client"

import MobileLayout from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function CreatePool() {
  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Create a Pool</h1>
        <p className="text-muted-foreground">Create a new pool to share expenses with friends</p>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pool-name">Pool Name</Label>
            <Input id="pool-name" placeholder="Weekend Trip, Lunch Group, etc." className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial-deposit">Initial Deposit</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground">$</span>
              </div>
              <Input id="initial-deposit" type="number" placeholder="0.00" className="pl-8 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Invite Friends</Label>
            <Card className="p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <Input placeholder="Email or username" className="rounded-xl" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Add Another Person
              </Button>
            </Card>
          </div>

          <Button className="w-full">Create Pool</Button>
        </form>
      </div>
    </MobileLayout>
  )
}
