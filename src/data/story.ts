// ─────────────────────────────────────────────────────────────
// 剧情主线 / 思维导图 / 伏笔回收 / 设定百科
// 剧情细节均对照正片公开信息;《崭新之日》部分严格零剧透
// ─────────────────────────────────────────────────────────────

// ── 60 秒核心脉络(悬念版,无关键剧透点名) ──
export interface ChainStep {
  k: string
  title: string
  en: string
  desc: string
  films: string[]
}
export const CHAIN: ChainStep[] = [
  { k: '01', title: '起源:一口蜘蛛咬', en: 'THE BITE',
    desc: '平凡少年被一只不平凡的蜘蛛咬中,获得力量、速度、爬墙与危险的预知。三代电影,三种开场,同一个起点。',
    films: ['蜘蛛侠 (2002)', '超凡蜘蛛侠 (2012)', '美国队长3 (2016)'] },
  { k: '02', title: '代价:学会责任', en: 'THE PRICE',
    desc: '每一代蜘蛛侠,都要用一场锥心的失去,真正听懂那句「能力越大,责任越大」。这不是格言,是学费。',
    films: ['蜘蛛侠 (2002)', '超凡蜘蛛侠2 (2014)', '英雄无归 (2021)'] },
  { k: '03', title: '导师:钢铁的传承', en: 'THE MENTOR',
    desc: 'MCU 的彼得遇到了托尼·斯塔克:战衣、信任、复联的入场券,以及一副名叫「伊迪丝」的眼镜。',
    films: ['美国队长3 (2016)', '英雄归来 (2017)', '英雄远征 (2019)'] },
  { k: '04', title: '曝光:秘密不再是秘密', en: 'EXPOSED',
    desc: '神秘客纵然败亡,仍赢了半步:一段伪造视频,让全世界知道了彼得·帕克就是蜘蛛侠。',
    films: ['英雄远征 (2019)'] },
  { k: '05', title: '牺牲:被遗忘的人', en: 'THE SACRIFICE',
    desc: '为了修补被撕开的多元宇宙,彼得做出了终极选择——让所有人,包括最爱的人,忘记「彼得·帕克」。',
    films: ['英雄无归 (2021)'] },
  { k: '06', title: '新篇:崭新之日', en: 'BRAND NEW DAY',
    desc: '没有后援,没有科技,没有人记得他。皇后区的街头,一切重新开始——这就是你要看的新片。',
    films: ['崭新之日 (2026)'] },
]

