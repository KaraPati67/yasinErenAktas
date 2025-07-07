console.log("Çarpım tablosu:");

for (let i = 1; i <= 10; i++) {
    let satir = `${i} n katları :`;
    for (let j = 1; j <= 10; j++) {
        satir += (i * j).toString().padStart(4," ");
    }
    console.log(satir);
}