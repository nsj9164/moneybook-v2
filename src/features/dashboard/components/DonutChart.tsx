// 도넛 차트 컴포넌트
export function DonutChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#e2e8f0"
        strokeWidth="20"
      />
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const startAngle = cumulativePercentage * 3.6; // 3.6 = 360 / 100
        const endAngle = (cumulativePercentage + percentage) * 3.6;

        // SVG 원호를 그리기 위한 계산
        const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
        const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
        const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
        const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));

        // 큰 원호인지 작은 원호인지 결정 (180도 이상이면 큰 원호)
        const largeArcFlag = percentage > 50 ? 1 : 0;

        // 원호 경로 생성
        const pathData = `
            M 50 50
            L ${startX} ${startY}
            A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z
          `;

        cumulativePercentage += percentage;

        return (
          <path
            key={index}
            d={pathData}
            fill={item.color.replace("bg-", "").replace("500", "500")}
          />
        );
      })}
      <circle cx="50" cy="50" r="30" fill="white" />
      <text
        x="50"
        y="45"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="10"
        fontWeight="bold"
      >
        {Math.floor(total / 10000).toLocaleString()}만 원
      </text>
      <text
        x="50"
        y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fill="#6b7280"
      >
        총 지출
      </text>
    </svg>
  );
}
