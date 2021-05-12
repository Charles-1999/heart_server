def get_heart_rate_variability(heart_rate_frame_data, fps):
    print('Begin HRV')
    print(heart_rate_frame_data)
    heart_rate_distance = []
    heart_rates = []
    for _index in range(1, len(heart_rate_frame_data)):
        heart_rate_distance.append(heart_rate_frame_data[_index] - heart_rate_frame_data[_index - 1])
    total_interval = heart_rate_frame_data[len(heart_rate_frame_data) - 1] - heart_rate_frame_data[0]
    avg_interval = total_interval / len(heart_rate_frame_data[1:])

    heart_rates.append(int(fps * 60 / max(heart_rate_distance)))  # MIN
    heart_rates.append(int(fps * 60 / min(heart_rate_distance)))  # MAX
    heart_rates.append(int(fps * 60 / avg_interval))              # AVG
    print(heart_rate_distance)
    # SDNN:
    rr_sum = 0
    for d in heart_rate_distance:
        rr_sum += ((avg_interval - d) / fps) ** 2
    hrv_sdnn = (rr_sum / len(heart_rate_distance)) ** 0.5
    heart_rates.append(int(hrv_sdnn * 100))
    print('HRV OK')
    return heart_rates
