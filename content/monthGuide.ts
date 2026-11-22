// Monthly Chiang Mai guide — a short seasonal tip shown on the homepage
// (auto-selected by the viewer's current month) and the long-form source for the
// /guide/[month] pages. Tips are positive-first; the smoke-season months carry a
// gentle "check the air on hazier days" nudge.

export type GuideSection = { icon?: string; heading: string; paras: string[] };

export type MonthText = {
  name: string;
  tip: string;
  /** Long-form intro + sections for the /guide/[month] page. */
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
    en: {
      name: "January",
      tip: "Peak cool season: crisp mornings, clear skies, and wild Himalayan cherry blossoms on the high ridges. Ideal for Doi Inthanon and tea up at altitude.",
      intro: "The heart of the cool season. Mornings are crisp, the skies stay clear, and up on the high ridges the wild Himalayan cherry trees blossom pink. It's the most comfortable month of the year to be outdoors.",
      sections: [
        { icon: "🌄", heading: "The mountains are calling", paras: ["Clear, cool air makes January the month for altitude. Doi Inthanon's summit is genuinely cold at dawn, the Kew Mae Pan trail is open, and the cherry blossoms peak on the higher slopes."] },
        { icon: "🍵", heading: "Tea, coffee & cool mornings", paras: ["The hill farms north and west of the city are in their element. A morning at a coffee or tea farm — including local Monsoon Tea — pairs perfectly with the season's chill."] },
        { icon: "🛕", heading: "An easy time in the Old City", paras: ["The post-New-Year calm suits unhurried temples, the weekend walking streets, and day trips without the festival-week crowds."] },
      ],
    },
    zh: {
      name: "一月",
      tip: "凉季最佳：清晨微凉、天空澄澈，高山脊线上野生喜马拉雅樱花盛开。适合登因他农山、在高海拔品茶。",
      intro: "凉季的核心。清晨清爽、天空明净，高山脊线上野生喜马拉雅樱花绽放粉色——一年中最适合户外的月份。",
      sections: [
        { icon: "🌄", heading: "群山在召唤", paras: ["凉爽通透的空气让一月最适合上高山。因他农山顶清晨颇冷，Kew Mae Pan 步道开放，高坡上的樱花正盛。"] },
        { icon: "🍵", heading: "茶、咖啡与清凉早晨", paras: ["城北与城西的高山农场正当时。清晨造访一处咖啡或茶庄园（包括本地 Monsoon Tea），与这份凉意相得益彰。"] },
        { icon: "🛕", heading: "从容的古城时光", paras: ["新年后的宁静很适合古城：从容的寺庙、周末步行街，以及避开节庆人潮的一日游。"] },
      ],
    },
    th: {
      name: "มกราคม",
      tip: "ช่วงหนาวที่ดีที่สุด เช้าเย็นสบาย ฟ้าใส และซากุระดอยบานบนสันเขาสูง เหมาะไปดอยอินทนนท์และจิบชาบนที่สูง",
      intro: "หัวใจของหน้าหนาว เช้าสดชื่น ฟ้าใส และบนสันเขาสูงซากุระดอยบานสีชมพู เป็นเดือนที่สบายที่สุดของปีสำหรับกิจกรรมกลางแจ้ง",
      sections: [
        { icon: "🌄", heading: "ภูเขาเรียกหา", paras: ["อากาศเย็นใสทำให้มกราคมเหมาะกับที่สูง ยอดดอยอินทนนท์หนาวจริงตอนเช้า เส้นทางกิ่วแม่ปานเปิด และซากุระดอยบานเต็มที่บนเนินสูง"] },
        { icon: "🍵", heading: "ชา กาแฟ และเช้าเย็น ๆ", paras: ["ไร่บนดอยทางเหนือและตะวันตกกำลังสวย เช้า ๆ แวะไร่กาแฟหรือไร่ชา (รวมถึง Monsoon Tea ท้องถิ่น) เข้ากับอากาศเย็นได้ดี"] },
        { icon: "🛕", heading: "ช่วงสบาย ๆ ในเมืองเก่า", paras: ["ความสงบหลังปีใหม่เหมาะกับวัดแบบไม่รีบ ถนนคนเดินสุดสัปดาห์ และทริปวันเดียวแบบเลี่ยงฝูงชนช่วงเทศกาล"] },
      ],
    },
  },
  {
    slug: "february",
    index: 1,
    emoji: "🌼",
    en: {
      name: "February",
      tip: "Warm, sunny days and the Chiang Mai Flower Festival in the first week. Great for the Old City, markets, and easy day trips.",
      intro: "Warm, sunny and bright. The first weekend brings the Chiang Mai Flower Festival, with floral floats and the city's gardens in full bloom. A gentle, colourful month before the heat builds.",
      sections: [
        { icon: "🌸", heading: "The Flower Festival", paras: ["The first-weekend parade of flower-covered floats winds through the city to Nong Buak Haad Park. Go early for the gardens before the midday heat."] },
        { icon: "🛕", heading: "The Old City at its best", paras: ["Dry, comfortable days are ideal for temple-hopping, the markets, and slow mornings in Nimman's cafés."] },
        { icon: "🏞️", heading: "Easy day trips", paras: ["Still cool enough to range out — elephant camps, waterfalls and the hills are an easy drive before the hotter months arrive."] },
      ],
    },
    zh: {
      name: "二月",
      tip: "温暖晴朗，月初有清迈花卉节。适合逛古城、夜市和轻松的一日游。",
      intro: "温暖晴朗。月初有清迈花卉节，花车巡游、城中花园繁花盛开，是暑热来临前色彩缤纷又惬意的一个月。",
      sections: [
        { icon: "🌸", heading: "花卉节", paras: ["月初周末，缀满鲜花的花车穿城而行，终点在 Nong Buak Haad 公园。趁正午暑热前早些去逛花园。"] },
        { icon: "🛕", heading: "古城最佳时节", paras: ["干爽舒适的天气最适合逛寺庙、市集，以及在宁曼咖啡馆度过悠闲的早晨。"] },
        { icon: "🏞️", heading: "轻松一日游", paras: ["仍然凉爽，适合外出——大象营地、瀑布与群山都在不远处，赶在更热的月份到来前出发。"] },
      ],
    },
    th: {
      name: "กุมภาพันธ์",
      tip: "แดดอุ่นสบาย มีงานไม้ดอกไม้ประดับเชียงใหม่ต้นเดือน เหมาะเดินเมืองเก่า ตลาด และทริปวันเดียว",
      intro: "แดดอุ่นสดใส ต้นเดือนมีงานไม้ดอกไม้ประดับเชียงใหม่ ขบวนรถดอกไม้และสวนในเมืองบานสะพรั่ง เป็นเดือนสีสันสดใสและสบาย ๆ ก่อนอากาศจะร้อนขึ้น",
      sections: [
        { icon: "🌸", heading: "งานไม้ดอกไม้ประดับ", paras: ["ขบวนรถประดับดอกไม้สุดสัปดาห์แรกเคลื่อนผ่านเมืองไปสวนหนองบวกหาด ไปแต่เช้าเพื่อชมสวนก่อนแดดเที่ยง"] },
        { icon: "🛕", heading: "เมืองเก่าช่วงที่ดีที่สุด", paras: ["อากาศแห้งสบายเหมาะเที่ยววัด เดินตลาด และนั่งคาเฟ่ย่านนิมมานตอนเช้า ๆ"] },
        { icon: "🏞️", heading: "ทริปวันเดียวสบาย ๆ", paras: ["ยังเย็นพอจะออกไปไกล ปางช้าง น้ำตก และภูเขาอยู่ไม่ไกล ไปก่อนเดือนที่ร้อนกว่าจะมาถึง"] },
      ],
    },
  },
  {
    slug: "march",
    index: 2,
    emoji: "🛕",
    en: {
      name: "March",
      tip: "Warm, unhurried days — perfect for cooking classes, massage, cafés and temple-hopping in the Old City. On hazier days it's worth a quick air-quality check before big outdoor plans.",
      intro: "Warm and unhurried. March is a slower, quieter month — lovely for cooking classes, massage, cafés and temple-hopping. Some days turn hazy, so it's worth a quick air-quality check before big outdoor plans.",
      sections: [
        { icon: "🍳", heading: "Indoor-friendly favourites", paras: ["A great month to cook. Market-to-table cooking classes, long massages and café afternoons are all at their best when the days are warm."] },
        { icon: "🌫️", heading: "Keep an eye on the air", paras: ["This is agricultural-burning season in the region, so haze comes and goes. Apps like AirVisual show the day's reading — on clearer days head outdoors, on hazier ones lean indoors."] },
        { icon: "🛕", heading: "Temples & culture", paras: ["The Old City's temples, museums and galleries are calm and cool — a rewarding way to spend a hazy afternoon."] },
      ],
    },
    zh: {
      name: "三月",
      tip: "温暖悠闲的日子——适合烹饪课、按摩、咖啡馆和在古城逛寺庙。遇到雾霾较重的日子，安排户外行程前先查一下空气质量会更安心。",
      intro: "温暖而悠闲。三月较为安静，适合烹饪课、按摩、咖啡馆和逛寺庙。有些日子会起雾霾，安排户外行程前先查一下空气质量。",
      sections: [
        { icon: "🍳", heading: "适合室内的体验", paras: ["很适合下厨。从市场到餐桌的烹饪课、长时间按摩和咖啡馆午后，都在温暖的日子里格外惬意。"] },
        { icon: "🌫️", heading: "留意空气", paras: ["这是本地区的烧荒季，雾霾时有时无。可用 AirVisual 等应用查看当天读数——晴朗时出门，雾霾时转向室内。"] },
        { icon: "🛕", heading: "寺庙与文化", paras: ["古城的寺庙、博物馆与艺廊清凉宁静——是雾霾午后既轻松又有收获的去处。"] },
      ],
    },
    th: {
      name: "มีนาคม",
      tip: "วันอุ่นสบายไม่รีบเร่ง เหมาะกับคลาสทำอาหาร นวด คาเฟ่ และเที่ยววัดในเมืองเก่า วันไหนหมอกควันเยอะ ลองเช็กคุณภาพอากาศก่อนวางแผนกิจกรรมกลางแจ้งสักนิด",
      intro: "อุ่นสบายไม่รีบเร่ง มีนาคมเงียบและช้าลง เหมาะกับคลาสทำอาหาร นวด คาเฟ่ และเที่ยววัด บางวันมีหมอกควัน ลองเช็กคุณภาพอากาศก่อนวางแผนกิจกรรมกลางแจ้ง",
      sections: [
        { icon: "🍳", heading: "กิจกรรมในร่มที่ชอบ", paras: ["เดือนที่ดีสำหรับการทำอาหาร คลาสจากตลาดสู่โต๊ะ นวดนาน ๆ และคาเฟ่ยามบ่ายล้วนดีในวันอุ่น ๆ"] },
        { icon: "🌫️", heading: "จับตาดูอากาศ", paras: ["เป็นช่วงเผาในภูมิภาค หมอกควันมาเป็นช่วง ๆ ใช้แอปอย่าง AirVisual ดูค่าประจำวัน วันใสออกไปข้างนอก วันหมอกควันเน้นในร่ม"] },
        { icon: "🛕", heading: "วัดและวัฒนธรรม", paras: ["วัด พิพิธภัณฑ์ และแกลเลอรีในเมืองเก่าเย็นสบาย เป็นวิธีใช้เวลาบ่ายที่มีหมอกควันอย่างคุ้มค่า"] },
      ],
    },
  },
  {
    slug: "april",
    index: 3,
    emoji: "💦",
    en: {
      name: "April",
      tip: "Songkran (13–15 Apr) turns the whole city into a joyful water fight — the highlight of the month. It's hot, so plan water-friendly days and stay hydrated; on hazier days, a quick air-quality check before heading outdoors helps.",
      intro: "Hot, and gloriously wet. Songkran (13–15 April) turns the whole city into a days-long water fight — the highlight of the Thai year. Plan water-friendly days, stay hydrated, and check the air on hazier days before heading out.",
      sections: [
        { icon: "💦", heading: "Songkran", paras: ["For three days the moat and the Old City become one giant, friendly water fight. Bring a waterproof pouch for your phone and join in — everyone does."] },
        { icon: "🧊", heading: "Beat the heat", paras: ["April is the hottest month. Start early, rest at midday, and save waterfalls, pools and air-conditioned spots for the afternoon."] },
        { icon: "🌫️", heading: "A quick air check", paras: ["Haze can linger into early April. A glance at the day's air-quality reading helps you pick the right days for anything strenuous outdoors."] },
      ],
    },
    zh: {
      name: "四月",
      tip: "泼水节（4月13–15日）全城变成欢乐水仗，是本月最大亮点。天气炎热，安排亲水行程、多补水；遇到雾霾较重的日子，出门前先看看空气质量。",
      intro: "炎热又畅快。泼水节（4月13–15日）让全城变成连日水仗，是泰国一年的高潮。安排亲水行程、多补水，雾霾较重的日子出门前看看空气。",
      sections: [
        { icon: "💦", heading: "泼水节", paras: ["连续三天，护城河与古城化作一场友好的大型水仗。给手机备个防水袋，加入其中——人人都在玩。"] },
        { icon: "🧊", heading: "避暑", paras: ["四月最热。早出发、午休息，把瀑布、泳池和有空调的去处留到午后。"] },
        { icon: "🌫️", heading: "查一下空气", paras: ["雾霾可能延续到四月初。看一眼当天的空气读数，便于挑选适合剧烈户外活动的日子。"] },
      ],
    },
    th: {
      name: "เมษายน",
      tip: "สงกรานต์ (13–15 เม.ย.) ทั้งเมืองสนุกกับการเล่นน้ำ ไฮไลต์ของเดือน อากาศร้อน วางแผนกิจกรรมเล่นน้ำและดื่มน้ำเยอะ ๆ วันไหนหมอกควันเยอะ เช็กคุณภาพอากาศก่อนออกไปข้างนอกสักนิด",
      intro: "ร้อนและเปียกปอนสุด ๆ สงกรานต์ (13–15 เม.ย.) ทำให้ทั้งเมืองเป็นสงครามน้ำหลายวัน ไฮไลต์ของปี วางแผนกิจกรรมเล่นน้ำ ดื่มน้ำเยอะ ๆ และวันหมอกควันเช็กอากาศก่อนออก",
      sections: [
        { icon: "💦", heading: "สงกรานต์", paras: ["สามวันที่คูเมืองและเมืองเก่ากลายเป็นสงครามน้ำสุดเฟรนด์ลี่ พกซองกันน้ำให้มือถือแล้วร่วมสนุก ใคร ๆ ก็เล่น"] },
        { icon: "🧊", heading: "สู้ความร้อน", paras: ["เมษายนร้อนที่สุด เริ่มแต่เช้า พักเที่ยง เก็บน้ำตก สระว่ายน้ำ และที่มีแอร์ไว้ตอนบ่าย"] },
        { icon: "🌫️", heading: "เช็กอากาศสักนิด", paras: ["หมอกควันอาจค้างถึงต้นเมษายน ดูค่าคุณภาพอากาศประจำวันช่วยเลือกวันที่เหมาะกับกิจกรรมหนัก ๆ กลางแจ้ง"] },
      ],
    },
  },
  {
    slug: "may",
    index: 4,
    emoji: "🌧️",
    en: {
      name: "May",
      tip: "The first rains green everything up. Afternoon showers, lush hills, and far fewer crowds — waterfalls start to run full.",
      intro: "The first rains arrive and everything turns green. Showers tend to come in the afternoon, the hills go lush, the crowds thin out, and the waterfalls start to run full.",
      sections: [
        { icon: "🌿", heading: "Green season begins", paras: ["Rain clears the air and wakes up the landscape. Mornings are often bright — a good window for the hills and elephants before the afternoon showers."] },
        { icon: "💧", heading: "Waterfalls fill up", paras: ["Bua Tong 'sticky' waterfall and the national-park falls get their flow back. Trails are green and the light is beautiful after rain."] },
        { icon: "💸", heading: "Quieter and better value", paras: ["Low season means fewer tourists and better rates — a relaxed time to be in the city."] },
      ],
    },
    zh: {
      name: "五月",
      tip: "初雨让万物转绿，午后阵雨、山峦葱郁、人潮大减，瀑布开始丰沛。",
      intro: "初雨到来，万物转绿。阵雨多在午后，山峦葱郁、人潮渐少，瀑布也开始丰沛。",
      sections: [
        { icon: "🌿", heading: "绿季开始", paras: ["雨水净化空气、唤醒大地。清晨常常明亮——适合在午后阵雨前上山或看大象。"] },
        { icon: "💧", heading: "瀑布丰沛", paras: ["Bua Tong 竹筏瀑布与国家公园的瀑布恢复水量。雨后步道翠绿，光线很美。"] },
        { icon: "💸", heading: "更清静也更实惠", paras: ["淡季游客更少、价格更优——是惬意畅游的好时候。"] },
      ],
    },
    th: {
      name: "พฤษภาคม",
      tip: "ฝนแรกทำให้ทุกอย่างเขียวขจี ฝนตกบ่าย เขาเขียวชอุ่ม คนน้อยลง น้ำตกเริ่มเต็ม",
      intro: "ฝนแรกมาถึง ทุกอย่างกลับมาเขียว ฝนมักตกบ่าย เขาเขียวชอุ่ม คนน้อยลง และน้ำตกเริ่มเต็ม",
      sections: [
        { icon: "🌿", heading: "หน้าเขียวเริ่มแล้ว", paras: ["ฝนล้างอากาศและปลุกธรรมชาติ เช้ามักสดใส เป็นช่วงเหมาะขึ้นเขาและดูช้างก่อนฝนบ่าย"] },
        { icon: "💧", heading: "น้ำตกเต็ม", paras: ["น้ำตกบัวตองและน้ำตกในอุทยานกลับมามีน้ำ ทางเดินเขียวและแสงสวยหลังฝน"] },
        { icon: "💸", heading: "เงียบกว่าและคุ้มกว่า", paras: ["โลว์ซีซั่นคนน้อยราคาดี เป็นช่วงเที่ยวแบบสบาย ๆ"] },
      ],
    },
  },
  {
    slug: "june",
    index: 5,
    emoji: "⛅",
    en: {
      name: "June",
      tip: "Green season proper: short heavy showers, then sun. Mornings are best for elephants and the hills; keep afternoons flexible.",
      intro: "Green season proper: short, heavy showers followed by sun. Mornings are the most reliable window for being outdoors; keep afternoons flexible and you'll barely be slowed down.",
      sections: [
        { icon: "🐘", heading: "Mornings outdoors", paras: ["Plan elephants, the hills and day trips for the morning, when rain is least likely. The camps and farms are lush and uncrowded."] },
        { icon: "☔", heading: "Rain, then sun", paras: ["Showers are usually brief. Carry a light rain layer and the day mostly stays yours."] },
        { icon: "🍜", heading: "Rainy-day comforts", paras: ["A passing downpour is a fine excuse for a cooking class, a long lunch, or a café afternoon."] },
      ],
    },
    zh: {
      name: "六月",
      tip: "正式进入绿季：短时强阵雨后又放晴。上午最适合看大象和上山，午后灵活安排。",
      intro: "正式进入绿季：短时强阵雨后放晴。上午是最稳妥的户外时段，午后灵活安排，基本不耽误行程。",
      sections: [
        { icon: "🐘", heading: "上午户外", paras: ["把大象、上山和一日游安排在上午，下雨概率最低。营地与农场葱郁而清静。"] },
        { icon: "☔", heading: "雨过天晴", paras: ["阵雨通常短暂。带件薄雨衣，大半天仍是你的。"] },
        { icon: "🍜", heading: "雨天的慰藉", paras: ["一场过云雨正好用来上烹饪课、慢享午餐或泡咖啡馆。"] },
      ],
    },
    th: {
      name: "มิถุนายน",
      tip: "เข้าหน้าฝนเต็มตัว ฝนตกหนักสั้น ๆ แล้วแดดออก เช้าเหมาะดูช้างและขึ้นเขา บ่ายยืดหยุ่นไว้",
      intro: "เข้าหน้าฝนเต็มตัว ฝนตกหนักสั้น ๆ แล้วแดดออก เช้าเป็นช่วงกลางแจ้งที่ชัวร์ที่สุด บ่ายยืดหยุ่นไว้แล้วแทบไม่สะดุด",
      sections: [
        { icon: "🐘", heading: "เช้ากลางแจ้ง", paras: ["จัดช้าง ภูเขา และทริปวันเดียวไว้ตอนเช้าที่ฝนน้อยสุด ปางและไร่เขียวและคนไม่เยอะ"] },
        { icon: "☔", heading: "ฝนแล้วแดด", paras: ["ฝนมักตกสั้น ๆ พกเสื้อกันฝนบาง ๆ แล้ววันส่วนใหญ่ยังเป็นของคุณ"] },
        { icon: "🍜", heading: "ของอุ่น ๆ ยามฝน", paras: ["ฝนผ่านมาเป็นข้ออ้างดี ๆ สำหรับคลาสทำอาหาร มื้อเที่ยงยาว ๆ หรือบ่ายในคาเฟ่"] },
      ],
    },
  },
  {
    slug: "july",
    index: 6,
    emoji: "☕",
    en: {
      name: "July",
      tip: "Lush and quiet. Rain comes and goes — a good month for waterfalls, coffee farms, and unhurried Old City days.",
      intro: "Lush, green and quiet. Rain comes and goes rather than settling in — a relaxed month for waterfalls, coffee farms, and unhurried days in the Old City.",
      sections: [
        { icon: "☕", heading: "Coffee in the hills", paras: ["The hill farms are green and calm. A farm visit — trek, roast and brew — is a lovely way to spend a cooler, cloud-dappled day."] },
        { icon: "💧", heading: "Waterfall weather", paras: ["Falls are full and the forests glow. Time outdoor trips around the mornings for the best light and the least rain."] },
        { icon: "🏙️", heading: "Slow city days", paras: ["Quiet streets, easy café-hopping, and comfortable temple visits — July rewards an unhurried pace."] },
      ],
    },
    zh: {
      name: "七月",
      tip: "葱郁而宁静。雨时下时停——适合瀑布、咖啡庄园和悠闲的古城时光。",
      intro: "葱郁、翠绿而宁静。雨时下时停，而非连绵——适合瀑布、咖啡庄园和悠闲的古城时光。",
      sections: [
        { icon: "☕", heading: "高山咖啡", paras: ["高山农场翠绿静谧。一次农场之旅——徒步、烘焙、冲煮——是云影斑驳、天气较凉之日的美好安排。"] },
        { icon: "💧", heading: "瀑布天气", paras: ["瀑布丰沛、森林润泽。把户外行程安排在上午，光线最好、雨最少。"] },
        { icon: "🏙️", heading: "慢节奏城市日", paras: ["街道清静、咖啡馆好逛、寺庙舒适——七月犒赏从容的步调。"] },
      ],
    },
    th: {
      name: "กรกฎาคม",
      tip: "เขียวขจีและเงียบสงบ ฝนมาเป็นพัก ๆ เหมาะไปน้ำตก ไร่กาแฟ และเดินเมืองเก่าแบบชิล ๆ",
      intro: "เขียวขจีและเงียบสงบ ฝนมาเป็นพัก ๆ ไม่ปักหลัก เป็นเดือนสบาย ๆ สำหรับน้ำตก ไร่กาแฟ และวันชิล ๆ ในเมืองเก่า",
      sections: [
        { icon: "☕", heading: "กาแฟบนดอย", paras: ["ไร่บนดอยเขียวและสงบ ทริปไร่—เดิน คั่ว ชง—เป็นวิธีใช้วันเมฆครึ้มเย็น ๆ อย่างน่ารัก"] },
        { icon: "💧", heading: "อากาศน้ำตก", paras: ["น้ำตกเต็มและป่าเขียวสด จัดทริปกลางแจ้งตอนเช้าเพื่อแสงดีและฝนน้อย"] },
        { icon: "🏙️", heading: "วันเมืองช้า ๆ", paras: ["ถนนเงียบ คาเฟ่น่าเดิน วัดสบาย กรกฎาคมให้รางวัลกับจังหวะไม่รีบ"] },
      ],
    },
  },
  {
    slug: "august",
    index: 7,
    emoji: "🌾",
    en: {
      name: "August",
      tip: "Deep green, dramatic skies, low-season prices. The rice terraces look their best — pack a light rain layer.",
      intro: "Deep green and dramatic. Skies are moody, the rice terraces look their best, and low-season prices make it an easy month to travel. Pack a light rain layer and you're set.",
      sections: [
        { icon: "🌾", heading: "Rice-terrace season", paras: ["The terraces in the hills are at their most vivid green. A day trip out of the city is worth it for the scenery alone."] },
        { icon: "📸", heading: "Dramatic light", paras: ["Big skies and after-rain clarity make for beautiful photos. Mornings are the most reliable for getting out."] },
        { icon: "💸", heading: "Low-season value", paras: ["Fewer crowds and better rates across stays and tours — a quietly rewarding time to visit."] },
      ],
    },
    zh: {
      name: "八月",
      tip: "满眼浓绿、云天壮丽、淡季价格。梯田最美，记得带件轻便雨衣。",
      intro: "浓绿而壮丽。天空多云富戏剧性，梯田最美，淡季价格也友好。带件薄雨衣就万事俱备。",
      sections: [
        { icon: "🌾", heading: "梯田季", paras: ["山间梯田绿得最浓。单为这片景色，出城一日游也值得。"] },
        { icon: "📸", heading: "戏剧性光线", paras: ["辽阔的天空与雨后的通透很适合拍照。上午出门最稳妥。"] },
        { icon: "💸", heading: "淡季超值", paras: ["住宿与行程人少价优——是静静犒赏自己的好时节。"] },
      ],
    },
    th: {
      name: "สิงหาคม",
      tip: "เขียวเข้ม ท้องฟ้าดราม่า ราคาโลว์ซีซั่น นาขั้นบันไดสวยที่สุด พกเสื้อกันฝนบาง ๆ ไว้",
      intro: "เขียวเข้มและดราม่า ท้องฟ้าครึ้ม นาขั้นบันไดสวยที่สุด และราคาโลว์ซีซั่นทำให้เที่ยวง่าย พกเสื้อกันฝนบาง ๆ ก็พร้อม",
      sections: [
        { icon: "🌾", heading: "ฤดูนาขั้นบันได", paras: ["นาขั้นบันไดบนดอยเขียวสดที่สุด ทริปวันเดียวนอกเมืองคุ้มแค่วิวก็พอ"] },
        { icon: "📸", heading: "แสงดราม่า", paras: ["ท้องฟ้ากว้างและความใสหลังฝนถ่ายรูปสวย เช้าชัวร์สุดสำหรับออกไปข้างนอก"] },
        { icon: "💸", heading: "โลว์ซีซั่นคุ้ม", paras: ["คนน้อยราคาดีทั้งที่พักและทัวร์ เป็นช่วงเที่ยวที่คุ้มแบบเงียบ ๆ"] },
      ],
    },
  },
  {
    slug: "september",
    index: 8,
    emoji: "💧",
    en: {
      name: "September",
      tip: "The wettest stretch, and the most beautiful green. Waterfalls are thundering — time outdoor trips around the morning.",
      intro: "The wettest stretch of the year — and the most beautiful green. Waterfalls are thundering and the hills are at peak lush. Build outdoor plans around the mornings and you'll do fine.",
      sections: [
        { icon: "💧", heading: "Waterfalls at full power", paras: ["This is the month the falls are most impressive. Wear grippy shoes — the rocks are slick — and go in the morning."] },
        { icon: "🌿", heading: "Peak green", paras: ["Everything is vivid and alive. The forests, farms and terraces will never look greener."] },
        { icon: "🧘", heading: "A gentle pace", paras: ["With rain more likely, it's a good month to balance a morning outdoors with an afternoon of spa, cooking or cafés."] },
      ],
    },
    zh: {
      name: "九月",
      tip: "最多雨、却也最翠绿的时节。瀑布气势磅礴，户外行程尽量安排在上午。",
      intro: "一年中最多雨、却也最翠绿的时节。瀑布气势磅礴，山峦浓绿至极。把户外安排在上午就没问题。",
      sections: [
        { icon: "💧", heading: "瀑布最壮观", paras: ["这是瀑布最震撼的月份。穿防滑鞋——岩石湿滑——并在上午前往。"] },
        { icon: "🌿", heading: "极致翠绿", paras: ["一切鲜活盎然。森林、农场与梯田绿到极致。"] },
        { icon: "🧘", heading: "从容些", paras: ["多雨的月份，适合上午户外、午后水疗、烹饪或咖啡馆，张弛有度。"] },
      ],
    },
    th: {
      name: "กันยายน",
      tip: "ฝนชุกที่สุดแต่เขียวที่สุด น้ำตกไหลแรง จัดทริปกลางแจ้งช่วงเช้า",
      intro: "ช่วงฝนชุกที่สุดของปี และเขียวที่สุด น้ำตกไหลแรงและเขาเขียวสุด จัดกิจกรรมกลางแจ้งตอนเช้าก็สบาย",
      sections: [
        { icon: "💧", heading: "น้ำตกเต็มกำลัง", paras: ["เดือนที่น้ำตกน่าทึ่งที่สุด ใส่รองเท้ากันลื่น—หินลื่น—และไปตอนเช้า"] },
        { icon: "🌿", heading: "เขียวที่สุด", paras: ["ทุกอย่างสดและมีชีวิต ป่า ไร่ และนาจะไม่เขียวไปกว่านี้อีกแล้ว"] },
        { icon: "🧘", heading: "จังหวะเบา ๆ", paras: ["ฝนมีโอกาสมากขึ้น เหมาะสลับเช้ากลางแจ้งกับบ่ายสปา ทำอาหาร หรือคาเฟ่"] },
      ],
    },
  },
  {
    slug: "october",
    index: 9,
    emoji: "🍃",
    en: {
      name: "October",
      tip: "Rains taper off and the air turns fresh and clear. The hills are emerald — a lovely, underrated month to visit.",
      intro: "The rains taper off and the air turns fresh and clear. The hills are still emerald and the crowds haven't arrived yet — a lovely, underrated month to visit.",
      sections: [
        { icon: "🍃", heading: "The sweet spot", paras: ["Late October often brings the first properly clear, cool days before high season. Green hills, clean air, and space to breathe."] },
        { icon: "💧", heading: "Last of the full falls", paras: ["Waterfalls are still running strong after the wet months — catch them before the dry season slows them down."] },
        { icon: "🎏", heading: "Shoulder-season ease", paras: ["Rates and crowds are still low, but the weather is turning — arguably the best value window of the year."] },
      ],
    },
    zh: {
      name: "十月",
      tip: "雨势渐收，空气清新通透。山峦如翡翠——被低估的好时节。",
      intro: "雨势渐收，空气清新通透。山峦仍如翡翠，旺季人潮尚未到来——被低估的好时节。",
      sections: [
        { icon: "🍃", heading: "最佳平衡点", paras: ["十月下旬常迎来旺季前第一批真正清朗凉爽的日子。绿山、清气，还有从容的空间。"] },
        { icon: "💧", heading: "最后的丰沛瀑布", paras: ["雨季之后瀑布仍水量充沛——趁旱季放缓前去看看。"] },
        { icon: "🎏", heading: "淡旺之交的轻松", paras: ["价格与人潮仍低，而天气正在转好——堪称一年中最超值的窗口。"] },
      ],
    },
    th: {
      name: "ตุลาคม",
      tip: "ฝนเริ่มซา อากาศสดใส เขาเขียวมรกต—เดือนที่ดีแบบที่หลายคนมองข้าม",
      intro: "ฝนเริ่มซา อากาศสดใส เขายังเขียวมรกตและนักท่องเที่ยวยังไม่มา เป็นเดือนที่ดีแบบที่หลายคนมองข้าม",
      sections: [
        { icon: "🍃", heading: "จุดลงตัว", paras: ["ปลายตุลาคมมักมีวันใสเย็นจริง ๆ ก่อนไฮซีซั่น เขาเขียว อากาศสะอาด และมีพื้นที่ให้หายใจ"] },
        { icon: "💧", heading: "น้ำตกเต็มครั้งสุดท้าย", paras: ["น้ำตกยังแรงหลังหน้าฝน รีบไปก่อนหน้าแล้งจะทำให้น้ำลด"] },
        { icon: "🎏", heading: "ช่วงต่อฤดูที่สบาย", paras: ["ราคาและคนยังน้อยแต่อากาศกำลังดีขึ้น เป็นช่วงคุ้มที่สุดช่วงหนึ่งของปี"] },
      ],
    },
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
        { icon: "⛰️", heading: "Go up the mountains", paras: ["This is the month the mountains pay off. Doi Suthep is an easy half-day — the golden chedi of Wat Phra That is a short ride up, and clear air means you can see the city below. For a full day, Doi Inthanon, Thailand's highest peak, is cold enough for a jacket at the summit, with the twin royal pagodas and the Kew Mae Pan nature trail."] },
        { icon: "💦", heading: "Still good: the warm-weather things", paras: ["You don't have to give up the water. Bamboo rafting on the rivers north of the city still runs through the day — the water's a touch cooler, so go midday when the sun is up. The no-riding elephant camps and the coffee farms are at their best with dry trails and green hills."] },
        { icon: "☕", heading: "Eat & drink", paras: ["Cool evenings make November perfect for the night markets. It's peak khao soi weather, and for something quieter, warm up with a pot of local highland Monsoon Tea."] },
        { icon: "🎒", heading: "Before you go", paras: ["Pack a light layer — it's shorts by day but mornings and mountain tops need a fleece. Book ahead: November is peak season and festival week fills up early. And if you make a krathong, choose the biodegradable banana-leaf kind."] },
      ],
    },
    zh: {
      name: "十一月",
      tip: "最佳月份：凉爽澄澈，水灯节（Yi Peng）点亮夜空。上山吧——素贴山与因他农山美不胜收。",
      intro: "十月底雨季结束后，清迈迎来一年中最好的时节——湿度下降、天空湛蓝、山峦在旱季来临前依旧翠绿。清晨凉爽，空气在新年烧荒季到来前格外清新。",
      sections: [
        { icon: "🏵️", heading: "水灯节与 Yi Peng", paras: ["十一月的清迈被点亮。月圆前后两大节日交织：水灯节人们在滨河放流花与蜡烛做的水灯；Yi Peng 则是兰纳传统，放飞发光的纸天灯。日期每年随农历变动，滨河、塔佩门与古城寺庙是核心区域；部分大型天灯活动需购票并提前数月售罄。出于安全，机场附近禁止放天灯，请留意航班日期。"] },
        { icon: "⛰️", heading: "上山去", paras: ["这是群山最值得一去的月份。素贴山半天即可往返，空气通透能俯瞰全城；因他农山则值得一整天——泰国最高峰，清晨山顶需穿外套，还有双塔皇家佛塔和 Kew Mae Pan 自然步道。"] },
        { icon: "💦", heading: "依旧适合的戏水活动", paras: ["不必放弃玩水。城北河上的竹筏漂流白天仍在运营，水偏凉，建议中午阳光足时去。无骑乘大象营地和咖啡庄园也因步道干爽、山色翠绿而处于最佳状态。"] },
        { icon: "☕", heading: "吃与喝", paras: ["凉爽的夜晚让十一月的夜市格外惬意，也是泰北咖喱面（khao soi）的最佳季节。想安静些，就来一壶本地高山 Monsoon Tea 暖暖身。"] },
        { icon: "🎒", heading: "出行前", paras: ["带一件薄外套——白天穿短袖，但清晨和山顶需要抓绒。提前预订：十一月是旺季，节庆周尤其紧俏。若要做水灯，请选可降解的香蕉叶款。"] },
      ],
    },
    th: {
      name: "พฤศจิกายน",
      tip: "เดือนที่ดีที่สุด อากาศเย็นฟ้าใส และยี่เป็งประดับท้องฟ้า ขึ้นเขาเลย—ดอยสุเทพและดอยอินทนนท์งดงามมาก",
      intro: "หลังฝนจางไปปลายตุลาคม เชียงใหม่เข้าสู่ช่วงที่ดีที่สุดของปี ความชื้นลดลง ฟ้าใสสีคราม และภูเขายังเขียวก่อนหน้าแล้ง เช้าเย็นสบายจริง และอากาศใสก่อนช่วงเผาจะมาในต้นปี",
      sections: [
        { icon: "🏵️", heading: "ยี่เป็ง & ลอยกระทง", paras: ["พฤศจิกายนคือเดือนที่เชียงใหม่สว่างไสว สองเทศกาลซ้อนกันช่วงเพ็ญเดือนสิบสอง: ลอยกระทงที่ผู้คนลอยกระทงดอกไม้และเทียนลงแม่น้ำปิง และยี่เป็งประเพณีล้านนาที่ปล่อยโคมลอยกระดาษเรืองแสง วันจะเปลี่ยนทุกปีตามจันทรคติ แม่น้ำปิง ประตูท่าแพ และวัดในเมืองเก่าคือหัวใจของงาน งานปล่อยโคมใหญ่บางงานต้องซื้อบัตรและเต็มล่วงหน้าหลายเดือน การปล่อยโคมใกล้สนามบินถูกจำกัดด้วยเหตุผลความปลอดภัย ตรวจสอบวันบินของคุณด้วย"] },
        { icon: "⛰️", heading: "ขึ้นเขากันเถอะ", paras: ["เดือนนี้ภูเขาคุ้มค่าที่สุด ดอยสุเทพไปเช้าเย็นกลับสบาย ๆ อากาศใสมองเห็นเมืองเบื้องล่าง ส่วนดอยอินทนนท์ยอดเขาสูงสุดของไทยเย็นพอจะใส่แจ็กเก็ตตอนเช้า มีพระธาตุคู่และเส้นทางธรรมชาติกิ่วแม่ปาน"] },
        { icon: "💦", heading: "ยังสนุกได้: กิจกรรมหน้าร้อน", paras: ["ไม่ต้องเลิกเล่นน้ำ ล่องแพไม้ไผ่ทางเหนือของเมืองยังมีช่วงกลางวัน น้ำเย็นขึ้นนิด ไปตอนเที่ยงที่แดดออกกำลังดี ปางช้างแบบไม่ขี่และไร่กาแฟก็สวยที่สุดเพราะทางเดินแห้งและเขาเขียว"] },
        { icon: "☕", heading: "กินและดื่ม", paras: ["ค่ำคืนเย็นสบายทำให้พฤศจิกายนเหมาะกับตลาดกลางคืน เป็นฤดูข้าวซอยที่ดีที่สุด อยากเงียบ ๆ ก็อุ่นเครื่องด้วยชา Monsoon Tea จากดอยในเชียงใหม่"] },
        { icon: "🎒", heading: "ก่อนออกเดินทาง", paras: ["พกเสื้อบาง ๆ สักตัว กลางวันใส่เสื้อแขนสั้นได้แต่เช้าและยอดดอยต้องมีเสื้อกันหนาว จองล่วงหน้า พฤศจิกายนเป็นไฮซีซั่นและสัปดาห์เทศกาลเต็มเร็ว และถ้าทำกระทง เลือกแบบใบตองที่ย่อยสลายได้"] },
      ],
    },
  },
  {
    slug: "december",
    index: 11,
    emoji: "⛰️",
    en: {
      name: "December",
      tip: "Cool, dry, and golden. Go up the mountains; bamboo rafting still runs by day if you don't mind the cooler water. Warm up with a pot of local Monsoon Tea.",
      intro: "Cool, dry and golden. December is peak comfort — clear days, cold mountain mornings, and festive energy in the city. Go up the mountains, and warm up with a pot of local tea.",
      sections: [
        { icon: "⛰️", heading: "Up the mountains", paras: ["Doi Suthep and Doi Inthanon are glorious in the clear December air. Summits are cold at dawn, so bring a jacket."] },
        { icon: "🛶", heading: "Still good by day", paras: ["Bamboo rafting still runs by day if you don't mind cooler water — go midday when the sun is up."] },
        { icon: "🍵", heading: "Warm up", paras: ["Cold mornings call for a pot of local highland Monsoon Tea or a hill-farm coffee. Evenings are perfect for the night markets."] },
      ],
    },
    zh: {
      name: "十二月",
      tip: "凉爽干燥、满目金黄。上山正好；若不介意水偏凉，白天仍可玩竹筏漂流。来壶本地 Monsoon Tea 暖暖身。",
      intro: "凉爽、干燥、满目金黄。十二月最为舒适——晴空、山顶清冷的清晨，以及城中的节日气息。上山去，再来壶本地茶暖身。",
      sections: [
        { icon: "⛰️", heading: "上山", paras: ["十二月通透的空气里，素贴山与因他农山美不胜收。山顶清晨很冷，记得带外套。"] },
        { icon: "🛶", heading: "白天仍适合", paras: ["若不介意水偏凉，白天仍可玩竹筏漂流——趁中午阳光足时去。"] },
        { icon: "🍵", heading: "暖身", paras: ["清冷的早晨正适合一壶本地高山 Monsoon Tea 或高山咖啡。夜晚最宜逛夜市。"] },
      ],
    },
    th: {
      name: "ธันวาคม",
      tip: "เย็นสบาย แห้ง และเป็นสีทอง ขึ้นเขากำลังดี ล่องแพไม้ไผ่กลางวันยังเล่นได้ถ้าไม่ซีเรียสเรื่องน้ำเย็น อุ่นเครื่องด้วยชา Monsoon Tea ท้องถิ่นสักกา",
      intro: "เย็นสบาย แห้ง และเป็นสีทอง ธันวาคมสบายที่สุด ฟ้าใส เช้าบนดอยหนาว และบรรยากาศเทศกาลในเมือง ขึ้นเขาเลย แล้วอุ่นเครื่องด้วยชาท้องถิ่น",
      sections: [
        { icon: "⛰️", heading: "ขึ้นเขา", paras: ["ดอยสุเทพและดอยอินทนนท์งดงามในอากาศใสของธันวาคม ยอดดอยหนาวตอนเช้า พกแจ็กเก็ตไปด้วย"] },
        { icon: "🛶", heading: "กลางวันยังสนุก", paras: ["ถ้าไม่ซีเรียสเรื่องน้ำเย็น ล่องแพไม้ไผ่กลางวันยังเล่นได้—ไปตอนเที่ยงที่แดดออก"] },
        { icon: "🍵", heading: "อุ่นเครื่อง", paras: ["เช้าหนาว ๆ เหมาะกับชา Monsoon Tea บนดอยหรือกาแฟดอยสักแก้ว ค่ำ ๆ เหมาะเดินตลาดกลางคืน"] },
      ],
    },
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
