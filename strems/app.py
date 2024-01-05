import random
import string

def generate_random_text(size_in_mb):
    characters = string.ascii_letters + string.digits + ' '
    file_size = size_in_mb * 1024 * 1024
    text = ''.join(random.choice(characters) for _ in range(file_size))
    return text

def create_large_file():
    text = generate_random_text(50)  # 30MB file
    with open('largeFile.txt', 'w') as file:
        file.write(text)
    print('File created successfully!')

create_large_file()
