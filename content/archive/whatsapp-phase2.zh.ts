/**
 * Phase 2 restore: ZH translations for the WhatsApp-booked listings archived
 * in `./whatsapp-phase2.ts`. Restore by merging these entries back into
 * `content/i18n/zh.ts` when the WhatsApp listings come back live.
 *
 * Not imported anywhere by design.
 */
import type { LocaleTranslations } from "../i18n/types";

export const whatsappZh: LocaleTranslations = {
  massage: {
    title: "Lila 泰式按摩 — 塔佩分店",
    hook: "为释放女囚提供工作而创办——纪律藏在按压里。",
    description:
      "创办人是清迈女子监狱前狱长，让释放女囚有正当工作。每位按摩师都经过 180 小时公共卫生认证培训。塔佩分店是离塔佩门最近的几家之一——干净、安静，老城内步行可到的泰式按摩里口碑最稳。",
    contributorQuote:
      "在清迈八年，Lila 仍是我第一天就会送客人去的地方——力道到位，故事也到位。",
    inclusions: [
      "60 分钟传统泰式按摩，认证按摩师",
      "提供宽松按摩服",
      "迎宾草本茶",
      "空调单间或共享间",
      "另有 90 / 120 分钟套餐可选",
    ],
    priceLabel: "฿350 / 小时",
    duration: "60 分钟",
    distance: "步行 3 分钟",
    rating: "⭐ 4.9 · 428 推荐",
  },
  "sunday-market": {
    title: "周日步行街美食文化夜游",
    hook: "拉差当浓路上八口小吃，多数游客都刷过头。",
    description:
      "周日傍晚，持证当地向导带你走拉差当浓路——1.1 公里长的步行街——停在外国人会直接刷过的小摊和巷子里的隐藏摊位。8–10 道试吃：清迈香肠 sai oua、米线汤 khanom jeen、芒果糯米饭，还有大多数游客错过的缅甸风味。",
    contributorQuote:
      "我每个周日带客人走，总能发现新摊位——这就是它的魔力。",
    inclusions: [
      "持证英语向导",
      "8–10 道餐饮试吃",
      "市区酒店接送",
      "小团出行，提供瓶装水",
      "仅周日营业",
    ],
    priceLabel: "฿1,200 / 人",
    duration: "3 小时",
    distance: "塔佩门出发",
    rating: "⭐ 4.9 · 203 推荐",
  },
  unwind: {
    title: "放松下午套餐",
    hook: "从家门到家门，整个下午都帮你安排好。",
    description:
      "完美的放松下午，无需操心交通、找地方或回程——都帮你打包好。预订时段、Grab 双向接送、老城最好的按摩师傅。来、放松、被接回。",
    contributorQuote:
      "做这个套餐是因为客人总问我怎么不麻烦地去按摩店——现在一键搞定。",
    inclusions: [
      "Khun Noi 推荐按摩馆 90 分钟传统泰式按摩",
      "Grab 送往按摩店",
      "Grab 送回酒店门口",
      "预订时段（无需等候）",
      "到店姜茶迎宾",
    ],
    priceLabel: "฿750 / 人",
    duration: "2 小时",
    distance: "含 Grab 接送",
    badge: "2 小时 · 任何下午",
    saveBadge: "省 ฿150",
  },
  "golden-hour": {
    title: "黄金时刻套餐",
    hook: "每个来清迈的人都记得的那个傍晚。",
    description:
      "所有人都记得的清迈傍晚。在黄金光线洒满佛塔时漫步古寺。然后向导带你穿过最棒的街头小吃摊——4 道试吃。结束时坐私人嘟嘟车送你回到家门口。",
    contributorQuote:
      "每次有朋友来访我都带他们走这条——日落时分的寺庙、街头小吃、嘟嘟车回家。这才是真正的清迈。",
    inclusions: [
      "日落时分老城寺庙徒步（1.5 小时）",
      "全程当地向导",
      "沿途 4 道街头美食试吃",
      "私人嘟嘟车送回酒店门口",
      "无额外交通费用",
    ],
    priceLabel: "฿1,100 / 人",
    duration: "3 小时",
    distance: "酒店出发",
    badge: "傍晚 · 3 小时",
    saveBadge: "省 ฿200",
  },
  "big-day-out": {
    title: "大日出行套餐",
    hook: "醒来之前所有事都安排好。",
    description:
      "醒来，拎上门口的早餐盒，被接走开启清迈最经典的体验。大象保护区、所有交通、午餐——你还没看手机就都安排好了。最省心、最难忘的一整天。",
    contributorQuote:
      "做这个套餐是为了那些想体验大日子但什么都不想操心的客人。一觉醒来，一切就绪。",
    inclusions: [
      "早餐盒 6:45 送到门口",
      "7:00 在 No.51 或 No.55 接客",
      "半日有良心的大象保护区体验",
      "保护区素食午餐",
      "送回家门口",
    ],
    priceLabel: "฿3,100 / 人",
    duration: "全天",
    distance: "酒店出发接送",
    badge: "全天 · 7 点出发",
    saveBadge: "省 ฿350",
  },
  "lunch-run": {
    title: "本地午餐套餐",
    hook: "本地人吃的地方。不用研究怎么去。",
    description:
      "想吃清迈最好的 Khao Soi 又不想研究路线？双条车上门接你，赶在 Khun Yai 卖完前到达，然后送你回来。座位早就预订好，你只要带个空肚子来就行。",
    contributorQuote:
      "Khao Soi Khun Yai 是清迈最好的咖喱面店。下午 1 点前就卖完——我给 StayLooped 客人留了位。",
    inclusions: [
      "双条车酒店往返接送",
      "Khao Soi Khun Yai 预订座位",
      "向导教你像本地人那样点菜",
      "咖喱面 + 配菜含在价格内",
    ],
    priceLabel: "฿480 / 人",
    duration: "2 小时",
    distance: "双条车酒店出发",
    badge: "午餐 · 2 小时",
    saveBadge: "省 ฿100",
  },
};
