import fitter
import peak_counter
import heart_rate
import by_brightness
import sys
import json
import numpy as np

###################################################################################
# parameters
# 0: brightness, 1: from red channel, 2: from h of hsv
_mode = sys.argv[1]
fps = 30           # device's fps

_frame_data = sys.argv[2]

###################################################################################


def main(mode, frame_data):
    # data processing
    frame_data = eval(frame_data)
    fps = len(frame_data) / 12.0
    print(len(frame_data))
    data_before_fit = []
    if mode == '0':
        print('enter')
        data_before_fit = by_brightness.get_brightness_data(frame_data[int(fps):int(fps)*11])
    elif mode == '1':
        data_before_fit = np.array(frame_data[int(fps):int(fps)*11])[:,0]
    # elif mode == 2:
    #     data_before_fit =

    data_after_fit = fitter.fit(data_before_fit)
    data_fixed = data_before_fit - data_after_fit

    ###################################################################################
    # count peak
    data_heart_frame = peak_counter.count_peak(data_fixed)
    hrv_sdnn = heart_rate.get_heart_rate_variability(data_heart_frame, fps)

    result = {
        'min': hrv_sdnn[0],
        'max': hrv_sdnn[1],
        'avg': hrv_sdnn[2],
        'hrv': hrv_sdnn[3]
    }

    result_json = json.dumps(result)
    print('#'+str(hrv_sdnn[0])+'#'+str(hrv_sdnn[1])+"#"+str(hrv_sdnn[2])+"#"+str(hrv_sdnn[3])+"#")
    return result_json

main(_mode, _frame_data)