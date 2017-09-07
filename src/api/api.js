import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '/api'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  // _.toast("错误的传参", 'fail')
  console.log('错误的传参', 'fail')
  return Promise.reject(error)
})
// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    console.log('api:success')
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

export function fetch (url, parmas) {
  return new Promise((resolve, reject) => {
    axios.post(url, parmas)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  // 登陆
  login (name, pwd, firm) {
    return fetch('/web/index.php?r=api%2Flogin', {name: name, pwd: pwd, firm: firm})
  },
  // 获取用户详细信息
  getUserInfo (uid, token) {
    return fetch('/web/index.php?r=api%2Fgetone', {uid: uid, token: token})
  },
  // 获取用户的所有权限
  getCheckRule (uid, token) {
    return fetch('/web/index.php?r=api%2Fgetauth', {uid: uid, token: token})
  },
  // 获取审批流程
  getApproval (uid, token) {
    return fetch('/web/index.php?r=api%2Fgetprocess', {uid: uid, token: token})
  },
  // 添加审批
  addApprovalFlow (uid, token, proId, dataId, num, content, rname) {
    return fetch('/web/index.php?r=api%2Faddapproval', {uid: uid, token: token, pro_id: proId, data_id: dataId, num: num, content: content, rname: rname})
  },
  // 资金审批
  moneyApproval (uid, token, content, rname, fId, state) {
    return fetch('/web/index.php?r=api%2Fapproval', {uid: uid, token: token, content: content, rname: rname, f_id: fId, state: state})
  },
  // 添加审核流程
  addProcess (uid, token, name, list, start) {
    return fetch('/web/index.php?r=api%2Faddprocess', {uid: uid, token: token, name: name, list: list, start: start})
  },
  // 获取材料列表
  getMaterialList (uid, token) {
    return fetch('/web/index.php?r=api%2Fgetscience', {uid: uid, token: token})
  },
  // 获取审批人
  getApprovalPeople (uid, token, name) {
    return fetch('/web/index.php?r=api%2Fapprovalpeople', {uid: uid, token: token, name: name})
  },
  // 获取职位列表
  getRoleList (uid, token) {
    return fetch('/web/index.php?r=api%2Fgetrole', {uid: uid, token: token})
  },
  // 获取审批列表
  getApprovalList (uid, token, type) {
    return fetch('/web/index.php?r=api%2Fgetfinail', {uid: uid, token: token, type: type})
  },
  // 获取审批列表详情
  getApprovalInfo (uid, token, fid) {
    return fetch('/web/index.php?r=api%2Fgetfinailinfo', {uid: uid, token: token, fid: fid})
  },
  // 获取审批流程详情
  getProcessInfo (uid, token, lid) {
    return fetch('/web/index.php?r=api%2Fgetprocessinfo', {uid: uid, token: token, lid: lid})
  },
  // 删除审批
  deleteApproval (uid, token, rid, fid) {
    return fetch('/web/index.php?r=api%2Fdelfinail', {uid: uid, token: token, rid: rid, fid: fid})
  },
  // 获取所有角色
  getAllRole(uid, token) {
    return fetch('/web/index.php?r=api%2Fgetrole', {uid: uid, token: token})
  },
  // 添加角色
  addRole(uid, token, rname, rule) {
    return fetch('/web/index.php?r=api%2Faddrole', {uid: uid, token: token, rname: rname, rule: rule})
  },
  // 编辑角色
  editRole(uid, token, rid, rname, rule) {
    return fetch('/web/index.php?r=api%2Feditrole', {uid: uid, token: token, rid: rid, rname: rname, rule: rule})
  },
  // 删除角色
  deleteRole(uid, token, rid) {
    return fetch('/web/index.php?r=api%2Fdelrole', {uid: uid, token: token, rid: rid})
  },
  // 获取所有人员
  getAllPerson(uid, token) {
    return fetch('/web/index.php?r=api%2Fgetall', {uid: uid, token: token})
  },
  // 添加人员
  addPerson(uid, token, rname, name, sex, user, pwd) {
    return fetch('/web/index.php?r=api%2Faddpeople', {uid: uid, token: token, rname: rname, name: name, sex: sex, user: user, pwd: pwd})
  },
  // 修改人员
  editPerson(uid, token, pid, rname, name, sex, user, pwd) {
    return fetch('/web/index.php?r=api%2Feditpeople', {uid: uid, token: token, pid: pid, rname: rname, name: name, sex: sex, user: user, pwd: pwd})
  },
  // 删除人员
  deletePerson(uid, token, pid) {
    return fetch('/web/index.php?r=api%2Fdelpeople', {uid: uid, token: token, pid: pid})
  },
  // 编辑材料
  editMaterial(uid, token, sId, stuff, name, content) {
    return fetch('/web/index.php?r=api%2Feditstuff', {uid: uid, token: token, s_id: sId, stuff: stuff, name: name, content: content})
  },
  // 添加材料
  addMaterial(uid, token, stuff, name, content) {
    return fetch('/web/index.php?r=api%2Faddstuff', {uid: uid, token: token, stuff: stuff, name: name, content: content})
  },
  // 删除材料
  deleteMaterial(uid, token, id) {
    return fetch('/web/index.php?r=api%2Fdelstuff', {uid: uid, token: token, s_id: id})
  }
}
