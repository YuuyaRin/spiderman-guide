// ─────────────────────────────────────────────────────────────
// 影片资料库 · 数据均经公开票房与官方信息核实(Box Office Mojo / 索尼 / 漫威)
// 票房为全球累计(美元),约数标注 ~;无关键剧透,详见「速通英雄无归」区
// ─────────────────────────────────────────────────────────────

export type EraKey = 'raimi' | 'webb' | 'mcu' | 'verse' | 'bnd'

export interface Film {
  id: string
  year: number
  release: string        // 上映信息
  cn: string
  en: string
  era: EraKey
  kind: 'solo' | 'crossover' | 'animation'
  director: string
  cast: string           // 核心阵容
  villain: string        // 主要对手
  boxOffice: string      // 全球票房
  runtime?: string
  gist: string           // 一句话定位(无剧透)
  synopsis: string       // 梗概(老片含既定剧情)
  link: string           // 与《崭新之日》/主线的连接
  need: 1 | 2 | 3 | 4 | 5 // 看《崭新之日》前的必要度
  needNote: string
}

export const ERA_META: Record<EraKey, { label: string; en: string; color: string; bg: string }> = {
  raimi: { label: '雷米三部曲', en: 'RAIMI ERA', color: '#e8292e', bg: 'rgba(232,41,46,.14)' },
  webb:  { label: '超凡系列',   en: 'WEBB ERA',  color: '#f59a2e', bg: 'rgba(245,154,46,.14)' },
  mcu:   { label: '漫威宇宙',   en: 'MCU ERA',   color: '#d42a55', bg: 'rgba(212,42,85,.14)' },
  verse: { label: '蜘蛛宇宙(动画)', en: 'SPIDER-VERSE', color: '#ff2ea6', bg: 'rgba(255,46,166,.14)' },
  bnd:   { label: '崭新之日',   en: 'BRAND NEW DAY', color: '#ffd23e', bg: 'rgba(255,210,62,.14)' },
}

