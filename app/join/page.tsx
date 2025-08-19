"use client"

import MobileLayout from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { QrCode, ScanLine } from "lucide-react"

export default function JoinPool() {
  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Join a Pool</h1>
        <p className="text-muted-foreground">Enter a pool code or scan a QR code to join</p>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pool-id">Pool Code</Label>
            <Input
              id="pool-id"
              placeholder="Enter 6-digit code"
              className="rounded-xl text-center text-xl tracking-widest"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="border-t flex-1"></div>
            <span className="text-muted-foreground text-sm">OR</span>
            <div className="border-t flex-1"></div>
          </div>

          <Card className="p-6 rounded-xl flex flex-col items-center justify-center">
            <QrCode className="h-12 w-12 mb-4 text-primary" />
            <Button variant="outline" className="flex items-center gap-2">
              <ScanLine className="h-4 w-4" />
              Scan QR Code
            </Button>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="initial-deposit">Initial Deposit</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground">$</span>
              </div>
              <Input id="initial-deposit" type="number" placeholder="0.00" className="pl-8 rounded-xl" />
            </div>
          </div>

          <Button className="w-full">Join Pool</Button>
        </form>
      </div>
    </MobileLayout>
  )
}
