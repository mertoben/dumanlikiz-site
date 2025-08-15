export const dynamic = 'force-dynamic';

export default function MapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Harita & Ulaşım</h1>
      <p className="text-gray-700">Edremit / Altınoluk – Tahtakuşlar mevkii, yaklaşık koordinatlar: 39.568626, 26.855721.</p>
      <div className="card overflow-hidden">
        <iframe
          title="Dumanlıkız Sitesi Harita"
          width="100%"
          height="420"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=39.568626,26.855721&z=15&output=embed`}
        />
      </div>
    </div>
  );
}
