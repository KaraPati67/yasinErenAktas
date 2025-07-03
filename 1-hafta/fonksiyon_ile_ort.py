def ortalama(s1, s2):
    return (s1 + s2) / 2
while True:
    s1 = int(input("Birinci sayıyı girin: "))
    s2 = int(input("İkinci sayıyı girin: "))
    sonuc = ortalama(s1, s2)
    print("Ortalama:", sonuc)