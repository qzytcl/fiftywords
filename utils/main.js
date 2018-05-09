var Util = {

  /**
   * 公历转化为积日（积日：1900年1月0日到当天的天数
   * @param year  年份
   * @param month 月份
   * @param day   日期
   * @returns {number}
   * @private
   */
  _gregorianCalendarToAccumulateDate: function (year, month, day) {
    var accumulateDate = 0;
    accumulateDate += (year - 1900) * 365;  //假设每年365天，计算天数
    accumulateDate += parseInt((year - 1901) / 4);  //将闰年数累加计数
    for (var eachMonth = month - 1; eachMonth > 0; eachMonth--) {
      accumulateDate += (new Date(year, eachMonth, 0)).getDate();  //累加当年各月天数
    }
    accumulateDate += day;  //累加最后一月天数
    return accumulateDate;  //返回公历日期对应积日
  },
  /**
   * 计算积日的农历日期
   * @param accumulateDate
   * @returns {number}
   * @private
   */
  _getLunarDate: function (accumulateDate) {
    //逆推估算是第几个朔日
    var reverseCalends = parseInt((accumulateDate - 1.6) / 29.5306);
    var calends = reverseCalends - 1;
    do {
      calends++;
      //计算朔日积日
      var calendsAccumulateDate = parseInt(1.6 + 29.5306 * calends + 0.4 * Math.sin(1 - 0.45058 * calends));
      var solarTermDate = accumulateDate - calendsAccumulateDate + 1;
    } while (solarTermDate >= 30);
    //下一个朔日在当天的次日，当月即为大月，当日为农历三十
    if (solarTermDate === 0)
      return 30;
    else
      return solarTermDate;
  },
  /**
   * 计算某年某个节气的积日（公式）
   * @param differenceYear
   * @param solarTermSerialNumber
   * @returns {Number}
   * @private
   */
  _getSolarTermAccumulateDate: function (differenceYear, solarTermSerialNumber) {
    var solarTermAccumulateDate = parseInt(365.242 * differenceYear + 6.2 + 15.22 * solarTermSerialNumber - 1.9 * Math.sin(0.262 * solarTermSerialNumber));
    return solarTermAccumulateDate;
  },
  /**
   * 获取农历日期
   * @param year
   * @param month
   * @param day
   * @returns {{month: string, date: string, solarTerm: string, festival: *}}
   */
  getLunarCalendar: function (year, month, day) {
    //常量数组
    var monthName = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "腊月"];
    var dateName = ["十", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var datePrefixName = ["初", "十", "廿", "三"];
    var solarTermName = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "露水", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
    var festivalName = {
      "0101": "春节",
      "0115": "元宵",
      "0202": "龙头",
      "0505": "端午",
      "0707": "七夕",
      "0715": "中元",
      "0815": "中秋",
      "0909": "重阳",
      "1001": "寒衣",
      "1015": "下元",
      "1208": "腊八",
      "1223": "小年",
      "1230": "除夕"
    };
    var festivalName2 = {
      "0405": "清明",
      "0501": "劳动",
      "1001": "国庆"
    };

    var differenceYear = year - 1900;  //年份距1900年差值
    var solarTermSerialNumber = month * 2 - 1;  //节气序号
    var lunarCalendarMonth = (month - 1 + 12) % 12;  //理论农历月份
    var accumulateDate = Util._gregorianCalendarToAccumulateDate(year, month, day);  //计算当前日期积日
    var lunarDate = Util._getLunarDate(accumulateDate);  //计算农历日期

    //计算前一个月、当月、后一个月、前半个月以及后半个月的节气日期(STLD)和节气积日(STAD)
    var curSTLD = Util._getLunarDate(Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber));
    var prevSTLD = Util._getLunarDate(Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber - 2));
    var nextSTLD = Util._getLunarDate(Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber + 2));
    var halfPrevSTLD = Util._getLunarDate(Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber - 1));
    var halfNextSTLD = Util._getLunarDate(Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber + 1));
    var curSTAD = Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber);
    var prevSTAD = Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber - 2);
    var nextSTAD = Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber + 2);
    var halfPrevSTAD = Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber - 1);
    var halfNextSTAD = Util._getSolarTermAccumulateDate(differenceYear, solarTermSerialNumber + 1);

    //通过节气日期判断闰月情况，调整月份
    if (accumulateDate < curSTAD && lunarDate + curSTAD - accumulateDate !== curSTLD)
      lunarCalendarMonth--;
    else if (accumulateDate > curSTAD && lunarDate - (accumulateDate - curSTAD) !== curSTLD && lunarDate + nextSTLD - accumulateDate === nextSTAD)
      lunarCalendarMonth++;

    //判断是否是节气
    if (curSTAD === accumulateDate)
      var solarTerm = solarTermName[solarTermSerialNumber];
    else if (halfPrevSTAD === accumulateDate)
      var solarTerm = solarTermName[solarTermSerialNumber - 1];
    else if (halfNextSTAD === accumulateDate)
      var solarTerm = solarTermName[solarTermSerialNumber + 1];

    //计算是否节日
    var monthNumber = lunarCalendarMonth;
    if (monthNumber < 10)
      var festivalNumber = "0" + monthNumber;
    else
      var festivalNumber = monthNumber;
    if (lunarDate < 10)
      festivalNumber += "0" + lunarDate;
    else
      festivalNumber += lunarDate;  //拼接字符串
    
    var festivalString = festivalName[festivalNumber];  //调用节日
    if(!festivalString) {
      if (month < 10) {
        var festivalNumber2 = "0" + month
      } else {
        var festivalNumber2 = month
      }
      if (day < 10) {
        festivalNumber2 += "0" + day;
      } else {
        festivalNumber2 += day;
      }
      festivalString = festivalName2[festivalName2];
    }
    //计算农历名称
    var monthString = monthName[(monthNumber + 11) % 12];  //月份名称
    var prefix = parseInt((lunarDate - 1) / 10);
    if (lunarDate === 20 || lunarDate === 30)
      var dateString = datePrefixName[prefix + 1];
    else
      var dateString = datePrefixName[prefix];
    dateString += dateName[lunarDate % 10];  //日期名称

    //返回结果
    var result = {
      'month': monthString,
      'date': dateString,
      'solarTerm': solarTerm,
      'festival': festivalString
    };
    return result;
  },
  /**
   * 判断年份干支
   * @param year 公历年份
   * @returns {string} 返回干支
   */
  getSexagenaryCycle: function (year) {

    //常量数组
    var heavenlyStems = ["癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬"];
    var earthlyBranches = ["亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌"];

    //计算与1963年的差值(1964年为甲子年)
    var yearSerialNumber = year - 1863;

    //拼接该年干支
    var sexagenaryCycle = heavenlyStems[yearSerialNumber % 10];
    sexagenaryCycle += earthlyBranches[yearSerialNumber % 12];
    sexagenaryCycle += "年";
    return sexagenaryCycle;
  },
  /**
   * 获取生肖年份
   * @param year
   * @returns {string}
   */
  getZodiac: function (year) {
    //常量数组
    var zodiacName = ["猪年", "鼠年", "牛年", "虎年", "兔年", "龙年", "蛇年", "马年", "羊年", "猴年", "鸡年", "狗年"];

    //计算与1963年的差值(1964年为甲子年)
    var yearSerialNumber = year - 1863;

    return zodiacName[yearSerialNumber % 12];
  },
  /**
   * 玄学啊,获取禁忌事情
   * @param year
   * @param month
   * @param day
   * @returns {{suit: string, taboo: string}}
   */
  getSuitAndTaboo: function (year, month, day) {

    var suit = ["开光", "嫁娶", "入宅", "上梁", "祭祀", "出行", "作灶", "破土", "订盟", "祈福"];
    var taboo = ["纳采", "冠笄", "竖柱", "掘井", "伐木", "理发", "交易", "探病", "雕刻", "斋醮"];

    var dateString = parseInt((year * month * day) % 1025).toString(2);
    var len = dateString.length;
    if (len < 10)
      for (; len < 10; len++)
        dateString = "0" + dateString;
    dateString = dateString.split("").reverse().join("");
    var dateNum = parseInt(dateString, 2);
    var suitResult = [];
    var tabooResult = [];

    for (var i = 0; i < 10; i++) {
      if (dateNum % 2)
        suitResult.push(taboo[i]);
      else
        tabooResult.push(suit[i]);
      dateNum = parseInt(dateNum / 2);
    }

    var suitString = suitResult;
    var tabooString = tabooResult;
    var result = {
      'suit': suitString,
      'taboo': tabooString
    }
    return result;
  }
};
module.exports = {
  Util: Util
};