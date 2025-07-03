import random

def rl(u, min, max):
    return [random.randint(min,max) for _ in range(u)]


g=input("Oyuna başlamak için (E/H): ")

while True:
    if g.lower() == 'e':
        max = int(input("Lütfen oyun için maksimum sayıyı girin (çıkmak için 0): "))
        if max == 0:
            print("Oyundan çıkmayı seçtiniz. Oyun bitti.")
            break
        min = int(input("Lütfen oyun için minimum sayıyı girin: "))
        u = int(input("Lütfen oyun için sayı uzunluğunu girin: "))
        h = u
        liste = rl(u, min, max)
        bilinenler = set()
        while h > 0:
            s = int(input("Bir sayı girin: "))
            h -= 1
            if s in liste and s not in bilinenler:
                print("Tebrikler! Sayınız listede var.")
                h += 1
                bilinenler.add(s)
                if len(bilinenler) == len(set(liste)):
                    print("Tebrikler! Tüm sayıları bildiniz. Oyun bitti.")
                    break
            elif s in bilinenler:
                print("Bu sayıyı zaten bildiniz. Farklı bir sayı girin.")
            elif h < 0:
                print("Deneme hakkınız kalmadı. Oyun bitti.")
                break
            else:
                print(f"Üzgünüm, sayınız listede yok. Kalan deneme hakkınız: {h}")
    elif g.lower() == 'h':
        print("Oyundan çıkmayı seçtiniz. Oyun bitti.")
        break
    else:
        g = input("Lütfen 'E' veya 'H' girin: ")