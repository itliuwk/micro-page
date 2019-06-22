let list = localStorage.getItem('list')
if (list != null) {
  list = JSON.parse(list)
} else {
  list =[
    {'id': 0, 'title': '微页面标题', 'type': 'title', 'Element': 'Title', 'isEdit': true}, {
      'id': 1,
      'name': '图片广告',
      'type': 'pictureAdvertising',
      'index': 'hpBEy7bEYZMejT6723x64WQhajEf4jpD',
      'isEdit': false,
      'Element': 'Picture',
      'imgs': [{
        'title': '10',
        'url': 'https://img.yzcdn.cn/upload_files/2018/12/28/FirWRcdRefLlafwLz-YM3bdm7DZW.jpg?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp'
      }, {
        'title': '20',
        'url': 'https://img.yzcdn.cn/upload_files/2018/12/28/Fo-u2RjwqysPf7HkknkwMGdf50hu.jpg?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fwebp'
      }, {'title': '30', 'url': 'https://cdn.renqilai.com/2019_06_21/18_45_16.jpg'}],
      'selTemplate': 'wheel',
      'spacing': 10
    }, {
      'id': 1,
      'name': '图片广告',
      'type': 'pictureAdvertising',
      'index': 'WRaAczGQsmab2NJskEY5hAd6cdYEshGs',
      'isEdit': false,
      'Element': 'Picture',
      'imgs': [{
        'title': '40',
        'url': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561096673933&di=aca59f87fc3fbde5a9988d956605300b&imgtype=0&src=http%3A%2F%2Fdttt.net%2Ftbimg%2Fimg%2Fimgextra%2Fi2%2F550430446%2FTB2gFk.fTcCL1FjSZFPXXXZgpXa_%2521%2521550430446.jpg'
      }],
      'selTemplate': 'one',
      'spacing': 0
    }]
}

const lists = {
  namespaced: true,
  state: {
    list: list
  },
  mutations: {
    NEW_LIST_PUSH: (state, payload) => {
      state.list = payload
      localStorage.setItem('list', JSON.stringify(payload))

    },
    CURR_ITEMS: (state, payload) => {
      state.currItem = payload
    }
  },
  actions: {
    editList ({commit, state}, params) {
      commit('NEW_LIST_PUSH', params)
    }
  }
}

export default lists
