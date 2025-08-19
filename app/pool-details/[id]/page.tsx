"use client"

import MobileLayout from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock, Plus, Share2, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { motion } from "framer-motion"

export default function PoolDetails({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("activity")

  // This would be fetched from an API in a real app based on the ID
  const poolId = Number.parseInt(params.id)
  const poolColors = ["purple", "blue", "pink", "green"]
  const poolColor = poolColors[(poolId - 1) % poolColors.length]

  const pool = {
    id: params.id,
    name: ["Lunch Group", "Weekend Trip", "Movie Night", "Roommates"][poolId - 1] || "Pool",
    members: [
      { id: 1, name: "Alex", avatar: "/placeholder.svg" },
      { id: 2, name: "Sarah", avatar: "/placeholder.svg" },
      { id: 3, name: "Mike", avatar: "/placeholder.svg" },
      { id: 4, name: "Jessica", avatar: "/placeholder.svg" },
    ],
    balance: [50, 200, 30, 150][poolId - 1] || 100,
    lastUpdated: "2h ago",
    color: poolColor,
  }

  const activities = [
    { id: 1, title: "Coffee Run", user: "Sarah", amount: -12.5, time: "2h ago", type: "expense" },
    { id: 2, title: "Added Funds", user: "Alex", amount: 25, time: "1d ago", type: "deposit" },
    { id: 3, title: "Sandwich Shop", user: "Mike", amount: -8.75, time: "2d ago", type: "expense" },
    { id: 4, title: "Added Funds", user: "Jessica", amount: 20, time: "3d ago", type: "deposit" },
  ]

  const getCardColorClass = (color) => {
    switch (color) {
      case "purple":
        return "pool-card-purple"
      case "blue":
        return "pool-card-blue"
      case "pink":
        return "pool-card-pink"
      case "green":
        return "pool-card-green"
      default:
        return "pool-card-purple"
    }
  }

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 bg-gradient-to-b from-background to-accent/20">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{pool.name}</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className={`pool-card ${getCardColorClass(pool.color)}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm opacity-80">Pool Balance</p>
                <h2 className="text-3xl font-bold">${pool.balance.toFixed(2)}</h2>
              </div>
              <div className="flex -space-x-2">
                {pool.members.slice(0, 3).map((member) => (
                  <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-white/20 text-white">{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                {pool.members.length > 3 && (
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs border-2 border-white">
                    +{pool.members.length - 3}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white flex-1">
                <Plus className="h-4 w-4 mr-1" /> Add Funds
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white flex-1">
                <Wallet className="h-4 w-4 mr-1" /> Withdraw
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 rounded-xl bg-background/50 backdrop-blur-sm"
          >
            <Users className="h-4 w-4" />
            Members ({pool.members.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 rounded-xl bg-background/50 backdrop-blur-sm"
          >
            <Share2 className="h-4 w-4" />
            Share Pool
          </Button>
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            className={`tab-button ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
          <button
            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </div>

        {activeTab === "activity" && (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="activity-card">
                  <div className="flex items-center gap-3">
                    <div className={activity.type === "expense" ? "activity-icon-expense" : "activity-icon-deposit"}>
                      {activity.type === "expense" ? (
                        <Wallet className="h-5 w-5 text-white" />
                      ) : (
                        <Plus className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">By {activity.user}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${activity.type === "expense" ? "text-red-500" : "text-green-500"}`}
                          >
                            {activity.type === "expense" ? "-" : "+"}${Math.abs(activity.amount).toFixed(2)}
                          </p>
                          <div className="flex items-center justify-end text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border-primary/20">
                <h3 className="font-medium mb-3">Pool Members</h3>
                <div className="space-y-3">
                  {pool.members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-primary/10">{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <p>{member.name}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border-primary/20">
                <h3 className="font-medium mb-2">Pool ID</h3>
                <p className="text-muted-foreground text-sm">Share this code with friends to join this pool</p>
                <div className="bg-accent p-3 rounded-lg mt-2 text-center font-mono text-lg tracking-wider">
                  POOL{params.id}XYZ
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
