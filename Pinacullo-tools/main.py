import os
from PIL import Image
import img2pdf

def converter_imagem():
    caminho = input("Digite o caminho da imagem: ").strip()

    if not os.path.exists(caminho):
        print("❌ Arquivo não encontrado.")
        return

    nome, extensao = os.path.splitext(caminho)
    extensao = extensao.lower()

    if extensao not in ['.png', '.jpg', '.jpeg']:
        print("❌ Formato não suportado.")
        return

    print("\nEscolha uma opção:")
    print("1 - Converter para JPEG")
    print("2 - Converter para PNG")
    print("3 - Converter para PDF")
    print("4 - Comprimir imagem (minificar)")

    escolha = input("Opção: ")

    img = Image.open(caminho)

    if escolha == "1":
        if extensao in ['.jpg', '.jpeg']:
            print("✅ A imagem já está em JPEG.")
            return
        img = img.convert("RGB")
        novo_arquivo = nome + "_convertido.jpeg"
        img.save(novo_arquivo, "JPEG")
        print(f"✅ Convertido para: {novo_arquivo}")

    elif escolha == "2":
        if extensao == '.png':
            print("✅ A imagem já está em PNG.")
            return
        novo_arquivo = nome + "_convertido.png"
        img.save(novo_arquivo, "PNG")
        print(f"✅ Convertido para: {novo_arquivo}")

    elif escolha == "3":
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        novo_arquivo = nome + ".pdf"
        with open(novo_arquivo, "wb") as f:
            f.write(img2pdf.convert(img.filename))
        print(f"✅ Convertido para PDF: {novo_arquivo}")

    elif escolha == "4":
        qualidade = input("Digite a qualidade desejada (1-95, quanto menor, mais compressão): ")
        try:
            qualidade = int(qualidade)
            if not 1 <= qualidade <= 95:
                raise ValueError
        except ValueError:
            print("❌ Qualidade inválida. Use um número de 1 a 95.")
            return

        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        novo_arquivo = nome + "_comprimido.jpeg"
        img.save(novo_arquivo, "JPEG", optimize=True, quality=qualidade)
        print(f"✅ Imagem comprimida salva como: {novo_arquivo}")

    else:
        print("❌ Opção inválida.")

if __name__ == "__main__":
    while True:
        converter_imagem()
        continuar = input("\nDeseja converter ou comprimir outra imagem? (s/n): ").strip().lower()
        if continuar != 's':
            break