// ── 主线剧情全梳理(MCU 六部曲,剧透闸门内) ──
export interface StoryChapter {
  id: string
  film: string
  en: string
  year: string
  intro: string
  beats: { t: string; d: string }[]
  outro: string
  quote?: string
}
export const STORYLINE: StoryChapter[] = [
  {
    id: 'cw', film: '美国队长 3:内战', en: 'CIVIL WAR', year: '2016',
    intro: '彼得·帕克在 MCU 的第一次亮相,不在自己的电影里,而在复仇者分裂的战场上。',
    beats: [
      { t: '皇后区的高中生', d: '此时的彼得刚获得能力六个月,穿着自制卫衣战衣在皇后区行侠仗义,随手把「火车王」式的见义勇为发到网上。' },
      { t: '托尼登门', d: '斯塔克以「奖学金」为名造访彼得的公寓,摊牌招募。彼得说出 MCU 版的责任宣言:「当你拥有这样的能力却选择袖手旁观,那么发生的坏事,就是你的责任。」' },
      { t: '机场大战', d: '在德国莱比锡机场,彼得戴着托尼给的新战衣登场:抢美国队长的盾、缠住猎鹰与冬兵、被巨大化蚁人掀翻。他一边打架一边解说,从此成为 MCU 的话痨担当。' },
    ],
    outro: '这一战没有反派意义上的坏人,但彼得第一次见识了「复仇者级别」的世界——也种下了他此后所有「想证明自己」的执念。',
    quote: '当你拥有这样的能力却选择袖手旁观,那么发生的坏事,就是你的责任。',
  },
  {
    id: 'hc', film: '蜘蛛侠:英雄归来', en: 'HOMECOMING', year: '2017',
    intro: '内战归来,彼得天天守着手机等复联的下一次召唤,却只等来一桩皇后区的「小事」。',
    beats: [
      { t: '秃鹫的黑市', d: '回收工人艾德里安·图姆斯靠贩卖齐塔瑞大战遗留的外星武器维生。彼得追查黑市,却屡屡把事情搞砸——渡轮被外星武器切成两半,斯塔克出手救场后收回了战衣:「如果没了战衣你什么都不是,那你就不配拥有它。」' },
      { t: '车里对峙', d: '返校舞会之夜,彼得发现暗恋对象丽兹的父亲正是秃鹫。赴会途中,图姆斯在车里识破彼得身份,一段没有动作戏的对手戏成为 MCU 经典压迫场面。' },
      { t: '没有战衣的一战', d: '彼得穿着最初的自制卫衣击落秃鹫的飞机,并在火海中救了对手一命。他证明了自己不靠科技也是蜘蛛侠。' },
      { t: '拒绝复联', d: '托尼正式邀请彼得加入复仇者联盟,彼得拒绝了——他选择先做一段时间「 friendly neighborhood 蜘蛛侠」。' },
      { t: '片尾彩蛋(重要!)', d: '狱中,想买外星武器的罪犯麦克·加根(蝎子)向秃鹫打听蜘蛛侠的真实身份,秃鹫选择了沉默。这颗彩蛋蛰伏 9 年,直到《崭新之日》才回收。' },
    ],
    outro: '这一部确立了 MCU 蛛的底色:青春、街头、师徒情。MJ、内德、哈皮、梅婶组成的班底全部就位。',
    quote: '如果没了战衣你什么都不是,那你就不配拥有它。',
  },
  {
    id: 'iw-eg', film: '复仇者联盟 3 & 4', en: 'INFINITY WAR / ENDGAME', year: '2018–2019',
    intro: '彼得被卷进宇宙级战争,经历了死亡与归来,也送走了自己的导师。',
    beats: [
      { t: '太空远征', d: '灭霸的手下来袭纽约,彼得扒住飞船一路上了太空,获授钢铁蜘蛛战衣,与钢铁侠、奇异博士、银河护卫队在泰坦星并肩作战,并被托尼正式册封为复仇者。' },
      { t: '化灰', d: '灭霸集齐无限宝石,响指抹去宇宙半数生命。彼得在托尼怀中说出「斯塔克先生,我感觉不太好」后灰飞烟灭——影史最出圈的心碎场面之一。' },
      { t: '归来与永别', d: '五年后,幸存的复仇者逆转时空,彼得随大军从传送门归来参战。终局之战以托尼·斯塔克的牺牲落幕,彼得在葬礼上送别导师。' },
    ],
    outro: '彼得没有做错任何事,却失去了偶像、导师与半个世界的五年。「后托尼时代」的重量,全部压在了下一部。',
  },
  {
    id: 'ffh', film: '蜘蛛侠:英雄远征', en: 'FAR FROM HOME', year: '2019',
    intro: '彼得更想要的是一场欧洲修学旅行和一段初恋,但全世界都在问他:你会是下一个钢铁侠吗?',
    beats: [
      { t: '伊迪丝', d: '弗瑞交还托尼的遗物:一副名为「伊迪丝」(EDITH,「即使我死了,我也是英雄」)的眼镜,掌控着斯塔克工业的卫星与无人机群。' },
      { t: '神秘客的骗局', d: '自称来自平行宇宙的「神秘客」昆汀·贝克,实为斯塔克工业前全息技术专家,因被托尼否定而怀恨。他用无人机+投影伪造「元素众」袭击,扮演救世英雄,骗取彼得信任——彼得亲手把伊迪丝交给了他。' },
      { t: '伦敦塔桥决战', d: '识破幻象后,彼得在伦敦塔桥上穿越铺天盖地的无人机幻象,凭蜘蛛感应击败神秘客。贝克中弹「身亡」。' },
      { t: '改变一切的彩蛋', d: '神秘客死前布置好后手:号角日报网媒的 J·乔纳·詹姆森(J·K·西蒙斯,跨宇宙回归)向全球播出伪造视频——蜘蛛侠被塑造成谋杀「英雄」的凶手,真名「彼得·帕克」公之于众。' },
    ],
    outro: '这是 MCU 蛛真正的成人礼,也是《英雄无归》与《崭新之日》一切故事的引信。',
    quote: '即使我死了,我也是英雄。—— EDITH',
  },
  {
    id: 'nwh', film: '蜘蛛侠:英雄无归', en: 'NO WAY HOME', year: '2021',
    intro: '身份曝光后,彼得想用一个咒语抹去麻烦,却亲手撕开了多元宇宙——以及自己的人生。',
    beats: [
      { t: '生活崩塌', d: '彼得、MJ、内德被全网围猎,三人的 MIT 申请全部被拒。彼得意识到自己连累了所有人,转向奇异博士求助。' },
      { t: '失控的咒语', d: '奇异博士施法让世人忘记「彼得·帕克是蜘蛛侠」,彼得却反复追加例外名单(MJ、内德、梅婶、哈皮……),咒语崩溃,把各个宇宙中「知道蜘蛛侠身份」的存在全部拉进了 MCU。' },
      { t: '多元宇宙来客', d: '绿魔、章鱼博士、电光人、蜥蜴人、沙人接连现身。彼得拒绝把他们送回去送死,与奇异博士翻脸,执意「治愈」他们。' },
      { t: '梅婶之死', d: '绿魔人格夺回诺曼身体,南瓜炸弹夺走梅婶。临终前她对彼得说出:「能力越大,责任越大。」MCU 的道德原点,在最痛的一刻补完。' },
      { t: '三蛛同框', d: '内德误打误撞用悬戒召来了两位「前辈彼得」:托比·马奎尔与安德鲁·加菲尔德。三位蜘蛛侠在自由女神像并肩作战,一一治愈五位反派;加菲接住了坠落的 MJ,完成迟到十年的救赎。' },
      { t: '终极牺牲', d: '裂缝无法修复,唯一的办法是让所有人彻底忘记「彼得·帕克」这个人。彼得与 MJ、内德含泪告别,承诺一定会重新找到他们。咒语落下,世界遗忘了彼得。' },
      { t: '崭新的一天', d: '数周后,彼得在梅婶墓前遇到同样不再认识他的哈皮;他最终没有向 MJ 说出真相——看到她已经露出的笑容,他选择不打扰。他搬进小公寓,缝出一套全新的红蓝自制战衣,在雪夜里荡出窗外。没有斯塔克科技,没有复联,没有人记得他。' },
      { t: '片尾彩蛋(重要!)', d: '被咒语波及的艾迪·布洛克与毒液在酒吧恶补 MCU 历史后被送回自己的宇宙——但一小滴共生体,留在了吧台上。' },
    ],
    outro: '这就是《崭新之日》的开场世界:彼得赢了战斗,输掉了「彼得·帕克」这个人生。',
    quote: '能力越大,责任越大。—— 梅婶',
  },
  {
    id: 'bridge', film: '从结局到新片之间', en: 'THE GAP', year: '2022–2026',
    intro: '两部正片之间没有电影,但官方信息拼出了这几年的轮廓(以《崭新之日》官方预告与发布为准,零剧透):',
    beats: [
      { t: '被遗忘的四年', d: '彼得以全职「好邻居蜘蛛侠」身份独自守护纽约。没有战衣 AI,没有后援,没有可以打电话的人。' },
      { t: '近在咫尺的陌路', d: '官方预告显示:MJ 与内德就生活在他的日常半径里——却不再认识他。MJ 有了新的生活与新的恋人,彼得只能远远看着旧手机里的视频。' },
      { t: '身体出现异常', d: '预告中彼得的蜘蛛能力开始失控、变得不稳定,他为此找到布鲁斯·班纳求助——绿巨人博士首度加盟蜘蛛侠个人电影。' },
      { t: '街头暗流', d: '蝎子蛰伏 9 年的彩蛋正式回收;墓碑、惩罚者等街头势力登场;成家班参与动作设计。新片基调回归街头,是官方盖章的「全新三部曲第一章」。' },
    ],
    outro: '看到这里,你已经具备了走进影院的全部前置知识。',
  },
]

