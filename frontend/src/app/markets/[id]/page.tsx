'use client';

import MarketTrade from '../../components/markets/MarketTrade';

export default function MarketPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <MarketTrade marketId={parseInt(params.id)} />
    </div>
  );
}
