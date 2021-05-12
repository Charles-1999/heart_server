def get_brightness_data(frames):
    data = []
    print('Begin to read brightness')
    for frame in frames:
        gray = int((frame[0] * 299 + frame[1] * 587 + frame[2] * 114) / 1000)
        data.append(gray)

    print(data)
    print('Brightness OK')
    return data
