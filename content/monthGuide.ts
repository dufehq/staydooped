// Monthly Chiang Mai guide — a short seasonal tip shown on the homepage
// (auto-selected by the viewer's current month) and the source for the
// long-form /guide/[month] pages. Tips are positive-first; the smoke-season
// months carry a gentle "check the air on hazier days" nudge.

export type GuideSection = { icon?: string; heading: string; paras: string[] };

export type MonthText = {
  name: string;
  tip: string;
  /** Long-form intro + sections for the /guide/[month] page. Optional —
   *  months without them render the short tip and an "in progress" note. */
  intro?: string;
  sections?: GuideSection[];
};

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
    en: {
      name: "November",
      tip: "The best month: cool, clear, and the Yi Peng lantern festival lights the sky. Head up the mountains — Doi Suthep and Doi Inthanon are glorious.",
      intro: "After the rains clear out in late October, Chiang Mai slips into its best stretch of the year — the humidity drops, the skies go a deep clean blue, and the hills are still green before the dry season. Mornings are genuinely cool, and the air is clear before the burning season arrives in the new year.",
      sections: [
        { icon: "🏵️", heading: "Yi Peng & Loy Krathong", paras: [
          "November is when Chiang Mai lights up. Two festivals overlap around the full moon: Loy Krathong, when people float flower-and-candle rafts down the Ping River, and Yi Peng, the Lanna tradition of releasing glowing paper sky lanterns.",
          "The dates move each year with the lunar calendar. The Ping River, Tha Phae Gate, and the Old City temples are the heart of it; some large lantern-release events are ticketed and sell out months ahead. Floating lanterns are restricted near the airport on safety grounds, so check your flight dates.",
        ] },
        { icon: "⛰️", heading: "Go up the mountains", paras: [
          "This is the month the mountains pay off. Doi Suthep is an easy half-day — the golden chedi of Wat Phra That is a short ride up, and clear air means you can see the city below. For a full day, Doi Inthanon, Thailand's highest peak, is cold enough for a jacket at the summit, with the twin royal pagodas and the Kew Mae Pan nature trail.",
        ] },
        { icon: "💦", heading: "Still good: the warm-weather things", paras: [
          "You don't have to give up the water. Bamboo rafting on the rivers north of the city still runs through the day — the water's a touch cooler, so go midday when the sun is up. The no-riding elephant camps and the coffee farms are at their best with dry trails and green hills.",
        ] },
        { icon: "☕", heading: "Eat & drink", paras: [
          "Cool evenings make November perfect for the night markets. It's peak khao soi weather, and for something quieter, warm up with a pot of local highland Monsoon Tea.",
        ] },
        { icon: "🎒", heading: "Before you go", paras: [
          "Pack a light layer — it's shorts by day but mornings and mountain tops need a fleece. Book ahead: November is peak season and festival week fills up early. And if you make a krathong, choose the biodegradable banana-leaf kind.",
        ] },
      ],
    },
    zh: {
      name: "十一月",
      tip: "最佳月份：凉爽澄澈，水灯节（Yi Peng）点亮夜空。上山吧——素贴山与因他农山美不胜收。",
      intro: "十月底雨季结束后，清迈迎来一年中最好的时节——湿度下降、天空湛蓝、山峦在旱季来临前依旧翠绿。清晨凉爽，空气在新年烧荒季到来前格外清新。",
      sections: [
        { icon: "🏵️", heading: "水灯节与 Yi Peng", paras: [
          "十一月的清迈被点亮。月圆前后两大节日交织：水灯节人们在滨河放流花与蜡烛做的水灯；Yi Peng 则是兰纳传统，放飞发光的纸天灯。日期每年随农历变动，滨河、塔佩门与古城寺庙是核心区域；部分大型天灯活动需购票并提前数月售罄。出于安全，机场附近禁止放天灯，请留意航班日期。",
        ] },
        { icon: "⛰️", heading: "上山去", paras: [
          "这是群山最值得一去的月份。素贴山半天即可往返，空气通透能俯瞰全城；因他农山则值得一整天——泰国最高峰，清晨山顶需穿外套，还有双塔皇家佛塔和 Kew Mae Pan 自然步道。",
        ] },
        { icon: "💦", heading: "依旧适合的戏水活动", paras: [
          "不必放弃玩水。城北河上的竹筏漂流白天仍在运营，水偏凉，建议中午阳光足时去。无骑乘大象营地和咖啡庄园也因步道干爽、山色翠绿而处于最佳状态。",
        ] },
        { icon: "☕", heading: "吃与喝", paras: [
          "凉爽的夜晚让十一月的夜市格外惬意，也是泰北咖喱面（khao soi）的最佳季节。想安静些，就来一壶本地高山 Monsoon Tea 暖暖身。",
        ] },
        { icon: "🎒", heading: "出行前", paras: [
          "带一件薄外套——白天穿短袖，但清晨和山顶需要抓绒。提前预订：十一月是旺季，节庆周尤其紧俏。若要做水灯，请选可降解的香蕉叶款。",
        ] },
      ],
    },
    th: {
      name: "พฤศจิกายน",
      tip: "เดือนที่ดีที่สุด อากาศเย็นฟ้าใส และยี่เป็งประดับท้องฟ้า ขึ้นเขาเลย—ดอยสุเทพและดอยอินทนนท์งดงามมาก",
      intro: "หลังฝนจางไปปลายตุลาคม เชียงใหม่เข้าสู่ช่วงที่ดีที่สุดของปี ความชื้นลดลง ฟ้าใสสีคราม และภูเขายังเขียวก่อนหน้าแล้ง เช้าเย็นสบายจริง และอากาศใสก่อนช่วงเผาจะมาในต้นปี",
      sections: [
        { icon: "🏵️", heading: "ยี่เป็ง & ลอยกระทง", paras: [
          "พฤศจิกายนคือเดือนที่เชียงใหม่สว่างไสว สองเทศกาลซ้อนกันช่วงเพ็ญเดือนสิบสอง: ลอยกระทงที่ผู้คนลอยกระทงดอกไม้และเทียนลงแม่น้ำปิง และยี่เป็งประเพณีล้านนาที่ปล่อยโคมลอยกระดาษเรืองแสง วันจะเปลี่ยนทุกปีตามจันทรคติ แม่น้ำปิง ประตูท่าแพ และวัดในเมืองเก่าคือหัวใจของงาน งานปล่อยโคมใหญ่บางงานต้องซื้อบัตรและเต็มล่วงหน้าหลายเดือน การปล่อยโคมใกล้สนามบินถูกจำกัดด้วยเหตุผลความปลอดภัย ตรวจสอบวันบินของคุณด้วย",
        ] },
        { icon: "⛰️", heading: "ขึ้นเขากันเถอะ", paras: [
          "เดือนนี้ภูเขาคุ้มค่าที่สุด ดอยสุเทพไปเช้าเย็นกลับสบาย ๆ อากาศใสมองเห็นเมืองเบื้องล่าง ส่วนดอยอินทนนท์ยอดเขาสูงสุดของไทยเย็นพอจะใส่แจ็กเก็ตตอนเช้า มีพระธาตุคู่และเส้นทางธรรมชาติกิ่วแม่ปาน",
        ] },
        { icon: "💦", heading: "ยังสนุกได้: กิจกรรมหน้าร้อน", paras: [
          "ไม่ต้องเลิกเล่นน้ำ ล่องแพไม้ไผ่ทางเหนือของเมืองยังมีช่วงกลางวัน น้ำเย็นขึ้นนิด ไปตอนเที่ยงที่แดดออกกำลังดี ปางช้างแบบไม่ขี่และไร่กาแฟก็สวยที่สุดเพราะทางเดินแห้งและเขาเขียว",
        ] },
        { icon: "☕", heading: "กินและดื่ม", paras: [
          "ค่ำคืนเย็นสบายทำให้พฤศจิกายนเหมาะกับตลาดกลางคืน เป็นฤดูข้าวซอยที่ดีที่สุด อยากเงียบ ๆ ก็อุ่นเครื่องด้วยชา Monsoon Tea จากดอยในเชียงใหม่",
        ] },
        { icon: "🎒", heading: "ก่อนออกเดินทาง", paras: [
          "พกเสื้อบาง ๆ สักตัว กลางวันใส่เสื้อแขนสั้นได้แต่เช้าและยอดดอยต้องมีเสื้อกันหนาว จองล่วงหน้า พฤศจิกายนเป็นไฮซีซั่นและสัปดาห์เทศกาลเต็มเร็ว และถ้าทำกระทง เลือกแบบใบตองที่ย่อยสลายได้",
        ] },
      ],
    },
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
