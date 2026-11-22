// Monthly Chiang Mai guide — a short seasonal tip shown on the homepage
// (auto-selected by the viewer's current month) and the source for the
// long-form /guide/[month] pages. Tips are positive-first; the smoke-season
// months carry a gentle "check the air on hazier days" nudge.

export type MonthText = { name: string; tip: string };

export type MonthEntry = {
  /** URL slug for /guide/[month], e.g. "november". */
  slug: string;
  /** 0-based month index (0 = January), matches Date.getMonth(). */
  index: number;
  emoji: string;
  en: MonthText;
  zh: MonthText;
  th: MonthText;
};

export const MONTH_GUIDE: MonthEntry[] = [
  {
    slug: "january",
    index: 0,
    emoji: "🌸",
    en: { name: "January", tip: "Peak cool season: crisp mornings, clear skies, and wild Himalayan cherry blossoms on the high ridges. Ideal for Doi Inthanon and tea up at altitude." },
    zh: { name: "一月", tip: "凉季最佳：清晨微凉、天空澄澈，高山脊线上野生喜马拉雅樱花盛开。适合登因他农山、在高海拔品茶。" },
    th: { name: "มกราคม", tip: "ช่วงหนาวที่ดีที่สุด เช้าเย็นสบาย ฟ้าใส และซากุระดอยบานบนสันเขาสูง เหมาะไปดอยอินทนนท์และจิบชาบนที่สูง" },
  },
  {
    slug: "february",
    index: 1,
    emoji: "🌼",
    en: { name: "February", tip: "Warm, sunny days and the Chiang Mai Flower Festival in the first week. Great for the Old City, markets, and easy day trips." },
    zh: { name: "二月", tip: "温暖晴朗，月初有清迈花卉节。适合逛古城、夜市和轻松的一日游。" },
    th: { name: "กุมภาพันธ์", tip: "แดดอุ่นสบาย มีงานไม้ดอกไม้ประดับเชียงใหม่ต้นเดือน เหมาะเดินเมืองเก่า ตลาด และทริปวันเดียว" },
  },
  {
    slug: "march",
    index: 2,
    emoji: "🛕",
    en: { name: "March", tip: "Warm, unhurried days — perfect for cooking classes, massage, cafés and temple-hopping in the Old City. On hazier days it's worth a quick air-quality check before big outdoor plans." },
    zh: { name: "三月", tip: "温暖悠闲的日子——适合烹饪课、按摩、咖啡馆和在古城逛寺庙。遇到雾霾较重的日子，安排户外行程前先查一下空气质量会更安心。" },
    th: { name: "มีนาคม", tip: "วันอุ่นสบายไม่รีบเร่ง เหมาะกับคลาสทำอาหาร นวด คาเฟ่ และเที่ยววัดในเมืองเก่า วันไหนหมอกควันเยอะ ลองเช็กคุณภาพอากาศก่อนวางแผนกิจกรรมกลางแจ้งสักนิด" },
  },
  {
    slug: "april",
    index: 3,
    emoji: "💦",
    en: { name: "April", tip: "Songkran (13–15 Apr) turns the whole city into a joyful water fight — the highlight of the month. It's hot, so plan water-friendly days and stay hydrated; on hazier days, a quick air-quality check before heading outdoors helps." },
    zh: { name: "四月", tip: "泼水节（4月13–15日）全城变成欢乐水仗，是本月最大亮点。天气炎热，安排亲水行程、多补水；遇到雾霾较重的日子，出门前先看看空气质量。" },
    th: { name: "เมษายน", tip: "สงกรานต์ (13–15 เม.ย.) ทั้งเมืองสนุกกับการเล่นน้ำ ไฮไลต์ของเดือน อากาศร้อน วางแผนกิจกรรมเล่นน้ำและดื่มน้ำเยอะ ๆ วันไหนหมอกควันเยอะ เช็กคุณภาพอากาศก่อนออกไปข้างนอกสักนิด" },
  },
  {
    slug: "may",
    index: 4,
    emoji: "🌧️",
    en: { name: "May", tip: "The first rains green everything up. Afternoon showers, lush hills, and far fewer crowds — waterfalls start to run full." },
    zh: { name: "五月", tip: "初雨让万物转绿，午后阵雨、山峦葱郁、人潮大减，瀑布开始丰沛。" },
    th: { name: "พฤษภาคม", tip: "ฝนแรกทำให้ทุกอย่างเขียวขจี ฝนตกบ่าย เขาเขียวชอุ่ม คนน้อยลง น้ำตกเริ่มเต็ม" },
  },
  {
    slug: "june",
    index: 5,
    emoji: "⛅",
    en: { name: "June", tip: "Green season proper: short heavy showers, then sun. Mornings are best for elephants and the hills; keep afternoons flexible." },
    zh: { name: "六月", tip: "正式进入绿季：短时强阵雨后又放晴。上午最适合看大象和上山，午后灵活安排。" },
    th: { name: "มิถุนายน", tip: "เข้าหน้าฝนเต็มตัว ฝนตกหนักสั้น ๆ แล้วแดดออก เช้าเหมาะดูช้างและขึ้นเขา บ่ายยืดหยุ่นไว้" },
  },
  {
    slug: "july",
    index: 6,
    emoji: "☕",
    en: { name: "July", tip: "Lush and quiet. Rain comes and goes — a good month for waterfalls, coffee farms, and unhurried Old City days." },
    zh: { name: "七月", tip: "葱郁而宁静。雨时下时停——适合瀑布、咖啡庄园和悠闲的古城时光。" },
    th: { name: "กรกฎาคม", tip: "เขียวขจีและเงียบสงบ ฝนมาเป็นพัก ๆ เหมาะไปน้ำตก ไร่กาแฟ และเดินเมืองเก่าแบบชิล ๆ" },
  },
  {
    slug: "august",
    index: 7,
    emoji: "🌾",
    en: { name: "August", tip: "Deep green, dramatic skies, low-season prices. The rice terraces look their best — pack a light rain layer." },
    zh: { name: "八月", tip: "满眼浓绿、云天壮丽、淡季价格。梯田最美，记得带件轻便雨衣。" },
    th: { name: "สิงหาคม", tip: "เขียวเข้ม ท้องฟ้าดราม่า ราคาโลว์ซีซั่น นาขั้นบันไดสวยที่สุด พกเสื้อกันฝนบาง ๆ ไว้" },
  },
  {
    slug: "september",
    index: 8,
    emoji: "💧",
    en: { name: "September", tip: "The wettest stretch, and the most beautiful green. Waterfalls are thundering — time outdoor trips around the morning." },
    zh: { name: "九月", tip: "最多雨、却也最翠绿的时节。瀑布气势磅礴，户外行程尽量安排在上午。" },
    th: { name: "กันยายน", tip: "ฝนชุกที่สุดแต่เขียวที่สุด น้ำตกไหลแรง จัดทริปกลางแจ้งช่วงเช้า" },
  },
  {
    slug: "october",
    index: 9,
    emoji: "🍃",
    en: { name: "October", tip: "Rains taper off and the air turns fresh and clear. The hills are emerald — a lovely, underrated month to visit." },
    zh: { name: "十月", tip: "雨势渐收，空气清新通透。山峦如翡翠——被低估的好时节。" },
    th: { name: "ตุลาคม", tip: "ฝนเริ่มซา อากาศสดใส เขาเขียวมรกต—เดือนที่ดีแบบที่หลายคนมองข้าม" },
  },
  {
    slug: "november",
    index: 10,
    emoji: "🏵️",
    en: { name: "November", tip: "The best month: cool, clear, and the Yi Peng lantern festival lights the sky. Head up the mountains — Doi Suthep and Doi Inthanon are glorious." },
    zh: { name: "十一月", tip: "最佳月份：凉爽澄澈，水灯节（Yi Peng）点亮夜空。上山吧——素贴山与因他农山美不胜收。" },
    th: { name: "พฤศจิกายน", tip: "เดือนที่ดีที่สุด อากาศเย็นฟ้าใส และยี่เป็งประดับท้องฟ้า ขึ้นเขาเลย—ดอยสุเทพและดอยอินทนนท์งดงามมาก" },
  },
  {
    slug: "december",
    index: 11,
    emoji: "⛰️",
    en: { name: "December", tip: "Cool, dry, and golden. Go up the mountains; bamboo rafting still runs by day if you don't mind the cooler water. Warm up with a pot of local Monsoon Tea." },
    zh: { name: "十二月", tip: "凉爽干燥、满目金黄。上山正好；若不介意水偏凉，白天仍可玩竹筏漂流。来壶本地 Monsoon Tea 暖暖身。" },
    th: { name: "ธันวาคม", tip: "เย็นสบาย แห้ง และเป็นสีทอง ขึ้นเขากำลังดี ล่องแพไม้ไผ่กลางวันยังเล่นได้ถ้าไม่ซีเรียสเรื่องน้ำเย็น อุ่นเครื่องด้วยชา Monsoon Tea ท้องถิ่นสักกา" },
  },
];

export function getMonthBySlug(slug: string): MonthEntry | undefined {
  return MONTH_GUIDE.find((m) => m.slug === slug);
}

type Loc = "en" | "zh" | "th";

export function monthText(entry: MonthEntry, locale: string): MonthText {
  const loc: Loc = locale === "zh" || locale === "th" ? locale : "en";
  return entry[loc];
}
