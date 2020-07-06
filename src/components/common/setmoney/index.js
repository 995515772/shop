const res = await axios.get(`setMoney/?user=${window.sessionStorage.getItem('token')}`)
window.sessionStorage.setItem('money',res.data.data[0].money)