t = 0  # Toplam değişkenini başlat
while True:
    s = int(input("Bir sayı girin (0 ile bitirin): "))
    t += s  # Girilen sayıyı toplama ekle
    if s == 0:
        print(f"Girilen sayıların toplamı: {t}")
        break
    else:
        print(f"Girilen sayı: {s} Toplam: {t}")