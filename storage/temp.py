import os

# flags = os.listdir('./copa_flags')

# print(flags)

# for flag in flags:
#     if flag == "out": continue

#     os.mkdir(f'./copa_flags/{flag.replace('.png', '')}')


path = './out/1280'
imgs = os.listdir(path)
print(imgs)

# 320 480 640 960 1280

for img in imgs:
    if not '.avif' in img: continue

    os.rename(f'{path}/{img}', f'./copa_flags/{img.replace('.avif', '')}/1280.avif')