import { PricingInteraction } from "./pricing-interaction"

export function PricingDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <PricingInteraction
        proMonth={199.99}
        proAnnual={349.99}
      />
    </div>
  );
} 