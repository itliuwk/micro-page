import request from './request'

var qiniu = require('qiniu-js')
import {getTimeForQiniu} from './date'

export function getQiniuToken() {
  return request({
    url: '',  // 这里放七牛云 获取token 的链接， 七牛云上传非个人专属，需自行配置
    method: 'post',
    // params
  }).then(res => res.data).catch(e => {
    console.error("获取七牛云token失败", e)
  })
}

export async function uploadQinuImage(file) {
  var token = await getQiniuToken()
  var key = getTimeForQiniu() + file.name.substring(file.name.lastIndexOf('.'));
  var config = {
    // useCdnDomain: true,
    region: qiniu.region.z2,
    uptoken: token,
    domain: 'https://cdn.renqilai.com/',
    unique_names: true,
  };
  var putExtra = {
    // fname: file.name,
    // params: {},
    // mimeType: [] || null
    ...config,
  }
  var observable = qiniu.upload(file, key, token, putExtra, config)
  return new Promise((resolve, reject) => {
    var subscription = observable.subscribe({
      error(err) {
        reject(data)
      },
      complete(data) {
        data.path = `https://cdn.renqilai.com/${data.key}`
        resolve(data)
      }
    }) // 上传开始
  })

}

export default function uploadImage(file) {
  return uploadQinuImage(file)
}
// return new Promise((resolve, reject) => {
//     fetch({
//         url:
//         method: ''
//     })
//         .then(res => {
//             if (res.data) {
//                 let options = {
//                     region: 'SCN',
//                     uptoken: res.data,
//                     domain: 'https://cdn.renqilai.com/'
//                 };
//                 qiniuUploader.init(options);
//                 resolve(options);
//             } else {
//                 reject('获取七牛云token失败');
//             }
//         })
//         .catch(err => {
//             console.error(err);
//         })
// })
