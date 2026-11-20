import type { Mock } from "@/content/site";

export default function Mockup({ m, color }: { m: Mock; color: string }) {
  return (
    <div className="[container-type:inline-size]">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.6cqw] bg-[#f6f7fb] text-[#161a33]" style={{ boxShadow: `0 0 0 0.25cqw ${color}, 0 0 9cqw ${color}66` }}>
        <div className="flex h-full">
          <div className="flex w-[7%] flex-col items-center gap-[7%] bg-white py-[4%]">
            <span className="h-[18%] w-[40%] rounded-[0.5cqw]" style={{ background: color }} />
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-[6%] w-[40%] rounded-[0.5cqw] bg-[#dfe2ee]" />)}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[3cqw] p-[3cqw]">
            <div className="flex items-center justify-between">
              <span className="h-[2.4cqw] w-[30cqw] rounded-full bg-white" />
              <span className="h-[3cqw] w-[9cqw] rounded-full" style={{ background: color }} />
            </div>
            <p className="text-[3cqw] font-semibold leading-none">{m.title}</p>
            <div className="grid grid-cols-3 gap-[2cqw]">
              {m.kpis.map(([k, v]) => (
                <div key={k} className="rounded-[1cqw] bg-white p-[1.8cqw]">
                  <p className="text-[1.5cqw] text-[#6b7090]">{k}</p>
                  <p className="mt-[0.6cqw] text-[3cqw] font-semibold leading-none">{v}</p>
                </div>
              ))}
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[1.2fr_1fr] gap-[2cqw]">
              <div className="space-y-[1.2cqw] rounded-[1cqw] bg-white p-[2cqw]">
                {m.rows.map(([a, b]) => (
                  <div key={a} className="flex items-center justify-between border-b border-[#eceef6] pb-[1cqw] text-[1.6cqw]">
                    <span className="flex items-center gap-[1cqw]"><span className="h-[1.6cqw] w-[1.6cqw] rounded-full" style={{ background: color }} />{a}</span>
                    <span className="font-semibold">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-[1.2cqw] rounded-[1cqw] bg-white p-[2cqw]">
                {m.bars.map((h, i) => <span key={i} className="flex-1 rounded-t-[0.5cqw]" style={{ height: `${h * 9}%`, background: color, opacity: 0.45 + i * 0.1 }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