export const FILMS: Film[] = [
  {
    id: 'sm1', year: 2002, release: '2002-05-03 北美',
    cn: '蜘蛛侠', en: 'Spider-Man',
    era: 'raimi', kind: 'solo',
    director: '山姆·雷米', cast: '托比·马奎尔 / 克斯汀·邓斯特 / 威廉·达福',
    villain: '绿魔(诺曼·奥斯本)', boxOffice: '$825M',
    gist: '一切的开始:被蜘蛛咬了一口的书呆子,学会了「能力越大,责任越大」。',
    synopsis: '高中生彼得·帕克被基因改造蜘蛛咬伤后获得超凡能力。起初他想用能力赚钱,却因一次袖手旁观害本叔遇害,从此立下誓言成为蜘蛛侠。与此同时,好友哈利之父、企业家诺曼·奥斯本在实验副作用下化身绿魔,向彼得最珍视的人伸出魔爪。',
    link: '绿魔、号角日报、J·K·西蒙斯版詹姆森——这些《英雄无归》的多元宇宙来客,老家都在这里。',
    need: 3, needNote: '没看过也能懂新片,但《英雄无归》的情怀暴击会打折',
  },
  {
    id: 'sm2', year: 2004, release: '2004-06-30 北美',
    cn: '蜘蛛侠 2', en: 'Spider-Man 2',
    era: 'raimi', kind: 'solo',
    director: '山姆·雷米', cast: '托比·马奎尔 / 克斯汀·邓斯特 / 阿尔弗雷德·莫里纳',
    villain: '章鱼博士(奥托·奥克塔维斯)', boxOffice: '$789M',
    gist: '公认的超英电影标杆:英雄也会累,也想把战衣扔进垃圾桶。',
    synopsis: '双重生活压垮了彼得:学业、打工、爱情全面告急,超能力也开始失灵。他一度放弃蜘蛛侠身份,而核聚变实验事故把科学家奥托·奥克塔维斯变成了被机械触手操控的章鱼博士。列车大战成为影史名场面。',
    link: '章鱼博士是《英雄无归》中戏份最重的回归反派,莫里纳原班出演。',
    need: 3, needNote: '为《英雄无归》的章鱼博士而来,本身也绝对值得',
  },
  {
    id: 'sm3', year: 2007, release: '2007-05-04 北美',
    cn: '蜘蛛侠 3', en: 'Spider-Man 3',
    era: 'raimi', kind: 'solo',
    director: '山姆·雷米', cast: '托比·马奎尔 / 托弗·戈瑞斯 / 托马斯·哈登·丘奇',
    villain: '毒液 / 沙人 / 小绿魔(哈利)', boxOffice: '$895M',
    gist: '黑蜘蛛战衣登场:当复仇吞噬彼得,最大的反派是他自己。',
    synopsis: '外星共生体附身蜘蛛侠,放大彼得的愤怒与傲慢;杀害本叔的真凶沙人现身,哈利为父报仇化身小绿魔,摄影师艾迪·布洛克与共生体结合成为毒液。三条反派线索汇入一场沙暴决战。',
    link: '沙人与毒液(共生体)设定,正是后来《英雄无归》和毒液系列彩蛋的源头。',
    need: 2, needNote: '可快进了解,知道沙人、毒液、哈利的结局即可',
  },
  {
    id: 'tasm1', year: 2012, release: '2012-07-03 北美',
    cn: '超凡蜘蛛侠', en: 'The Amazing Spider-Man',
    era: 'webb', kind: 'solo',
    director: '马克·韦布', cast: '安德鲁·加菲尔德 / 艾玛·斯通 / 瑞斯·伊凡斯',
    villain: '蜥蜴人(科特·康纳斯)', boxOffice: '$758M',
    gist: '重启之作:更忧郁的彼得,更灵的蛛丝发射器,还有格温·斯黛西。',
    synopsis: '彼得追查父母失踪之谜,潜入奥斯本公司时被蜘蛛咬伤。他一面与警监之女格温·斯黛西相恋,一面阻止康纳斯博士把全城变成蜥蜴的疯狂计划。这一版彼得更擅长科学,自制蛛丝发射器。',
    link: '蜥蜴人将在《英雄无归》回归;加菲尔德版彼得的成长弧线在此起步。',
    need: 2, needNote: '非必需,但能补齐超凡蛛的完整弧线',
  },
  {
    id: 'tasm2', year: 2014, release: '2014-05-02 北美',
    cn: '超凡蜘蛛侠 2', en: 'The Amazing Spider-Man 2',
    era: 'webb', kind: 'solo',
    director: '马克·韦布', cast: '安德鲁·加菲尔德 / 艾玛·斯通 / 杰米·福克斯 / 戴恩·德哈恩',
    villain: '电光人 / 绿魔(哈利·奥斯本) / 犀牛人', boxOffice: '$709M',
    gist: '格温之死:超英电影史上最痛的一次「没有接住」。',
    synopsis: '电光人麦克斯意外诞生,哈利·奥斯本因家族遗传病黑化为绿魔。钟楼一役,格温坠落,彼得没能救下挚爱——这场悲剧成为加菲版蜘蛛侠永远的伤口。票房不及预期,系列就此终止,直接促成索尼与漫威的联手。',
    link: '《英雄无归》中自由女神像上的那一接,是这位蜘蛛侠迟到十年的救赎。',
    need: 3, needNote: '想看懂《英雄无归》最催泪的一幕,就补它',
  },
  {
    id: 'cw', year: 2016, release: '2016-05-06 北美 / 内地同步',
    cn: '美国队长 3:内战', en: 'Captain America: Civil War',
    era: 'mcu', kind: 'crossover',
    director: '罗素兄弟', cast: '汤姆·赫兰德(首秀) / 小罗伯特·唐尼 / 克里斯·埃文斯',
    villain: '泽莫男爵(复仇者内部分裂)', boxOffice: '$1,153M',
    gist: '荷兰弟版蜘蛛侠首秀:被钢铁侠招募进机场大战的话痨少年。',
    synopsis: '复仇者联盟因「索科维亚协议」分裂为两派。托尼·斯塔克造访皇后区,把高中生彼得·帕克带去德国参与机场大战。新版蜘蛛侠年轻、话痨、战衣由斯塔克打造,从此正式进入漫威电影宇宙。',
    link: 'MCU 蛛的起点:钢铁侠成为彼得的导师,这条师徒线贯穿到《英雄无归》。',
    need: 3, needNote: '知道「钢铁侠招募了小蜘蛛」即可,正片可后补',
  },
  {
    id: 'hc', year: 2017, release: '2017-07-07 北美 / 09-08 内地',
    cn: '蜘蛛侠:英雄归来', en: 'Spider-Man: Homecoming',
    era: 'mcu', kind: 'solo',
    director: '乔恩·沃茨', cast: '汤姆·赫兰德 / 迈克尔·基顿 / 赞达亚 / 雅各布·巴塔隆',
    villain: '秃鹫(艾德里安·图姆斯)', boxOffice: '$880M',
    gist: ' friendly neighborhood:不做救世主,先做皇后区的好邻居。',
    synopsis: '内战归来,彼得渴望证明自己配得上复联,却在追查外星武器黑市时发现:幕后主使秃鹫,竟是暗恋对象丽兹的父亲。最终他拒绝加入复联,选择从基层做起。MJ、内德、哈皮、梅婶(玛丽莎·托梅)组成的青春班底在此集齐。',
    link: '《崭新之日》反派蝎子(麦克·加根)首次登场于本片;秃鹫与蝎子的狱中对话是重要伏笔。',
    need: 4, needNote: 'MCU 蛛三部曲第一块拼图,强烈建议观看',
  },
  {
    id: 'iw', year: 2018, release: '2018-04-27 北美 / 05-11 内地',
    cn: '复仇者联盟 3:无限战争', en: 'Avengers: Infinity War',
    era: 'mcu', kind: 'crossover',
    director: '罗素兄弟', cast: '汤姆·赫兰德 / 小罗伯特·唐尼 / 本尼迪克特·康伯巴奇',
    villain: '灭霸', boxOffice: '$2,048M',
    gist: '「斯塔克先生,我感觉不太好。」——小蜘蛛化灰,全影院心碎。',
    synopsis: '灭霸集齐无限宝石,一个响指抹去宇宙半数生命。彼得在泰坦星奋战后被授予复联成员身份,却最终在托尼怀中灰飞烟灭。',
    link: '奇异博士与彼得并肩作战的情谊,是《英雄无归》两人联手的铺垫。',
    need: 2, needNote: '对《崭新之日》非必需,了解「化灰五年」设定即可',
  },
  {
    id: 'eg', year: 2019, release: '2019-04-26 北美 / 04-24 内地',
    cn: '复仇者联盟 4:终局之战', en: 'Avengers: Endgame',
    era: 'mcu', kind: 'crossover',
    director: '罗素兄弟', cast: '汤姆·赫兰德 / 小罗伯特·唐尼',
    villain: '灭霸(过去时空)', boxOffice: '$2,799M',
    gist: '化灰者归来,钢铁侠落幕——彼得失去了导师。',
    synopsis: '幸存的复仇者穿越时空逆转响指,化灰的彼得随大军回归参战。终局之战以钢铁侠的牺牲告终,彼得失去了人生导师,也为《英雄远征》的「后托尼时代」拉开序幕。',
    link: '托尼之死是《英雄远征》的核心情绪起点。',
    need: 2, needNote: '知道结局即可,时间紧张可跳过',
  },
  {
    id: 'ffh', year: 2019, release: '2019-07-02 北美 / 06-28 内地',
    cn: '蜘蛛侠:英雄远征', en: 'Spider-Man: Far From Home',
    era: 'mcu', kind: 'solo',
    director: '乔恩·沃茨', cast: '汤姆·赫兰德 / 杰克·吉伦哈尔 / 赞达亚 / 塞缪尔·杰克逊',
    villain: '神秘客(昆汀·贝克)', boxOffice: '$1,132M',
    gist: '幻象大师骗走了钢铁侠的遗产,并在片尾向全世界曝光了彼得的身份。',
    synopsis: '欧洲游学之旅被「元素众」袭击打乱,自称来自平行宇宙的神秘客骗取彼得信任,套走了斯塔克遗留的「伊迪丝」眼镜。彼得识破无人机幻象骗局后获胜,却在片尾彩蛋中被神秘客剪辑的假视频诬陷为凶手,真名被公之于众。',
    link: '身份曝光 =《英雄无归》的直接开端;本片是 MCU 蛛承上启下的枢纽。',
    need: 4, needNote: '必看,至少要看片尾彩蛋',
  },
  {
    id: 'nwh', year: 2021, release: '2021-12-17 北美',
    cn: '蜘蛛侠:英雄无归', en: 'Spider-Man: No Way Home',
    era: 'mcu', kind: 'solo',
    director: '乔恩·沃茨', cast: '汤姆·赫兰德 / 赞达亚 / 本尼迪克特·康伯巴奇 / 托比·马奎尔 / 安德鲁·加菲尔德',
    villain: '绿魔 / 章鱼博士 / 电光人 / 蜥蜴人 / 沙人(多元宇宙)', boxOffice: '$1,911M',
    gist: '三代蜘蛛侠同框。为了修复一切,彼得选择让全世界忘记自己。',
    synopsis: '身份曝光后生活崩塌,彼得求奇异博士施法让世人忘记秘密,咒语失控撕开了多元宇宙——历代反派与两位「前辈蜘蛛侠」涌入。梅婶之死让彼得领悟「能力越大,责任越大」;最终他选择让全世界彻底遗忘彼得·帕克,孤身一人重新开始。',
    link: '《崭新之日》的故事,正是从这片「无人记得我」的废墟上开始。',
    need: 5, needNote: '看《崭新之日》前的绝对必修课',
  },
  {
    id: 'itsv', year: 2018, release: '2018-12-14 北美 / 12-21 内地',
    cn: '蜘蛛侠:平行宇宙', en: 'Spider-Man: Into the Spider-Verse',
    era: 'verse', kind: 'animation',
    director: '鲍勃·佩尔西凯蒂 / 彼得·拉姆齐 / 罗德尼·罗斯曼',
    cast: '沙梅克·摩尔 / 海莉·斯坦菲尔德 / 杰克·约翰逊(配音)',
    villain: '金并', boxOffice: '$384M',
    gist: '奥斯卡最佳动画长片:小黑蛛迈尔斯·莫拉莱斯登场,漫画美学天花板。',
    synopsis: '布鲁克林少年迈尔斯被放射性蜘蛛咬伤,目睹本宇宙的彼得·帕克战死。金并的对撞机撕裂平行宇宙,把中年彼得·B·帕克、蜘蛛格温、蜘猪侠等「蜘蛛人」卷入迈尔斯的世界。迈尔斯完成「信仰之跃」,接过蜘蛛侠的衣钵。',
    link: '多元宇宙玩法的动画版教科书;墓碑( Tombstone )配音演员马文·琼斯三世,将在《崭新之日》真人出演同一角色。',
    need: 2, needNote: '与真人主线独立,但作为「多元宇宙」入门极佳',
  },
  {
    id: 'atsv', year: 2023, release: '2023-06-02 北美 / 内地同步',
    cn: '蜘蛛侠:纵横宇宙', en: 'Spider-Man: Across the Spider-Verse',
    era: 'verse', kind: 'animation',
    director: '乔伊姆·多斯·桑托斯 / 凯普·鲍尔斯 / 贾斯汀·汤普森',
    cast: '沙梅克·摩尔 / 海莉·斯坦菲尔德 / 奥斯卡·伊萨克(配音)',
    villain: '斑点 / 蜘蛛侠 2099(米格尔·奥哈拉)', boxOffice: '$690M',
    gist: '「织网事件」与命运之争:迈尔斯对抗整个蜘蛛联盟。',
    synopsis: '迈尔斯与格温穿越多重宇宙,遇见蜘蛛侠 2099 领导的蜘蛛联盟,得知「每个蜘蛛侠都必须失去至亲」的织网宿命论。迈尔斯拒绝认命,却误入 42 号宇宙,撞上成为徘徊者的另一个自己。故事在最大悬念处戛然而止。',
    link: '终章《蜘蛛侠:超越宇宙》已定档 2027-06-04(北美)。',
    need: 1, needNote: '动画独立线,与《崭新之日》无直接关联',
  },
  {
    id: 'bnd', year: 2026, release: '2026-07-31 北美 / 07-29 中国内地领先全球上映',
    cn: '蜘蛛侠:崭新之日', en: 'Spider-Man: Brand New Day',
    era: 'bnd', kind: 'solo',
    director: '德斯汀·丹尼尔·克雷顿(《尚气》)',
    cast: '汤姆·赫兰德 / 赞达亚 / 雅各布·巴塔隆 / 萨迪·辛克 / 马克·鲁法洛 / 乔·博恩瑟 / 迈克尔·曼多',
    villain: '蝎子 / 墓碑 / 惩罚者(对立登场)等街头势力', boxOffice: '热映中',
    gist: '被世界遗忘四年后,彼得·帕克独自守护纽约——全新三部曲的第一章。',
    synopsis: '承接《英雄无归》结局:全世界(包括 MJ 与内德)都不再记得彼得·帕克。失去斯塔克科技与后援的他,以「全职好邻居」身份独自战斗,却面临身体异变与街头反派的双重危机。官方将其定位为全新三部曲的开端。',
    link: '本站的全部意义:看完前面,坐进影院。',
    need: 5, needNote: '这就是你要看的那部电影',
  },
]

// 观众路径 → 推荐片单
export interface WatchPath {
  id: string
  title: string
  en: string
  desc: string
  time: string
  films: string[]  // film ids
}

export const WATCH_PATHS: WatchPath[] = [
  {
    id: 'express', title: '极速补课', en: '2-MOVIE EXPRESS',
    desc: '完全没看过?只补两部核心,刚好接上《崭新之日》。',
    time: '≈ 4.5 小时', films: ['hc', 'nwh'],
  },
  {
    id: 'standard', title: '稳扎稳打', en: 'MCU TRACK',
    desc: '看完 MCU 蛛完整弧线,导师、身份曝光、遗忘咒全部吃透。',
    time: '≈ 10 小时', films: ['cw', 'hc', 'ffh', 'nwh'],
  },
  {
    id: 'full', title: '全网补完', en: 'FULL WEB-HEAD',
    desc: '三代全系列 + 动画双璧,每一滴情怀都不放过。',
    time: '≈ 22 小时', films: ['sm1', 'sm2', 'sm3', 'tasm1', 'tasm2', 'cw', 'hc', 'iw', 'eg', 'ffh', 'nwh', 'itsv', 'atsv'],
  },
]
