const random = (cant) => {
    let arr = []
    for (let i = 0; i < cant; i++) {
        let num = Math.ceil(Math.random()*1000);
        arr.push(num)
    }
    let map = arr.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {})
    return map
    
}

process.on('message', cant => {
    const nums = random(cant)
    process.send(nums)
    process.exit()
})

process.send('listo')

