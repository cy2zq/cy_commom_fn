/*
 *@params startDate 开始时间
 *@params endDate 结束时间
 *@params timeUnit 时间间隔,注意是毫秒数
 * eg:createTimeUnitListByTimeRange('2024-03-01','2024-03-10',86400000)
 **/
const createTimeUnitListByTimeRange = (startDate, endDate, timeUnit) => {
  let startSeconds = new Date(startDate).getTime();
  let endSeconds = new Date(endDate).getTime();
  // 必须用计算机初始时间的时间戳来作为基准点，否则时区会影响初始时间戳毫秒数
  let base = new Date("1970-01-01 00:00:00").getTime();
  let rangeTimeUnitList = [];
  let firstDegree;

  // 第一个刻度，可能刚好在你需要的整点刻度上，如果不在整点上，减去多余的部分，往前推一个刻度。
  // 此处就是减掉基准时间戳再执行整除操作，否则如果以天为刻度，整除86400000，得到的第一个刻度会是包含时区的时间，如北京时间：2020-09-10 08：00：00
  firstDegree = startSeconds - ((startSeconds - base) % timeUnit);

  rangeTimeUnitList.push(firstDegree);

  // 当最后一个刻度大于截止时间，停止创建刻度数据
  while (firstDegree < endSeconds) {
    firstDegree += timeUnit;
    rangeTimeUnitList.push(firstDegree);
  }

  return rangeTimeUnitList;
};

module.exports = {
  createTimeUnitListByTimeRange,
};
