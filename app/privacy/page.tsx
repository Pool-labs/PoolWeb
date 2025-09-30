import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          At Pool, we value your privacy and are dedicated to safeguarding your personal information. This Privacy
          Policy outlines how we collect, use, share, and protect the data you provide while using Pool ("the App"), an
          app that simplifies group payments by letting users deposit money into shared pools and spend with virtual
          cards. By using the App, you agree to the terms described here.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect the following types of data when you use Pool:</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Personal Information:</h3>
        <ul>
          <li>Your name, email address, and phone number (to create and manage your account).</li>
          <li>Payment details (e.g., bank account or debit card information) for depositing funds.</li>
          <li>Billing address and other details needed for verification or compliance.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Transaction Data:</h3>
        <ul>
          <li>Records of deposits, withdrawals, and purchases made via the App.</li>
          <li>Details about group memberships and pool activities (e.g., who you're pooling money with).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Device and Usage Information:</h3>
        <ul>
          <li>
            IP address, device type, operating system, and how you use the App (e.g., features accessed, time spent).
          </li>
          <li>Location data (if you allow it) to improve your experience or meet compliance needs.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Communication Data:</h3>
        <ul>
          <li>Information from customer support chats, feedback forms, or insights you submit.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use your data to:</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Provide and Enhance the App:</h3>
        <ul>
          <li>Process payments, manage shared pools, and generate virtual cards.</li>
          <li>Send you updates about transactions, pool changes, or account activity.</li>
          <li>Analyze how the App is used to make it better over time.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Keep Things Secure and Legal:</h3>
        <ul>
          <li>Verify your identity and prevent fraud or unauthorized use.</li>
          <li>Follow laws like anti-money laundering (AML) and know-your-customer (KYC) rules.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Stay in Touch:</h3>
        <ul>
          <li>Answer your questions, offer support, and share important App updates.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Share Your Information</h2>
        <p>We may share your data with:</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Payment Processors:</h3>
        <ul>
          <li>
            Trusted partners like Stripe handle your deposits, withdrawals, and purchases. Check their privacy policies
            for details.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Service Providers:</h3>
        <ul>
          <li>
            Companies that help us run the App (e.g., cloud storage, analytics, or support tools) may access your data.
            They're required to keep it safe.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Legal Requirements:</h3>
        <ul>
          <li>We'll share data if a court, regulator, or law demands it (e.g., subpoenas or compliance checks).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Business Changes:</h3>
        <ul>
          <li>
            If Pool is sold or merges with another company, your data might transfer to the new owners. We'll let you
            know if this happens.
          </li>
        </ul>

        <p className="font-semibold mt-4">We don't sell your personal info to marketers.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
        <p>We work hard to protect your data with:</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Encryption:</h3>
        <ul>
          <li>Sensitive info like payment details is encrypted when sent and stored.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Access Controls:</h3>
        <ul>
          <li>Only authorized team members can see your data, and we use strong security to block others.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Regular Checks:</h3>
        <ul>
          <li>We test and update our systems to stay ahead of threats.</li>
        </ul>

        <p className="mt-4">
          That said, no system is 100% secure. Please keep your account login details private to help us protect you.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights and Choices</h2>
        <p>You control your data with these options:</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Access and Update:</h3>
        <ul>
          <li>Check or edit your account info in the App's settings.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Delete Your Data:</h3>
        <ul>
          <li>
            Ask us to delete your account and data by emailing support@poolapp.com. Some info might stick around for
            legal reasons.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Opt-Out:</h3>
        <ul>
          <li>
            Unsubscribe from marketing emails via the link in any message. You'll still get key account and transaction
            alerts.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Location Settings:</h3>
        <ul>
          <li>Turn off location access in your device settings, though it might limit some features.</li>
        </ul>

        <p className="mt-4">
          If you're in the European Economic Area (EEA) or California, laws like GDPR or CCPA may give you extra rights
          (e.g., data portability). Contact us to learn more.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Retention</h2>
        <p>
          We keep your info while your account is active or as long as we need it to run the App. After that, we may
          hold onto some data (like transaction records) for up to seven years to meet financial laws or tax rules.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
        <p>
          Pool isn't for kids under 18. We don't collect their data on purpose. If we find out a child has given us
          info, we'll delete it.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Policy</h2>
        <p>
          We might tweak this Privacy Policy as our App or laws evolve. Big changes will be posted on our website and in
          the App, and we'll notify you. Keep using Pool, and you're agreeing to the updates.
        </p>

        <div className="mt-12 border-t pt-8">
          <p className="text-muted-foreground">Last updated: May 9, 2024</p>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at support@poolapp.com
          </p>
        </div>
      </div>
    </div>
  )
}