// ── 剧情思维导图(全作品版:六分区 × 类型筛选) ──
export type NodeType = 'hero' | 'event' | 'villain' | 'item' | 'future' | 'film'
export type Zone = 'raimi' | 'webb' | 'mcu' | 'verse' | 'ssu' | 'bnd'
export interface MapNode {
  id: string; label: string; sub: string; x: number; y: number; type: NodeType; zone: Zone
  detail: string
}
export interface MapEdge { from: string; to: string; label: string }

export const ZONE_META: Record<Zone, { label: string; color: string }> = {
  raimi: { label: '雷米宇宙', color: '#e8292e' },
  webb:  { label: '超凡宇宙', color: '#f59a2e' },
  mcu:   { label: 'MCU 主线', color: '#d42a55' },
  verse: { label: '蜘蛛宇宙', color: '#ff2ea6' },
  ssu:   { label: '索尼衍生', color: '#7c5cff' },
  bnd:   { label: '崭新之日', color: '#ffd23e' },
}

export const MAP_NODES: MapNode[] = [
  // ── 雷米宇宙(左上) ──
  { id: 'sm1', label: '蜘蛛侠', sub: '2002', x: 165, y: 90, type: 'film', zone: 'raimi',
    detail: '一切的开始:本叔之死与「能力越大,责任越大」。托比版三部曲第一章,全球票房 $825M。' },
  { id: 'sm2', label: '蜘蛛侠 2', sub: '2004', x: 165, y: 190, type: 'film', zone: 'raimi',
    detail: '公认超英天花板:弃衣、列车大战、「他只是个孩子」。全球票房 $789M。' },
  { id: 'sm3', label: '蜘蛛侠 3', sub: '2007', x: 165, y: 290, type: 'film', zone: 'raimi',
    detail: '共生体黑衣、沙人、哈利之死。三部曲争议收尾,全球票房 $895M。' },
  { id: 'tobey', label: '托比版蜘蛛侠', sub: 'TOBEY MAGUIRE', x: 360, y: 90, type: 'hero', zone: 'raimi',
    detail: '2002–2007 三部曲主演。有机蛛丝设定。《英雄无归》中作为沉稳前辈回归。' },
  { id: 'goblin', label: '绿魔', sub: 'GREEN GOBLIN', x: 360, y: 175, type: 'villain', zone: 'raimi',
    detail: '诺曼·奥斯本(威廉·达福)。雷米宇宙头号宿敌;《英雄无归》中夺走 MCU 彼得的梅婶。' },
  { id: 'docock', label: '章鱼博士', sub: 'DOC OCK', x: 360, y: 250, type: 'villain', zone: 'raimi',
    detail: '奥托·奥克塔维斯(阿尔弗雷德·莫里纳)。《蜘蛛侠 2》列车大战;17 年后原班回归《英雄无归》。' },
  { id: 'sandman', label: '沙人', sub: 'SANDMAN', x: 360, y: 325, type: 'villain', zone: 'raimi',
    detail: '弗林特·马科。杀害本叔的真凶,「我不是坏人,只是运气不好」。《英雄无归》回归。' },
  { id: 'brock', label: '毒液(2007)', sub: 'EDDIE BROCK', x: 360, y: 400, type: 'villain', zone: 'raimi',
    detail: '共生体首次登上银幕:先附身彼得成黑衣,再与布洛克结合成毒液。设定直通后来的索尼毒液系列。' },

  // ── 超凡宇宙(左下) ──
  { id: 'tasm1', label: '超凡蜘蛛侠', sub: '2012', x: 165, y: 560, type: 'film', zone: 'webb',
    detail: '重启之作:父母之谜、蛛丝发射器、格温·斯黛西。全球票房 $758M。' },
  { id: 'tasm2', label: '超凡蜘蛛侠 2', sub: '2014', x: 165, y: 660, type: 'film', zone: 'webb',
    detail: '格温之死:钟楼那一下没有接住。票房失利直接促成索尼与漫威联手。全球票房 $709M。' },
  { id: 'andrew', label: '加菲版蜘蛛侠', sub: 'ANDREW GARFIELD', x: 360, y: 560, type: 'hero', zone: 'webb',
    detail: '2012–2014 两部曲主演。更忧郁、更科学的彼得。《英雄无归》中完成迟到十年的救赎。' },
  { id: 'gwen', label: '格温·斯黛西', sub: 'GWEN STACY', x: 360, y: 640, type: 'hero', zone: 'webb',
    detail: '警监之女(艾玛·斯通),势均力敌的灵魂伴侣。钟楼坠落,成为加菲蛛永远的伤口。' },
  { id: 'lizard', label: '蜥蜴人', sub: 'THE LIZARD', x: 360, y: 720, type: 'villain', zone: 'webb',
    detail: '康纳斯博士。断臂再生实验异化为蜥蜴,想把全城变成爬行动物。《英雄无归》回归。' },
  { id: 'electro', label: '电光人', sub: 'ELECTRO', x: 360, y: 800, type: 'villain', zone: 'webb',
    detail: '麦克斯·狄龙(杰米·福克斯)。无人记得的小人物,时代广场黑化。《英雄无归》回归(形象重制)。' },

  // ── MCU 主线(中央) ──
  { id: 'cw', label: '美国队长 3', sub: '2016 · 首秀', x: 570, y: 90, type: 'film', zone: 'mcu',
    detail: '荷兰弟版蜘蛛侠首秀:机场大战。托尼登门招募,「想证明自己」的执念从此开始。' },
  { id: 'hc', label: '英雄归来', sub: '2017', x: 570, y: 180, type: 'film', zone: 'mcu',
    detail: '不做救世主,先做皇后区好邻居。秃鹫、蝎子彩蛋、MJ/内德/哈皮/梅婶班底集齐。' },
  { id: 'iweg', label: '复联 3 & 4', sub: '2018–2019', x: 570, y: 270, type: 'film', zone: 'mcu',
    detail: '化灰与归来:「斯塔克先生,我感觉不太好」;终局之战,彼得送别导师钢铁侠。' },
  { id: 'ffh', label: '英雄远征', sub: '2019', x: 570, y: 360, type: 'film', zone: 'mcu',
    detail: '神秘客骗走伊迪丝;片尾身份曝光——此后一切故事的引信。' },
  { id: 'nwh', label: '英雄无归', sub: '2021', x: 570, y: 450, type: 'film', zone: 'mcu',
    detail: '三蛛同框。为修补多元宇宙,彼得让全世界忘记自己。《崭新之日》的地基。' },
  { id: 'peter', label: '彼得·帕克', sub: 'MCU 蜘蛛侠', x: 900, y: 280, type: 'hero', zone: 'mcu',
    detail: '汤姆·赫兰德。从被托尼招募的高中生,到被全世界遗忘的孤独守望者——整条故事链的中心。' },
  { id: 'tony', label: '钢铁侠·导师', sub: 'TONY STARK', x: 760, y: 90, type: 'hero', zone: 'mcu',
    detail: '战衣、信任与榜样。终局之战中牺牲,留给彼得伊迪丝眼镜和「下一个钢铁侠」的沉重期待。' },
  { id: 'vulture', label: '秃鹫', sub: 'VULTURE', x: 760, y: 180, type: 'villain', zone: 'mcu',
    detail: '图姆斯(迈克尔·基顿)。蓝领军火商,也是彼得暗恋对象的父亲;知道身份却守口如瓶。' },
  { id: 'scorpion', label: '蝎子', sub: 'SCORPION', x: 760, y: 350, type: 'villain', zone: 'mcu',
    detail: '麦克·加根(迈克尔·曼多)。2017 年片尾彩蛋打听蜘蛛侠身份;9 年后在《崭新之日》正式成为对手。' },
  { id: 'may', label: '梅婶', sub: 'MAY PARKER', x: 760, y: 450, type: 'hero', zone: 'mcu',
    detail: '玛丽莎·托梅。临终前说出「能力越大,责任越大」——这句名言的第三次银幕传承。' },
  { id: 'edith', label: '伊迪丝眼镜', sub: 'E.D.I.T.H.', x: 900, y: 90, type: 'item', zone: 'mcu',
    detail: '「即使我死了,我也是英雄」。掌控斯塔克卫星与无人机群,《英雄远征》的核心道具。' },
  { id: 'mysterio', label: '神秘客', sub: 'MYSTERIO', x: 1030, y: 110, type: 'villain', zone: 'mcu',
    detail: '幻象大师昆汀·贝克(杰克·吉伦哈尔)。骗走伊迪丝;败亡前仍布下后手:伪造视频曝光彼得。' },
  { id: 'exposure', label: '身份曝光', sub: 'EXPOSED', x: 1030, y: 210, type: 'event', zone: 'mcu',
    detail: '詹姆森全网播出伪造视频:彼得·帕克就是蜘蛛侠。一切麻烦的起点。' },
  { id: 'jameson', label: '詹姆森', sub: 'J. JONAH JAMESON', x: 1180, y: 180, type: 'villain', zone: 'mcu',
    detail: '号角日报(在 MCU 是自媒体)掌门。J·K·西蒙斯跨宇宙出演同一角色,播出了那段曝光视频。' },
  { id: 'strange', label: '奇异博士', sub: 'DOCTOR STRANGE', x: 1030, y: 330, type: 'hero', zone: 'mcu',
    detail: '彼得的求助对象。第一次咒语因反复修改而失控;最终咒语让全世界遗忘彼得。' },
  { id: 'multiverse', label: '咒语失控', sub: 'MULTIVERSE BREACH', x: 730, y: 640, type: 'event', zone: 'mcu',
    detail: '失控的咒语把各宇宙「知道蜘蛛侠身份」的人拉进 MCU:五位老反派,与两位前辈蜘蛛侠。' },
  { id: 'three', label: '三蛛同框', sub: 'THREE SPIDEYS', x: 900, y: 580, type: 'event', zone: 'mcu',
    detail: '托比与安德鲁穿越而来,三位蜘蛛侠在自由女神像并肩作战,治愈五位反派;加菲接住了 MJ。' },
  { id: 'spell', label: '最终遗忘咒', sub: 'THE SPELL', x: 1150, y: 600, type: 'event', zone: 'mcu',
    detail: '修补宇宙的唯一办法:全世界——包括 MJ、内德、哈皮——彻底忘记「彼得·帕克」这个人。' },
  { id: 'mj', label: 'MJ', sub: 'MICHELLE JONES', x: 1010, y: 450, type: 'hero', zone: 'mcu',
    detail: '彼得的恋人(赞达亚)。咒语后不再记得他,有了新生活;彼得选择远远守望,不打扰。' },
  { id: 'ned', label: '内德', sub: 'NED LEEDS', x: 1160, y: 440, type: 'hero', zone: 'mcu',
    detail: '彼得最好的朋友(雅各布·巴塔隆),同样忘记了与彼得的一切。《崭新之日》中形同陌路。' },

  // ── 蜘蛛宇宙·动画(右上) ──
  { id: 'itsv', label: '平行宇宙', sub: '2018 · 动画', x: 1360, y: 100, type: 'film', zone: 'verse',
    detail: '奥斯卡最佳动画长片。小黑蛛迈尔斯登场,「任何人都可以戴上面具」。' },
  { id: 'atsv', label: '纵横宇宙', sub: '2023 · 动画', x: 1560, y: 100, type: 'film', zone: 'verse',
    detail: '织网宿命与命运之争,故事在最大悬念处戛然而止;终章《超越宇宙》定档 2027。' },
  { id: 'miles', label: '迈尔斯', sub: 'MILES MORALES', x: 1360, y: 210, type: 'hero', zone: 'verse',
    detail: '布鲁克林的非裔拉丁混血少年(沙梅克·摩尔配音)。隐身+生物电,拒绝认命的新一代蜘蛛侠。' },
  { id: 'gwenhero', label: '蜘蛛格温', sub: 'SPIDER-GWEN', x: 1560, y: 210, type: 'hero', zone: 'verse',
    detail: '65 号宇宙的格温·斯黛西(海莉·斯坦菲尔德配音),背负着她宇宙的彼得之死。' },
  { id: 'kingpin', label: '金并', sub: 'KINGPIN', x: 1360, y: 320, type: 'villain', zone: 'verse',
    detail: '用超级对撞机撕开平行宇宙,只为找回妻儿——动画线一切事件的起点。' },
  { id: 'spot', label: '斑点', sub: 'THE SPOT', x: 1560, y: 320, type: 'villain', zone: 'verse',
    detail: '对撞机事故的幸存者,从抢 ATM 的笑话升级为宇宙级威胁,视迈尔斯为造就自己的仇人。' },
  { id: 'miguel', label: '蜘蛛侠 2099', sub: 'MIGUEL O\'HARA', x: 1460, y: 410, type: 'villain', zone: 'verse',
    detail: '蜘蛛联盟领袖(奥斯卡·伊萨克配音),信奉「织网事件」宿命论,与迈尔斯理念对立。' },

  // ── 索尼衍生 + 崭新之日(右下) ──
  { id: 'venomssu', label: '毒液三部曲', sub: '2018–2024 · 索尼', x: 1330, y: 500, type: 'film', zone: 'ssu',
    detail: '汤姆·哈迪主演的独立宇宙,全球累计近 $19 亿;与 MCU 的联系仅限片尾彩蛋,看新片无需补。' },
  { id: 'symbiote', label: '共生体残留', sub: 'SYMBIOTE DROP', x: 1330, y: 610, type: 'item', zone: 'bnd',
    detail: '艾迪被送回索尼宇宙时,一小滴共生体留在了 MCU 的吧台上——悬而未决的伏笔。' },
  { id: 'banner', label: '布鲁斯·班纳', sub: 'BRUCE BANNER', x: 1440, y: 640, type: 'hero', zone: 'bnd',
    detail: '马克·鲁法洛。官方预告确认:能力失控的彼得向他求助——绿巨人首度加盟蜘蛛侠个人电影。' },
  { id: 'sink', label: '神秘新角色', sub: 'SADIE SINK', x: 1660, y: 620, type: 'hero', zone: 'bnd',
    detail: '《怪奇物语》主演萨迪·辛克加盟,角色官方保密——映前最大谜团。' },
  { id: 'punisher', label: '惩罚者', sub: 'THE PUNISHER', x: 1280, y: 730, type: 'villain', zone: 'bnd',
    detail: '弗兰克·卡斯特(乔·博恩瑟)。以暴制暴的反英雄,从剧集杀入大银幕,与蜘蛛侠理念对立。' },
  { id: 'tombstone', label: '墓碑', sub: 'TOMBSTONE', x: 1620, y: 700, type: 'villain', zone: 'bnd',
    detail: '朗尼·林肯(马文·琼斯三世)。动画《平行宇宙》配音→真人出演同一角色,街头黑帮头目。' },
  { id: 'bnd', label: '崭新之日', sub: 'BRAND NEW DAY · 2026', x: 1450, y: 860, type: 'future', zone: 'bnd',
    detail: '被遗忘四年后,彼得独自守护纽约,遭遇能力失控与街头反派。全新三部曲第一章——你要看的新片。' },
]

