const arr = [].sort()

const random = (cant) => {
    for (let i = 0; i < cant; i++) {
        let num = Math.ceil(Math.random()*1000);
        arr.push(num)
    }
    return repeated()
}

const repeated = () =>{
    let noRep = []
    let rep = []
    let contador = 1;

    //obtengo los números con la cantidad de veces que se repiten
    for (let i = 0; i < arr.length; i++) {
        if (arr[i+1] === arr[i]) {
            contador ++;
    
        }else{
            noRep.push(arr[i])
            rep.push(contador)
            contador = 1
        }
        
    }
    let values = []
    //guardo en un array el num con su cantidad de veces repetido
    for (let i = 0; i < noRep.length; i++) {
        let numRep = {
            num: noRep[i],
            rep: rep[i]
        }
        values.push(numRep)
    }
    return values
}

process.on('message', cant => {
    const nums = random(cant)
    process.send(nums)
    process.exit()
})

process.send('listo')

