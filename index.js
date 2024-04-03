const { createTimeUnitListByTimeRange } = require("./other");
/*
 * $param 数组 属性（数值） 规则：默认asc，
 * @return
 * @desc  数组按照某属性排序-默认由小到大-升序
 * */
const arrSortByAttribute = (arr, attribute = "value", sortType = "asc") =>
  arr
    .sort((a, b) => {
      let attrA = parseFloat(a?.[attribute]) || 0;
      let attrB = parseFloat(b?.[attribute]) || 0;
      if (sortType === "desc") {
        return attrB - attrA;
      } else {
        return attrA - attrB;
      }
    })
    ?.map((item, index) => {
      let sortAttr = attribute + "Sort";
      return {
        ...item,
        [sortAttr]: index + 1,
      };
    });
/*
 * $param
 * @return
 * @desc   去重:目标数组，根据什么去重
 * eg:     uniqueFun(list, "price")
 * */
//
const uniqueFun = (arr, sx) => {
  let obj = {};
  let peon = arr.reduce((cur, next) => {
    obj[next[sx]] ? "" : (obj[next[sx]] = true && cur.push(next));
    return cur;
  }, []);
  return peon;
};

/*
 * $param 数组,options
 * @return
 * @desc 不存在为0-负数和空值，或者提前过滤到空值；
 * eg:transformArr(list, {
    attribute: "num",
    optType: "sort", //sum求和，sort排序，unique去重
    sortType: "desc",
  })
 * */
let list = [
  {
    num: 1,
  },
  {
    num: 2,
    price: 10,
  },
  {
    num: 3,
    price: 10,
  },
  {
    num: 4,
    price: 10,
  },
];
const transformArr = (arr, { attribute, optType, sortType }) => {
  /*
   * 求和-某属性
   * */
  if (optType === "sum") {
    return arr.reduce((sum, obj) => (sum += obj?.[attribute] || 0), 0);
  }
  /*
   * 排序-某属性
   * */
  if (optType === "sort") {
    return arrSortByAttribute(arr, attribute, sortType);
  }
  /*
   * 去重-某属性
   * */
  if (optType === "unique") {
    return uniqueFun(arr, attribute);
  }
};

/*
 * $param 随机生成两个值之间的整数
 * @return
 * @desc
 * eg:getRandomInt(100, -100)
 * */
const getRandomInt = (min, max) => {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*
 * $param
 * @return 小写
 * @desc  判断变量的类型
 * */
const checkType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
/*
 * $param 需要全屏的元素，如div，图片等
 * @return
 * @desc 全屏
 * */
const toFullScreen = (element = document.documentElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

module.exports = {
  arrSortByAttribute,
  transformArr,
  getRandomInt,
  checkType,
  toFullScreen,
  exitFullscreen,
  createTimeUnitListByTimeRange,
};