export const MAP_EDGES: MapEdge[] = [
  // 雷米宇宙
  { from: 'sm1', to: 'sm2', label: '原班人马' },
  { from: 'sm2', to: 'sm3', label: '三部曲终章' },
  { from: 'tobey', to: 'sm1', label: '主演' },
  { from: 'goblin', to: 'sm1', label: '初代宿敌' },
  { from: 'docock', to: 'sm2', label: '列车大战' },
  { from: 'sandman', to: 'sm3', label: '本叔真凶' },
  { from: 'brock', to: 'sm3', label: '共生体结合' },
  // 超凡宇宙
  { from: 'tasm1', to: 'tasm2', label: '续集' },
  { from: 'andrew', to: 'tasm1', label: '主演' },
  { from: 'gwen', to: 'tasm1', label: '相恋' },
  { from: 'lizard', to: 'tasm1', label: '康纳斯异化' },
  { from: 'electro', to: 'tasm2', label: '时代广场' },
  { from: 'gwen', to: 'tasm2', label: '钟楼永别' },
  // 跨宇宙收束到《英雄无归》
  { from: 'goblin', to: 'nwh', label: '跨宇宙回归' },
  { from: 'docock', to: 'nwh', label: '跨宇宙回归' },
  { from: 'sandman', to: 'nwh', label: '跨宇宙回归' },
  { from: 'lizard', to: 'nwh', label: '跨宇宙回归' },
  { from: 'electro', to: 'nwh', label: '跨宇宙回归' },
  { from: 'tobey', to: 'three', label: '前辈登场' },
  { from: 'andrew', to: 'three', label: '前辈登场' },
  // MCU 主线
  { from: 'tony', to: 'cw', label: '登门招募' },
  { from: 'cw', to: 'hc', label: '回归校园' },
  { from: 'hc', to: 'iweg', label: '加入复联' },
  { from: 'iweg', to: 'ffh', label: '托尼之死' },
  { from: 'ffh', to: 'nwh', label: '身份曝光' },
  { from: 'tony', to: 'peter', label: '导师与战衣' },
  { from: 'vulture', to: 'hc', label: '黑市军火商' },
  { from: 'hc', to: 'scorpion', label: '片尾彩蛋' },
  { from: 'vulture', to: 'scorpion', label: '狱中沉默' },
  { from: 'tony', to: 'edith', label: '身后遗物' },
  { from: 'edith', to: 'mysterio', label: '被骗走' },
  { from: 'mysterio', to: 'exposure', label: '伪造视频' },
  { from: 'jameson', to: 'exposure', label: '全网播出' },
  { from: 'exposure', to: 'peter', label: '生活崩塌' },
  { from: 'peter', to: 'strange', label: '求助' },
  { from: 'nwh', to: 'multiverse', label: '咒语失控' },
  { from: 'strange', to: 'multiverse', label: '施咒失控' },
  { from: 'multiverse', to: 'three', label: '引来前辈' },
  { from: 'goblin', to: 'may', label: '杀害' },
  { from: 'may', to: 'peter', label: '临终箴言' },
  { from: 'three', to: 'spell', label: '唯一解法' },
  { from: 'spell', to: 'mj', label: '遗忘' },
  { from: 'spell', to: 'ned', label: '遗忘' },
  // 蜘蛛宇宙
  { from: 'itsv', to: 'atsv', label: '续集' },
  { from: 'miles', to: 'itsv', label: '信仰之跃' },
  { from: 'gwenhero', to: 'itsv', label: '跨宇宙知己' },
  { from: 'kingpin', to: 'itsv', label: '对撞机' },
  { from: 'miles', to: 'atsv', label: '织网逃犯' },
  { from: 'spot', to: 'atsv', label: '从笑话到灾难' },
  { from: 'miguel', to: 'atsv', label: '织网宿命' },
  { from: 'itsv', to: 'tombstone', label: '同一演员' },
  // 收束:崭新之日
  { from: 'venomssu', to: 'symbiote', label: '片尾彩蛋' },
  { from: 'symbiote', to: 'bnd', label: '悬而未决' },
  { from: 'scorpion', to: 'bnd', label: '彩蛋回收' },
  { from: 'punisher', to: 'bnd', label: '对立登场' },
  { from: 'tombstone', to: 'bnd', label: '街头势力' },
  { from: 'banner', to: 'bnd', label: '求助对象' },
  { from: 'sink', to: 'bnd', label: '未公开角色' },
  { from: 'spell', to: 'bnd', label: '四年之后' },
]

