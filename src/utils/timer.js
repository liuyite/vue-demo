import moment from 'moment'
export const timefilter = (time) => {
  return moment(time).format('YYYY-MM-DD HH-mm-ss')
}
