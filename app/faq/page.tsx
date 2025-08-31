import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 text-pool-navy">
            <span className="bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              WTF
            </span>
            <span className="text-sm text-gray-600 -top-4">rick</span>
            <span className="text-black"> Is Pool?!</span>
          </h1>

          <p className="text-xl text-pool-navy text-center mb-12">
            All your questions answered in one place!
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-b border-pool-navy/20">
                <AccordionTrigger className="text-left text-xl font-bold text-pool-navy hover:text-pool-blue transition-colors">
                  What is Pool?
                </AccordionTrigger>
                <AccordionContent className="text-pool-navy text-lg leading-relaxed pt-4">
                  Pool simplifies payments between friends and groups, eliminating IOUs and the hassle of splitting
                  expenses. Whether it's daily lunches with coworkers, weekly hangouts with friends, group trips, or any
                  shared activity, Pool handles it all. Deposit equal amounts into a shared pool, and everyone gets
                  access to a virtual card for seamless tap-to-pay transactions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-pool-navy/20">
                <AccordionTrigger className="text-left text-xl font-bold text-pool-navy hover:text-pool-blue transition-colors">
                  How does joining a Pool work?
                </AccordionTrigger>
                <AccordionContent className="text-pool-navy text-lg leading-relaxed pt-4">
                  Users receive an invite or enter a pool code, with the ability to review terms before committing. Once
                  you join, you can add funds via your preferred method (bank account or debit card), and a virtual
                  debit card is generated for pool members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-pool-navy/20">
                <AccordionTrigger className="text-left text-xl font-bold text-pool-navy hover:text-pool-blue transition-colors">
                  How do I use the virtual card?
                </AccordionTrigger>
                <AccordionContent className="text-pool-navy text-lg leading-relaxed pt-4">
                  The virtual card integrates with Apple or Google Wallet for easy tap-to-pay purchases. All
                  transactions are deducted from the pool, and members receive notifications about spending activity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-pool-navy/20">
                <AccordionTrigger className="text-left text-xl font-bold text-pool-navy hover:text-pool-blue transition-colors">
                  Are pools temporary or ongoing?
                </AccordionTrigger>
                <AccordionContent className="text-pool-navy text-lg leading-relaxed pt-4">
                  Pool offers flexibility! Pools can be ongoing (like for daily lunches, topped up as needed) or
                  temporary (like for trips, with unspent funds refunded when the pool closes, members leave, or after
                  inactivity).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-none">
                <AccordionTrigger className="text-left text-xl font-bold text-pool-navy hover:text-pool-blue transition-colors">
                  Can I send money to friends?
                </AccordionTrigger>
                <AccordionContent className="text-pool-navy text-lg leading-relaxed pt-4">
                  Yes! Pool supports sending and receiving money.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