// ── 伏笔红线墙 ──
export interface Thread {
  id: string
  plant: string   // 埋下处
  plantYear: string
  plantDesc: string
  payoff: string  // 回收处
  payoffYear: string
  payoffDesc: string
  status: 'done' | 'pending' | 'ongoing'
  title: string
}
export const THREADS: Thread[] = [
  {
    id: 'scorpion', title: '蝎子的 9 年蛰伏',
    plant: '英雄归来 · 片尾彩蛋', plantYear: '2017',
    plantDesc: '狱中,麦克·加根拦住秃鹫:「听说你知道蜘蛛侠是谁。」秃鹫否认离开,加根若有所思。',
    payoff: '崭新之日', payoffYear: '2026',
    payoffDesc: '迈克尔·曼多回归,蝎子正式成为本片对手——漫威埋了最久的一颗蜘蛛侠彩蛋。',
    status: 'done',
  },
  {
    id: 'symbiote', title: '吧台上的那滴共生体',
    plant: '英雄无归 · 片尾彩蛋', plantYear: '2021',
    plantDesc: '艾迪·布洛克与毒液被咒语送回自己的宇宙,离开时,一小滴共生体留在了 MCU 的吧台上。',
    payoff: '待回收', payoffYear: '未来某部',
    payoffDesc: 'MCU 版「黑衣蜘蛛侠」的火种已经埋下,官方尚未公布它何时发芽。看《崭新之日》时可以留意。',
    status: 'pending',
  },
  {
    id: 'jameson', title: '跨宇宙的詹姆森',
    plant: '雷米三部曲', plantYear: '2002–2007',
    plantDesc: 'J·K·西蒙斯饰演的号角日报主编,是漫改影史公认最完美的选角之一。',
    payoff: '英雄远征 · 片尾彩蛋', payoffYear: '2019',
    payoffDesc: '西蒙斯以同一角色空降 MCU(身份变成自媒体名嘴),并播出了那段曝光视频——影史罕见的「同演员、跨宇宙、同角色」。',
    status: 'done',
  },
  {
    id: 'gwen', title: '迟到十年的那一接',
    plant: '超凡蜘蛛侠 2', plantYear: '2014',
    plantDesc: '钟楼之上,加菲版彼得的蛛丝接住了坠落的格温,却没能救回她。他此后一蹶不振。',
    payoff: '英雄无归', payoffYear: '2021',
    payoffDesc: '自由女神像上,MJ 坠落——加菲版彼得纵身接住。救赎了自己,也哭崩了全场。',
    status: 'done',
  },
  {
    id: 'ben-quote', title: '那句名言的三次传承',
    plant: '蜘蛛侠', plantYear: '2002',
    plantDesc: '临终的本叔对托比版彼得说出「能力越大,责任越大」。漫画里,它最早出自 1962 年的旁白。',
    payoff: '英雄无归', payoffYear: '2021',
    payoffDesc: 'MCU 从未正面拍本叔——这句话由临终的梅婶说出,完成跨越 19 年的接力。',
    status: 'done',
  },
  {
    id: 'aaron', title: '迈尔斯的叔叔已在 MCU',
    plant: '英雄归来', plantYear: '2017',
    plantDesc: '唐纳德·格洛弗客串饰演亚伦·戴维斯——漫画中小黑蛛迈尔斯·莫拉莱斯的叔父,他还提到自己有个侄子。',
    payoff: '待回收', payoffYear: '未来某部',
    payoffDesc: '动画宇宙里的徘徊者亚伦已深入人心,MCU 版迈尔斯何时登场,是粉丝最大的悬念之一。',
    status: 'pending',
  },
  {
    id: 'edith', title: '伊迪丝,来自坟墓的礼物',
    plant: '英雄远征', plantYear: '2019',
    plantDesc: '托尼留下的眼镜 EDITH,既是遗产也是诱饵,直接引发神秘客骗局与身份曝光。',
    payoff: '英雄无归 · 结局', payoffYear: '2021',
    payoffDesc: '遗忘咒后,彼得失去全部斯塔克科技与人脉。钢铁侠时代留给他的东西,一件不剩——故事回到街头。',
    status: 'done',
  },
  {
    id: 'tombstone', title: '墓碑:从配音到真人',
    plant: '平行宇宙(动画)', plantYear: '2018',
    plantDesc: '马文·琼斯三世为金并的打手「墓碑」配音,声线令人过目不忘。',
    payoff: '崭新之日', payoffYear: '2026',
    payoffDesc: '同一演员在真人电影中亲自出演墓碑——动画与真人之间的又一次奇妙接力。',
    status: 'done',
  },
]

