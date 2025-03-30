/**
 * 日期工具函数
 */

/**
 * 格式化日期为指定格式
 * @param date 日期对象或日期字符串
 * @param format 格式化模板，默认为'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD'): string {
  // 确保date是有效的日期对象
  let d: Date;
  
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'string' || typeof date === 'number') {
    d = new Date(date);
    // 检查日期是否有效
    if (isNaN(d.getTime())) {
      console.error('Invalid date:', date);
      return '';
    }
  } else {
    console.error('Invalid date type:', date);
    return '';
  }
  
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  
  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  return format
    .replace(/YYYY/g, `${year}`)
    .replace(/MM/g, padZero(month))
    .replace(/DD/g, padZero(day))
    .replace(/HH/g, padZero(hour))
    .replace(/mm/g, padZero(minute))
    .replace(/ss/g, padZero(second));
}

/**
 * 在指定日期上添加天数
 * @param date 日期对象或日期字符串
 * @param days 要添加的天数，可以为负数
 * @returns 新的日期对象
 */
export function addDays(date: Date | string | number, days: number): Date {
  // 确保date是有效的日期对象
  let d: Date;
  
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'string' || typeof date === 'number') {
    d = new Date(date);
    // 检查日期是否有效
    if (isNaN(d.getTime())) {
      console.error('Invalid date:', date);
      return new Date(); // 返回当前日期作为默认值
    }
  } else {
    console.error('Invalid date type:', date);
    return new Date(); // 返回当前日期作为默认值
  }
  
  d.setDate(d.getDate() + days);
  return d;
}