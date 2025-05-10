from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from PIL import Image
import img2pdf
import os
import shutil

app = FastAPI()


@app.post("/converter/")
async def converter_imagem(
    opcao: int = Form(...),  # 1=JPEG, 2=PNG, 3=PDF, 4=Comprimir
    qualidade: int = Form(75),
    file: UploadFile = File(...)
):
    temp_dir = "temp"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, file.filename)

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    nome, extensao = os.path.splitext(temp_path)
    extensao = extensao.lower()

    if extensao not in ['.png', '.jpg', '.jpeg']:
        return {"erro": "❌ Formato não suportado."}

    img = Image.open(temp_path)

    if opcao == 1:
        img = img.convert("RGB")
        novo_arquivo = nome + "_convertido.jpeg"
        img.save(novo_arquivo, "JPEG")
    elif opcao == 2:
        novo_arquivo = nome + "_convertido.png"
        img.save(novo_arquivo, "PNG")
    elif opcao == 3:
        img = img.convert("RGB") if img.mode in ("RGBA", "P") else img
        novo_arquivo = nome + ".pdf"
        with open(novo_arquivo, "wb") as f:
            f.write(img2pdf.convert(temp_path))
    elif opcao == 4:
        img = img.convert("RGB") if img.mode in ("RGBA", "P") else img
        novo_arquivo = nome + "_comprimido.jpeg"
        img.save(novo_arquivo, "JPEG", optimize=True, quality=qualidade)
    else:
        return {"erro": "❌ Opção inválida."}

    return FileResponse(novo_arquivo, media_type="application/octet-stream", filename=os.path.basename(novo_arquivo))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8080, reload=True)