// ── 设定百科 ──
export interface LoreItem { title: string; en: string; desc: string }
export const LORE: LoreItem[] = [
  { title: '蜘蛛感应', en: 'SPIDER-SENSE',
    desc: '彼得对危险的第六感预警,漫画中以头部「蛛网纹」表现。电影里它是《英雄远征》决战破局的关键;《崭新之日》官方预告中,彼得的能力出现不稳定的「周期」,蜘蛛感应正是焦点之一。' },
  { title: '蛛丝到底从哪来', en: 'WEBS: ORGANIC vs SHOOTERS',
    desc: '漫画原作设定是彼得自制的「蛛丝发射器」。托比版改成体内变异直接吐丝(有机蛛丝);加菲版与荷兰弟版回归发射器。《英雄无归》三蛛同框时,这段差异成了官方玩梗的素材。' },
  { title: '战衣进化史', en: 'SUIT EVOLUTION',
    desc: '托比:摔跤服→经典战衣→共生体黑衣。加菲:自制紧身衣。荷兰弟:自制卫衣→斯塔克战衣→钢铁蜘蛛→红黑升级战衣→《英雄无归》结尾回归手工缝制的红蓝战衣;《崭新之日》官方已公布又一套全新战衣。' },
  { title: '伊迪丝(EDITH)', en: 'EVEN DEAD, I\'M THE HERO',
    desc: '托尼·斯塔克留给彼得的眼镜:「即使我死了,我也是英雄」。它接入斯塔克工业的卫星与无人机网络——这份信任被神秘客骗走,直接导致了身份曝光。遗忘咒后,彼得已失去全部此类科技。' },
  { title: '真人版多元宇宙的规则', en: 'MULTIVERSE RULES',
    desc: '《英雄无归》的机制:奇异博士的咒语会把「知道彼得·帕克是蜘蛛侠」的存在,从各个宇宙拉来 MCU。因此来的都是历代反派与两位蜘蛛侠;而《奇异博士 2》进一步展示了宇宙间的穿行与「入侵」风险。' },
  { title: '遗忘咒意味着什么', en: 'THE FORGETTING',
    desc: '最终咒语抹去的不是「蜘蛛侠的秘密身份」,而是「彼得·帕克」这个人的存在本身:MJ、内德、哈皮、全世界都不再认识他。彼得保留全部记忆——他记得所有人,只是没人记得他。这是新片一切情绪的根基。' },
  { title: '共生体', en: 'SYMBIOTE',
    desc: '来自外星的黑色活体,放大宿主的情绪与欲望。2007 年《蜘蛛侠 3》首登银幕(黑衣彼得),后与记者艾迪·布洛克结合成为毒液。索尼以毒液为主角拍了三部曲;《英雄无归》彩蛋把一滴共生体留在了 MCU。' },
  { title: '索尼与漫威的版权博弈', en: 'RIGHTS HISTORY',
    desc: '1999 年,濒临破产的漫威把蜘蛛侠电影版权卖给索尼,协议要求索尼持续定期推出新片。2015 年双方达成共享协议,蜘蛛侠得以「借住」MCU;2019 年一度谈崩,在巨大声浪中续约,才有了《英雄无归》与《崭新之日》。' },
  { title: '号角日报与詹姆森', en: 'THE DAILY BUGLE',
    desc: '蜘蛛侠的「头号黑粉」机构。雷米三部曲里是报纸,MCU 里变成了阴谋论自媒体——不变的是 J·乔纳·詹姆森几十年如一日地抹黑蜘蛛侠,以及 J·K·西蒙斯跨宇宙的传奇连任。' },
  { title: '「织网事件」:动画的宿命论', en: 'CANON EVENTS',
    desc: '《纵横宇宙》提出的设定:每个宇宙的蜘蛛侠都必须经历失去至亲的「正典节点」,否则宇宙会崩坏。迈尔斯拒绝接受宿命,对抗整个蜘蛛联盟——这是动画线的核心冲突,与真人电影的「牺牲」主题互为镜像。' },
  { title: '险恶六人组', en: 'SINISTER SIX',
    desc: '漫画中蜘蛛侠反派组成的经典联盟。《超凡蜘蛛侠 2》片尾曾为其铺垫(随系列夭折);《英雄无归》聚齐五位多元宇宙反派,被粉丝称为「只差一位的六人组」。' },
  { title: '皇后区:一切的主场', en: 'QUEENS, NEW YORK',
    desc: '彼得·帕克的老家,纽约最市井的区。「友好邻居蜘蛛侠」的定位就扎根于此:他不是守护宇宙的神明,而是帮你找猫、拦抢匪的街坊。《崭新之日》回归街头,意味着回到皇后区。' },
]
