def count_peak(hue_frame_data):
    print('Begin count')
    peak_num = 0
    peak_N_trough = []
    for _ in hue_frame_data:
        peak_N_trough.append(0)

    _last = 0
    _current = 1
    _next = 2

    while _next < len(hue_frame_data):
        # first data[_last] is not data[_current]
        while _current < len(hue_frame_data) and hue_frame_data[_next] is hue_frame_data[_current]:
            _current = _current + 1

        _next = _current + 1

        # second data[_next] is not data[_current]
        while _next < len(hue_frame_data) and hue_frame_data[_next] is hue_frame_data[_current]:
            _next = _next + 1

        if _next >= len(hue_frame_data):
            break

        # is peak or trough
        if hue_frame_data[_current] > hue_frame_data[_last] and hue_frame_data[_current] > hue_frame_data[_next]:
            peak_N_trough[_current] = 1
        elif hue_frame_data[_current] < hue_frame_data[_last] and hue_frame_data[_current] < hue_frame_data[_next]:
            peak_N_trough[_current] = -1

        _last = _current
        _current = _next
        _next = _next + 1

    avg = sum(hue_frame_data) / len(hue_frame_data)

    # exclude peak which is smaller than avg
    # exclude trough which is bigger than avg
    for i in range(0, len(peak_N_trough)):
        if (peak_N_trough[i] > 0 and hue_frame_data[i] < avg) or (peak_N_trough[i] < 0 and hue_frame_data[i] > avg):
            peak_N_trough[i] = 0

    # count
    frames = []
    index = 0
    while index < len(peak_N_trough):
        while index < len(peak_N_trough) and peak_N_trough[index] <= 0:
            index = index + 1

        if index >= len(peak_N_trough):
            break

        peak_num = peak_num + 1

        while index < len(peak_N_trough) and peak_N_trough[index] >= 0:
            index = index + 1

        frames.append(index)

    avg_interval = frames[len(frames) - 1] / len(frames[1:])

    # exclude error peak
    final_frames = [frames[0]]
    ld = 1
    for i in range(1, len(frames)):
        if frames[i] - frames[i - ld] > avg_interval * 0.7:
            final_frames.append(frames[i])
            ld = 1
        else:
            ld = ld + 1

    print('Count OK')
    return final_frames
