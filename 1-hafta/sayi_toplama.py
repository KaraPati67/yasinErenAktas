t = 0 
while True:
    s = int(input("Bir sayı girin (0 ile bitirin): "))
    t += s
    if s == 0:
        print(f"Girilen sayıların toplamı: {t}")
        break
    else:
        print(f"Girilen sayı: {s} Toplam: {t}")
